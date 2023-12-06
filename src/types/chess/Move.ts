import type { Color } from "./Color";
import { type FigureName } from "./FigureName"
import { type Position } from "./Position";
export default interface Move {
    figure: FigureName,
    from: Position,
    to: Position,
    side: Color,
}