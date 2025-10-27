/* =========================
  Aplikasi BelajarBareng V7
  Integrasi Gemini API
========================= */

// --- PENTING: KONFIGURASI GEMINI API ---
// Silakan masukkan Kunci API Gemini Anda di sini agar fitur AI berfungsi.
const GEMINI_API_KEY = ""; // <-- ISI KUNCI API ANDA DI SINI

// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = 'https://yrvpwsgusqfojattmlvp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlydnB3c2d1c3Fmb2phdHRtbHZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3MzY2MTksImV4cCI6MjAzNzMxMjYxOX0.IH1e-k-p7-eFfTf3_p18-pgqOFp-s-O3eIY-O1Ie-N0';
let supabase = null;

try {
  supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("Supabase client initialized.");
} catch(e) {
  console.error("Supabase client could not be initialized.", e);
}

// --- DATA TOPIK DAN SOAL ---
// Menambahkan 1 topik baru (Matematika: Bangun Datar)
// Menambahkan soal hingga total 50
const SUBJECTS_DATA = [
    {
      id: 'bio', 
      title: 'Biologi', 
      desc: 'Pelajari dasar-dasar kehidupan, dari sel hingga ekosistem.', 
      topics: [
        { id: 'sel', title: 'Struktur Sel', video: 'https://res.cloudinary.com/dgzufaone/video/upload/v1721663116/production_id_4763131_1080p_q77id2.mp4', questions: [
            { q: 'Apa fungsi utama mitokondria?', opts: ['Fotosintesis', 'Membuat protein', 'Respirasi sel (energi)', 'Menyimpan air'], a: 2 },
            { q: 'Bagian sel yang mengontrol semua aktivitas sel?', opts: ['Membran sel', 'Nukleus (Inti sel)', 'Sitoplasma', 'Ribosom'], a: 1 },
            { q: 'Manakah yang HANYA ditemukan di sel tumbuhan?', opts: ['Ribosom', 'Dinding sel', 'Mitokondria', 'Membran plasma'], a: 1 },
            { q: 'Tempat sintesis protein terjadi adalah...', opts: ['Lisosom', 'Ribosom', 'Badan Golgi', 'Vakuola'], a: 1 },
            { q: 'Organel yang berfungsi sebagai "pencernaan" sel?', opts: ['Lisosom', 'Nukleus', 'Retikulum Endoplasma', 'Dinding Sel'], a: 0 },
            { q: 'Lapisan terluar sel hewan adalah...', opts: ['Dinding Sel', 'Kutikula', 'Membran Plasma', 'Nukleolus'], a: 2 },
            { q: 'Cairan di dalam sel tempat organel melayang disebut?', opts: ['Sitoplasma', 'Vakuola', 'Kloroplas', 'Nukleoplasma'], a: 0 },
            { q: 'Organel tempat fotosintesis pada tumbuhan?', opts: ['Mitokondria', 'Kloroplas', 'Ribosom', 'Dinding Sel'], a: 1 },
            { q: 'Badan Golgi berfungsi untuk...', opts: ['Menghasilkan energi', 'Modifikasi & pengemasan protein', 'Membelah diri', 'Menyimpan materi genetik'], a: 1 },
            { q: 'Perbedaan utama sel prokariotik dan eukariotik?', opts: ['Ukuran sel', 'Kehadiran membran inti', 'Jumlah ribosom', 'Bentuk sel'], a: 1 }
        ]},
        { id: 'dna', title: 'Dasar DNA', video: 'https://res.cloudinary.com/dgzufaone/video/upload/v1721663116/production_id_4763131_1080p_q77id2.mp4', questions: [
            { q: 'Kepanjangan dari DNA?', opts: ['Deoxyribonucleic Acid', 'Deoxyribo Nucleic Acid', 'Asam Deoksiribonukleat', 'Semua benar'], a: 3 },
            { q: 'Bentuk struktur DNA yang terkenal?', opts: ['Heliks Tunggal', 'Bulat', 'Heliks Ganda (Double Helix)', 'Linear'], a: 2 },
            { q: 'Pasangan basa nitrogen yang benar dalam DNA?', opts: ['A-G dan C-T', 'A-U dan C-G', 'A-T dan C-G', 'A-C dan T-G'], a: 2 },
            { q: 'Basa nitrogen apa yang ada di RNA tapi TIDAK di DNA?', opts: ['Adenin', 'Timin', 'Guanin', 'Urasil'], a: 3 },
            { q: 'DNA membawa instruksi untuk membuat...', opts: ['Karbohidrat', 'Lipid', 'Vitamin', 'Protein'], a: 3 },
            { q: 'Gula yang ditemukan dalam DNA disebut?', opts: ['Ribosa', 'Deoksiribosa', 'Glukosa', 'Fruktosa'], a: 1 },
            { q: 'Proses penyalinan DNA menjadi RNA disebut?', opts: ['Transkripsi', 'Translasi', 'Replikasi', 'Mutasi'], a: 0 },
            { q: 'Proses penerjemahan RNA menjadi protein disebut?', opts: ['Transkripsi', 'Translasi', 'Replikasi', 'Duplikasi'], a: 1 },
            { q: 'Tiga basa berurutan pada mRNA yang mengkode satu asam amino disebut?', opts: ['Gen', 'Kodon', 'Antikodon', 'Nukleotida'], a: 1 },
            { q: 'Di mana lokasi DNA pada sel eukariotik?', opts: ['Di sitoplasma saja', 'Di dalam nukleus', 'Di ribosom', 'Di membran sel'], a: 1 }
        ]},
      ]
    },
    {
      id: 'eko', 
      title: 'Ekonomi', 
      desc: 'Pahami prinsip penawaran, permintaan, dan pasar.', 
      topics: [
        { id: 'supply-demand', title: 'Penawaran & Permintaan', video: 'https://res.cloudinary.com/dgzufaone/video/upload/v1721663116/production_id_4763131_1080p_q77id2.mp4', questions: [
            { q: 'Hukum permintaan menyatakan, jika harga naik, maka...', opts: ['Jumlah permintaan naik', 'Jumlah permintaan turun', 'Penawaran naik', 'Penawaran turun'], a: 1 },
            { q: 'Apa yang terjadi pada kurva penawaran jika biaya produksi turun?', opts: ['Bergeser ke kiri', 'Bergeser ke kanan', 'Tetap', 'Bergerak sepanjang kurva'], a: 1 },
            { q: 'Titik temu antara kurva permintaan dan penawaran disebut?', opts: ['Titik Impas', 'Harga Maksimum', 'Harga Eceran', 'Harga Ekuilibrium'], a: 3 },
            { q: 'Barang yang permintaannya naik saat pendapatan naik disebut?', opts: ['Barang Inferior', 'Barang Normal', 'Barang Mewah', 'Barang Publik'], a: 1 },
            { q: 'Jika harga barang A naik, dan permintaan barang B ikut naik, maka A dan B adalah barang...', opts: ['Substitusi', 'Komplementer', 'Inferior', 'Mewah'], a: 0 },
            { q: 'Contoh barang komplementer?', opts: ['Kopi dan Teh', 'Mobil dan Bensin', 'Nasi dan Jagung', 'Pulpen dan Pensil'], a: 1 },
            { q: 'Apa yang dimaksud dengan "ceteris paribus"?', opts: ['Semua variabel berubah', 'Pasar sedang lesu', 'Faktor-faktor lain dianggap tetap', 'Tidak ada permintaan'], a: 2 },
            { q: 'Jika permintaan meningkat (kurva geser ke kanan) sementara penawaran tetap, apa yang terjadi pada harga ekuilibrium?', opts: ['Harga naik', 'Harga turun', 'Harga tetap', 'Tidak bisa dipastikan'], a: 0 },
            { q: 'Kelangkaan (scarcity) terjadi karena...', opts: ['Kebutuhan terbatas, sumber daya tak terbatas', 'Kebutuhan tak terbatas, sumber daya terbatas', 'Harga terlalu mahal', 'Distribusi tidak merata'], a: 1 },
            { q: 'Pasar di mana hanya ada satu penjual disebut?', opts: ['Oligopoli', 'Monopoli', 'Pasar Sempurna', 'Monopsoni'], a: 1 }
        ]}
      ]
    },
    {
      id: 'mat', 
      title: 'Matematika', 
      desc: 'Asah logika dan kemampuan berhitung Anda.', 
      topics: [
        { id: 'aljabar', title: 'Dasar Aljabar', video: 'https://res.cloudinary.com/dgzufaone/video/upload/v1721663116/production_id_4763131_1080p_q77id2.mp4', questions: [
            { q: 'Jika 2x + 5 = 15, berapakah nilai x?', opts: ['10', '5', '7.5', '20'], a: 1 },
            { q: 'Hasil dari (x + 3)(x - 2) adalah...', opts: ['x² + x - 6', 'x² - x - 6', 'x² + 5x - 6', 'x² - 6'], a: 0 },
            { q: 'Apa itu variabel dalam aljabar?', opts: ['Angka yang tetap', 'Simbol yang mewakili nilai (cth: x)', 'Hasil perhitungan', 'Soal'], a: 1 },
            { q: 'Jika y = 3x - 1, dan x = 2, berapa nilai y?', opts: ['5', '6', '4', '7'], a: 0 },
            { q: 'Sederhanakan: 5a + 2b - 3a + b', opts: ['2a + 3b', '8a + 3b', '2a + 2b', '8a + 2b'], a: 0 },
            { q: 'Faktor dari x² - 9 adalah...', opts: ['(x-3)(x-3)', '(x+3)(x+3)', '(x+3)(x-3)', '(x-9)(x+1)'], a: 2 },
            { q: 'Jika 3(x + 2) = 15, maka x = ?', opts: ['1', '2', '3', '5'], a: 2 },
            { q: 'Dalam 5y + 7, angka 7 disebut?', opts: ['Variabel', 'Koefisien', 'Konstanta', 'Suku'], a: 2 },
            { q: 'Dalam 5y + 7, angka 5 disebut?', opts: ['Variabel', 'Koefisien', 'Konstanta', 'Suku'], a: 1 },
            { q: 'Bentuk sederhana dari 10x / 2x adalah?', opts: ['5x', '8', '5', 'x'], a: 2 }
        ]},
        { id: 'bangun-datar', title: 'Bangun Datar', video: 'https://res.cloudinary.com/dgzufaone/video/upload/v1721663116/production_id_4763131_1080p_q77id2.mp4', questions: [
            { q: 'Rumus luas persegi dengan sisi "s"?', opts: ['2s', '4s', 's x s', 's + s + s + s'], a: 2 },
            { q: 'Jika sebuah persegi panjang memiliki panjang 10 cm dan lebar 5 cm, berapa kelilingnya?', opts: ['15 cm', '30 cm', '50 cm', '25 cm'], a: 1 },
            { q: 'Rumus luas segitiga?', opts: ['panjang x lebar', 'alas x tinggi', '1/2 x alas x tinggi', 'sisi x sisi'], a: 2 },
            { q: 'Sebuah lingkaran memiliki jari-jari 7 cm. Berapa luasnya? (π = 22/7)', opts: ['44 cm²', '154 cm²', '49 cm²', '14 cm²'], a: 1 },
            { q: 'Rumus keliling lingkaran dengan diameter "d"?', opts: ['π x d', 'π x r²', '2 x π x d', 'd²'], a: 0 },
            { q: 'Bangun yang memiliki 4 sisi sama panjang dan 4 sudut siku-siku?', opts: ['Persegi', 'Persegi Panjang', 'Belah Ketupat', 'Jajar Genjang'], a: 0 },
            { q: 'Jumlah total sudut dalam sebuah segitiga adalah?', opts: ['90°', '360°', '100°', '180°'], a: 3 },
            { q: 'Jika sebuah segitiga siku-siku memiliki sisi tegak 3 cm dan 4 cm, berapa sisi miringnya (hipotenusa)?', opts: ['5 cm', '7 cm', '12 cm', '1 cm'], a: 0 },
            { q: 'Bangun datar yang HANYA memiliki sepasang sisi sejajar?', opts: ['Jajar Genjang', 'Belah Ketupat', 'Trapesium', 'Persegi'], a: 2 },
            { q: 'Sebuah persegi memiliki luas 64 cm². Berapa panjang sisinya?', opts: ['4 cm', '16 cm', '8 cm', '32 cm'], a: 2 }
        ]}
      ]
    }
];

