import svgs from "~/assets/svg";
import type { Side } from "~/types/chess";
import type { FigureName } from "~/types/chess/FigureName";
export const getSvgSrcFromFigure = (side: Side, figure: FigureName) => {
    const uppercaseFirst = (string: string) => string[0].toUpperCase() + string.slice(1);
    const name = uppercaseFirst(side) + uppercaseFirst(figure) as keyof typeof svgs;
    return svgs[name];
}