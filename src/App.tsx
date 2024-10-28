import { WorkerBeeCard } from "@/components/WorkerBeeCard";
import { ConfigurationPanel } from "@/components/ConfigurationPanel";
import { ValidationResults } from "@/components/ValidationResults";
import { useDatasetStore } from "@/store/datasetStore";

function App() {
  const { workerBees, validationResults } = useDatasetStore();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            ProjectDataGen
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl">
            An advanced AI-powered platform for generating comprehensive project management datasets. 
            Specializing in government contracts (IPMDAR, PARS, DECM), aerospace & defense, Space Force operations, 
            and modern project methodologies including Agile, Earned Schedule, and Behavioral PM. 
            Supporting multiple contract types (CPFF, CPIF, CPAF, etc.) and project scales from small 
            to enterprise, with intelligent data generation for earned value management, behavioral analytics, 
            and compliance reporting.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-600">Data Structurer AI</h3>
            <p className="text-sm text-gray-600">
              Designs intelligent schemas for EVMS compliance, IPMDAR/PARS reporting, 
              and Space Force operations. Handles complex data structures for various 
              contract types (CPFF to IDIQ) and project scales. Supports behavioral metrics, 
              earned schedule, and integrated project management frameworks.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-600">Data Generator AI</h3>
            <p className="text-sm text-gray-600">
              Creates realistic datasets with sophisticated correlations across EVM metrics, 
              schedule performance, and behavioral patterns. Adapts to project complexity 
              levels and generates data for multiple methodologies from traditional PMI 
              to Agile and cognitive project management approaches.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-600">Data Validator AI</h3>
            <p className="text-sm text-gray-600">
              Ensures compliance with DCMA standards, EVMS guidelines, and IPMDAR 
              requirements. Performs comprehensive validation across earned value metrics, 
              schedule performance, and data integrity. Validates project data against 
              specific methodology requirements and contract type constraints.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-blue-600">Data Exporter AI</h3>
            <p className="text-sm text-gray-600">
              Formats data for government systems, contract deliverables, and program 
              reviews. Supports multiple export formats (CSV, Excel, XML, JSON) with 
              specific formatting for IPMDAR, PARS, and DECM submissions. Creates 
              audit-ready datasets with full compliance documentation.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          <ConfigurationPanel />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workerBees.map((worker) => (
              <WorkerBeeCard key={worker.id} worker={worker} />
            ))}
          </div>

          {validationResults && <ValidationResults results={validationResults} />}
        </div>
      </div>
    </div>
  );
}

export default App;