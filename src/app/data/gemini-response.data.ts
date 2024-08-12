export interface GeminiResponse {
  candidates: Candidate[];
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
