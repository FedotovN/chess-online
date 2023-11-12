import { type FigureName } from "./FigureName"
import { type Position } from "./Position";
import { type Player } from "~/models/chess/room/ChessRoom";
export default interface Move {
    figure: FigureName,
    player: Player,
    from: Position,
    to: Position,
}