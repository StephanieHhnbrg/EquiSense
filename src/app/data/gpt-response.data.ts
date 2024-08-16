export interface GptResponse {
  choices: Choice[];
  usage: Usage;
}

interface Choice {
  message: Content;
}

interface Content {
  content: string
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}
