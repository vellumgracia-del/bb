<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LibrAspire - Find and Borrow Books Easily</title>
  <link rel="stylesheet" href="{{ asset('css/style.css') }}">
  <style>
    .greeting-bar {
      background: linear-gradient(90deg, #1a4fa0 0%, #2563eb 100%);
      color: #ffffff;
      padding: 10px 15px;
      border-radius: 10px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
    }

    .greeting-bar a {
      color: #bfdbfe;
      font-size: 0.85em;
      text-decoration: underline;
      cursor: pointer;
    }

    /* Category Filter Buttons */
    .category-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 15px 0;
    }

    .cat-btn {
      background-color: #e8f0fe;
      color: #1a4fa0;
      border: 2px solid #2563eb;
      border-radius: 20px;
      padding: 6px 16px;
      cursor: pointer;
      font-size: 0.85em;
      font-weight: bold;
      transition: all 0.2s ease;
    }

    .cat-btn:hover,
    .cat-btn.active {
      background-color: #2563eb;
      color: #ffffff;
    }

    /* Book Grid */
    .book-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 14px;
      margin-top: 15px;
    }

    .book-card {
      background-color: #f0f7ff;
      border: 2px solid #bfdbfe;
      border-radius: 15px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .book-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(37, 99, 235, 0.2);
    }

    .book-card.hidden {
      display: none;
    }

    .book-cover {
      width: 90px;
      height: 130px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 8px;
      background-color: #bfdbfe44;
    }

    .book-cover-placeholder {
      width: 90px;
      height: 130px;
      border-radius: 6px;
      background-color: #2563eb;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      font-size: 2em;
    }

    .book-card h3 {
      margin: 4px 0 2px;
      font-size: 0.82em;
      color: #1a2a4a;
      text-align: center;
      line-height: 1.3;
    }

    .book-card p {
      margin: 2px 0;
      font-size: 0.76em;
      text-align: center;
      color: #3b5998;
    }

    .badge {
      display: inline-block;
      padding: 3px 8px;
      border-radius: 8px;
      font-size: 0.76em;
      font-weight: bold;
      margin-top: 5px;
    }

    .badge.available {
      background-color: #16a34a;
      color: #ffffff;
    }

    .badge.borrowed {
      background-color: #dc2626;
      color: #ffffff;
    }

    .category-chip {
      display: inline-block;
      background: #dbeafe;
      border: 1px solid #93c5fd;
      color: #1a4fa0;
      border-radius: 6px;
      padding: 1px 6px;
      font-size: 0.73em;
      margin-bottom: 4px;
    }

    .book-link {
      display: inline-block;
      margin-top: 6px;
      font-size: 0.73em;
      color: #2563eb;
      text-decoration: none;
      border: 1px solid #2563eb;
      border-radius: 8px;
      padding: 2px 8px;
      transition: background 0.2s;
    }

    .book-link:hover {
      background-color: #2563eb;
      color: #ffffff;
    }

    .no-results {
      display: none;
      text-align: center;
      padding: 20px;
      font-style: italic;
      color: #2563eb;
    }
  </style>
</head>

