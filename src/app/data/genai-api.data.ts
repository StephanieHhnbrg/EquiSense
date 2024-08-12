export enum GenaiApi {
  Gemini = "Gemini",
  ChatGPT = "ChatGPT"
}

export function getGenaiApiByString(str: string): GenaiApi | undefined {
  switch (str) {
    case "Gemini": return GenaiApi.Gemini;
    case "ChatGPT": return GenaiApi.ChatGPT;
    default: return undefined;
  }
}
