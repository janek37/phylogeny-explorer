import Coords from "./Coords";

export function line(start: Coords, end: Coords, key?: string) {
  return <line key={key} x1={start.x} y1={start.y} x2={end.x} y2={end.y} stroke='black' strokeWidth={2} />
}

export function path(start: Coords, elements: string[]) {
  return <path d={`M ${start.x} ${start.y} ${elements.join(' ')}`} stroke='black' strokeWidth={2} fill='none'/>;
}

export function lineTo(to: Coords): string {
  return `L ${to.x} ${to.y}`;
}

export function arcTo(to: Coords, radius: number, largeArc: boolean): string {
  return `A ${radius} ${radius} 0 ${Number(largeArc)},1 ${to.x} ${to.y}`;
}
