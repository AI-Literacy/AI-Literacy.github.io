enum GameFieldType {
  Number,
}

export interface GameField {
  name: string;
  type: GameFieldType;

  min?: number;
  max?: number;
}

export interface GameTemplate {
  started: boolean;
  fields: GameField[];
}