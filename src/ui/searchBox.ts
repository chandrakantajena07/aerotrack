export class SearchBox {
  private input: HTMLInputElement
  private statusEl: HTMLElement

  constructor(container: HTMLElement, onSearch: (callsign: string) => boolean) {
    const wrap = document.createElement('div')
    wrap.className = 'search-box'
    wrap.innerHTML = `
      <input type="text" placeholder="Find callsign (e.g. EZY83YQ)" data-input autocomplete="off" spellcheck="false" />
      <span class="search-status" data-status></span>
    `
    container.appendChild(wrap)
    this.input = wrap.querySelector('[data-input]')!
    this.statusEl = wrap.querySelector('[data-status]')!

    this.input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return
      const found = onSearch(this.input.value)
      this.statusEl.textContent = this.input.value.trim()
        ? found
          ? ''
          : 'not in view'
        : ''
    })
  }
}