// --- STATE APLIKASI ---
const appState = {
  subjects: SUBJECTS_DATA,
  currentPage: 'landingPage',
  currentSubject: null,
  currentTopic: null,
  sessionActive: false,
  timer: null,
  timerVal: 300,
  quizQueue: [],
  points: 0,
  completed: {},
  userName: '',
  currentRating: 0,
  lastAnsweredQuestion: null, // NEW: Menyimpan soal terakhir
};

function loadState(){
  const savedState = JSON.parse(localStorage.getItem('barbarState-v2'));
  if(savedState){
    appState.points = savedState.points || 0;
    appState.completed = savedState.completed || {};
    appState.userName = savedState.userName || '';
    appState.currentRating = savedState.currentRating || 0;
    
    if(appState.userName){
      ui.userNameDisplay.textContent = appState.userName;
      ui.welcomeUser.style.display = 'block';
    }
  }
}
function saveState(){
  localStorage.setItem('barbarState-v2', JSON.stringify({
    points: appState.points,
    completed: appState.completed,
    userName: appState.userName,
    currentRating: appState.currentRating,
  }));
}

// --- ELEMEN UI ---
let ui = {};
function initUI() {
  ui = {
    splashScreen: document.getElementById('splashScreen'),
    notification: document.getElementById('notification'),
    hamburgerBtn: document.getElementById('hamburgerBtn'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    navLinks: document.querySelectorAll('.nav-link'),
    pageContainer: document.getElementById('pageContainer'),
    
    // Halaman Landing
    landingPage: document.getElementById('landingPage'),
    userNameInput: document.getElementById('userNameInput'),
    startAppBtn: document.getElementById('startAppBtn'),
    welcomeUser: document.getElementById('welcomeUser'),
    userNameDisplay: document.getElementById('userNameDisplay'),
    
    // Halaman Seleksi
    subjectGrid: document.getElementById('subjectGrid'),
    topicGrid: document.getElementById('topicGrid'),
    
    // Halaman Sesi Belajar
    appPage: document.getElementById('appPage'),
    topicVideo: document.getElementById('topicVideo'),
    topicTitle: document.getElementById('topicTitle'),
    sessTimer: document.getElementById('sessTimer'),
    progBar: document.getElementById('progBar'),
    startSessionBtn: document.getElementById('startSessionBtn'),
    quizArea: document.getElementById('quizArea'),
    remainingQ: document.getElementById('remainingQ'),
    questionWrap: document.getElementById('questionWrap'),
    endSessionBtn: document.getElementById('endSessionBtn'),
    
    // Sidebar Kanan
    doneTopics: document.getElementById('doneTopics'),
    totalPoints: document.getElementById('totalPoints'),
    leaderboard: document.getElementById('leaderboard'),
    
    // Halaman AI Mentor
    aiMentorPage: document.getElementById('aiMentorPage'),
    mentorLog: document.getElementById('mentorLog'),
    mentorInput: document.getElementById('mentorInput'),
    sendMentorBtn: document.getElementById('sendMentor'),

    // Lain-lain
    completionOverlay: document.getElementById('completionOverlay'),
    
    // Halaman Feedback
    starRatingContainer: document.getElementById('starRating'),
    feedbackText: document.getElementById('feedbackText'),
    submitFeedbackBtn: document.getElementById('submitFeedback'),
    feedbackThanks: document.getElementById('feedbackThanks'),
    
    // Tombol Navigasi
    fiturTambahanBtn: document.getElementById('fiturTambahanBtn'),
    backToSubjectsBtn: document.getElementById('backToSubjectsBtn'),
    topicSelectionTitle: document.getElementById('topicSelectionTitle'),

    // Elemen baru untuk fitur Gemini
    getFunFactBtn: document.getElementById('getFunFactBtn'),
    funFactText: document.getElementById('funFactText'),
    explainAnswerBtn: document.getElementById('explainAnswerBtn'),
  };
}


// --- MANAJEMEN HALAMAN & NAVIGASI ---
function showPage(pageId, highlightNav = true) {
  document.querySelectorAll('.page.active').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
  appState.currentPage = pageId;

  if (highlightNav) {
    ui.navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.page === pageId);
    });
  }
}

