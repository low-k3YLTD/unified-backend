export interface RaceData {
  horseName: string;
  trackCondition: number; // 1-10 scale
  railPosition: number; // meters out
  straightLength: number; // meters
  runningStyle: 'leader' | 'on-pace' | 'midfield' | 'backmarker';
  barrier: number;
}

export class EnsemblePredictor {
  static calculateBiasScore(data: RaceData): number {
    let score = 0;

    // Hawke's Bay specific logic: Short straights and soft tracks favor leaders
    if (data.straightLength < 200 && data.trackCondition > 5) {
      if (data.runningStyle === 'leader' || data.runningStyle === 'on-pace') {
        score += 0.3; // +30% ROI potential
      }
    }

    // Rail position impact
    if (data.railPosition > 4 && data.barrier <= 4) {
      score += 0.15; // Inside barriers favored when rail is out
    }

    return score;
  }

  static predict(data: RaceData[]): { horseName: string; winProbability: number }[] {
    return data.map(horse => {
      const baseProb = 1 / data.length;
      const bias = this.calculateBiasScore(horse);
      return {
        horseName: horse.horseName,
        winProbability: Math.min(0.95, baseProb + bias)
      };
    }).sort((a, b) => b.winProbability - a.winProbability);
  }
}
