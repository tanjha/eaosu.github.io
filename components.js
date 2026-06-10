class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="wrap nav">
                <a class="brand" href="index.html">
                    <img class="brand-mark" src="EAOSULOGO.png" alt="Esports at Oregon State University logo">
                    <span class="brand-name">Esports<small>at Oregon State</small></span>
                </a>
                <nav class="menu" aria-label="Main">
                    <a href="index.html">Home</a>
                    <a href="about.html">About</a>
                    <a href="events.html">Events</a>
                    <a href="teams.html">Teams</a>
                </nav>
                </div>
            </header>
        `;

        // Highlight the current page in the nav
        const current = location.pathname.split('/').pop() || 'index.html';
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
                    <a class="brand" href="index.html">
                    <img class="brand-mark" src="EAOSULOGO.png" alt="Esports at Oregon State University logo">
                    <span class="brand-name">Esports<small>at Oregon State</small></span>
                    </a>
                    <small>A registered student organization at Oregon State University.<br>Corvallis, Oregon · Go Beavs.</small>
                </div>
                <div class="foot-links">
                    <a href="index.html">Home</a>
                    <a href="about.html">About</a>
                    <a href="events.html">Events</a>
                    <a href="teams.html">Teams</a>
                    <a href="https://discord.com/invite/2e487waHAx" onclick="">Discord</a>
                    <a href="https://www.twitch.tv/esportsatosu" onclick="return false">Twitch</a>
                </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('main-header', MyHeader);
customElements.define('main-footer', MyFooter);