function closeSidebar() {
  ui.sidebar.classList.remove('open');
  ui.sidebarOverlay.style.display = 'none';
}

function showNotification(message, duration = 2000) { // Durasi default 2 detik
    ui.notification.textContent = message;
    ui.notification.classList.add('show');
    
    setTimeout(() => {
        ui.notification.classList.remove('show');
    }, duration); 
}

// --- INISIALISASI APLIKASI ---
function init() {
  console.log("App init...");
  initUI();
  setupEventListeners();
  setupStarRating();
  
  loadState();
  updateStats();
  renderSubjects();
  renderLeaderboard();
  
  // Sembunyikan splash screen
  setTimeout(() => {
    if (ui.splashScreen) {
      ui.splashScreen.classList.add('hidden');
    }
  }, 1500); // 1.5 detik
  
  // Jika user sudah ada, langsung ke beranda
  if (appState.userName) {
    showPage('homePage');
  } else {
    showPage('landingPage', false);
  }
  
  updateStarVisuals(appState.currentRating);
}

// --- PEMBUATAN TAMPILAN (RENDER) ---
function renderSubjects() {
  ui.subjectGrid.innerHTML = '';
  appState.subjects.forEach(s => {
    const card = document.createElement('a');
    card.href = '#';
    card.className = 'selection-card';
    card.innerHTML = `<h4>${s.title}</h4><p>${s.desc}</p>`;
    card.onclick = (e) => {
      e.preventDefault();
      selectSubject(s.id);
    };
    ui.subjectGrid.appendChild(card);
  });
}

