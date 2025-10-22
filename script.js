// Logika Aplikasi BARBAR: Belajar Bareng

// --- KONFIGURASI PENTING UNTUK SUPABASE ---
// WARNING: Ganti placeholder ini dengan kunci Supabase Anda yang sesungguhnya!
const SUPABASE_URL = "https://your-supabase-url.supabase.co"; // Ganti dengan URL Anda
const SUPABASE_ANON_KEY = "your-anon-key-here"; // Ganti dengan Public Anon Key Anda

// --- GLOBAL VARIABLES ---
let supabase = null;
let currentTopic = null;
let currentSubject = null;
let currentQuestions = [];
let quizInProgress = false;
let currentQuestionIndex = 0;
let userPoints = 0;
let userName = "Pemain Anonim";
let sessionTimer = 0;
let timerInterval = null;
let topicsCompleted = []; // Array of topic IDs completed by the user
const QUIZ_POINTS = 50;
const SESSION_DURATION = 300; // 5 minutes in seconds

// --- DOM ELEMENTS ---
const elements = {
    splashScreen: document.getElementById('splashScreen'),
    pageContainer: document.getElementById('pageContainer'),
    landingPage: document.getElementById('landingPage'),
    homePage: document.getElementById('homePage'),
    subjectSelectionPage: document.getElementById('subjectSelectionPage'),
    topicSelectionPage: document.getElementById('topicSelectionPage'),
    appPage: document.getElementById('appPage'),
    leaderboardPage: document.getElementById('leaderboardPage'),
    feedbackPage: document.getElementById('feedbackPage'),
    mentorPage: document.getElementById('mentorPage'),

    // Nav & Header
    hamburgerBtn: document.getElementById('hamburgerBtn'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: document.getElementById('sidebarOverlay'),
    totalPointsDisplay: document.getElementById('totalPoints'),
    userNameInput: document.getElementById('userNameInput'),
    startAppBtn: document.getElementById('startAppBtn'),
    userNameDisplay: document.getElementById('userNameDisplay'),
    welcomeUser: document.getElementById('welcomeUser'),

    // Subject/Topic Grid
    subjectGrid: document.getElementById('subjectGrid'),
    topicGrid: document.getElementById('topicGrid'),
    topicSelectionTitle: document.getElementById('topicSelectionTitle'),

    // App Page
    topicTitle: document.getElementById('topicTitle'),
    topicVideo: document.getElementById('topicVideo'),
    startSession: document.getElementById('startSession'),
    endSession: document.getElementById('endSession'),
    sessTimer: document.getElementById('sessTimer'),
    progBar: document.getElementById('progBar'),
    quizArea: document.getElementById('quizArea'),
    questionWrap: document.getElementById('questionWrap'),
    remainingQ: document.getElementById('remainingQ'),
    backToSubjectsBtn: document.getElementById('backToSubjectsBtn'),

    // Leaderboard
    leaderboard: document.getElementById('leaderboard'),
    doneTopics: document.getElementById('doneTopics'),

    // Feedback
    starRating: document.getElementById('starRating'),
    submitFeedback: document.getElementById('submitFeedback'),
    feedbackText: document.getElementById('feedbackText'),
    feedbackThanks: document.getElementById('feedbackThanks'),

    // Notifications
    notification: document.getElementById('notification'),

    // Mentor (Disabled/Placeholder)
    mentorInput: document.getElementById('mentorInput'),
    sendMentorBtn: document.getElementById('sendMentorBtn'),
    mentorLog: document.getElementById('mentorLog'),
};

// --- DATA MOCK (Ganti dengan data dari Supabase di production) ---
const subjects = [
    { id: 1, name: "Matematika", icon: "🔢", description: "Aljabar, Geometri, Kalkulus dasar." },
    { id: 2, name: "Sains Alam", icon: "🔬", description: "Fisika, Kimia, dan Biologi inti." },
    { id: 3, name: "Sejarah Dunia", icon: "📜", description: "Peradaban kuno hingga modern." },
];

const topics = [
    // Matematika
    { id: 101, subject_id: 1, title: "Persamaan Kuadrat", video_url: "https://www.w3schools.com/html/mov_bbb.mp4", question_count: 5, status: "pending" },
    { id: 102, subject_id: 1, title: "Deret Aritmatika", video_url: "https://www.w3schools.com/html/mov_bbb.mp4", question_count: 5, status: "pending" },
    // Sains Alam
    { id: 201, subject_id: 2, title: "Sistem Sirkulasi", video_url: "https://www.w3schools.com/html/mov_bbb.mp4", question_count: 5, status: "pending" },
    { id: 202, subject_id: 2, title: "Hukum Newton", video_url: "https://www.w3schools.com/html/mov_bbb.mp4", question_count: 5, status: "pending" },
    // Sejarah Dunia
    { id: 301, subject_id: 3, title: "Peradaban Romawi", video_url: "https://www.w3schools.com/html/mov_bbb.mp4", question_count: 5, status: "pending" },
];

const mockQuestions = [
    { id: 1, topic_id: 101, question: "Bentuk umum persamaan kuadrat adalah?", options: ["ax + by = c", "ax² + bx + c = 0", "y = mx + c", "ax + b = 0"], answer: "ax² + bx + c = 0" },
    { id: 2, topic_id: 101, question: "Diskriminan dihitung dengan rumus?", options: ["D = b² - 4ac", "D = 4ac - b²", "D = c/a", "D = -b/a"], answer: "D = b² - 4ac" },
    { id: 3, topic_id: 201, question: "Pembuluh darah yang membawa darah kaya oksigen keluar dari jantung adalah?", options: ["Vena", "Aorta", "Kapiler", "Arteri Pulmonalis"], answer: "Aorta" },
];

// --- UTILITIES & NAVIGATION ---

/**
 * Menampilkan notifikasi Toast.
 * @param {string} message - Pesan yang akan ditampilkan.
 * @param {string} type - Tipe notifikasi ('success', 'error', 'info').
 */
function showNotification(message, type = 'info') {
    const el = elements.notification;
    el.textContent = message;
    
    // Reset kelas
    el.className = 'notification';
    if (type === 'success') {
        el.style.backgroundColor = 'var(--accent-secondary)';
    } else if (type === 'error') {
        el.style.backgroundColor = 'var(--danger)';
    } else {
        el.style.backgroundColor = 'var(--accent-main)';
    }

    el.classList.add('show');
    setTimeout(() => {
        el.classList.remove('show');
    }, 3000);
}

/**
 * Menampilkan halaman berdasarkan ID.
 * @param {string} pageId - ID halaman yang akan ditampilkan.
 */
function navigateTo(pageId) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Tampilkan halaman yang diminta
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update active class di sidebar (Mobile only, desktop uses static sidebar)
    if (window.innerWidth < 1024) {
        elements.sidebar.classList.remove('open');
        elements.sidebarOverlay.classList.remove('active');
    }
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    
    // Panggil fungsi khusus halaman
    if (pageId === 'leaderboardPage') {
        renderLeaderboard();
    } else if (pageId === 'subjectSelectionPage') {
        renderSubjectGrid();
    }
}

