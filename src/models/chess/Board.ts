import type ChessMove from "@/types/chess/Move";
import type Cell from "~/types/chess/Cell";
import type { Player } from "./room/ChessRoom";
import type { Position } from "~/types/chess/Position";

export default class Board {
    cells: Array<Array<Cell>> = [];
    moves: ChessMove[] = [];
    
    moveFigure(from: Position, to: Position, initiator: Player) {
        const target = this.cells[from.y][from.x].figure;
        if (!target) throw new Error(`No figure was found in coords x: ${from.x} y: ${from.y}`);
        this.cells[to.y][to.x].figure = target;
        this.cells[from.y][from.x].figure = null;
        this.moves.push({ figure: target.name, from, to, player: initiator });
    }
}
 