function renderTopics(subjectId) {
  const subject = appState.subjects.find(s => s.id === subjectId);
  if (!subject) return;
  
  ui.topicGrid.innerHTML = '';
  ui.topicSelectionTitle.textContent = `Topik: ${subject.title}`;
  
  subject.topics.forEach(t => {
    const card = document.createElement('a');
    card.href = '#';
    card.className = 'selection-card';
    const isDone = appState.completed[t.id];
    card.innerHTML = `
      <h4>${isDone ? '✅ ' : ''}${t.title}</h4>
      <p>${t.questions.length} soal kuis</p>
    `;
    card.onclick = (e) => {
      e.preventDefault();
      selectTopic(subject.id, t.id);
    };
    ui.topicGrid.appendChild(card);
  });
}

function updateStats() {
  ui.doneTopics.textContent = Object.keys(appState.completed).length;
  ui.totalPoints.textContent = appState.points;
}

// --- LOGIKA PEMILIHAN ---
function selectSubject(subjectId) {
  appState.currentSubject = subjectId;
  renderTopics(subjectId);
  showPage('topicSelectionPage', false);
}

function selectTopic(subjectId, topicId) {
  appState.currentSubject = subjectId;
  const subject = appState.subjects.find(s => s.id === subjectId);
  appState.currentTopic = subject.topics.find(t => t.id === topicId);
  
  ui.topicTitle.textContent = appState.currentTopic.title;
  ui.topicVideo.querySelector('source').src = appState.currentTopic.video;
  ui.topicVideo.load();
  
  // Reset UI Sesi
  ui.quizArea.style.display = 'none';
  ui.startSessionBtn.style.display = 'block';
  ui.endSessionBtn.style.display = 'none';
  ui.progBar.style.width = '0%';
  ui.sessTimer.textContent = '05:00';
  
  showPage('appPage', false);
}

