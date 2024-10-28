export type DatasetType = 
  | 'IPMDAR' 
  | 'PARS' 
  | 'DIQ' 
  | 'DECM' 
  | 'SPACE_FORCE' 
  | 'AEROSPACE'
  | 'CONSTRUCTION' 
  | 'SUPPLY_CHAIN' 
  | 'SMART_CONTRACTS' 
  | 'BEHAVIORAL_PM'
  | 'COGNITIVE_PM' 
  | 'AGILE' 
  | 'EARNED_SCHEDULE' 
  | 'IPM' 
  | 'PMP';

export type ContractType = 
  | 'CPFF' 
  | 'CPIF' 
  | 'CPAF' 
  | 'FFP' 
  | 'FPI' 
  | 'T&M' 
  | 'IDIQ' 
  | 'BOA';

export type ProjectSize = 
  | 'SMALL' 
  | 'MEDIUM' 
  | 'LARGE' 
  | 'ENTERPRISE';

export type ProjectComplexity = 
  | 'LOW' 
  | 'MEDIUM' 
  | 'HIGH' 
  | 'VERY_HIGH';

export interface WorkerBee {
  id: string;
  name: string;
  role: 'structurer' | 'generator' | 'validator' | 'exporter';
  status: 'idle' | 'working' | 'completed' | 'error';
  message?: string;
}

export interface DatasetConfig {
  name: string;
  type: DatasetType;
  contractType: ContractType;
  projectSize: ProjectSize;
  projectComplexity: ProjectComplexity;
  recordCount: number;
  includeFields: string[];
  format: 'CSV' | 'Excel' | 'XML' | 'JSON';
  description: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface DataSchema {
  fields: SchemaField[];
  relationships: SchemaRelationship[];
}

export interface SchemaField {
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  required: boolean;
  validation?: ValidationRule[];
}

export interface SchemaRelationship {
  from: string;
  to: string;
  type: 'oneToOne' | 'oneToMany';
}

export interface ValidationRule {
  type: 'range' | 'pattern' | 'required';
  params?: any;
}

export interface ExportResult {
  content: string | Blob;
  mimeType: string;
  extension: string;
}