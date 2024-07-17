export interface INote {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  isImportant: boolean;
  modifiedDate: string;
}
