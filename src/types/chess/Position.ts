type Row = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Horizontal = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
export type Vertical = Row;
export type PositionName = `${Horizontal}${Vertical}`;
export type Position = { x: Row, y: Row };
