/* =========================
  Aplikasi BelajarBareng V3
  ========================= */

// --- KONFIGURASI SUPABASE ---
const SUPABASE_URL = 'https://rgntufyuatlkikwuyrxx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Qb5hBsxj26EbriOtqipRBQ_a9HNxjx0';

let supabase = null;
try {
  if (SUPABASE_URL !== 'URL_SUPABASE_ANDA' && SUPABASE_ANON_KEY !== 'KUNCI_ANON_SUPABASE_ANDA' && window.supabase) {
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.error("Supabase client could not be initialized.", e);
}

// --- DATA TOPIK DAN SOAL ---
const SUBJECTS_DATA = {
  "Biologi": [
    { id: "b1", title: "Sistem Pencernaan", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760703550/Belajar_IPA_Sistem_Pencernaan_Manusia_SiapNaikLevel_fnur0d.mp4", description: "Video: organ & proses pencernaan (≤3 menit).", questions: [
      { id: "b1q1", q: "Proses memecah makanan secara kimiawi pertama kali terjadi di?", opts:["Lambung","Mulut","Usus Halus"], a:1 },
      { id: "b1q2", q: "Organ yang menyerap sebagian besar nutrisi adalah?", opts:["Usus Besar","Usus Halus","Lambung"], a:1 },
      { id: "b1q3", q: "Enzim yang memulai pencernaan karbohidrat di mulut adalah?", opts:["Lipase","Pepsin","Amilase"], a:2 },
      { id: "b1q4", q: "Cairan empedu, yang membantu mencerna lemak, diproduksi oleh organ apa?", opts:["Pankreas", "Hati", "Kantung Empedu"], a:1 },
      { id: "b1q5", q: "Fungsi utama usus besar adalah?", opts:["Mencerna protein", "Menyerap air", "Menghasilkan enzim"], a:1 },
      { id: "b1q6", q: "Gerakan meremas-remas makanan oleh kerongkongan disebut?", opts:["Difusi", "Osmosis", "Gerak peristaltik"], a:2 },
      { id: "b1q7", q: "Vitamin K banyak diproduksi oleh bakteri baik di dalam?", opts:["Lambung", "Usus halus", "Usus besar"], a:2 },
      { id: "b1q8", q: "Protein mulai dicerna secara kimiawi di organ?", opts:["Mulut", "Lambung", "Usus halus"], a:1 },
      { id: "b1q9", q: "Apa nama katup yang memisahkan lambung dan usus halus?", opts:["Epiglotis", "Sfingter esofagus", "Pilorus"], a:2 },
      { id: "b1q10", q: "Penyakit yang disebabkan oleh peradangan pada usus buntu disebut?", opts:["Maag", "Apendisitis", "Diare"], a:1 }
    ] },
    { id: "b2", title: "Sirkulasi Darah", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760709823/barbar/Apa_yang_terjadi_di_dalam_tubuh_saat_darah_mengalir__-_Belajar_IPA_cj8b2r.mp4", description: "Sirkulasi darah ringkas (≤3 menit).", questions: [
      { id: "b2q1", q: "Bagian darah yang berperan dalam pembekuan darah?", opts:["Eritrosit","Leukosit","Trombosit"], a:2 },
      { id: "b2q2", q: "Pembuluh yang membawa darah kaya oksigen dari paru-paru ke jantung?", opts:["Vena Kava","Arteri Pulmonalis","Vena Pulmonalis"], a:2 },
      { id: "b2q3", q: "Sel darah yang berfungsi mengangkut oksigen adalah?", opts:["Leukosit", "Trombosit", "Eritrosit"], a:2 },
      { id: "b2q4", q: "Bilik jantung yang memompa darah ke seluruh tubuh adalah?", opts:["Bilik Kanan", "Bilik Kiri", "Serambi Kiri"], a:1 },
      { id: "b2q5", q: "Pembuluh darah yang membawa darah kembali ke jantung disebut?", opts:["Arteri", "Vena", "Kapiler"], a:1 },
      { id: "b2q6", q: "Golongan darah yang disebut sebagai donor universal adalah?", opts:["A", "B", "O"], a:2 },
      { id: "b2q7", q: "Penyakit kekurangan sel darah merah disebut?", opts:["Leukemia", "Anemia", "Hipertensi"], a:1 },
      { id: "b2q8", q: "Di manakah sel darah merah diproduksi?", opts:["Hati", "Sumsum tulang", "Limpa"], a:1 },
      { id: "b2q9", q: "Tekanan darah normal untuk orang dewasa adalah sekitar?", opts:["120/80 mmHg", "140/90 mmHg", "100/60 mmHg"], a:0 },
      { id: "b2q10", q: "Apa fungsi utama sel darah putih (leukosit)?", opts:["Mengangkut Oksigen", "Melawan infeksi", "Pembekuan darah"], a:1 }
    ] }
  ],
  "Matematika": [
    { id: "m1", title: "Konsep Pecahan", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760751491/barbar/Pecahan_-_Animasi_Matematika_SD_n2roxi.mp4", description: "Apa itu pembilang dan penyebut?", questions: [
      { id: "m1q1", q: "Berapakah hasil dari 1/2 + 1/4?", opts:["2/6","3/4","1/3"], a:1 },
      { id: "m1q2", q: "Angka di bagian bawah pecahan disebut?", opts:["Pembilang","Penyebut","Koefisien"], a:1 },
      { id: "m1q3", q: "Bentuk sederhana dari pecahan 4/8 adalah?", opts:["1/2", "2/4", "1/4"], a:0 },
      { id: "m1q4", q: "Mana yang lebih besar, 2/3 atau 3/5?", opts:["3/5", "Keduanya sama", "2/3"], a:2 },
      { id: "m1q5", q: "Hasil dari 3/4 x 2/3 adalah?", opts:["5/7", "6/12", "1/3"], a:1 },
      { id: "m1q6", q: "Berapa nilai desimal dari 1/5?", opts:["0.1", "0.2", "0.5"], a:1 },
      { id: "m1q7", q: "Ubah 0.75 menjadi bentuk pecahan paling sederhana.", opts:["75/100", "3/4", "7/5"], a:1 },
      { id: "m1q8", q: "Hasil dari 2/5 : 1/5 adalah?", opts:["2", "1/2", "1"], a:0 },
      { id: "m1q9", q: "Ibu memotong kue menjadi 8 bagian. Jika 3 bagian dimakan, sisa kue adalah?", opts:["3/8", "8/3", "5/8"], a:2 },
      { id: "m1q10", q: "1 1/2 jika diubah menjadi pecahan biasa menjadi?", opts:["11/2", "3/2", "2/3"], a:1 }
    ] },
    { id: "m2", title: "Dasar Aljabar", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760751491/barbar/Mengenal_Unsur-Unsur_Aljabar___Matematika_Kelas_7_simenh.mp4", description: "Variabel dan konstanta (≤3 menit).", questions: [
      { id: "m2q1", q: "Jika 2x + 5 = 11, berapakah nilai x?", opts:["2","3","4"], a:1 },
      { id: "m2q2", q: "Pada bentuk aljabar 3a + 7, yang disebut konstanta adalah?", opts:["3a", "a", "7"], a:2 },
      { id: "m2q3", q: "Sederhanakan bentuk 5x + 2y - 3x + y.", opts:["2x + 3y", "8x + 3y", "2x + y"], a:0 },
      { id: "m2q4", q: "Jika a = 4, maka nilai dari 3a - 2 adalah?", opts:["12", "10", "14"], a:1 },
      { id: "m2q5", q: "Variabel pada bentuk aljabar 4p² - q + 5 adalah?", opts:["p dan q", "p saja", "4 dan 5"], a:0 },
      { id: "m2q6", q: "Hasil dari (x + 2)(x + 3) adalah?", opts:["x² + 6", "x² + 5x + 6", "2x + 5"], a:1 },
      { id: "m2q7", q: "Jika 4y = 20, maka nilai y adalah?", opts:["5", "4", "80"], a:0 },
      { id: "m2q8", q: "Suku yang sejenis dari 7ab + 3ac - 5ab adalah?", opts:["7ab dan 3ac", "3ac dan -5ab", "7ab dan -5ab"], a:2 },
      { id: "m2q9", q: "Berapa hasil dari (2x)³?", opts:["6x", "2x³", "8x³"], a:2 },
      { id: "m2q10", q: "Faktorkan bentuk x² - 9.", opts:["(x-3)(x-3)", "(x-9)(x+1)", "(x-3)(x+3)"], a:2 }
    ] }
  ],
  "Ekonomi": [
    { id: "e1", title: "Permintaan & Penawaran", video: "https://res.cloudinary.com/dgzufaone/video/upload/v1760750374/introduction-to-supply-and-demand_PwrjcZaP_x6tsu1.mp4", description: "Mengenal kurva D dan S (≤3 menit).", questions: [
      { id: "e1q1", q: "Jika harga barang naik, maka jumlah barang yang diminta cenderung...", opts:["Naik","Tetap","Turun"], a:2 },
      { id: "e1q2", q: "Titik pertemuan kurva permintaan dan penawaran disebut?", opts:["Harga Maksimum","Keseimbangan Pasar","Titik Impas"], a:1 },
      { id: "e1q3", q: "Hukum penawaran menyatakan, jika harga naik, maka jumlah yang ditawarkan akan...", opts:["Naik", "Turun", "Tetap"], a:0 },
      { id: "e1q4", q: "Barang yang permintaannya meningkat ketika pendapatan konsumen meningkat disebut barang...", opts:["Inferior", "Normal", "Publik"], a:1 },
      { id: "e1q5", q: "Pergeseran kurva permintaan ke kanan berarti...", opts:["Permintaan menurun", "Permintaan meningkat", "Penawaran meningkat"], a:1 },
      { id: "e1q6", q: "Faktor yang TIDAK mempengaruhi permintaan adalah...", opts:["Harga barang itu sendiri", "Selera konsumen", "Biaya produksi"], a:2 },
      { id: "e1q7", q: "Ketika jumlah yang ditawarkan lebih besar dari jumlah yang diminta, terjadi...", opts:["Kelangkaan", "Surplus", "Inflasi"], a:1 },
      { id: "e1q8", q: "Pemerintah menetapkan harga di bawah harga keseimbangan, ini disebut...", opts:["Harga dasar (floor price)", "Harga atap (ceiling price)", "Pajak"], a:1 },
      { id: "e1q9", q: "Barang pengganti untuk teh adalah...", opts:["Gula", "Kopi", "Air mineral"], a:1 },
      { id: "e1q10", q: "Elastisitas permintaan mengukur seberapa responsif...", opts:["Penjual terhadap pajak", "Jumlah yang diminta terhadap perubahan harga", "Biaya produksi terhadap teknologi"], a:1 }
    ] }
  ]
};

