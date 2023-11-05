import { type FigureName } from "./FigureName"
import { type Position } from "./Position";
import { type Side } from "./Side";
export default interface Move {
    figure: FigureName,
    side: Side,
    from: Position,
    to: Position,
}