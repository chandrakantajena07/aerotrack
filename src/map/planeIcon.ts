/** Draws a simple airplane glyph pointing north (0deg) onto a canvas and returns ImageData for maplibre's addImage. */
export function buildPlaneIcon(size: number, color: string): ImageData {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  const c = size / 2
  ctx.translate(c, c)
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(0, -c * 0.9)
  ctx.lineTo(c * 0.18, -c * 0.1)
  ctx.lineTo(c * 0.85, c * 0.25)
  ctx.lineTo(c * 0.85, c * 0.45)
  ctx.lineTo(c * 0.18, c * 0.2)
  ctx.lineTo(c * 0.18, c * 0.75)
  ctx.lineTo(c * 0.4, c * 0.95)
  ctx.lineTo(c * 0.4, c * 1.05)
  ctx.lineTo(0, c * 0.9)
  ctx.lineTo(-c * 0.4, c * 1.05)
  ctx.lineTo(-c * 0.4, c * 0.95)
  ctx.lineTo(-c * 0.18, c * 0.75)
  ctx.lineTo(-c * 0.18, c * 0.2)
  ctx.lineTo(-c * 0.85, c * 0.45)
  ctx.lineTo(-c * 0.85, c * 0.25)
  ctx.lineTo(-c * 0.18, -c * 0.1)
  ctx.closePath()
  ctx.fill()
  return ctx.getImageData(0, 0, size, size)
}