// --- STATE APLIKASI ---
const appState = {
  subjects: SUBJECTS_DATA,
  currentSubject: null,
  currentTopicIndex: null,
  sessionSeconds: 300,
  timerHandle: null,
  remainingSeconds: 300,
  quizQueue: [],
  points: 0,
  completed: {},
  mistakes: {},
  userName: '',
  openaiApiKey: '' // Kunci API untuk fungsionalitas AI Mentor
};

function loadState(){
  try {
    const raw = localStorage.getItem('bb_state_v3');
    if(raw){
      const s = JSON.parse(raw);
      if(s.points) appState.points = s.points;
      if(s.completed) appState.completed = s.completed;
    }
    appState.userName = localStorage.getItem('bb_username_v3') || '';
  } catch(e) { console.warn("Gagal memuat state:", e); }
}

function saveState(){
  const toSave = { points: appState.points, completed: appState.completed };
  localStorage.setItem('bb_state_v3', JSON.stringify(toSave));
}

// --- KUMPULAN ELEMEN UI ---
const ui = {
    pageContainer: document.getElementById('pageContainer'),
    notification: document.getElementById('notification'),
    // ... (tambahkan semua elemen UI lainnya di sini)
    subjectsWrap: document.getElementById('subjectGrid'),
    topicsWrap: document.getElementById('topicGrid'),
    topicTitle: document.getElementById('topicTitle'),
    topicVideo: document.getElementById('topicVideo'),
    sessTimer: document.getElementById('sessTimer'),
    startSessionBtn: document.getElementById('startSession'),
    progBar: document.getElementById('progBar'),
    quizArea: document.getElementById('quizArea'),
    questionWrap: document.getElementById('questionWrap'),
    remainingQ: document.getElementById('remainingQ'),
    endSessionBtn: document.getElementById('endSession'),
    doneTopicsEl: document.getElementById('doneTopics'),
    totalPointsEl: document.getElementById('totalPoints'),
    mentorLog: document.getElementById('mentorLog'),
    mentorInput: document.getElementById('mentorInput'),
    sendMentorBtn: document.getElementById('sendMentor'),
    completionOverlay: document.getElementById('completionOverlay'),
    hamburgerBtn: document.getElementById('hamburgerBtn'),
    sidebar: document.getElementById('sidebar'),
    navLinks: document.querySelectorAll('.nav-link'),
    pages: document.querySelectorAll('.page'),
    userNameInput: document.getElementById('userNameInput'),
    startAppBtn: document.getElementById('startAppBtn'),
    welcomeUser: document.getElementById('welcomeUser'),
    userNameDisplay: document.getElementById('userNameDisplay'),
    starRatingContainer: document.getElementById('starRating'),
    feedbackText: document.getElementById('feedbackText'),
    submitFeedbackBtn: document.getElementById('submitFeedback'),
    feedbackThanks: document.getElementById('feedbackThanks'),
    fiturTambahanBtn: document.getElementById('fiturTambahanBtn'),
    backToSubjectsBtn: document.getElementById('backToSubjectsBtn'),
    topicSelectionTitle: document.getElementById('topicSelectionTitle'),
};

