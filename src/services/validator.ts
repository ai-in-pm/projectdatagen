import { DataSchema, ValidationResult } from '@/types';

export function validateDataset(
  data: Record<string, any>[], 
  schema: DataSchema
): ValidationResult {
  const errors = [];

  for (let i = 0; i < data.length; i++) {
    const record = data[i];

    for (const field of schema.fields) {
      if (field.required && !record[field.name]) {
        errors.push({
          field: field.name,
          message: `Missing required field at record ${i + 1}`,
          severity: 'error'
        });
      }

      if (record[field.name] !== undefined) {
        const value = record[field.name];
        
        switch (field.type) {
          case 'number':
            if (typeof value !== 'number' || isNaN(value)) {
              errors.push({
                field: field.name,
                message: `Invalid number at record ${i + 1}`,
                severity: 'error'
              });
            }
            break;
          case 'date':
            if (isNaN(Date.parse(value))) {
              errors.push({
                field: field.name,
                message: `Invalid date at record ${i + 1}`,
                severity: 'error'
              });
            }
            break;
        }
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}