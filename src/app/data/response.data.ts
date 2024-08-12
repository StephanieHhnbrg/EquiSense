import { Model } from "./model.data";
import { Rating } from "./rating.data";

export interface Response {
  response: string;
  ratings: Rating[];
  generatedBy: Model;
}
