export interface INote {
  _id: number
  title: string;
  description: string;
  tags: string[];
  isImportant: boolean;
  modifiedDate: string;
}
