import { Criteria } from "./criteria.data";
import { Model } from "./model.data";

export interface Rating {
  rating: number;
  explanation: string;
  criteria: Criteria;
  ratedBy: Model;
}

export interface RatingParam {
  criteria: Criteria,
  ratingModel: Model;
  responseModels: Model[];
}
