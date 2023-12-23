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
export default class ChessRoom {
  constructor(
    public players: [Player | null, Player | null],
    public id: string,
    public board: Board,
    public status: GameStatus,
    public createdAt: Date,
    public movingSide: Color,
    public gameOverInfo?: GameOverInfo
  ) {}
}