// --- MANAJEMEN HALAMAN & NAVIGASI ---
function showPage(pageId) {
    ui.pages.forEach(p => p.classList.remove('active'));
    document.getElementById(pageId)?.classList.add('active');

    ui.navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
    ui.sidebar.classList.remove('open');
}

function showNotification(message) {
    ui.notification.textContent = message;
    ui.notification.classList.add('show');
    setTimeout(() => {
        ui.notification.classList.remove('show');
    }, 3000);
}

// --- INISIALISASI APLIKASI ---
function init(){
    loadState();
    
    if (appState.userName) {
        ui.userNameDisplay.textContent = appState.userName;
        ui.welcomeUser.style.display = 'block';
        showPage('homePage');
    } else {
        showPage('landingPage');
    }

    renderLeaderboard();
    initFeedbackSystem();
    setupEventListeners();
}

// --- RENDER KONTEN DINAMIS ---
function renderSubjectSelection() {
    ui.subjectsWrap.innerHTML = '';
    Object.keys(appState.subjects).forEach(subjectName => {
        const card = document.createElement('a');
        card.href = "#";
        card.className = 'selection-card';
        card.innerHTML = `<h4>${subjectName}</h4><p>${appState.subjects[subjectName].length} topik tersedia</p>`;
        card.onclick = (e) => {
            e.preventDefault();
            appState.currentSubject = subjectName;
            renderTopicSelection(subjectName);
            showPage('topicSelectionPage');
        };
        ui.subjectsWrap.appendChild(card);
    });
}

