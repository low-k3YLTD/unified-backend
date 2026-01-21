import { describe, it, expect } from 'vitest';
import { DataIngestor } from '../ingest';
import { PredictionService } from './index';
import { AnalyticsExporter } from '../analytics';

describe('End-to-End Pipeline Flow', () => {
  it('should ingest, predict, and export analytics correctly', async () => {
    const csvData = `horseName,trackCondition,railPosition,straightLength,runningStyle,barrier
Pier,7,0,173,leader,1
SlowJoe,7,0,173,backmarker,10`;

    // 1. Ingest
    const ingestedData = await DataIngestor.fromCSV(csvData);
    expect(ingestedData).toHaveLength(2);
    expect(ingestedData[0].horseName).toBe('Pier');

    // 2. Predict
    const results = await PredictionService.processRace(ingestedData);
    expect(results.predictions[0].horseName).toBe('Pier');
    expect(results.precogMetrics.marketBeat).toBe(true);

    // 3. Analytics Export
    const jsonExport = await AnalyticsExporter.exportToJSON(results);
    const report = await AnalyticsExporter.generateReport(results.predictions);
    
    expect(jsonExport).toContain('Pier');
    expect(report).toContain('Pier');
  });
});
