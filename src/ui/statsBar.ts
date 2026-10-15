export class StatsBar {
  private countEl: HTMLElement
  private updatedEl: HTMLElement

  constructor(container: HTMLElement) {
    const bar = document.createElement('div')
    bar.className = 'stats-bar'
    bar.innerHTML = `
      <span class="brand">AEROTRACK</span>
      <span class="stat"><strong data-count>0</strong> aircraft in view</span>
      <span class="stat" data-updated>never updated</span>
    `
    container.appendChild(bar)
    this.countEl = bar.querySelector('[data-count]')!
    this.updatedEl = bar.querySelector('[data-updated]')!
  }

  update(count: number, at: Date): void {
    this.countEl.textContent = String(count)
    this.updatedEl.textContent = `updated ${at.toLocaleTimeString()}`
  }

  setError(message: string): void {
    this.updatedEl.textContent = message
  }
}
