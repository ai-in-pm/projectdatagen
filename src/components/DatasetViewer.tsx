import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDatasetStore } from "@/store/datasetStore";
import { 
  Download, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DatasetViewerProps {
  data: Record<string, any>[] | null;
  onClose: () => void;
}

export function DatasetViewer({ data, onClose }: DatasetViewerProps) {
  const { config, exportData } = useDatasetStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showScrollControls, setShowScrollControls] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const recordsPerPage = 10;
  const scrollAmount = 100;

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      const hasOverflow = 
        container.scrollWidth > container.clientWidth ||
        container.scrollHeight > container.clientHeight;
      setShowScrollControls(hasOverflow);
    }
  }, [data]);

  if (!data) return null;

  const headers = Object.keys(data[0] || {});
  
  const filteredData = data.filter(row => 
    Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + recordsPerPage);

  const handleScroll = (direction: 'up' | 'down' | 'left' | 'right') => {
    const container = tableContainerRef.current;
    if (!container) return;

    switch (direction) {
      case 'up':
        container.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
        break;
      case 'down':
        container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
        break;
      case 'left':
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        break;
      case 'right':
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] flex flex-col">
        <Card className="flex-1 overflow-hidden relative">
          <CardHeader className="flex flex-row items-center justify-between border-b">
            <div>
              <CardTitle>Generated Dataset</CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                {filteredData.length} records found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search dataset..."
                  className="px-3 py-1 border rounded-md text-sm"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <Button
                onClick={() => exportData(config.format)}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button
                onClick={onClose}
                variant="secondary"
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {/* Vertical Scroll Controls */}
          {showScrollControls && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-10">
              <Button
                variant="secondary"
                onClick={() => handleScroll('up')}
                className="p-1 bg-white shadow-md hover:bg-gray-100"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleScroll('down')}
                className="p-1 bg-white shadow-md hover:bg-gray-100"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Horizontal Scroll Controls */}
          {showScrollControls && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              <Button
                variant="secondary"
                onClick={() => handleScroll('left')}
                className="p-1 bg-white shadow-md hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleScroll('right')}
                className="p-1 bg-white shadow-md hover:bg-gray-100"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          <CardContent className="overflow-auto p-0" ref={tableContainerRef}>
            <div className="border-b min-w-full">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {headers.map((header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider border-b sticky top-0 bg-gray-50"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {headers.map((header) => (
                        <td
                          key={`${rowIndex}-${header}`}
                          className="px-4 py-3 whitespace-nowrap text-gray-900"
                        >
                          {typeof row[header] === 'object'
                            ? JSON.stringify(row[header])
                            : String(row[header])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-t">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, filteredData.length)} of {filteredData.length} records
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="secondary"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}