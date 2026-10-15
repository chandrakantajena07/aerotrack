import type { Aircraft } from '../data/types'

function fmtAltitude(alt: Aircraft['altitudeFt']): string {
  if (alt === 'ground') return 'On ground'
  return `${alt.toLocaleString()} ft`
}

export class DetailPanel {
  private el: HTMLElement

  constructor(container: HTMLElement) {
    this.el = document.createElement('div')
    this.el.className = 'detail-panel hidden'
    container.appendChild(this.el)
    this.el.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).dataset.close !== undefined) this.hide()
    })
  }

  show(a: Aircraft): void {
    this.el.classList.remove('hidden')
    this.el.innerHTML = `
      <button class="detail-close" data-close>&times;</button>
      <h2>${escapeHtml(a.callsign)}</h2>
      <div class="detail-sub">${escapeHtml(a.type ?? 'Unknown type')} &middot; ${escapeHtml(a.registration ?? a.icao.toUpperCase())}</div>
      <dl>
        <dt>Altitude</dt><dd>${fmtAltitude(a.altitudeFt)}</dd>
        <dt>Ground speed</dt><dd>${a.speedKt !== null ? `${Math.round(a.speedKt)} kt` : 'n/a'}</dd>
        <dt>Heading</dt><dd>${Math.round(a.headingDeg)}&deg;</dd>
        <dt>Squawk</dt><dd>${escapeHtml(a.squawk ?? 'n/a')}</dd>
        <dt>ICAO24</dt><dd>${escapeHtml(a.icao.toUpperCase())}</dd>
      </dl>
    `
  }

  hide(): void {
    this.el.classList.add('hidden')
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}
