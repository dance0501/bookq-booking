/**
 * BookQ Booking Solution - Core JS logic
 */

// Initialize default state
const DEFAULT_BOOKINGS = [
    {
        id: "bq-1001",
        name: "กานดา มีสุข",
        company: "สยามเทค จำกัด",
        phone: "0812345678",
        service: "ปรึกษาธุรกิจ",
        date: "2026-06-18",
        time: "09:15",
        admin: "แอดมินอัญ",
        status: "confirmed"
    },
    {
        id: "bq-1002",
        name: "ธวัชชัย แสงคำ",
        company: "เอ็นจิเนียริ่ง ไทยแลนด์",
        phone: "0898765432",
        service: "เจรจาการค้า",
        date: "2026-06-18",
        time: "10:30",
        admin: "แอดมินแอน",
        status: "pending"
    },
    {
        id: "bq-1003",
        name: "ณัฐิกา ทองประเสริฐ",
        company: "โฮมเซอร์วิส โซลูชั่น",
        phone: "0855551234",
        service: "นัดพบพิเศษ",
        date: "2026-06-18",
        time: "13:10",
        admin: "แอดมินเก่ง",
        status: "cancelled"
    },
    {
        id: "bq-1004",
        name: "พิพัฒน์ เรืองศรี",
        company: "ฟู้ดเดลิเวอรี่ ฮับ",
        phone: "0877778888",
        service: "ปรึกษาธุรกิจ",
        date: "2026-06-18",
        time: "14:45",
        admin: "แอดมินสมศรี",
        status: "confirmed"
    },
    {
        id: "bq-1005",
        name: "มาลี ผ่องแผ้ว",
        company: "สถาบันสอนภาษาลีดส์",
        phone: "0866667777",
        service: "นัดพบพิเศษ",
        date: "2026-06-18",
        time: "19:20",
        admin: "แอดมินบอย",
        status: "confirmed"
    },
    {
        id: "bq-1006",
        name: "สมศักดิ์ รักดี",
        company: "มีดี เอเจนซี่",
        phone: "0823334444",
        service: "เจรจาการค้า",
        date: "2026-06-19",
        time: "13:00",
        admin: "แอดมินแอน",
        status: "confirmed"
    },
    {
        id: "bq-1007",
        name: "รินรดา งามยิ่ง",
        company: "",
        phone: "0841112222",
        service: "ปรึกษาธุรกิจ",
        date: "2026-06-17",
        time: "10:00",
        admin: "แอดมินอัญ",
        status: "confirmed"
    }
];

const ADMINS = ["แอดมินอัญ", "แอดมินแอน", "แอดมินเก่ง", "แอดมินสมศรี", "แอดมินบอย"];
const SERVICE_PRICES = {
    "ปรึกษาธุรกิจ": 600,
    "เจรจาการค้า": 800,
    "นัดพบพิเศษ": 1000
};

// Global App State
const state = {
    bookings: JSON.parse(localStorage.getItem('bookq_bookings')) || DEFAULT_BOOKINGS,
    isLoggedIn: JSON.parse(localStorage.getItem('bookq_logged_in')) || false,
    isDarkMode: JSON.parse(localStorage.getItem('bookq_dark_mode')) || false,
    
    // Calendar view dates
    bookingCalDate: new Date(),
    miniCalDate: new Date(),
    dashCalDate: new Date(),
    
    // User selections
    selectedDate: (function() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })(),
    selectedTime: null,
    selectedService: ""
};

// Dark Mode Theme Switcher
function applyTheme(isDark) {
    state.isDarkMode = isDark;
    localStorage.setItem('bookq_dark_mode', JSON.stringify(isDark));

    const desktopBtnIcon = document.querySelector('#theme-toggle-btn i');
    const mobileBtnIcon = document.querySelector('#mobile-theme-toggle-btn i');
    const mobileText = document.getElementById('mobile-theme-text');

    if (isDark) {
        document.documentElement.classList.add('dark-theme');
        document.body.classList.add('dark-theme');
        if (desktopBtnIcon) desktopBtnIcon.className = 'fa-solid fa-sun';
        if (mobileBtnIcon) mobileBtnIcon.className = 'fa-solid fa-sun';
        if (mobileText) mobileText.innerText = 'โหมดสว่าง (Light Mode)';
    } else {
        document.documentElement.classList.remove('dark-theme');
        document.body.classList.remove('dark-theme');
        if (desktopBtnIcon) desktopBtnIcon.className = 'fa-solid fa-moon';
        if (mobileBtnIcon) mobileBtnIcon.className = 'fa-solid fa-moon';
        if (mobileText) mobileText.innerText = 'โหมดสีดำ (Dark Mode)';
    }
}

