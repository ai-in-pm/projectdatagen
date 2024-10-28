import { DatasetConfig, DataSchema } from '@/types';

export function getSchemaForConfig(config: DatasetConfig): DataSchema {
  const baseSchema: DataSchema = {
    fields: [
      {
        name: 'id',
        type: 'string',
        required: true,
      },
      {
        name: 'timestamp',
        type: 'date',
        required: true,
      }
    ],
    relationships: []
  };

  switch (config.type) {
    case 'IPMDAR':
      return {
        ...baseSchema,
        fields: [
          ...baseSchema.fields,
          { name: 'earnedValue', type: 'number', required: true },
          { name: 'plannedValue', type: 'number', required: true },
          { name: 'actualCost', type: 'number', required: true },
          { name: 'cpi', type: 'number', required: true },
          { name: 'spi', type: 'number', required: true },
        ]
      };
    case 'DECM':
      return {
        ...baseSchema,
        fields: [
          ...baseSchema.fields,
          { name: 'complianceScore', type: 'number', required: true },
          { name: 'metricCategory', type: 'string', required: true },
          { name: 'assessmentDate', type: 'date', required: true },
        ]
      };
    // Add cases for other dataset types
    default:
      return baseSchema;
  }
}