/**
 * Memformat detik menjadi format MM:SS.
 * @param {number} totalSeconds - Total detik.
 * @returns {string} - Waktu dalam format MM:SS.
 */
function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// --- DATA HANDLING (Mocking Firestore/Supabase) ---

/**
 * Memuat poin pengguna dan topik yang selesai dari Local Storage (Simulasi DB).
 */
function loadUserData() {
    const storedPoints = localStorage.getItem('userPoints');
    const storedName = localStorage.getItem('userName');
    const storedTopics = localStorage.getItem('topicsCompleted');

    if (storedPoints) {
        userPoints = parseInt(storedPoints);
    }
    if (storedName) {
        userName = storedName;
    }
    if (storedTopics) {
        try {
            topicsCompleted = JSON.parse(storedTopics);
        } catch(e) {
            console.error("Gagal parse topicsCompleted:", e);
            topicsCompleted = [];
        }
    }
    
    updateUIPoints(userPoints);
    elements.userNameDisplay.textContent = userName;
    elements.userNameInput.value = userName;
    
    // Update status topik mock berdasarkan data yang selesai
    topics.forEach(topic => {
        if (topicsCompleted.includes(topic.id)) {
            topic.status = "done";
        }
    });
}

/**
 * Menyimpan poin pengguna dan topik yang selesai ke Local Storage.
 */
function saveUserData() {
    localStorage.setItem('userPoints', userPoints);
    localStorage.setItem('userName', userName);
    localStorage.setItem('topicsCompleted', JSON.stringify(topicsCompleted));
}

/**
 * Memperbarui tampilan poin di Header dan Halaman Leaderboard.
 * @param {number} points - Poin terbaru.
 */
