import Figure from "~/models/chess/figures/Figure"
import { type Position } from "./Position"
import { type Side } from "./Side"
export default interface Cell {
    side: Side,
    figure: Figure | null,
    position: Position
}