export interface PredictionResponse {
  prediction: string;
  confidence: number;
  fake_probability: number;
  real_probability: number;
}