function updateUIPoints(points) {
    elements.totalPointsDisplay.textContent = points;
    // (Pembaruan di Leaderboard akan dilakukan saat renderLeaderboard dipanggil)
}

/**
 * Menambahkan poin ke pengguna.
 * @param {number} amount - Jumlah poin yang ditambahkan.
 */
function addPoints(amount) {
    userPoints += amount;
    updateUIPoints(userPoints);
    saveUserData();
    showNotification(`+${amount} Poin! Keren!`, 'success');
    // TODO: Tambahkan logika Supabase untuk menyimpan ke DB
}

// --- RENDERING FUNCTIONS ---

/**
 * Render grid mata pelajaran.
 */
function renderSubjectGrid() {
    elements.subjectGrid.innerHTML = '';
    subjects.forEach(subject => {
        const div = document.createElement('div');
        div.className = 'grid-item';
        div.innerHTML = `
            <h3>${subject.icon} ${subject.name}</h3>
            <p>${subject.description}</p>
        `;
        div.addEventListener('click', () => {
            currentSubject = subject;
            renderTopicSelection(subject.name, subject.id);
        });
        elements.subjectGrid.appendChild(div);
    });
}

/**
 * Render grid topik untuk subjek yang dipilih.
 * @param {string} subjectName - Nama subjek.
 * @param {number} subjectId - ID subjek.
 */
function renderTopicSelection(subjectName, subjectId) {
    elements.topicSelectionTitle.textContent = `Topik: ${subjectName}`;
    elements.topicGrid.innerHTML = '';

    const subjectTopics = topics.filter(t => t.subject_id === subjectId);

    subjectTopics.forEach(topic => {
        const isDone = topic.status === 'done';
        const div = document.createElement('div');
        div.className = `grid-item ${isDone ? 'done-topic' : ''}`;
        div.innerHTML = `
            <h3>${topic.title} ${isDone ? '✅' : '⏳'}</h3>
            <p>Video: 5 Menit</p>
            <p>Kuis: ${topic.question_count} Soal</p>
        `;
        div.addEventListener('click', () => {
            currentTopic = topic;
            startTopicSession(topic);
        });
        elements.topicGrid.appendChild(div);
    });

    navigateTo('topicSelectionPage');
}

/**
 * Memulai sesi belajar untuk topik yang dipilih.
 * @param {object} topic - Objek topik yang dipilih.
 */
function startTopicSession(topic) {
    elements.topicTitle.textContent = topic.title;
    elements.topicVideo.src = topic.video_url;
    elements.quizArea.style.display = 'none';
    elements.startSession.style.display = 'block';
    elements.endSession.style.display = 'none';
    elements.sessTimer.textContent = formatTime(SESSION_DURATION);
    sessionTimer = SESSION_DURATION;
    elements.progBar.style.width = '0%';
    clearInterval(timerInterval);

    navigateTo('appPage');
}

/**
 * Memulai sesi kuis.
 */
function startQuiz() {
    // Filter mock questions untuk topik saat ini
    currentQuestions = mockQuestions.filter(q => q.topic_id === currentTopic.id);
    if (currentQuestions.length === 0) {
        showNotification("Tidak ada kuis untuk topik ini.", 'error');
        return;
    }
    
    currentQuestionIndex = 0;
    quizInProgress = true;
    elements.quizArea.style.display = 'block';
    elements.remainingQ.textContent = currentQuestions.length;
    renderQuestion();
}

/**
 * Render pertanyaan kuis saat ini.
 */
function renderQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }

    const q = currentQuestions[currentQuestionIndex];
    elements.questionWrap.innerHTML = `
        <p class="text-lg font-semibold mb-4">${currentQuestionIndex + 1}. ${q.question}</p>
        <div id="optionsContainer">
            ${q.options.map(option => 
                `<div class="option" data-answer="${option}">${option}</div>`
            ).join('')}
        </div>
        <button id="submitAnswerBtn" class="accent-btn mt-4 w-full" disabled>
            <span>Jawab</span>
        </button>
    `;

    const optionsContainer = document.getElementById('optionsContainer');
    const submitBtn = document.getElementById('submitAnswerBtn');
    let selectedAnswer = null;

    optionsContainer.querySelectorAll('.option').forEach(optionEl => {
        optionEl.addEventListener('click', () => {
            optionsContainer.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            optionEl.classList.add('selected');
            selectedAnswer = optionEl.getAttribute('data-answer');
            submitBtn.disabled = false;
        });
    });

    submitBtn.addEventListener('click', () => {
        checkAnswer(selectedAnswer, q.answer, optionsContainer, submitBtn);
    });
    
    elements.remainingQ.textContent = currentQuestions.length - currentQuestionIndex;
}

