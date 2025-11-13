class ThemeToggle extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-block; }
        button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.35rem;
          border-radius: 0.5rem;
          transition: transform 160ms ease, background-color 220ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
          color: inherit;
        }
        button:hover { transform: translateY(-2px) scale(1.02); }
        button.pulse { animation: pulse 260ms ease; }
        @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(0.92); } 100% { transform: scale(1); } }

        .icon { width: 1.3rem; height: 1.3rem; display: inline-block; }
        .spin { transform: rotate(360deg); transition: transform 420ms cubic-bezier(.22,.9,.2,1); }
      </style>
      <button id="toggle" aria-label="Toggle dark mode" title="Toggle dark mode" aria-pressed="false">
        <i class="icon" data-feather="moon"></i>
      </button>
    `;

    this.btn = this.shadowRoot.getElementById('toggle');
    this.btn.addEventListener('click', () => this.toggleTheme());

    // Reflect current theme state
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    this.btn.setAttribute('aria-pressed', String(isDark));

    // Render correct icon and initialize feather icons inside shadow root
    this.updateIcon();
  }

  updateIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const iconEl = this.shadowRoot.querySelector('[data-feather]');
    if (!iconEl) return;
    iconEl.setAttribute('data-feather', isDark ? 'sun' : 'moon');

    if (typeof feather !== 'undefined') {
      setTimeout(() => {
        try { feather.replace({ 'stroke-width': 2 }); } catch (e) { /* ignore */ }
        const svg = this.shadowRoot.querySelector('svg');
        if (svg) {
          svg.classList.remove('spin');
          // restart animation
          // eslint-disable-next-line no-unused-expressions
          svg.offsetWidth;
          svg.classList.add('spin');
          setTimeout(() => svg.classList.remove('spin'), 480);
        }
      }, 10);
    }
  }

  toggleTheme() {
    const html = document.documentElement;
    const isNowDark = !html.classList.contains('dark');
    html.classList.toggle('dark', isNowDark);
    localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
    this.btn.setAttribute('aria-pressed', String(isNowDark));

    this.btn.classList.add('pulse');
    setTimeout(() => this.btn.classList.remove('pulse'), 300);

    this.updateIcon();
  }
}

customElements.define('theme-toggle', ThemeToggle);
