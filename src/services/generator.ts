import { DataSchema, DatasetConfig } from '@/types';

export function generateDataset(
  schema: DataSchema, 
  count: number, 
  config: DatasetConfig
): Record<string, any>[] {
  const dataset: Record<string, any>[] = [];

  for (let i = 0; i < count; i++) {
    const record: Record<string, any> = {
      id: `${config.type}-${i + 1}`,
      timestamp: new Date().toISOString(),
    };

    for (const field of schema.fields) {
      if (field.name === 'id' || field.name === 'timestamp') continue;

      switch (field.type) {
        case 'number':
          record[field.name] = generateNumericValue(field.name, config);
          break;
        case 'string':
          record[field.name] = generateStringValue(field.name, config);
          break;
        case 'date':
          record[field.name] = generateDateValue();
          break;
        case 'boolean':
          record[field.name] = Math.random() > 0.5;
          break;
      }
    }

    dataset.push(record);
  }

  return dataset;
}

function generateNumericValue(fieldName: string, config: DatasetConfig): number {
  const baseValue = Math.random() * 1000;
  
  switch (fieldName) {
    case 'earnedValue':
    case 'plannedValue':
    case 'actualCost':
      return Math.round(baseValue * 100) / 100;
    case 'cpi':
    case 'spi':
      return 0.7 + Math.random() * 0.6; // Range: 0.7 to 1.3
    case 'complianceScore':
      return Math.round(Math.random() * 100);
    default:
      return baseValue;
  }
}

function generateStringValue(fieldName: string, config: DatasetConfig): string {
  const categories = [
    'Schedule', 'Cost', 'Risk', 'Quality', 'Performance',
    'Technical', 'Management', 'Resources'
  ];

  switch (fieldName) {
    case 'metricCategory':
      return categories[Math.floor(Math.random() * categories.length)];
    default:
      return `${fieldName}-${Math.random().toString(36).substring(7)}`;
  }
}

function generateDateValue(): string {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString();
}