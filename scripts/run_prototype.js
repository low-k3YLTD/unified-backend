// Simple JS runner for the prototype
import { DataIngestor } from '../apps/ingest/index.ts';
import { PredictionService } from '../apps/predict/index.ts';
import { AnalyticsExporter } from '../apps/analytics/index.ts';
import { SecurityAudit } from '../packages/security/index.ts';

async function main() {
  console.log("--- Wave 1 Deploy: ML + Backend Prototype ---");
  
  const auditLogs = await SecurityAudit.auditLogs();
  console.log("Security Audit Logs:", auditLogs);

  const csvData = `horseName,trackCondition,railPosition,straightLength,runningStyle,barrier
Pier,7,0,173,leader,1
HastingsEdge,7,0,173,on-pace,2
MarketBeat,7,0,173,midfield,5
LongShot,7,0,173,backmarker,12`;

  console.log("\nIngesting data...");
  const ingestedData = await DataIngestor.fromCSV(csvData);
  console.log(`Ingested ${ingestedData.length} runners.`);

  console.log("\nRunning Ensemble Predictor (Hawke's Bay Bias)...");
  const results = await PredictionService.processRace(ingestedData);
  
  console.log("\nPredictions:");
  results.predictions.forEach((p, i) => {
    console.log(`${i+1}. ${p.horseName}: ${(p.winProbability * 100).toFixed(2)}%`);
  });

  console.log("\nPrecog Metrics:");
  console.log(`- Market Beat: ${results.precogMetrics.marketBeat}`);
  console.log(`- ROI Potential: ${results.precogMetrics.roiPotential}`);

  console.log("\nGenerating Analytics Report...");
  const report = await AnalyticsExporter.generateReport(results.predictions);
  console.log(report);
}

main().catch(console.error);
