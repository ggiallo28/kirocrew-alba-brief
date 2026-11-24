// Percorsi liberi per la gallina: una griglia di celle in cui i blocchi della pagina sono ostacoli.
export type Rect = { l: number; t: number; r: number; b: number }
export type Grid = { cols: number; rows: number; cell: number; free: Uint8Array }

// Una cella è libera se un ingombro di `size` px centrato sulla cella non tocca nessun ostacolo
// (ingrandito di `gap`) e sta dentro il riquadro.
export function buildGrid(W: number, H: number, obstacles: Rect[], cell: number, size: number, gap: number): Grid {
  const cols = Math.max(1, Math.floor(W / cell))
  const rows = Math.max(1, Math.floor(H / cell))
  const free = new Uint8Array(cols * rows).fill(1)
  const half = size / 2 + gap
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cx = x * cell + cell / 2
      const cy = y * cell + cell / 2
      if (cx - size / 2 < 0 || cy - size / 2 < 0 || cx + size / 2 > W || cy + size / 2 > H) { free[y * cols + x] = 0; continue }
      for (const o of obstacles) {
        if (cx > o.l - half && cx < o.r + half && cy > o.t - half && cy < o.b + half) { free[y * cols + x] = 0; break }
      }
    }
  }
  return { cols, rows, cell, free }
}

const idx = (g: Grid, x: number, y: number) => y * g.cols + x
export const cellOf = (g: Grid, px: number, py: number): [number, number] => [
  Math.max(0, Math.min(g.cols - 1, Math.floor(px / g.cell))),
  Math.max(0, Math.min(g.rows - 1, Math.floor(py / g.cell))),
]
export const centerOf = (g: Grid, c: [number, number]): [number, number] => [c[0] * g.cell + g.cell / 2, c[1] * g.cell + g.cell / 2]

// Cella libera più vicina (ricerca ad anelli): serve se la gallina si ritrova sopra un blocco.
export function nearestFree(g: Grid, c: [number, number]): [number, number] | null {
  if (g.free[idx(g, c[0], c[1])]) return c
  const maxR = Math.max(g.cols, g.rows)
  for (let r = 1; r < maxR; r++) {
    let best: [number, number] | null = null
    let bd = Infinity
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue
        const x = c[0] + dx, y = c[1] + dy
        if (x < 0 || y < 0 || x >= g.cols || y >= g.rows || !g.free[idx(g, x, y)]) continue
        const d = dx * dx + dy * dy
        if (d < bd) { bd = d; best = [x, y] }
      }
    }
    if (best) return best
  }
  return null
}

const N8: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]

// Distanze (in passi) da `start` a tutte le celle raggiungibili, senza tagliare gli angoli dei blocchi.
export function flood(g: Grid, start: [number, number]) {
  const dist = new Int32Array(g.cols * g.rows).fill(-1)
  const prev = new Int32Array(g.cols * g.rows).fill(-1)
  const q: number[] = [idx(g, start[0], start[1])]
  dist[q[0]!] = 0
  for (let h = 0; h < q.length; h++) {
    const cur = q[h]!
    const cx = cur % g.cols, cy = (cur / g.cols) | 0
    for (const [dx, dy] of N8) {
      const x = cx + dx, y = cy + dy
      if (x < 0 || y < 0 || x >= g.cols || y >= g.rows) continue
      const n = idx(g, x, y)
      if (!g.free[n] || dist[n] !== -1) continue
      if (dx !== 0 && dy !== 0 && (!g.free[idx(g, cx + dx, cy)] || !g.free[idx(g, cx, cy + dy)])) continue
      dist[n] = dist[cur]! + 1
      prev[n] = cur
      q.push(n)
    }
  }
  return { dist, prev }
}

export function pathTo(g: Grid, prev: Int32Array, goal: [number, number]): [number, number][] {
  const out: [number, number][] = []
  let cur = idx(g, goal[0], goal[1])
  while (cur !== -1) { out.push([cur % g.cols, (cur / g.cols) | 0]); cur = prev[cur]! }
  return out.reverse()
}

// Linea di vista tra due punti (px): tutta libera?
function clear(g: Grid, a: [number, number], b: [number, number]): boolean {
  const A = centerOf(g, a), B = centerOf(g, b)
  const steps = Math.max(1, Math.ceil(Math.hypot(B[0] - A[0], B[1] - A[1]) / (g.cell / 2)))
  for (let i = 0; i <= steps; i++) {
    const x = A[0] + ((B[0] - A[0]) * i) / steps, y = A[1] + ((B[1] - A[1]) * i) / steps
    const c = cellOf(g, x, y)
    if (!g.free[idx(g, c[0], c[1])]) return false
  }
  return true
}

// Toglie i passi inutili: si cammina dritti finché la linea è libera.
export function simplify(g: Grid, path: [number, number][]): [number, number][] {
  if (path.length <= 2) return path
  const out: [number, number][] = [path[0]!]
  let anchor = 0
  for (let i = 2; i < path.length; i++) {
    if (!clear(g, path[anchor]!, path[i]!)) { out.push(path[i - 1]!); anchor = i - 1 }
  }
  out.push(path[path.length - 1]!)
  return out
}

// Sceglie una meta casuale raggiungibile e abbastanza lontana (e, se dato, non troppo lontana).
export function pickGoal(g: Grid, dist: Int32Array, rng: () => number, minSteps: number, maxSteps = Infinity): [number, number] | null {
  const cands: number[] = []
  for (let i = 0; i < dist.length; i++) if (dist[i]! >= minSteps && dist[i]! <= maxSteps) cands.push(i)
  if (!cands.length) return null
  const i = cands[Math.floor(rng() * cands.length)]!
  return [i % g.cols, (i / g.cols) | 0]
}
