export interface INote {
  noteId: number
  title: string;
  description: string;
  tags: string[];
  isImportant: boolean;
  modifiedDate: string;
}
