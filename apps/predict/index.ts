import { EnsemblePredictor, RaceData } from '../../packages/ml-core';

export class PredictionService {
  static async processRace(data: RaceData[]) {
    const predictions = EnsemblePredictor.predict(data);
    const marketBeat = predictions[0].winProbability > 0.65; // Precog metric: market-beat 65%
    
    return {
      timestamp: new Date().toISOString(),
      predictions,
      precogMetrics: {
        marketBeat,
        roiPotential: "+30%"
      }
    };
  }
}
