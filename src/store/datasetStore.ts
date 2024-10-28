import { create } from 'zustand';
import type { 
  DatasetConfig, 
  ValidationResult, 
  WorkerBee,
  DatasetType,
  ContractType,
  ProjectSize,
  ProjectComplexity
} from '@/types';
import { getSchemaForConfig } from '@/services/structurer';
import { generateDataset } from '@/services/generator';
import { validateDataset } from '@/services/validator';
import { exportDataset, downloadDataset } from '@/services/exporter';

interface DatasetState {
  config: DatasetConfig;
  workerBees: WorkerBee[];
  validationResults: ValidationResult | null;
  generatedData: Record<string, any>[] | null;
  isGenerating: boolean;
  error: string | null;
  setConfig: (config: Partial<DatasetConfig>) => void;
  updateWorkerStatus: (id: string, status: WorkerBee['status'], message?: string) => void;
  generateData: () => Promise<void>;
  exportData: (format: 'CSV' | 'Excel' | 'XML' | 'JSON') => void;
}

const DATASET_DESCRIPTIONS: Record<DatasetType, string> = {
  IPMDAR: 'Integrated Program Management Data Analysis Report - Government contract performance data',
  PARS: 'Project Assessment and Reporting System - Comprehensive project status and metrics',
  DIQ: 'Data Integrity and Quality - Project data quality metrics and validation',
  DECM: 'DCMA EVMS Compliance Metric - Earned Value Management System compliance data',
  SPACE_FORCE: 'Space Force Projects - Specialized space program management data',
  AEROSPACE: 'Aerospace Projects - Aviation and aerospace program metrics',
  CONSTRUCTION: 'Construction Projects - Building and infrastructure project data',
  SUPPLY_CHAIN: 'Supply Chain Management - Logistics and supply chain metrics',
  SMART_CONTRACTS: 'Smart Contract Projects - Blockchain and contract automation data',
  BEHAVIORAL_PM: 'Behavioral Project Management - Human factors and team dynamics data',
  COGNITIVE_PM: 'Cognitive Project Management - Decision-making and problem-solving metrics',
  AGILE: 'Agile Projects - Sprint and iteration performance data',
  EARNED_SCHEDULE: 'Earned Schedule - Time-based project performance metrics',
  IPM: 'Integrated Project Management - Unified project control metrics',
  PMP: 'Project Management Professional - Standard PMI methodology metrics'
};

export const useDatasetStore = create<DatasetState>((set, get) => ({
  config: {
    name: '',
    type: 'IPMDAR',
    contractType: 'CPFF',
    projectSize: 'MEDIUM',
    projectComplexity: 'MEDIUM',
    recordCount: 1000,
    includeFields: [],
    format: 'CSV',
    description: DATASET_DESCRIPTIONS.IPMDAR
  },
  workerBees: [
    { id: '1', name: 'Data Structurer', role: 'structurer', status: 'idle' },
    { id: '2', name: 'Data Generator', role: 'generator', status: 'idle' },
    { id: '3', name: 'Data Validator', role: 'validator', status: 'idle' },
    { id: '4', name: 'Data Exporter', role: 'exporter', status: 'idle' }
  ],
  validationResults: null,
  generatedData: null,
  isGenerating: false,
  error: null,

  setConfig: (newConfig) => set((state) => {
    const updatedConfig = { ...state.config, ...newConfig };
    if (newConfig.type && DATASET_DESCRIPTIONS[newConfig.type]) {
      updatedConfig.description = DATASET_DESCRIPTIONS[newConfig.type];
    }
    return { config: updatedConfig };
  }),

  updateWorkerStatus: (id, status, message) =>
    set((state) => ({
      workerBees: state.workerBees.map((bee) =>
        bee.id === id ? { ...bee, status, message } : bee
      ),
    })),

  generateData: async () => {
    const { config, updateWorkerStatus } = get();
    set({ isGenerating: true, error: null });

    try {
      // Step 1: Structure
      updateWorkerStatus('1', 'working', 'Creating data schema...');
      const schema = getSchemaForConfig(config);
      updateWorkerStatus('1', 'completed', 'Schema created');

      // Step 2: Generate
      updateWorkerStatus('2', 'working', 'Generating dataset...');
      const data = generateDataset(schema, config.recordCount, config);
      updateWorkerStatus('2', 'completed', 'Dataset generated');

      // Step 3: Validate
      updateWorkerStatus('3', 'working', 'Validating data...');
      const validationResults = validateDataset(data, schema);
      updateWorkerStatus('3', 'completed', 'Validation complete');

      if (!validationResults.isValid) {
        throw new Error('Validation failed: ' + validationResults.errors[0].message);
      }

      // Step 4: Ready for export
      updateWorkerStatus('4', 'completed', 'Ready for export');
      set({ generatedData: data, validationResults });

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error occurred';
      set({ error: message });
      get().workerBees.forEach(bee => {
        if (bee.status === 'working') {
          updateWorkerStatus(bee.id, 'error', message);
        }
      });
    } finally {
      set({ isGenerating: false });
    }
  },

  exportData: (format) => {
    const { config, generatedData } = get();
    if (!generatedData) return;

    try {
      const result = exportDataset(generatedData, { ...config, format });
      downloadDataset(
        result.content,
        result.mimeType,
        result.extension,
        `${config.name || 'dataset'}-${config.type.toLowerCase()}`
      );
    } catch (error) {
      set({ error: 'Export failed: ' + (error instanceof Error ? error.message : 'Unknown error') });
    }
  }
}));