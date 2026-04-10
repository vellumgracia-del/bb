// ── LibrAspire · script.js ──────────────────────────────────────────────────
// Menggunakan Open Library Search API (gratis, no API key)
// Docs: https://openlibrary.org/developers/api

const COVER_BASE  = 'https://covers.openlibrary.org/b/id/';
const BOOK_BASE   = 'https://openlibrary.org';
const READ_BASE   = 'https://archive.org/details/';

// Subjek default saat halaman pertama dibuka
const DEFAULT_SUBJECT = 'fiction';

// Label cantik untuk setiap subjek
const SUBJECT_LABELS = {
  all:         'Semua Koleksi',
  fiction:     'Fiction',
  science:     'Science',
  history:     'History',
  technology:  'Technology',
  philosophy:  'Philosophy',
  biography:   'Biography',
  children:    'Children'
};

let currentSubject = DEFAULT_SUBJECT;
let allBooks = [];

// ── Fetch buku dari Open Library Subjects API ────────────────────────────────
async function fetchBooks(subject) {
  const loadingBar = document.getElementById('loadingBar');
  const errorMsg   = document.getElementById('errorMsg');
  const bookGrid   = document.getElementById('bookGrid');
  const noResults  = document.getElementById('noResults');

  loadingBar.style.display = 'flex';
  errorMsg.style.display   = 'none';
  noResults.style.display  = 'none';
  bookGrid.innerHTML       = '';

  try {
    const url = subject === 'all'
      ? `${BOOK_BASE}/search.json?q=classic+books&limit=24&fields=key,title,author_name,cover_i,subject,ia`
      : `${BOOK_BASE}/subjects/${encodeURIComponent(subject)}.json?limit=24`;

    const res  = await fetch(url);
    if (!res.ok) throw new Error('Network response not ok');
    const data = await res.json();

    // Subjects API returns { works: [...] }, Search API returns { docs: [...] }
    allBooks = data.works
      ? data.works.map(w => ({
          key:       w.key,
          title:     w.title,
          authors:   w.authors ? w.authors.map(a => a.name).join(', ') : 'Unknown',
          cover_id:  w.cover_id || w.cover_edition_key || null,
          ia:        w.ia || null,
          subject:   subject
        }))
      : data.docs.map(d => ({
          key:       d.key,
          title:     d.title,
          authors:   d.author_name ? d.author_name.join(', ') : 'Unknown',
          cover_id:  d.cover_i || null,
          ia:        d.ia ? d.ia[0] : null,
          subject:   subject
        }));

    renderBooks(allBooks);
  } catch (err) {
    console.error('Fetch error:', err);
    errorMsg.style.display = 'block';
  } finally {
    loadingBar.style.display = 'none';
  }
}

// ── Render book cards ────────────────────────────────────────────────────────
function renderBooks(books) {
  const bookGrid  = document.getElementById('bookGrid');
  const noResults = document.getElementById('noResults');

  bookGrid.innerHTML = '';

  if (!books || books.length === 0) {
    noResults.style.display = 'block';
    return;
  }

  books.forEach(book => {
    const card     = document.createElement('div');
    card.className = 'book-card';

    // Cover
    let coverHtml;
    if (book.cover_id) {
      coverHtml = `<img
        src="${COVER_BASE}${book.cover_id}-M.jpg"
        class="book-cover"
        alt="${escHtml(book.title)}"
        loading="lazy"
        onerror="this.parentElement.replaceChild(fallbackCover(), this)">`;
    } else {
      coverHtml = `<div class="book-cover-placeholder">📖</div>`;
    }

    // Baca / Preview link
    let readHtml = '';
    if (book.ia) {
      readHtml = `<a href="${READ_BASE}${book.ia}" target="_blank" rel="noopener" class="read-btn" id="read-${safeId(book.key)}">📖 Baca Sekarang</a>`;
    } else {
      const olUrl = `${BOOK_BASE}${book.key}`;
      readHtml = `<a href="${olUrl}" target="_blank" rel="noopener" class="read-btn preview" id="read-${safeId(book.key)}">🔎 Lihat Detail</a>`;
    }

    // Category chip
    const chipLabel = SUBJECT_LABELS[book.subject] || book.subject;

    card.innerHTML = `
      ${coverHtml}
      <span class="book-category-chip">${escHtml(chipLabel)}</span>
      <h3>${escHtml(book.title)}</h3>
      <p class="book-author">${escHtml(book.authors)}</p>
      ${readHtml}
    `;

    // Click card juga buka link
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        const link = card.querySelector('a.read-btn');
        if (link) link.click();
      }
    });

    bookGrid.appendChild(card);
  });
}

// ── Fallback cover element ───────────────────────────────────────────────────
function fallbackCover() {
  const el = document.createElement('div');
  el.className = 'book-cover-placeholder';
  el.textContent = '📖';
  return el;
}

// ── Category filter click handler ─────────────────────────────────────────────
function initCategoryFilter() {
  const buttons = document.querySelectorAll('.cat-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const subject = btn.dataset.subject;
      currentSubject = subject;

      // Update section title
      document.getElementById('sectionTitle').textContent =
        '📖 ' + (SUBJECT_LABELS[subject] || subject);

      fetchBooks(subject);
    });
  });
}

// ── Smooth scroll catalog ─────────────────────────────────────────────────────
function initMenuLinks() {
  const menuItems = document.querySelectorAll('.menu');
  menuItems.forEach(item => {
    item.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ── Utilities ────────────────────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
function safeId(str) {
  return String(str).replace(/[^a-zA-Z0-9]/g, '_');
}

// ── Hamburger menu (mobile) ──────────────────────────────────────────────────
function initHamburger() {
  const btn  = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  });
}

// ── Init ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initHamburger();
  initCategoryFilter();
  initMenuLinks();

  // Set active button sesuai default
  const defaultBtn = document.querySelector(`[data-subject="${DEFAULT_SUBJECT}"]`);
  if (defaultBtn) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    defaultBtn.classList.add('active');
  }

  fetchBooks(DEFAULT_SUBJECT);
});
