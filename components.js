class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="wrap nav">
                <a class="brand" href="index.html">
                    <img class="brand-mark" src="/EAOSULOGO.png" alt="Esports at Oregon State University logo">
                    <span class="brand-name">Esports<small>at Oregon State</small></span>
                </a>
                <nav class="menu" aria-label="Main">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/schedule">Events</a>
                    <a href="/teams">Teams</a>
                </nav>
                </div>
            </header>
        `;

        // Highlight the current page in the nav
        let current = location.pathname;
        // Normalize: "/join/" and "/join" both match href="/join"
        if (current.endsWith('/') && current !== '/') current = current.slice(0, -1);
        if (current === '') current = '/';

        this.querySelectorAll('.menu a').forEach(a => {
            if (a.getAttribute('href') === current) a.classList.add('active');
        });
    }
}

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="wrap foot">
                <div>
                    <a class="brand" href="/index.html">
                    <img class="brand-mark" src="/EAOSULOGO.png" alt="Esports at Oregon State University logo">
                    <span class="brand-name">Esports<small>at Oregon State</small></span>
                    </a>
                    <small>A registered student organization at Oregon State University.<br>Corvallis, Oregon</small>
                </div>
                <div class="foot-links">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/schedule">Events</a>
                    <a href="/teams">Teams</a>
                    <a href="https://discord.com/invite/2e487waHAx" onclick="">Discord</a>
                    <a href="https://www.twitch.tv/esportsatosu" onclick="">Twitch</a>
                </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('main-header', MyHeader);
customElements.define('main-footer', MyFooter);