/**
 * Cek jawaban kuis.
 * @param {string} selected - Jawaban yang dipilih.
 * @param {string} correct - Jawaban yang benar.
 * @param {HTMLElement} optionsContainer - Container opsi.
 * @param {HTMLElement} submitBtn - Tombol jawab.
 */
function checkAnswer(selected, correct, optionsContainer, submitBtn) {
    // Matikan interaksi
    submitBtn.disabled = true;
    optionsContainer.querySelectorAll('.option').forEach(opt => opt.style.pointerEvents = 'none');

    let isCorrect = false;

    optionsContainer.querySelectorAll('.option').forEach(opt => {
        const optionText = opt.getAttribute('data-answer');
        if (optionText === correct) {
            opt.classList.add('correct');
        }
        if (optionText === selected && optionText !== correct) {
            opt.classList.add('incorrect');
        }
        if (optionText === selected && optionText === correct) {
            isCorrect = true;
        }
    });

    if (isCorrect) {
        addPoints(QUIZ_POINTS / currentQuestions.length); // Poin dibagi per soal
        showNotification("Jawaban Benar! Lanjut ke soal berikutnya.", 'success');
    } else {
        showNotification("Jawaban Salah. Coba lagi di sesi berikutnya.", 'error');
    }

    // Lanjut ke pertanyaan berikutnya
    setTimeout(() => {
        currentQuestionIndex++;
        renderQuestion();
    }, 1500);
}

/**
 * Mengakhiri sesi kuis.
 */
function endQuiz() {
    quizInProgress = false;
    elements.quizArea.style.display = 'none';
    elements.questionWrap.innerHTML = `<p class="text-text-secondary">Kuis selesai! Anda telah mengumpulkan poin.</p>`;
    
    // Tandai topik selesai
    if (!topicsCompleted.includes(currentTopic.id)) {
        topicsCompleted.push(currentTopic.id);
        currentTopic.status = 'done';
        saveUserData();
        showNotification(`🎉 Topik '${currentTopic.title}' Selesai!`, 'success');
    }
}

/**
 * Render papan peringkat (menggunakan data mock jika Supabase gagal).
 */
async function renderLeaderboard() {
    elements.leaderboard.innerHTML = `<p class="small">Memuat data papan peringkat...</p>`;
    // TODO: Implementasi Supabase Fetch Leaderboard
    
    // Mock Leaderboard data
    const mockLeaders = [
        { rank: 1, name: "Juara BARBAR", points: 1500 },
        { rank: 2, name: "Si Paling Eksotis", points: 1250 },
        { rank: 3, name: "Rajin Belajar", points: 1100 },
        { rank: 4, name: "PintarAnonim", points: 950 },
        { rank: 5, name: userName, points: userPoints }, // Selalu masukkan user saat ini
    ].sort((a, b) => b.points - a.points);
    
    // Pastikan user saat ini ada di list
    if (!mockLeaders.some(l => l.name === userName)) {
        mockLeaders.push({ rank: 0, name: userName, points: userPoints });
        mockLeaders.sort((a, b) => b.points - a.points);
        // Perbaiki ranking
        mockLeaders.forEach((l, index) => l.rank = index + 1);
    }

    elements.leaderboard.innerHTML = mockLeaders.map(leader => `
        <div class="leaderboard-item ${leader.name === userName ? 'bg-bg-primary rounded-lg my-1' : ''}">
            <span class="rank-text">${leader.rank}</span>
            <span class="flex-grow">${leader.name}</span>
            <strong class="text-accent-secondary">${leader.points} Poin</strong>
        </div>
    `).join('');
    
    elements.doneTopics.textContent = topicsCompleted.length;
}

// --- EVENT LISTENERS ---

/**
 * Mengatur semua event listener di aplikasi.
 */
