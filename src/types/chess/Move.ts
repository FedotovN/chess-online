import type Figure from '~/models/chess/figures/Figure';
import type { Color } from './Color';
import { type Position } from './Position';
export default interface Move {
  figure: Figure;
  from: Position;
  to: Position;
  side: Color;
  takes?: Figure | null;
  isCastle?: boolean;
  isPromote?: boolean;
}
