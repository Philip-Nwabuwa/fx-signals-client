// Type definitions for FX Signals Admin Panel

export interface Signal {
  _id?: string;
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
  screenshot?: {
    url: string;
    publicId: string;
    isApproved: boolean;
    submittedAt?: string;
    approvedAt?: string;
    approvedBy?: string;
    rejectionReason?: string;
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
