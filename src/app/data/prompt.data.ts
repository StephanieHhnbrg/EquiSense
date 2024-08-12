import { Model } from "./model.data";
import { Response } from "./response.data";

export interface Prompt {
  request: string;
  generatedBy: "by_user" | Model;
  responses: Map<Model, Response>
}