function setupEventListeners() {
    // 1. Sidebar/Hamburger Toggle
    elements.hamburgerBtn.addEventListener('click', () => {
        elements.sidebar.classList.toggle('open');
        elements.sidebarOverlay.classList.toggle('active');
    });

    elements.sidebarOverlay.addEventListener('click', () => {
        elements.sidebar.classList.remove('open');
        elements.sidebarOverlay.classList.remove('active');
    });

    // 2. Navigasi Halaman
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            if (pageId === 'extraFeature') {
                // Link eksternal/fitur tambahan
                window.open("https://bard.google.com/", "_blank");
            } else {
                navigateTo(pageId);
            }
        });
    });

    // 3. Landing Page Start Button
    elements.startAppBtn.addEventListener('click', () => {
        const inputName = elements.userNameInput.value.trim();
        userName = inputName || "Pemain Anonim";
        elements.userNameDisplay.textContent = userName;
        saveUserData();
        elements.welcomeUser.style.display = 'block';
        showNotification(`Halo, ${userName}! Selamat Belajar.`, 'info');
        navigateTo('homePage');
    });

    // 4. Session Controls (Timer & Quiz)
    elements.startSession.addEventListener('click', () => {
        elements.startSession.style.display = 'none';
        elements.endSession.style.display = 'block';
        showNotification("Sesi belajar 5 menit dimulai. Selamat menonton!", 'info');
        
        // Start Timer
        timerInterval = setInterval(() => {
            sessionTimer--;
            elements.sessTimer.textContent = formatTime(sessionTimer);
            
            // Update progress bar
            const progress = ((SESSION_DURATION - sessionTimer) / SESSION_DURATION) * 100;
            elements.progBar.style.width = `${progress}%`;

            if (sessionTimer <= 0) {
                clearInterval(timerInterval);
                elements.sessTimer.textContent = "00:00";
                elements.endSession.click(); // Otomatis mengakhiri sesi
            }
        }, 1000);
    });

    elements.endSession.addEventListener('click', () => {
        clearInterval(timerInterval);
        elements.startSession.style.display = 'block';
        elements.endSession.style.display = 'none';
        showNotification("Sesi berakhir. Waktunya kuis!", 'info');
        
        // Mulai kuis setelah sesi berakhir
        startQuiz();
    });

    // 5. Back Button
    elements.backToSubjectsBtn.addEventListener('click', () => {
        navigateTo('subjectSelectionPage');
    });

    // 6. Feedback/Rating
    elements.starRating.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.getAttribute('data-value'));
            // Tampilan bintang
            elements.starRating.querySelectorAll('.star').forEach((s, index) => {
                s.textContent = index < value ? '★' : '☆';
            });
            // Simpan rating (bisa dikirim ke Supabase nanti)
            localStorage.setItem('userRating', value);
            elements.feedbackThanks.textContent = `Terima kasih atas rating ${value} bintang!`;
            elements.feedbackThanks.style.display = 'block';
        });
    });

    elements.submitFeedback.addEventListener('click', () => {
        const feedback = elements.feedbackText.value.trim();
        if (feedback.length > 5) {
            // TODO: Kirim ke Supabase
            console.log("Feedback dikirim:", feedback);
            showNotification("Feedback Anda berhasil dikirim!", 'success');
            elements.feedbackText.value = '';
            // Reset rating
            elements.starRating.querySelectorAll('.star').forEach(s => s.textContent = '☆');
            elements.feedbackThanks.style.display = 'none';

        } else {
            showNotification("Ketik minimal 5 karakter untuk feedback.", 'error');
        }
    });
}

// --- INIT APP ---

/**
 * Inisialisasi aplikasi.
 */
async function init() {
    // 1. Inisialisasi Supabase (Handle crash jika key kosong)
    try {
        if (SUPABASE_URL && SUPABASE_ANON_KEY && typeof window.supabase !== 'undefined') {
            supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            console.log("Supabase client initialized successfully.");
            // TODO: Implementasi login anonim atau user session
        } else {
            console.warn("Supabase keys tidak valid atau CDN belum dimuat. Menggunakan mode Mock Data.");
        }
    } catch (e) {
        console.error("Gagal menginisialisasi Supabase:", e);
        showNotification("Gagal koneksi database. Aplikasi berjalan dalam mode demo.", 'error');
    }

    // 2. Load data dan setup UI
    loadUserData();
    setupEventListeners();
    
    // 3. Sembunyikan Splash Screen setelah jeda (1.5 detik)
    setTimeout(() => {
        elements.splashScreen.classList.add('hidden');
        // Pindah ke landingPage setelah splash
        navigateTo('landingPage');
    }, 1500); // Pastikan ini berjalan!
}

// Mulai aplikasi
window.addEventListener('load', init);

