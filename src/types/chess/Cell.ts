import Figure from "~/models/chess/figures/Figure"
import { type Position } from "./Position"
import { type Color } from "./Color"
export default interface Cell {
    side: Color,
    figure: Figure | null,
    position: Position
}