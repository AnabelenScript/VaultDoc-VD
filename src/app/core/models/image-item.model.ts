export interface Point {
  x: number;
  y: number;
}

export interface ImageItem {
  file: File;
  name: string;
  previewUrl: string;
  corners?: Point[];
  transformedPreview?: string;
  status: 'pending' | 'edited' | 'ready';
}