const currentTopic = () => appState.currentTopic;

// --- LOGIKA SESI BELAJAR & KUIS ---
function startSession() {
  if (appState.sessionActive) return;
  
  appState.sessionActive = true;
  appState.timerVal = 300; // 5 menit
  ui.sessTimer.textContent = '05:00';
  ui.quizArea.style.display = 'block';
  ui.startSessionBtn.style.display = 'none';
  ui.endSessionBtn.style.display = 'block';
  
  appState.timer = setInterval(runTimer, 1000);
  
  // Acak dan siapkan kuis
  const t = currentTopic();
  appState.quizQueue = shuffleArray(t.questions.map(q=> ({...q, attempts:0}) ));
  renderQuiz();
  updateProgBar();
  updateStats();
}

function runTimer() {
  appState.timerVal--;
  const mins = Math.floor(appState.timerVal / 60).toString().padStart(2, '0');
  const secs = (appState.timerVal % 60).toString().padStart(2, '0');
  ui.sessTimer.textContent = `${mins}:${secs}`;
  
  if (appState.timerVal <= 0) {
    endSession(true); // Sesi berakhir karena waktu habis
  }
}

function endSession(timeUp = false) {
  clearInterval(appState.timer);
  appState.sessionActive = false;
  
  if (timeUp) {
    showNotification("Waktu habis! Sesi belajar berakhir.", 3000);
  } else {
    showNotification("Sesi belajar diakhiri.", 3000);
  }
  
  ui.quizArea.style.display = 'none';
  ui.startSessionBtn.style.display = 'block';
  ui.endSessionBtn.style.display = 'none';
  
  // Cek apakah topik selesai
  if (appState.quizQueue.length === 0) {
    if (!appState.completed[currentTopic().id]) {
      appState.completed[currentTopic().id] = true;
      appState.points += 50; // Bonus 50 poin selesai topik
      showNotification("Selamat! Topik selesai! +50 Poin!", 4000);
      
      // Efek confetti
      if(window.confetti) {
        window.confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
      }
      
      saveState();
      updateStats();
      updateUserScore();
    }
  }
  
  showPage('topicSelectionPage', false);
}

function renderQuiz(){
  ui.questionWrap.innerHTML = '';
  // Sembunyikan tombol penjelasan saat soal baru muncul
  if (ui.explainAnswerBtn) ui.explainAnswerBtn.style.display = 'none';
  appState.lastAnsweredQuestion = null;
  
  if(!appState.quizQueue || appState.quizQueue.length === 0){
    ui.questionWrap.innerHTML = '<p class="quiz-complete">🎉 Kuis Selesai! Kerja bagus!</p>';
    ui.endSessionBtn.style.display = 'block';
    ui.remainingQ.textContent = 0;
    return;
  }
  
  ui.remainingQ.textContent = appState.quizQueue.length;
  
  const q = appState.quizQueue[0];
  const questionEl = document.createElement('div');
  questionEl.className = 'question-text';
  questionEl.textContent = q.q;
  
  const optionsEl = document.createElement('div');
  optionsEl.className = 'options';
  
  q.opts.forEach((opt, idx) => {
    const optEl = document.createElement('button');
    optEl.className = 'option';
    optEl.textContent = opt;
    optEl.onclick = () => handleAnswer(q, idx, optEl);
    optionsEl.appendChild(optEl);
  });
  
  ui.questionWrap.appendChild(questionEl);
  ui.questionWrap.appendChild(optionsEl);
}

