import type User from '~/models/auth/User';
import type { Color } from '~/types/chess/Color';
import type Board from '~/models/chess/Board';
import { type GameOverInfo } from '~/types/chess/Game';
export interface Player extends User {
  side: Color;
}
export enum GameStatus {
  NOT_STARTED = 'Not started',
  PROCESS = 'In process',
  FINISHED = 'Finished'
}
export default interface ChessRoom {
  players: [Player | null, Player | null];
  id: string;
  board: Board;
  status: GameStatus;
  createdAt: Date;
  movingSide: Color;
  gameOverInfo?: GameOverInfo;
}
