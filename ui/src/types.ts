export interface Note {
  id?: number;
  title: string;
  content: string;
}

export type FormSubmitArg = {
  title: string;
  content: string;
};
