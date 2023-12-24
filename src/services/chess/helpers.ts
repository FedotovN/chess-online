import Figure from '~/models/chess/figures/Figure';
import Cell from '~/models/chess/Cell';
import Board from '~/models/chess/Board';
import { plainToClass } from 'class-transformer';
import type Move from '~/types/chess/Move';
import figures from '~/models/chess/figures';
import type { FigureName } from '~/types/chess/FigureName';
import { type Player } from '~/models/chess/room/ChessRoom';
import { GameOverType } from '~/types/chess/Game';
import type ChessRoom from '~/models/chess/room/ChessRoom';

type PlainObjectBoard = { cells: { [key: string]: Array<object> }; moves: Array<object> };
type PlainObjectFigure = { name: FigureName };
type PlainObjectCell = { figure: object | null };
export function getGameOverInfo(board: Board, gameId: string, players: [Player, Player]) {
  const info = board.isGameOver();
  if (!info) return;
  const isCheckmate = info.type === GameOverType.CHECKMATE;
  const { side, type } = info;
  const winner = isCheckmate ? players.find((p) => p?.side !== side) : undefined;
  return {
    winner,
    gameId,
    type,
    players
  };
}
export function getFigureInstance(plainObject: PlainObjectFigure): Figure {
  const FigureConstructor = figures[plainObject.name];
  return plainToClass(FigureConstructor, plainObject);
}
export function getCellInstance(plainObject: PlainObjectCell): Cell {
  plainObject.figure = plainObject.figure ? getFigureInstance({ ...plainObject.figure } as PlainObjectFigure) : null;
  return plainToClass(Cell, plainObject);
}
export function getBoardInstance(plainObject: PlainObjectBoard): Board {
  const board = new Board();
  Object.keys(plainObject.cells).forEach((column) => {
    board.cells[column] = plainObject.cells[column].map((cell) => getCellInstance({ ...cell } as PlainObjectCell));
  });
  board.moves = plainObject.moves as Move[];
  return board;
}
export function getRoomInstance(plainObject: ChessRoom) {
  const board = getBoardInstance(plainObject.board as PlainObjectBoard);
  plainObject.board = board;
  return plainObject;
}
