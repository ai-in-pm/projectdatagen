import { DatasetConfig, ExportResult } from '@/types';

export function exportDataset(
  data: Record<string, any>[], 
  config: DatasetConfig
): ExportResult {
  switch (config.format) {
    case 'CSV':
      return exportCSV(data);
    case 'JSON':
      return exportJSON(data);
    case 'XML':
      return exportXML(data);
    case 'Excel':
      return exportExcel(data);
    default:
      throw new Error(`Unsupported format: ${config.format}`);
  }
}

function exportCSV(data: Record<string, any>[]): ExportResult {
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => 
        JSON.stringify(row[header] ?? '')
      ).join(',')
    )
  ].join('\n');

  return {
    content: csvContent,
    mimeType: 'text/csv',
    extension: 'csv'
  };
}

function exportJSON(data: Record<string, any>[]): ExportResult {
  return {
    content: JSON.stringify(data, null, 2),
    mimeType: 'application/json',
    extension: 'json'
  };
}

function exportXML(data: Record<string, any>[]): ExportResult {
  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<dataset>
  ${data.map(record => `
  <record>
    ${Object.entries(record).map(([key, value]) => 
      `<${key}>${value}</${key}>`
    ).join('\n    ')}
  </record>`).join('\n  ')}
</dataset>`;

  return {
    content: xmlContent,
    mimeType: 'application/xml',
    extension: 'xml'
  };
}

function exportExcel(data: Record<string, any>[]): ExportResult {
  // For now, fallback to CSV as Excel requires additional libraries
  return exportCSV(data);
}

export function downloadDataset(
  content: string | Blob,
  mimeType: string,
  extension: string,
  filename: string
): void {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = `${filename}.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}