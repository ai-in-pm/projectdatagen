import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ValidationResult } from "@/types";

interface ValidationResultsProps {
  results: ValidationResult;
}

export function ValidationResults({ results }: ValidationResultsProps) {
  if (!results || results.errors.length === 0) {
    return null;
  }

  return (
    <Card className="w-full bg-red-50">
      <CardHeader>
        <CardTitle className="text-red-700">Validation Errors</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {results.errors.map((error, index) => (
            <li
              key={index}
              className={`text-sm ${
                error.severity === 'error' ? 'text-red-600' : 'text-yellow-600'
              }`}
            >
              <span className="font-medium">{error.field}:</span> {error.message}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}