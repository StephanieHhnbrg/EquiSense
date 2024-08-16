export interface GeminiResponse {
  candidates: Candidate[];
  usageMetadata: Usage;
}

interface Candidate {
  content: Content;
}

interface Content {
  parts: Part[];
}

interface Part {
  text: string;
}

interface Usage {
  promptTokenCount: number;
  candidatesTokenCount: number;
  totalTokenCount: number;
}
