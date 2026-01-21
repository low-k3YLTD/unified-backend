import { describe, it, expect } from 'vitest';
import { EnsemblePredictor, RaceData } from './index';

describe('EnsemblePredictor', () => {
  it('should favor leaders on short straights with soft tracks (Hawke\'s Bay bias)', () => {
    const data: RaceData = {
      horseName: 'Pier',
      trackCondition: 7, // Soft
      railPosition: 0,
      straightLength: 173, // Short (Moonee Valley/Hastings style)
      runningStyle: 'leader',
      barrier: 1
    };
    
    const score = EnsemblePredictor.calculateBiasScore(data);
    expect(score).toBeGreaterThan(0);
    expect(score).toBe(0.3);
  });

  it('should favor inside barriers when rail is out', () => {
    const data: RaceData = {
      horseName: 'Hastings Star',
      trackCondition: 3,
      railPosition: 6, // Rail out 6m
      straightLength: 450,
      runningStyle: 'midfield',
      barrier: 2 // Inside barrier
    };
    
    const score = EnsemblePredictor.calculateBiasScore(data);
    expect(score).toBe(0.15);
  });

  it('should predict win probabilities correctly', () => {
    const race: RaceData[] = [
      { horseName: 'Horse A', trackCondition: 7, railPosition: 0, straightLength: 173, runningStyle: 'leader', barrier: 1 },
      { horseName: 'Horse B', trackCondition: 7, railPosition: 0, straightLength: 173, runningStyle: 'backmarker', barrier: 8 }
    ];
    
    const predictions = EnsemblePredictor.predict(race);
    expect(predictions[0].horseName).toBe('Horse A');
    expect(predictions[0].winProbability).toBeGreaterThan(predictions[1].winProbability);
  });
});
