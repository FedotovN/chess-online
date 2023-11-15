import Figure from "~/models/chess/figures/Figure"
import { type Position } from "./Position"
import { type Color } from "./Color"
export default class Cell {
    side: Color = 'black'
    figure: Figure | null = null
    position: Position = {x: 0, y: 0}
}