import svgs from "~/assets/svg";
import { type Color as ChessColor } from "~/types/chess/Color";
import type { FigureName } from "~/types/chess/FigureName";
import type { Color } from "kneekeetah-vue-ui-kit/dist/src/types/colors";
export const uppercaseColor = (color: ChessColor) => color[0].toUpperCase() + color.slice(1)
export const getSvgSrcFromFigure = (side: ChessColor, figure: FigureName) => {
    const uppercaseFirst = (string: string) => string[0].toUpperCase() + string.slice(1);
    const name = uppercaseFirst(side) + uppercaseFirst(figure) as keyof typeof svgs;
    return svgs[name];
}
export function generateHashCode(str: string) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
}
export function hexToRGB(hex: string): Color {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}