export interface ICity {
  id: number;
  name: string;
}

export interface INote {
  id: number;
  city: string | null;
  text: string;
  date: string;
}
