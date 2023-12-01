export interface Note {
  id?: number;
  title: string;
  content: string;
}

export interface SearchResultSnippet {
  value: string;
  matchLevel: string;
}

export interface NoteSearchResult {
  objectID: string;
  content: string;
  title: string;
  user_id: number;
  _snippetResult: {
    title: SearchResultSnippet;
    content: SearchResultSnippet;
  };
}

export type FormSubmitArg = {
  title: string;
  content: string;
};
