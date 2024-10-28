import { useDatasetStore } from '@/store/datasetStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DatasetViewer } from './DatasetViewer';

export function ConfigurationPanel() {
  const { config, setConfig, generateData, isGenerating, error, generatedData } = useDatasetStore();
  const [showDataset, setShowDataset] = useState(false);

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Project Configuration</CardTitle>
          <p className="text-sm text-gray-500">{config.description}</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Dataset Type</label>
                <select
                  className="w-full mt-1 rounded-md border p-2"
                  value={config.type}
                  onChange={(e) => setConfig({ type: e.target.value as any })}
                >
                  <option value="IPMDAR">IPMDAR</option>
                  <option value="PARS">Project Assessment and Reporting System</option>
                  <option value="DIQ">Data Integrity and Quality</option>
                  <option value="DECM">DCMA EVMS Compliance Metric</option>
                  <option value="SPACE_FORCE">Space Force Projects</option>
                  <option value="AEROSPACE">Aerospace Projects</option>
                  <option value="CONSTRUCTION">Construction Projects</option>
                  <option value="SUPPLY_CHAIN">Supply Chain Management</option>
                  <option value="SMART_CONTRACTS">Smart Contracts</option>
                  <option value="BEHAVIORAL_PM">Behavioral Project Management</option>
                  <option value="COGNITIVE_PM">Cognitive Project Management</option>
                  <option value="AGILE">Agile</option>
                  <option value="EARNED_SCHEDULE">Earned Schedule</option>
                  <option value="IPM">Integrated Project Management</option>
                  <option value="PMP">Project Management Professional</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Contract Type</label>
                <select
                  className="w-full mt-1 rounded-md border p-2"
                  value={config.contractType}
                  onChange={(e) => setConfig({ contractType: e.target.value as any })}
                >
                  <option value="CPFF">Cost Plus Fixed Fee (CPFF)</option>
                  <option value="CPIF">Cost Plus Incentive Fee (CPIF)</option>
                  <option value="CPAF">Cost Plus Award Fee (CPAF)</option>
                  <option value="FFP">Firm Fixed Price (FFP)</option>
                  <option value="FPI">Fixed Price Incentive (FPI)</option>
                  <option value="T&M">Time & Materials (T&M)</option>
                  <option value="IDIQ">Indefinite Delivery/Quantity (IDIQ)</option>
                  <option value="BOA">Basic Ordering Agreement (BOA)</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Project Size</label>
                <select
                  className="w-full mt-1 rounded-md border p-2"
                  value={config.projectSize}
                  onChange={(e) => setConfig({ projectSize: e.target.value as any })}
                >
                  <option value="SMALL">Small</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LARGE">Large</option>
                  <option value="ENTERPRISE">Enterprise</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Project Complexity</label>
                <select
                  className="w-full mt-1 rounded-md border p-2"
                  value={config.projectComplexity}
                  onChange={(e) => setConfig({ projectComplexity: e.target.value as any })}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="VERY_HIGH">Very High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Record Count</label>
              <input
                type="number"
                className="w-full mt-1 rounded-md border p-2"
                value={config.recordCount}
                onChange={(e) => setConfig({ recordCount: parseInt(e.target.value) })}
                min="1"
                max="100000"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Export Format</label>
              <select
                className="w-full mt-1 rounded-md border p-2"
                value={config.format}
                onChange={(e) => setConfig({ format: e.target.value as any })}
              >
                <option value="CSV">CSV</option>
                <option value="Excel">Excel</option>
                <option value="XML">XML</option>
                <option value="JSON">JSON</option>
              </select>
            </div>

            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => generateData()}
                disabled={isGenerating}
                className="w-full py-2"
              >
                {isGenerating ? 'Generating...' : 'Generate Project Data'}
              </Button>

              <Button
                onClick={() => setShowDataset(true)}
                disabled={!generatedData}
                variant="secondary"
                className="w-full py-2"
              >
                View Dataset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showDataset && (
        <DatasetViewer
          data={generatedData}
          onClose={() => setShowDataset(false)}
        />
      )}
    </>
  );
}