function handleAnswer(question, selectedIndex, elNode){
  // Matikan semua tombol
  ui.questionWrap.querySelectorAll('.option').forEach(btn => btn.disabled = true);
  
  const correct = selectedIndex === question.a;
  const correctAnswerNode = ui.questionWrap.querySelectorAll('.option')[question.a];
  correctAnswerNode.classList.add('correct');
  
  const isAlreadyCompleted = appState.completed[currentTopic().id];

  if(correct){
    appState.points += 10;
    appState.quizQueue.shift(); // Hapus dari antrian
    showNotification("Benar! +10 Poin!", 1500);
  } else {
    question.attempts++;
    elNode.classList.add('wrong');
    appState.quizQueue.push(appState.quizQueue.shift()); // Kembalikan ke akhir antrian
    showNotification("Salah. Coba lagi nanti.", 1500);
  }

  // Simpan soal dan tampilkan tombol 'Jelaskan Jawaban'
  appState.lastAnsweredQuestion = question;
  if (ui.explainAnswerBtn) ui.explainAnswerBtn.style.display = 'block';
  if (ui.explainAnswerBtn) setButtonLoading(ui.explainAnswerBtn, false); // Pastikan tidak loading
  
  setTimeout(()=>{
    if(appState.quizQueue.length > 0){
      renderQuiz();
    } else {
      renderQuiz(); // Tampilkan pesan 'Kuis Selesai'
      
      // Otomatis cek penyelesaian jika kuis selesai
      if (!isAlreadyCompleted) {
        appState.completed[currentTopic().id] = true;
        appState.points += 50; // Bonus 50 poin
        showNotification("Selamat! Topik selesai! +50 Poin!", 4000);
        
        // Efek confetti
        if(window.confetti) {
          window.confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
        }
        
        updateUserScore(); // Update DB
      }
    }
    updateProgBar();
    updateStats();
    saveState();
  }, 1200);
}

