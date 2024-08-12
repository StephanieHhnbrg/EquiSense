export enum Model {
  Gemini_1_0_Pro = "gemini-1.0-pro",
  Gemini_1_5_Pro = "gemini-1.5-pro",
  Gemini_1_5_Flash = "gemini-1.5-flash",
  GPT_Turbo = "gpt-3.5-turbo",
  GPT_Turbo_0125 = "gpt-3.5-turbo-0125",
  GPT_Turbo_1106 = "gpt-3.5-turbo-1106",
  GPT_Turbo_16k = "gpt-3.5-turbo-16k",
  GPT_Mini = "gpt-4o-mini",

}

export function getModelByString(str: string): Model | undefined {
  switch (str) {
    case "gemini-1.0-pro": return Model.Gemini_1_0_Pro;
    case "gemini-1.5-pro": return Model.Gemini_1_5_Pro;
    case "gemini-1.5-flash": return Model.Gemini_1_5_Flash;
    case "gpt-3.5-turbo": return Model.GPT_Turbo;
    case "gpt-3.5-turbo-0125": return Model.GPT_Turbo_0125;
    case "gpt-3.5-turbo-1106": return Model.GPT_Turbo_1106;
    case "gpt-3.5-turbo-16k": return Model.GPT_Turbo_16k;
    case "gpt-4o-mini": return Model.GPT_Mini;
  }
  return undefined;
}
