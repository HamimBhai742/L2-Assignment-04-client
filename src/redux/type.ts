export interface IBook {
  _id:string;
  title: string;
  author: string;
  genre:
    | 'FICTION'
    | 'NON_FICTION'
    | 'SCIENCE'
    | 'HISTORY'
    | 'BIOGRAPHY'
    | 'FANTASY';
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

export interface BorroBook {
  _id: string;
  quantity: number;
  dueDate: string;
}

export interface IBook2 {
  title: string;
  author: string;
  genre:
    | 'FICTION'
    | 'NON_FICTION'
    | 'SCIENCE'
    | 'HISTORY'
    | 'BIOGRAPHY'
    | 'FANTASY';
  isbn: string;
  description: string;
  copies: number;
}