function updateProgBar(){
  const total = currentTopic().questions.length;
  const remaining = appState.quizQueue.length;
  const done = total - remaining;
  const perc = (done / total) * 100;
  ui.progBar.style.width = `${perc}%`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// --- LOGIKA DATABASE (SUPABASE) ---
async function updateUserScore() {
  if (!supabase || !appState.userName) return;

  try {
    const { data, error } = await supabase
      .from('leaderboard')
      .upsert({ username: appState.userName, score: appState.points })
      .select();
      
    if (error) throw error;
    console.log("Score updated/inserted:", data);
    renderLeaderboard(); // Refresh papan peringkat
  } catch (error) {
    console.error("Error updating score:", error.message);
  }
}

// --- LOGIKA INTI GEMINI API ---

/**
 * Helper untuk menampilkan/menyembunyikan loading spinner pada tombol
 * @param {HTMLButtonElement} button - Elemen tombol
 * @param {boolean} isLoading - Status loading
 */
function setButtonLoading(button, isLoading) {
  if (!button) return;
  const btnText = button.querySelector('.btn-text');
  if (isLoading) {
    button.disabled = true;
    if (btnText) btnText.style.display = 'none';
    const oldSpinner = button.querySelector('.loading-spinner');
    if (oldSpinner) oldSpinner.remove();
    button.insertAdjacentHTML('afterbegin', '<span class="loading-spinner"></span>');
  } else {
    button.disabled = false;
    if (btnText) btnText.style.display = 'inline';
    const spinner = button.querySelector('.loading-spinner');
    if (spinner) spinner.remove();
  }
}

/**
 * Fungsi utama untuk memanggil Gemini API dengan exponential backoff
 */
async function callGemini(userPrompt, retries = 3, delay = 1000, systemPrompt = null) {
  if (!GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY belum diisi.");
    return "Maaf, fitur AI sedang tidak aktif. Kunci API belum dikonfigurasi.";
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;

  const payload = {
    contents: [{ parts: [{ text: userPrompt }] }],
  };

  if (systemPrompt) {
    payload.systemInstruction = {
      parts: [{ text: systemPrompt }]
    };
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      if (response.status === 429 && retries > 0) { // Handle rate limiting
        console.warn(`Rate limit. Mencoba lagi dalam ${delay}ms... (Sisa ${retries} percobaan)`);
        await new Promise(res => setTimeout(res, delay));
        return callGemini(userPrompt, retries - 1, delay * 2, systemPrompt);
      }
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts[0]) {
      return result.candidates[0].content.parts[0].text;
    } else {
      console.warn("Respons API tidak valid:", result);
      return "Maaf, saya tidak dapat memproses permintaan itu saat ini (respons tidak valid).";
    }

  } catch (error) {
    console.error("Error memanggil Gemini API:", error);
    if (retries > 0) {
      console.warn(`Error. Mencoba lagi dalam ${delay}ms... (Sisa ${retries} percobaan)`);
      await new Promise(res => setTimeout(res, delay));
      return callGemini(userPrompt, retries - 1, delay * 2, systemPrompt);
    }
    return "Maaf, terjadi kesalahan saat menghubungkan ke layanan AI.";
  }
}

// --- FUNGSI FITUR GEMINI ---

/**
 * FITUR #1: Mengambil Fakta Menarik dari Gemini
 */
async function fetchFunFact() {
  setButtonLoading(ui.getFunFactBtn, true);
  ui.funFactText.textContent = "Sedang mencari fakta menarik...";
  
  const prompt = "Berikan satu fakta menarik (fun fact) yang singkat dan mengejutkan tentang sains, teknologi, atau proses belajar. Gunakan bahasa Indonesia.";
  const fact = await callGemini(prompt);
  
  ui.funFactText.textContent = fact;
  setButtonLoading(ui.getFunFactBtn, false);
}

/**
 * FITUR #2: Menjelaskan Jawaban Kuis menggunakan Gemini
 */
async function explainQuizAnswer() {
  const q = appState.lastAnsweredQuestion;
  if (!q) {
    showNotification("Tidak ada pertanyaan untuk dijelaskan.", 3000);
    return;
  }

  setButtonLoading(ui.explainAnswerBtn, true);
  const correctAnswerText = q.opts[q.a];
  
  const prompt = `
    Konteks: Saya sedang mengerjakan kuis di platform belajar.
    Pertanyaan: "${q.q}"
    Pilihan Jawaban: ${q.opts.join(', ')}
    Jawaban yang Benar: "${correctAnswerText}"
    
    Tugas: Jelaskan mengapa "${correctAnswerText}" adalah jawaban yang benar untuk pertanyaan tersebut. Berikan penjelasan yang singkat, padat (1-2 kalimat), dan mudah dimengerti dalam bahasa Indonesia.
  `;

  const explanation = await callGemini(prompt);
  
  // Tampilkan penjelasan sebagai notifikasi yang tahan lama
  showNotification(explanation, 10000); // Tampilkan selama 10 detik
  setButtonLoading(ui.explainAnswerBtn, false);
}

/**
 * FITUR #3: Mengirim pesan ke AI Mentor (Gemini)
 */
async function sendMentorMessage() {
    const userPrompt = ui.mentorInput.value.trim();
    if(!userPrompt) return;
    
    postMentorMessage(userPrompt, 'user');
    ui.mentorInput.value = '';
    
    // Tampilkan status "mengetik"
    const thinkingMsg = document.createElement('div');
    thinkingMsg.className = 'msg ai';
    thinkingMsg.innerHTML = '<span class="loading-spinner" style="border-top-color: var(--text-secondary);"></span> Sedang berpikir...';
    ui.mentorLog.appendChild(thinkingMsg);
    ui.mentorLog.scrollTop = ui.mentorLog.scrollHeight;
    
    const systemPrompt = "Anda adalah 'BARBAR', mentor AI yang ramah, cerdas, dan suportif untuk platform microlearning. Misi Anda adalah membantu siswa memahami konsep yang sulit. Jawab pertanyaan siswa dengan jelas, singkat, dan relevan dengan konteks belajar. Selalu gunakan bahasa Indonesia yang baik.";
    
    const response = await callGemini(userPrompt, 3, 1000, systemPrompt);

    // Ganti pesan "sedang berpikir" dengan respons AI
    thinkingMsg.innerHTML = response;
    ui.mentorLog.scrollTop = ui.mentorLog.scrollHeight;
}


// --- PAPAN PERINGKAT & AI MENTOR ---
async function renderLeaderboard() {
  if (!supabase) {
    ui.leaderboard.innerHTML = '<p class="small" style="color: var(--text-secondary);">Gagal terhubung ke database.</p>';
    return;
  }
  
  ui.leaderboard.innerHTML = '<p class="small" style="color: var(--text-secondary);">Memuat papan peringkat...</p>';
  
  try {
    let { data, error } = await supabase
      .from('leaderboard')
      .select('username, score')
      .order('score', { ascending: false })
      .limit(10);
      
    if (error) throw error;
    
    ui.leaderboard.innerHTML = '';
    if (data.length === 0) {
      ui.leaderboard.innerHTML = '<p class="small" style="color: var(--text-secondary);">Belum ada data.</p>';
      return;
    }
    
    data.forEach(entry => {
      const entryEl = document.createElement('div');
      entryEl.className = 'leaderboard-entry';
      if(entry.username === appState.userName) {
          entryEl.classList.add('current-user');
      }
      entryEl.innerHTML = `
        <strong>${entry.username}</strong>
        <span>${entry.score} Poin</span>
      `;
      ui.leaderboard.appendChild(entryEl);
    });

  } catch (error) {
    console.error("Error fetching leaderboard:", error.message);
    ui.leaderboard.innerHTML = '<p class="small" style="color: var(--red);">Gagal memuat data.</p>';
  }
}

function postMentorMessage(text, who='ai'){ 
    const msg = document.createElement('div');
    msg.className = `msg ${who}`;
    msg.textContent = text;
    ui.mentorLog.appendChild(msg);
    ui.mentorLog.scrollTop = ui.mentorLog.scrollHeight;
}


// --- LOGIKA FEEDBACK (NEW) ---

function setupStarRating() {
  // 1. Tambahkan event listener untuk setiap bintang
  
  // PERBAIKAN: Tambahkan null check untuk container bintang
  if (ui.starRatingContainer) {
    ui.starRatingContainer.querySelectorAll('.star').forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.value, 10);
        appState.currentRating = rating;
        updateStarVisuals(rating);
      });
      // Efek hover
      star.addEventListener('mouseover', () => {
        updateStarVisuals(parseInt(star.dataset.value, 10), true);
      });
      star.addEventListener('mouseout', () => {
        updateStarVisuals(appState.currentRating);
      });
    });
  }
  
  // PERBAIKAN: Tambahkan null check untuk tombol submit
  if (ui.submitFeedbackBtn) {
    ui.submitFeedbackBtn.addEventListener('click', submitFeedback);
  }
}

