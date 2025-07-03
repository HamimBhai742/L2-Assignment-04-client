export interface IBook {
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

export interface IBookWithId extends IBook {
  // existing properties...
  _id: string; // add this line
}

export interface IBorroBook {
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

export interface IBorrow {
  _id: string;
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}
