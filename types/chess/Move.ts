import { type FigureName } from "./FigureName"
import { type Position, type Side } from ".";
export default interface Move {
    figure: FigureName,
    side: Side,
    from: Position,
    to: Position,
}