<body>

  <div class="container">
    <h1>LibrAspire</h1>

    <a href="#" class="menu">Home</a>
    <a href="#" class="menu">Catalog</a>
    <a href="#" class="menu">Contact</a>

    <br><br>

    <div class="greeting-bar">
      <span>👋 Halo, <strong>{{ session('name') }}</strong>! Selamat datang di LibrAspire.</span>
      <a href="{{ url('/logout') }}">Ganti Nama</a>
    </div>

    <p><strong>Temukan</strong> dan <em>pinjam</em> buku dengan mudah.<br>Lebih dari {{ $books->count() }} buku tersedia
      di koleksi kami.</p>

    <hr>

    <center>
      <h2>Find and Borrow Books Easily</h2>
      <img
        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        class="gambar-utama" alt="Library">
    </center>

    <br>

    <h2> Koleksi Buku</h2>

    {{-- Category Filter Buttons --}}
    @php
      $categories = $books->pluck('category')->unique()->filter()->values();
    @endphp
    <div class="category-filter">
      <button class="cat-btn active" data-cat="all" onclick="filterCategory(this, 'all')">Semua</button>
      @foreach($categories as $cat)
        <button class="cat-btn" data-cat="{{ $cat }}" onclick="filterCategory(this, '{{ $cat }}')">{{ $cat }}</button>
      @endforeach
    </div>

    <div class="book-grid" id="bookGrid">
      @foreach ($books as $book)
        <div class="book-card" data-cat="{{ $book->category ?? '' }}" data-title="{{ $book->title }}"
          data-author="{{ $book->author }}" id="book-{{ $book->id }}">
          <img src="https://via.placeholder.com/90x130/74503D/BD9A73?text=" class="book-cover" alt="{{ $book->title }}"
            id="cover-{{ $book->id }}">
          <span class="category-chip">{{ $book->category ?? 'Umum' }}</span>
          <h3>{{ $book->title }}</h3>
          <p> {{ $book->author }}</p>
          <span class="badge {{ strtolower($book->status) === 'available' ? 'available' : 'borrowed' }}">
            {{ $book->status }}
          </span>
          <a href="#" class="book-link" id="link-{{ $book->id }}" target="_blank">🔎 Lihat Buku</a>
        </div>
      @endforeach
    </div>
    <p class="no-results" id="noResults">Tidak ada buku dalam kategori ini.</p>

    <br>

    <div class="bawah">
      <div class="kotak">
        <h2>Popular Books</h2>
        @php $popular = $books->where('status', 'Available')->first(); @endphp
        @if($popular)
          <h3>{{ $popular->title }}</h3>
          <p>Status: <span class="status">{{ $popular->status }}</span></p>
        @else
          <p>Semua buku sedang dipinjam!</p>
        @endif
      </div>

      <div class="kotak">
        <h2>Book Categories</h2>
        <ul>
          @foreach($categories as $cat)
            <li>
              <a href="javascript:void(0)" onclick="scrollToFilter('{{ $cat }}')"
                style="color: #1a4fa0; font-weight: bold; text-decoration: none;">
                {{ $cat }}
              </a>
            </li>
          @endforeach
        </ul>
      </div>
    </div>

  </div>

  <script src="{{ asset('js/script.js') }}"></script>
  <script>
    // === Category Filter ===
    function filterCategory(btn, cat) {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cards = document.querySelectorAll('.book-card');
      let visible = 0;
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.cat === cat) {
          card.classList.remove('hidden');
          visible++;
        } else {
          card.classList.add('hidden');
        }
      });
      document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
    }

    function scrollToFilter(cat) {
      const btn = document.querySelector(`.cat-btn[data-cat="${cat}"]`);
      if (btn) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        filterCategory(btn, cat);
      }
    }

    // === Google Books API: Fetch cover + link ===
    async function fetchBookData(bookId, title, author) {
      const query = encodeURIComponent(`${title} ${author}`);
      const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const item = data.items[0];
          const info = item.volumeInfo;

          // Cover Image
          const coverEl = document.getElementById(`cover-${bookId}`);
          if (info.imageLinks) {
            const coverUrl = (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)
              .replace('http://', 'https://');
            coverEl.src = coverUrl;
            coverEl.onerror = () => { coverEl.src = 'https://via.placeholder.com/90x130/74503D/BD9A73?text=📖'; };
          }

          // Update title to match Google Books if available
          const titleEl = document.querySelector(`#book-${bookId} h3`);
          if (titleEl && info.title) {
            titleEl.textContent = info.title;
          }

          // Link
          const linkEl = document.getElementById(`link-${bookId}`);
          const linkUrl = info.infoLink || item.selfLink;
          if (linkUrl) {
            linkEl.href = linkUrl;
            linkEl.textContent = '🔎 Lihat Buku';
          }
        }
      } catch (e) {
        console.warn('Gagal fetch buku:', title, e);
      }
    }

    // Load covers for all books
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.book-card').forEach(card => {
        const id = card.id.replace('book-', '');
        const title = card.dataset.title;
        const author = card.dataset.author;
        fetchBookData(id, title, author);
      });
    });
  </script>
</body>

</html>