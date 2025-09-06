export interface NoteRequestDto {
  title: string;
  content: string;
}

export interface NoteResponseDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