function toggleTheme() {
    applyTheme(!state.isDarkMode);
}

// Save to LocalStorage helper
function saveBookings() {
    localStorage.setItem('bookq_bookings', JSON.stringify(state.bookings));
}

function saveLoginStatus(status) {
    state.isLoggedIn = status;
    localStorage.setItem('bookq_logged_in', JSON.stringify(status));
}

// Format date helper (YYYY-MM-DD)
function formatDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Thai Month Names
const THAI_MONTHS = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

// Thai Day Names
const THAI_DAYS = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];

// Format full Thai Date
function formatThaiDateString(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const dayName = THAI_DAYS[date.getDay()];
    const day = date.getDate();
    const month = THAI_MONTHS[date.getMonth()];
    const year = date.getFullYear() + 543; // Buddhist Era
    return `วัน${dayName}ที่ ${day} ${month} พ.ศ. ${year}`;
}

// Format Thai Date Short
function formatThaiDateShort(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = THAI_MONTHS[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

// ==========================================================================
// SPA ROUTER
// ==========================================================================
function handleRoute() {
    let hash = window.location.hash || '#home';
    
    // Parse parameters if any
    let view = hash;
    let params = {};
    if (hash.includes('?')) {
        const parts = hash.split('?');
        view = parts[0];
        const queryParams = new URLSearchParams(parts[1]);
        for (const [key, value] of queryParams.entries()) {
            params[key] = value;
        }
    }

    // Auth redirection for Dashboard
    if (view === '#dashboard' && !state.isLoggedIn) {
        window.location.hash = '#login';
        return;
    }

    // Toggle View Sections
    const views = ['#home', '#about', '#booking', '#login', '#dashboard'];
    views.forEach(v => {
        const sectionId = 'view-' + v.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
            if (v === view) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        }
    });

    // Update Nav Active Links
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const itemHash = item.getAttribute('href');
        if (itemHash === view) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Mobile nav close
    document.getElementById('mobile-nav').classList.remove('open');

    // View-Specific Init
    if (view === '#home') {
        initHomeView();
    } else if (view === '#about') {
        // Preset service parameters if passed from pages
        if (params.service) {
            state.selectedService = params.service;
        }
    } else if (view === '#booking') {
        initBookingView(params);
    } else if (view === '#dashboard') {
        initDashboardView();
    } else if (view === '#login' && state.isLoggedIn) {
        window.location.hash = '#dashboard';
    }

    window.scrollTo(0, 0);
}

// Initialize Auth Navbar elements
function updateAuthNavbar() {
    const loginBtn = document.getElementById('nav-login-btn');
    const profileNav = document.getElementById('user-profile-nav');
    const mobileLoginLink = document.getElementById('mobile-login-link');
    const mobileDashboardLink = document.getElementById('mobile-dashboard-link');
    const mobileLogoutLink = document.getElementById('mobile-logout-link');

    if (state.isLoggedIn) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (profileNav) profileNav.style.display = 'flex';
        if (mobileLoginLink) mobileLoginLink.style.display = 'none';
        if (mobileDashboardLink) mobileDashboardLink.style.display = 'block';
        if (mobileLogoutLink) mobileLogoutLink.style.display = 'block';
    } else {
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (profileNav) profileNav.style.display = 'none';
        if (mobileLoginLink) mobileLoginLink.style.display = 'block';
        if (mobileDashboardLink) mobileDashboardLink.style.display = 'none';
        if (mobileLogoutLink) mobileLogoutLink.style.display = 'none';
    }
}

// ==========================================================================
// HOME VIEW LOGIC (MINI CALENDAR & QUICK SLOTS)
// ==========================================================================
function initHomeView() {
    renderMiniCalendar();
    renderMiniSlots();
}