function updateStarVisuals(rating, hover = false) {
  if (!ui.starRatingContainer) return; // Guard clause
  
  ui.starRatingContainer.querySelectorAll('.star').forEach(star => {
    const starValue = parseInt(star.dataset.value, 10);
    if (starValue <= rating) {
      star.textContent = '★'; // Bintang penuh
      star.classList.add('selected');
    } else {
      star.textContent = '☆'; // Bintang kosong
      star.classList.remove('selected');
    }
  });
}

function submitFeedback() {
  const feedbackText = ui.feedbackText.value;
  const rating = appState.currentRating;
  
  if (rating === 0) {
    showNotification("Harap pilih rating bintang terlebih dahulu.", 3000);
    return;
  }
  
  console.log("Feedback Submitted:", { rating, feedbackText });
  
  // Simpan rating di state
  saveState();
  
  // Tampilkan pesan terima kasih dan reset
  ui.feedbackThanks.style.display = 'block';
  ui.feedbackText.value = '';
  // Biarkan bintang tetap terisi sesuai rating terakhir
  
  setTimeout(() => {
    ui.feedbackThanks.style.display = 'none';
  }, 4000);
}


// --- EVENT LISTENERS ---
function setupEventListeners() {
    // Toggle Sidebar
    ui.hamburgerBtn.addEventListener('click', () => {
        ui.sidebar.classList.toggle('open');
        ui.sidebarOverlay.style.display = 'block';
    });
    // Tutup sidebar saat overlay diklik
    ui.sidebarOverlay.addEventListener('click', closeSidebar); 
    
    ui.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const page = link.dataset.page;
            if (page) {
                e.preventDefault();
                showPage(page);
                closeSidebar();
            }
            // Jika link eksternal (target="_blank"), biarkan default
        });
    });
    
    ui.startAppBtn.addEventListener('click', () => {
        const name = ui.userNameInput.value.trim();
        if(name.length < 2) {
            showNotification("Nama terlalu pendek. Harap masukkan nama Anda.");
            return;
        }
        appState.userName = name;
        ui.userNameDisplay.textContent = name;
        ui.welcomeUser.style.display = 'block';
        saveState();
        showPage('homePage');
        updateUserScore(); // Buat/update user di DB saat pertama kali masuk
    });
    
    ui.fiturTambahanBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification("Fitur ini masih dalam pengembangan.", 3000);
    });

    ui.backToSubjectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('subjectSelectionPage');
    });

    ui.startSessionBtn.addEventListener('click', startSession);
    ui.endSessionBtn.addEventListener('click', () => endSession(false));
    
    // Listener AI Mentor
    ui.mentorInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') sendMentorMessage(); });
    ui.sendMentorBtn.addEventListener('click', sendMentorMessage);

    // Listener baru untuk fitur Gemini
    // PERBAIKAN: Tambahkan null check agar tidak crash
    if (ui.getFunFactBtn) {
        ui.getFunFactBtn.addEventListener('click', fetchFunFact);
    }
    if (ui.explainAnswerBtn) {
        ui.explainAnswerBtn.addEventListener('click', explainQuizAnswer);
    }
}

// --- Mulai Aplikasi ---
init();
