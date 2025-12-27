export type GameType = 
  | 'path-bridge'
  | 'block-slide'
  | 'color-flow'
  | 'circuit-connect'
  | 'tile-placement'
  | 'sequence-lock'
  | 'flow-network';

export interface GameConfig {
  id: string;
  type: GameType;
  title: {
    en: string;
    es: string;
  };
  instruction: {
    en: string;
    es: string;
  };
  board: {
    width: number;
    height: number;
    initialState: Record<string, any>;
  };
  solution: Record<string, any>;
}

export interface GameLibrary {
  games: GameConfig[];
}

export interface Island {
  x: number;
  y: number;
  bridges: number;
}

export interface Bridge {
  from: { x: number; y: number };
  to: { x: number; y: number };
}

export interface Block {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isTarget?: boolean;
}

export interface ColorCell {
  x: number;
  y: number;
  color: string | null;
  locked?: boolean;
}