function renderMiniCalendar() {
    const grid = document.getElementById('mini-cal-days-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    const date = state.miniCalDate;
    const year = date.getFullYear();
    const month = date.getMonth();

    document.getElementById('mini-cal-title').innerText = `${THAI_MONTHS[month]} ${year}`;

    // Get first day of month
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Adjust for Monday start (Mo=0, Tu=1... Su=6)
    let adjustedFirstDay = firstDayIndex - 1;
    if (adjustedFirstDay < 0) adjustedFirstDay = 6;

    // Get number of days in month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Empty spaces before first day
    for (let i = 0; i < adjustedFirstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'mini-cal-day empty';
        grid.appendChild(emptyCell);
    }

    // Render month days
    for (let d = 1; d <= totalDays; d++) {
        const dayBtn = document.createElement('button');
        dayBtn.className = 'mini-cal-day';
        dayBtn.innerText = d;
        
        const fullDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        
        // Highlight active/today/selected
        if (state.selectedDate === fullDateStr) {
            dayBtn.classList.add('active');
        }

        // Click handler
        const todayStart = new Date();
        todayStart.setHours(0,0,0,0);
        const cellDate = new Date(year, month, d);
        
        if (cellDate < todayStart) {
            dayBtn.disabled = true;
            dayBtn.classList.add('disabled');
        } else {
            dayBtn.addEventListener('click', () => {
                state.selectedDate = fullDateStr;
                // Rerender calendars
                renderMiniCalendar();
                renderMiniSlots();
            });
        }

        grid.appendChild(dayBtn);
    }
}

function renderMiniSlots() {
    const container = document.getElementById('mini-slots-container');
    if (!container) return;

    container.innerHTML = '';
    const slots = ["09:00", "10:00", "13:00", "14:00", "18:00", "19:00"];

    slots.forEach(time => {
        const isBooked = state.bookings.some(b => b.date === state.selectedDate && b.time === time && b.status !== 'cancelled');
        
        const btn = document.createElement('button');
        btn.className = `mini-slot-btn ${isBooked ? 'booked' : 'available'}`;
        btn.innerText = time;

        if (isBooked) {
            btn.disabled = true;
        } else {
            btn.addEventListener('click', () => {
                state.selectedTime = time;
                // Redirect straight to booking page with selected date & time
                window.location.hash = `#booking?date=${state.selectedDate}&time=${time}`;
            });
        }
        container.appendChild(btn);
    });
}

// ==========================================================================
// BOOKING VIEW LOGIC (INTERACTIVE FULL CALENDAR & FORM)
// ==========================================================================
function initBookingView(params) {
    // Set parameters if passed
    if (params.date) {
        state.selectedDate = params.date;
        state.bookingCalDate = new Date(params.date);
    }
    if (params.time) {
        state.selectedTime = params.time;
    }
    if (params.service) {
        state.selectedService = params.service;
        document.getElementById('booking-service').value = params.service;
    }

    renderBookingCalendar();
    renderBookingSlots();
    updateBookingSummary();
}

function renderBookingCalendar() {
    const grid = document.getElementById('booking-cal-days-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const date = state.bookingCalDate;
    const year = date.getFullYear();
    const month = date.getMonth();

    document.getElementById('booking-cal-title').innerText = `${THAI_MONTHS[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    let adjustedFirstDay = firstDayIndex - 1;
    if (adjustedFirstDay < 0) adjustedFirstDay = 6;

    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < adjustedFirstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day-btn empty';
        grid.appendChild(emptyCell);
    }

    for (let d = 1; d <= totalDays; d++) {
        const dayBtn = document.createElement('button');
        dayBtn.className = 'calendar-day-btn';
        dayBtn.innerText = d;

        const fullDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        
        if (state.selectedDate === fullDateStr) {
            dayBtn.classList.add('active');
        }

        // Highlight today
        const todayStr = formatDateString(new Date());
        if (fullDateStr === todayStr) {
            dayBtn.classList.add('today');
        }

        const todayStart = new Date();
        todayStart.setHours(0,0,0,0);
        const cellDate = new Date(year, month, d);
        
        if (cellDate < todayStart) {
            dayBtn.disabled = true;
            dayBtn.classList.add('disabled');
        } else {
            dayBtn.addEventListener('click', () => {
                state.selectedDate = fullDateStr;
                state.selectedTime = null; // reset time selection
                renderBookingCalendar();
                renderBookingSlots();
                updateBookingSummary();
            });
        }

        grid.appendChild(dayBtn);
    }
}

function renderBookingSlots() {
    const grid = document.getElementById('booking-slots-grid');
    const label = document.getElementById('selected-date-label');
    if (!grid) return;

    grid.innerHTML = '';
    
    if (!state.selectedDate) {
        label.innerText = 'กรุณาเลือกวันที่ก่อน';
        return;
    }

    label.innerText = formatThaiDateShort(state.selectedDate);

    const times = [
        "09:00", "09:15", "10:00", "10:30", "11:00", "13:00", 
        "13:10", "14:00", "14:45", "17:00", "18:00", "19:00", "19:20"
    ];

    times.forEach(time => {
        const isBooked = state.bookings.some(b => b.date === state.selectedDate && b.time === time && b.status !== 'cancelled');
        
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'time-slot-btn';
        btn.innerText = time;

        if (isBooked) {
            btn.classList.add('booked');
            btn.disabled = true;
        } else {
            btn.classList.add('available');
            if (state.selectedTime === time) {
                btn.classList.add('selected');
            }

            btn.addEventListener('click', () => {
                // Toggle select
                document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                state.selectedTime = time;
                updateBookingSummary();
            });
        }

        grid.appendChild(btn);
    });
}

function updateBookingSummary() {
    const dateBadge = document.getElementById('badge-selected-date');
    const timeBadge = document.getElementById('badge-selected-time');
    const submitBtn = document.getElementById('btn-submit-booking');

    if (state.selectedDate) {
        dateBadge.innerHTML = `<i class="fa-regular fa-calendar"></i> ${formatThaiDateShort(state.selectedDate)}`;
    } else {
        dateBadge.innerHTML = `<i class="fa-regular fa-calendar"></i> ยังไม่ระบุวันที่`;
    }

    if (state.selectedTime) {
        timeBadge.innerHTML = `<i class="fa-regular fa-clock"></i> เวลา ${state.selectedTime} น.`;
    } else {
        timeBadge.innerHTML = `<i class="fa-regular fa-clock"></i> ยังไม่ระบุเวลา`;
    }

    // Enable/Disable submit button
    if (state.selectedDate && state.selectedTime) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Handle Form Submit for booking
function handleBookingSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('booking-name').value.trim();
    const company = document.getElementById('booking-company').value.trim();
    const phone = document.getElementById('booking-phone').value.trim();
    const service = document.getElementById('booking-service').value;

    if (!name || !phone || !service || !state.selectedDate || !state.selectedTime) {
        alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
        return;
    }

    // Assign a random admin
    const randomAdmin = ADMINS[Math.floor(Math.random() * ADMINS.length)];
    const bookingId = "bq-" + Math.floor(1000 + Math.random() * 9000);

    const newBooking = {
        id: bookingId,
        name,
        company,
        phone,
        service,
        date: state.selectedDate,
        time: state.selectedTime,
        admin: randomAdmin,
        status: "pending" // starts as pending
    };

    state.bookings.push(newBooking);
    saveBookings();

    // Show Success Modal
    const modalDetails = document.getElementById('modal-success-details');
    modalDetails.innerHTML = `
        <div><label>รหัสคิว:</label><span>${bookingId}</span></div>
        <div><label>ชื่อลูกค้า:</label><span>${name}</span></div>
        <div><label>บริการ:</label><span>${service}</span></div>
        <div><label>วันจอง:</label><span>${formatThaiDateShort(state.selectedDate)}</span></div>
        <div><label>เวลา:</label><span>${state.selectedTime} น.</span></div>
        <div><label>แอดมินที่ดูแล:</label><span>${randomAdmin}</span></div>
    `;

    document.getElementById('success-modal').classList.add('open');

    // Reset Form & state
    document.getElementById('booking-form').reset();
    state.selectedTime = null;
    state.selectedService = "";
    
    renderBookingCalendar();
    renderBookingSlots();
    updateBookingSummary();
}

// ==========================================================================
// ADMIN LOGIN LOGIC
// ==========================================================================
function handleLoginSubmit(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('login-username').value.trim();
    const passwordInput = document.getElementById('login-password').value.trim();
    const errorMsg = document.getElementById('login-error-msg');

    // Simple Admin Credentials
    if (usernameInput.toLowerCase() === 'admin' && passwordInput === 'admin123') {
        errorMsg.style.display = 'none';
        saveLoginStatus(true);
        updateAuthNavbar();
        document.getElementById('login-form').reset();
        window.location.hash = '#dashboard';
    } else {
        errorMsg.style.display = 'flex';
    }
}

function handleLogout() {
    saveLoginStatus(false);
    updateAuthNavbar();
    window.location.hash = '#home';
}

// ==========================================================================
// ADMIN DASHBOARD LOGIC (CALENDAR, TIMELINE & QUEUE TABLE)
// ==========================================================================
function initDashboardView() {
    // Current date display in dashboard
    document.getElementById('dashboard-current-date').innerText = formatThaiDateString(state.selectedDate);
    
    renderDashboardStats();
    renderDashboardCalendar();
    renderDashboardTimeline();
    renderDashboardTable();
}

function renderDashboardStats() {
    // Filter bookings for today (selectedDate)
    const todayBookings = state.bookings.filter(b => b.date === state.selectedDate);
    
    const todayQueuesVal = todayBookings.length;
    const pendingVal = todayBookings.filter(b => b.status === 'pending').length;
    const confirmedVal = todayBookings.filter(b => b.status === 'confirmed').length;
    const cancelledVal = todayBookings.filter(b => b.status === 'cancelled').length;

    // Revenue calculation
    // e.g. confirmed bookings * price
    const totalConfirmed = state.bookings.filter(b => b.status === 'confirmed');
    let revenue = 0;
    totalConfirmed.forEach(b => {
        revenue += SERVICE_PRICES[b.service] || 500;
    });

    document.getElementById('stat-today-queues').innerText = `${todayQueuesVal} คิว`;
    document.getElementById('stat-pending-today').innerText = pendingVal;
    document.getElementById('stat-confirmed-queues').innerText = `${confirmedVal} คิว`;
    document.getElementById('stat-completed-today').innerText = todayBookings.filter(b => b.status === 'confirmed').length; // simple complete indicator
    document.getElementById('stat-cancelled-queues').innerText = `${cancelledVal} คิว`;
    
    // Format Revenue currency
    document.getElementById('stat-revenue').innerText = `฿${revenue.toLocaleString()}`;
}

function renderDashboardCalendar() {
    const grid = document.getElementById('dash-cal-days');
    if (!grid) return;

    grid.innerHTML = '';
    const date = state.dashCalDate;
    const year = date.getFullYear();
    const month = date.getMonth();

    document.getElementById('dash-cal-title').innerText = `${THAI_MONTHS[month]} ${year}`;

    const firstDayIndex = new Date(year, month, 1).getDay();
    let adjustedFirstDay = firstDayIndex - 1;
    if (adjustedFirstDay < 0) adjustedFirstDay = 6;

    const totalDays = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < adjustedFirstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'dash-cal-day empty';
        grid.appendChild(emptyCell);
    }

    for (let d = 1; d <= totalDays; d++) {
        const dayBtn = document.createElement('button');
        dayBtn.className = 'dash-cal-day';
        dayBtn.innerText = d;

        const fullDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

        if (state.selectedDate === fullDateStr) {
            dayBtn.classList.add('active');
        }

        // Check if date has bookings
        const hasBookings = state.bookings.some(b => b.date === fullDateStr);
        if (hasBookings) {
            dayBtn.classList.add('has-bookings');
        }

        const todayStart = new Date();
        todayStart.setHours(0,0,0,0);
        const cellDate = new Date(year, month, d);
        
        if (cellDate < todayStart) {
            dayBtn.disabled = true;
            dayBtn.classList.add('disabled');
        } else {
            dayBtn.addEventListener('click', () => {
                state.selectedDate = fullDateStr;
                document.getElementById('dashboard-current-date').innerText = formatThaiDateString(state.selectedDate);
                renderDashboardCalendar();
                renderDashboardTimeline();
                renderDashboardStats();
            });
        }

        grid.appendChild(dayBtn);
    }
}

function renderDashboardTimeline() {
    const timeline = document.getElementById('dash-slots-timeline');
    const label = document.getElementById('dash-selected-date-label');
    if (!timeline) return;

    timeline.innerHTML = '';
    label.innerText = `คิววันที่ ${formatThaiDateShort(state.selectedDate)}`;

    // Filter today's bookings
    const todayBookings = state.bookings.filter(b => b.date === state.selectedDate);
    
    if (todayBookings.length === 0) {
        timeline.innerHTML = '<div class="text-muted text-center" style="padding: 1.5rem 0;">ไม่มีการจองคิวในวันนี้</div>';
        return;
    }

    // Sort by time
    todayBookings.sort((a, b) => a.time.localeCompare(b.time));

    todayBookings.forEach(booking => {
        const slotCard = document.createElement('div');
        slotCard.className = `timeline-slot-card ${booking.status}`;
        
        slotCard.innerHTML = `
            <div class="timeline-slot-time">${booking.time}</div>
            <div class="timeline-slot-info">
                <strong>${booking.name}</strong>
                <span>${booking.service} (${booking.admin})</span>
            </div>
            <div>
                <span class="badge ${booking.status === 'confirmed' ? 'badge-confirmed' : booking.status === 'pending' ? 'badge-pending' : 'badge-cancelled'}">
                    ${booking.status === 'confirmed' ? 'ยืนยันแล้ว' : booking.status === 'pending' ? 'รอดำเนินการ' : 'ยกเลิก'}
                </span>
            </div>
        `;
        timeline.appendChild(slotCard);
    });
}

function renderDashboardTable() {
    const tbody = document.getElementById('dashboard-queues-tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    // Filters
    const serviceFilter = document.getElementById('filter-service')?.value || 'all';
    const adminFilter = document.getElementById('filter-admin')?.value || 'all';
    const headerSearch = document.getElementById('header-search-input')?.value.trim() || '';
    const mobileSearch = document.getElementById('mobile-search-input')?.value.trim() || '';
    const searchTerm = (headerSearch || mobileSearch).toLowerCase();

    let filtered = [...state.bookings];

    // SQL LIKE Filter Simulation (WHERE name LIKE %term% OR phone LIKE %term% OR service LIKE %term% OR company LIKE %term%)
    if (searchTerm) {
        filtered = filtered.filter(b => 
            (b.name && b.name.toLowerCase().includes(searchTerm)) ||
            (b.phone && b.phone.includes(searchTerm)) ||
            (b.service && b.service.toLowerCase().includes(searchTerm)) ||
            (b.company && b.company.toLowerCase().includes(searchTerm))
        );
    }

    if (serviceFilter !== 'all') {
        filtered = filtered.filter(b => b.service === serviceFilter);
    }
    if (adminFilter !== 'all') {
        filtered = filtered.filter(b => b.admin === adminFilter);
    }

    // Sort: newest first (or sort by date/time)
    filtered.sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));

    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted">ไม่พบข้อมูลการจอง</td></tr>';
        return;
    }

    filtered.forEach(b => {
        const tr = document.createElement('tr');
        
        let statusBadge = '';
        if (b.status === 'confirmed') {
            statusBadge = `<span class="badge badge-confirmed"><i class="fa-solid fa-circle-check"></i> ยืนยันแล้ว</span>`;
        } else if (b.status === 'pending') {
            statusBadge = `<span class="badge badge-pending"><i class="fa-solid fa-bell"></i> รอดำเนินการ</span>`;
        } else {
            statusBadge = `<span class="badge badge-cancelled"><i class="fa-solid fa-circle-xmark"></i> ยกเลิก</span>`;
        }

        tr.innerHTML = `
            <td data-label="เวลา">
                <div style="font-weight: 700;">${b.time}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${formatThaiDateShort(b.date)}</div>
            </td>
            <td data-label="ชื่อลูกค้า">
                <div style="font-weight: 700; color: var(--primary-color);">${b.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">${b.company || "-"}</div>
            </td>
            <td data-label="บริการ">${b.service}</td>
            <td data-label="แอดมิน">${b.admin}</td>
            <td data-label="สถานะ">${statusBadge}</td>
            <td data-label="จัดการ">
                <div class="action-buttons-cell">
                    <button class="btn-action-status approve" title="ยืนยันคิว" data-id="${b.id}"><i class="fa-solid fa-check"></i></button>
                    <button class="btn-action-status pending" title="ตั้งค่าเป็นรอดำเนินการ" data-id="${b.id}"><i class="fa-regular fa-bell"></i></button>
                    <button class="btn-action-status cancel" title="ยกเลิกคิว" data-id="${b.id}"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </td>
        `;

        // Add event listeners to actions
        const approveBtn = tr.querySelector('.btn-action-status.approve');
        const pendingBtn = tr.querySelector('.btn-action-status.pending');
        const cancelBtn = tr.querySelector('.btn-action-status.cancel');

        approveBtn.addEventListener('click', () => updateBookingStatus(b.id, 'confirmed'));
        pendingBtn.addEventListener('click', () => updateBookingStatus(b.id, 'pending'));
        cancelBtn.addEventListener('click', () => updateBookingStatus(b.id, 'cancelled'));

        tbody.appendChild(tr);
    });
}

function updateBookingStatus(bookingId, status) {
    const booking = state.bookings.find(b => b.id === bookingId);
    if (booking) {
        booking.status = status;
        saveBookings();
        
        // Rerender all dashboard panels
        renderDashboardStats();
        renderDashboardTimeline();
        renderDashboardTable();
        renderDashboardCalendar();
    }
}

// ==========================================================================
// WINDOW LISTENERS & EVENT ATTACHMENTS
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // 0. Theme initiation
    applyTheme(state.isDarkMode);
    document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
    document.getElementById('mobile-theme-toggle-btn')?.addEventListener('click', toggleTheme);

    // 1. Router initiation
    window.addEventListener('hashchange', handleRoute);
    
    // Initialize navbar buttons based on Auth state
    updateAuthNavbar();
    
    // Initial route load
    handleRoute();

    // 2. Mobile navbar toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (mobileNav.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });
    }

    // Close mobile nav when tapping outside or clicking a nav link
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (mobileNav) mobileNav.classList.remove('open');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            }
        });
    });

    // 3. Mini Calendar Navigation (Home View)
    document.querySelector('.mini-cal-nav.prev-month')?.addEventListener('click', () => {
        state.miniCalDate.setMonth(state.miniCalDate.getMonth() - 1);
        renderMiniCalendar();
    });
    document.querySelector('.mini-cal-nav.next-month')?.addEventListener('click', () => {
        state.miniCalDate.setMonth(state.miniCalDate.getMonth() + 1);
        renderMiniCalendar();
    });

    // 4. Booking Page Calendar Navigation
    document.getElementById('booking-cal-prev')?.addEventListener('click', () => {
        state.bookingCalDate.setMonth(state.bookingCalDate.getMonth() - 1);
        renderBookingCalendar();
    });
    document.getElementById('booking-cal-next')?.addEventListener('click', () => {
        state.bookingCalDate.setMonth(state.bookingCalDate.getMonth() + 1);
        renderBookingCalendar();
    });

    // 5. Booking Form Submission
    document.getElementById('booking-form')?.addEventListener('submit', handleBookingSubmit);

    // 6. Close Success Modal
    document.getElementById('btn-close-success-modal')?.addEventListener('click', () => {
        document.getElementById('success-modal').classList.remove('open');
        window.location.hash = '#home'; // go back home
    });

    // 7. Login Form Submission
    document.getElementById('login-form')?.addEventListener('submit', handleLoginSubmit);

    // Toggle Password Visibility
    document.getElementById('btn-toggle-password')?.addEventListener('click', () => {
        const passwordInput = document.getElementById('login-password');
        const icon = document.getElementById('toggle-password-icon');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });

    // 8. Logout buttons (header & mobile menu)
    document.getElementById('btn-logout-nav')?.addEventListener('click', handleLogout);
    document.getElementById('mobile-logout-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        handleLogout();
    });

    // 9. Dashboard Calendar Navigation
    document.getElementById('dash-cal-prev')?.addEventListener('click', () => {
        state.dashCalDate.setMonth(state.dashCalDate.getMonth() - 1);
        renderDashboardCalendar();
    });
    document.getElementById('dash-cal-next')?.addEventListener('click', () => {
        state.dashCalDate.setMonth(state.dashCalDate.getMonth() + 1);
        renderDashboardCalendar();
    });

    // 10. Dashboard Filters & Search Bar Rerender (SQL LIKE)
    document.getElementById('filter-service')?.addEventListener('change', renderDashboardTable);
    document.getElementById('filter-admin')?.addEventListener('change', renderDashboardTable);
    
    const handleSearchInput = (e) => {
        if (window.location.hash !== '#dashboard' && e.target.value.trim() !== '') {
            window.location.hash = '#dashboard';
        }
        renderDashboardTable();
    };

    document.getElementById('header-search-input')?.addEventListener('input', handleSearchInput);
    document.getElementById('mobile-search-input')?.addEventListener('input', handleSearchInput);
});
