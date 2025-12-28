
export interface CaptionData {
  platform: 'Instagram' | 'LinkedIn';
  caption: string;
  hashtags: string[];
}

export interface GenerationResult {
  instagram: CaptionData;
  linkedin: CaptionData;
}

export enum AppStatus {
  IDLE = 'IDLE',
  UPLOADING = 'UPLOADING',
  GENERATING = 'GENERATING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
