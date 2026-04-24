// ── Hamburger menu ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });
}

// ── FAQ Accordion ────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        // Close all
        document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));

        // Toggle current
        if (!isOpen) item.classList.add('open');
    });
});

// ── Command Search & Filter ──────────────────────────
const cmdSearch  = document.getElementById('cmdSearch');
const filterBtns = document.querySelectorAll('.filter-btn');
const cmdTable   = document.getElementById('cmdTable');
const noResults  = document.getElementById('noResults');

let activeCategory = 'all';

function filterCommands() {
    if (!cmdTable) return;
    const query = cmdSearch ? cmdSearch.value.toLowerCase() : '';
    const rows  = cmdTable.querySelectorAll('tbody tr');
    let visible = 0;

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const cat  = row.getAttribute('data-cat');
        const matchSearch = text.includes(query);
        const matchCat    = activeCategory === 'all' || cat === activeCategory;
        const show        = matchSearch && matchCat;

        row.style.display = show ? '' : 'none';
        if (show) visible++;
    });

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
}

if (cmdSearch) cmdSearch.addEventListener('input', filterCommands);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-cat');
        filterCommands();
    });
});

// ── Uptime Bars (Status page) ────────────────────────
const uptime = document.getElementById('uptimeBars');
if (uptime) {
    for (let i = 0; i < 90; i++) {
        const bar = document.createElement('div');
        bar.className = 'uptime-bar';
        // Simulate mostly-up with occasional degraded
        const r = Math.random();
        if (r > 0.97)       bar.classList.add('warn');
        else if (r > 0.995) bar.classList.add('down');
        else                bar.classList.add('up');
        bar.title = `Day ${90 - i}: ${bar.classList.contains('up') ? 'Operational' : bar.classList.contains('warn') ? 'Degraded' : 'Outage'}`;
        uptime.appendChild(bar);
    }
}

// ── Smooth active link highlight ─────────────────────
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});