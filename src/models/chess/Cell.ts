import Figure from "~/models/chess/figures/Figure";
import { type Position } from "../../types/chess/Position";
import { type Color } from "../../types/chess/Color";
import type Board from "./Board";
export default class Cell {
  constructor(
    public side: Color,
    public figure: Figure | null,
    public position: Position
  ) {}
  comparePosition(compare: Position) {
    const sameX = this.position.x == compare.x;
    const sameY = this.position.y == compare.y;
    return sameX && sameY;
  }
  isEmpty() {
    return !this.figure;
  }
  static isAttacked(
    on: Board,
    position: Position,
    attacker: Color
  ): Figure | false {
    const cell = on.getCell(position);
    const enemies = on.getSideFigures(attacker);
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];
      if (enemy.canAttackTo(on, cell)) {
        return enemy;
      }
    }
    return false;
  }
  static isEmptyVertical(on: Board, from: Position, to: Position) {
    if (from.x !== to.x) return false;
    const min = Math.min(from.y, to.y);
    const max = Math.max(from.y, to.y);
    for (let y = min + 1; y < max; y++) {
      if (!on.cells[from.x][y].isEmpty()) return false;
    }
    return true;
  }
  static isEmptyHorizontal(on: Board, from: Position, to: Position) {
    if (from.y !== to.y) return false;
    const min = Math.min(from.x, to.x);
    const max = Math.max(from.x, to.x);
    for (let x = min + 1; x < max; x++) {
      if (!on.cells[x][from.y].isEmpty()) return false;
    }
    return true;
  }
  static isEmptyDiagonal(on: Board, from: Position, to: Position) {
    const absX = Math.abs(to.x - from.x);
    const absY = Math.abs(to.y - from.y);
    if (absY !== absX) return false;
    const path = Math.abs(to.y - from.y);
    const dx = from.x < to.x ? 1 : -1;
    const dy = from.y < to.y ? 1 : -1;
    for (let i = 1; i < path; i++) {
      const currPos = { x: from.x + dx * i, y: from.y + dy * i } as Position;
      if (!on.getCell(currPos).isEmpty()) return false;
    }
    return true;
  }
}
