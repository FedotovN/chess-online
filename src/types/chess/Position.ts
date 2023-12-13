export const Dimension = [0, 1, 2, 3, 4, 5, 6, 7] as const;
export const Horizontal = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;

type Row = typeof Dimension[number];
export type Horizontal = typeof Horizontal[number];
export type Vertical = Row;
export type PositionName = `${Horizontal}${Vertical}`;
export type Position = { x: Row, y: Row };
export const getHorizontalNameByIndex = (x: Row) => { return Horizontal[x] };
export const getPositionNameByPosition = (p: Position): PositionName => { return `${getHorizontalNameByIndex(p.x)}${(p.y + 1 as Row)}` };