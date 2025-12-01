// Type definitions for FX Signals Admin Panel

export interface Signal {
  pair: string;
  direction: "BUY" | "SELL" | "HOLD";
  confidence: number;
  entryPrice: number;
  exitTargets: {
    stopLoss: number;
    takeProfit1: number;
    takeProfit2: number;
  };
  riskAssessment?: {
    riskRewardRatio: number | null;
  };
  reasoning?: string[];
  timestamp?: string;
  timeframe?: string;
  strength?: number;
}

export interface Stats {
  totalGenerated: number;
  passedRiskFilter: number;
  top5Selected: number;
  filterPassRate: string;
  rejectedCount: number;
}

export interface MarketSummary {
  bullishSignals?: number;
  bearishSignals?: number;
  neutralSignals?: number;
  averageConfidence?: number;
}

export interface FilteringSummary {
  totalRejected: number;
  commonRejectionReasons: Array<{
    reason: string;
    count: number;
  }>;
}

export interface SignalsResponse {
  success: boolean;
  date: string;
  signals: Signal[];
  stats: Stats;
  marketSummary?: MarketSummary;
  filteringSummary?: FilteringSummary;
  error?: string;
}
