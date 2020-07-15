export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

export interface Movies {
  sort: number | string;
  name: string;
  url: string | undefined;
  poster: string | undefined;
  score: string | number;
  quote?: string;
}

export interface Result {
  success: boolean;
  message?: string;
  error?: boolean | null;
  data: any;
}