function renderTopicSelection(subjectName) {
    ui.topicSelectionTitle.textContent = `Pilih Topik - ${subjectName}`;
    ui.topicsWrap.innerHTML = '';
    const topics = appState.subjects[subjectName];
    topics.forEach((topic, index) => {
        const card = document.createElement('a');
        card.href = "#";
        card.className = 'selection-card';
        card.innerHTML = `<h4>${topic.title}</h4><p>${topic.description}</p>`;
        card.onclick = (e) => {
            e.preventDefault();
            appState.currentTopicIndex = index;
            loadTopic(index);
            showPage('appPage');
        };
        ui.topicsWrap.appendChild(card);
    });
}

function loadTopic(index){
  const t = currentTopic();
  ui.topicTitle.textContent = t.title;
  ui.topicVideo.querySelector('source').src = t.video;
  ui.topicVideo.load();
  appState.quizQueue = shuffleArray(t.questions.map(q=> ({...q, attempts:0}) ));
  renderQuiz();
  updateProgBar();
  updateStats();
}

// --- LOGIKA SESI BELAJAR & KUIS ---
function formatTime(sec){
  const m = Math.floor(sec/60).toString().padStart(2,'0');
  const s = (sec%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

function startSession(){
  if(appState.timerHandle) clearInterval(appState.timerHandle);
  
  appState.remainingSeconds = appState.sessionSeconds;
  ui.sessTimer.textContent = formatTime(appState.remainingSeconds);
  appState.timerHandle = setInterval(()=>{
    appState.remainingSeconds--;
    ui.sessTimer.textContent = formatTime(appState.remainingSeconds);
    if(appState.remainingSeconds <= 0){
      clearInterval(appState.timerHandle);
      endSession(true);
    }
  }, 1000);
  ui.topicVideo.play().catch(()=>{});
  ui.quizArea.style.display = 'block';
}

function renderQuiz(){
  ui.questionWrap.innerHTML = '';
  if(!appState.quizQueue || appState.quizQueue.length === 0){
    ui.questionWrap.innerHTML = '<p class="small">Tidak ada soal untuk topik ini.</p>';
    ui.remainingQ.textContent = 0;
    return;
  }
  const q = appState.quizQueue[0];
  ui.questionWrap.innerHTML = `<p class="question-text">${q.q}</p>`;
  const optsWrap = document.createElement('div');
  optsWrap.className = 'options';
  q.opts.forEach((o, i)=>{
    const op = document.createElement('button');
    op.className = 'option animated-btn';
    op.innerHTML = `<span>${o}</span>`;
    op.onclick = ()=> handleAnswer(q, i, op);
    optsWrap.appendChild(op);
  });
  ui.questionWrap.appendChild(optsWrap);
  ui.remainingQ.textContent = appState.quizQueue.length;
  ui.endSessionBtn.style.display = 'none';
}

function handleAnswer(question, selectedIndex, elNode){
  const correct = (selectedIndex === question.a);
  elNode.parentElement.querySelectorAll('.option').forEach(node=> node.disabled = true);

  const correctAnswerNode = elNode.parentElement.querySelectorAll('.option')[question.a];
  correctAnswerNode.classList.add('correct');
  
  const isAlreadyCompleted = appState.completed[currentTopic().id];

  if(correct){
    if (!isAlreadyCompleted) appState.points += 10;
    appState.quizQueue.shift();
  } else {
    elNode.classList.add('wrong');
    appState.quizQueue.push(appState.quizQueue.shift()); // Put back to the end
  }
  
  setTimeout(()=>{
    if(appState.quizQueue.length > 0){
      renderQuiz();
    } else {
      ui.questionWrap.innerHTML = '<p class="small" style="text-align:center;">🎉<br/><b>Selamat!</b><br/>Semua soal selesai.</p>';
      ui.endSessionBtn.style.display = 'block';
    }
    updateStats();
  }, 1200);
}

function endSession(timedOut=false){
  if(appState.timerHandle) clearInterval(appState.timerHandle);
  
  const t = currentTopic();
  const isAlreadyCompleted = appState.completed[t.id];
  
  if (!isAlreadyCompleted) {
      appState.points += 20; // Bonus
      markCompleted(true);
      postMentorMessage(`Bagus! Kamu dapat bonus 20 poin untuk topik "${t.title}".`, 'ai');
      if(window.confetti) confetti();
  } else {
      postMentorMessage(`Kamu menyelesaikan topik "${t.title}" lagi! Kerja bagus!`, 'ai');
  }
  
  updateStats();
  ui.quizArea.style.display = 'none';
}

function markCompleted(success){
  if(success) appState.completed[currentTopic().id] = true;
  updateStats();
}

function shuffleArray(arr){
  for(let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr;
}
function currentTopic(){ return appState.subjects[appState.currentSubject][appState.currentTopicIndex]; }

function updateProgBar(){
  const done = appState.completed[currentTopic()?.id] ? 100 : 0;
  ui.progBar.style.width = done + '%';
}

function updateStats(){
  saveState();
  ui.doneTopicsEl.textContent = Object.values(appState.completed).filter(v=>v).length;
  ui.totalPointsEl.textContent = appState.points;
  updateProgBar();
  updateUserScore();
}

// --- PAPAN PERINGKAT & AI MENTOR ---
async function renderLeaderboard() {
    const boardEl = document.getElementById('leaderboard');
    if (!supabase) return;
    boardEl.innerHTML = '<p class="small">Memuat data...</p>';

    const { data, error } = await supabase
        .from('leaderboard').select('name, score').order('score', { ascending: false }).limit(25);

    if (error) { boardEl.innerHTML = '<p class="small">Gagal memuat data.</p>'; return; }
    
    boardEl.innerHTML = '';
    const emojis = ['🥇', '🥈', '🥉'];
    data.forEach((entry, idx) => {
        const div = document.createElement('div');
        div.className = `leaderboard-entry small ${entry.name === appState.userName ? 'current-user' : ''}`;
        div.innerHTML = `${emojis[idx] || `${idx + 1}.`} <strong>${entry.name}</strong> - ${entry.score} poin`;
        boardEl.appendChild(div);
    });
}

async function updateUserScore() {
    if (!appState.userName || !supabase) return;
    await supabase.from('leaderboard').upsert({ name: appState.userName, score: appState.points }, { onConflict: 'name' });
    renderLeaderboard();
}

function appendMentor(msg, who='ai'){
  const div = document.createElement('div');
  div.className = 'msg ' + (who==='ai' ? 'ai' : 'user');
  div.textContent = msg;
  ui.mentorLog.appendChild(div);
  ui.mentorLog.scrollTop = ui.mentorLog.scrollHeight;
}
function postMentorMessage(text, who='ai'){ appendMentor(text, who); }

// --- FEEDBACK & EVENT LISTENERS ---
function initFeedbackSystem() {
    // ... (Logika feedback tetap sama)
}

function setupEventListeners() {
    ui.hamburgerBtn.addEventListener('click', () => ui.sidebar.classList.toggle('open'));
    
    ui.navLinks.forEach(link => {
        if (link.id === 'fiturTambahanBtn') return; // Tangani secara terpisah
        link.addEventListener('click', (e) => {
            if (link.target === "_blank") return;
            e.preventDefault();
            const pageId = link.dataset.page;

            if (pageId === 'subjectSelectionPage') {
                if (!appState.userName) {
                    showPage('landingPage');
                    return;
                }
                renderSubjectSelection();
            }
            showPage(pageId);
        });
    });

    ui.startAppBtn.addEventListener('click', () => {
      const name = ui.userNameInput.value.trim();
      if (name.length < 3) {
        showNotification("Nama harus diisi minimal 3 karakter.");
        return;
      }
      appState.userName = name;
      localStorage.setItem('bb_username_v3', name);
      ui.userNameDisplay.textContent = name;
      ui.welcomeUser.style.display = 'block';
      showPage('homePage');
      updateStats();
    });

    ui.fiturTambahanBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showNotification("Fitur ini masih dalam tahap pengembangan.");
        ui.sidebar.classList.remove('open');
    });

    ui.backToSubjectsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('subjectSelectionPage');
    });

    ui.startSessionBtn.addEventListener('click', startSession);
    ui.endSessionBtn.addEventListener('click', () => endSession(false));
    
    ui.mentorInput.addEventListener('keydown', (e) => { if(e.key === 'Enter') ui.sendMentorBtn.click(); });
    ui.sendMentorBtn.addEventListener('click', ()=>{
      const v = ui.mentorInput.value.trim();
      if(!v) return;
      appendMentor(v, 'user');
      ui.mentorInput.value = '';
      
      if(appState.openaiApiKey) {
        appState.points = Math.max(0, appState.points - 20);
        postMentorMessage('Bantuan AI digunakan (-20 poin).', 'ai');
        updateStats();
        // Panggil API OpenAI di sini
      } else {
        postMentorMessage('Maaf, AI sedang dalam pengembangan.', 'ai');
      }
    });
}

// --- Mulai Aplikasi ---
init();

