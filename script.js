document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('show');
        });
    });
    
    // Prayer Times Data (sample - replace with real data)
    const prayerTimes = {
        today: {
            date: new Date(),
            fajr: '5:30 AM',
            sunrise: '6:45 AM',
            dhuhr: '1:15 PM',
            asr: '4:30 PM',
            maghrib: '7:45 PM',
            isha: '9:00 PM'
        },
        monthly: [
            // Sample data for 7 days
            { date: '2023-06-01', fajr: '5:30 AM', sunrise: '6:45 AM', dhuhr: '1:15 PM', asr: '4:30 PM', maghrib: '7:45 PM', isha: '9:00 PM' },
            { date: '2023-06-02', fajr: '5:29 AM', sunrise: '6:44 AM', dhuhr: '1:15 PM', asr: '4:30 PM', maghrib: '7:46 PM', isha: '9:01 PM' },
            { date: '2023-06-03', fajr: '5:28 AM', sunrise: '6:43 AM', dhuhr: '1:15 PM', asr: '4:30 PM', maghrib: '7:47 PM', isha: '9:02 PM' },
            { date: '2023-06-04', fajr: '5:27 AM', sunrise: '6:42 AM', dhuhr: '1:15 PM', asr: '4:30 PM', maghrib: '7:48 PM', isha: '9:03 PM' },
            { date: '2023-06-05', fajr: '5:26 AM', sunrise: '6:41 AM', dhuhr: '1:15 PM', asr: '4:30 PM', maghrib: '7:49 PM', isha: '9:04 PM' },
            { date: '2023-06-06', fajr: '5:25 AM', sunrise: '6:40 AM', dhuhr: '1:15 PM', asr: '4:30 PM', maghrib: '7:50 PM', isha: '9:05 PM' },
            { date: '2023-06-07', fajr: '5:24 AM', sunrise: '6:39 AM', dhuhr: '1:15 PM', asr: '4:30 PM', maghrib: '7:51 PM', isha: '9:06 PM' }
        ]
    };
    
    // Display Today's Prayer Times
    const prayerTimesList = document.getElementById('prayer-times-list');
    const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    prayers.forEach(prayer => {
        const prayerTime = document.createElement('div');
        prayerTime.className = 'prayer-time';
        
        const prayerName = document.createElement('span');
        prayerName.className = 'prayer-name';
        prayerName.textContent = prayer;
        
        const prayerTimeValue = document.createElement('span');
        prayerTimeValue.className = 'prayer-time-value';
        prayerTimeValue.textContent = prayerTimes.today[prayer.toLowerCase()];
        
        prayerTime.appendChild(prayerName);
        prayerTime.appendChild(prayerTimeValue);
        prayerTimesList.appendChild(prayerTime);
        
    });
    
    
    
    // Display Current Time and Next Prayer
    
    function updateCurrentTime() {
        const now = new Date();
        const currentTimeElement = document.getElementById('current-time');
        currentTimeElement.textContent = `Current Time: ${now.toLocaleTimeString()}`;
        
        // Simple next prayer calculation (in a real app, use proper prayer time calculations)
        const hours = now.getHours();
        let nextPrayer = '';
        
        if (hours < 5) nextPrayer = 'Fajr at ' + prayerTimes.today.fajr;
        else if (hours < 13) nextPrayer = 'Dhuhr at ' + prayerTimes.today.dhuhr;
        else if (hours < 16) nextPrayer = 'Asr at ' + prayerTimes.today.asr;
        else if (hours < 19) nextPrayer = 'Maghrib at ' + prayerTimes.today.maghrib;
        else nextPrayer = 'Isha at ' + prayerTimes.today.isha;
        
        
        document.getElementById('next-prayer').textContent = `Next Prayer: ${nextPrayer}`;
    }
    function checkPrayerTime() {
        // Compare current time with prayer times
        if (timeUntilNextPrayer < 15) {
          showNotification(`Time for ${nextPrayerName} in ${timeUntilNextPrayer} minutes`);
        }
      }
    
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
    
    // Monthly Calendar
    const currentMonthElement = document.getElementById('current-month');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    let currentDate = new Date();
    
    function renderCalendar() {
        // Clear previous calendar
        calendarGrid.innerHTML = '';
        
        // Set month and year in header
        currentMonthElement.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        // Create day headers
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day header';
            dayElement.textContent = day;
            calendarGrid.appendChild(dayElement);
            
        });
        
        
        // Get first day of month and total days in month
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = i;
            
            // Highlight today
            const today = new Date();
            if (i === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    prevMonthBtn.addEventListener('click', function() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        renderCalendar();
    });
    
    nextMonthBtn.addEventListener('click', function() {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        renderCalendar();
    });
    
    // Initial calendar render
    renderCalendar();
    
    // Events Data (sample - replace with real data)
    const eventsList = document.getElementById('events-list');

const events = [
    {
        title: "Quran Competition",
        date: "June 15, 2023",
        time: "5:00 PM",
        description: "Annual Quran recitation competition for all age groups.",
        image: "quarn.jpg"  // Ensure the file exists in the same folder as the script
    },
    {
        title: "Islamic Finance Workshop",
        date: "June 20, 2023",
        time: "7:00 PM",
        description: "Learn about Islamic principles of finance and banking.",
        image: "financial.webp"  // Ensure the file exists in the same folder as the script
    },
    {
        title: "Friday Khutbah",
        date: "Every Friday",
        time: "1:15 PM",
        description: "Weekly congregational prayer with Khutbah by Imam.",
        image: "mufit.jpg"  // Ensure the file exists in the same folder as the script
    }
];

events.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.className = 'event-card';
    
    eventCard.innerHTML = `
        <div class="event-image">
            <img src="${event.image}" alt="${event.title}" loading="lazy">
        </div>
        <div class="event-details">
            <div class="event-date">
                <i class="fas fa-calendar-alt"></i>
                <span>${event.date} • ${event.time}</span>
            </div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
            <a href="#contact" class="btn btn-event">
                <i class="fas fa-user-plus"></i> Register
            </a>
        </div>
    `;
    
    eventsList.appendChild(eventCard);
});
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send this data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
    
    // Scroll Reveal Animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });

    
    
    scrollReveal.reveal('.hero-content', { delay: 300 });
    scrollReveal.reveal('.about-content, .prayer-times-container, .services-grid, .events-list, .contact-container', { interval: 200 });
});
// Example API call (using Aladhan API)
fetch(`http://api.aladhan.com/v1/timingsByCity?city=London&country=UK&method=2`)
  .then(response => response.json())
  .then(data => {
    // Update prayer times display
  });

  // Email Subscription
document.getElementById('subscribeForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('subscriber-email').value;
    const btn = this.querySelector('button');
    const originalText = btn.innerHTML;
    
    if (!email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    // UI feedback
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

    try {
        const response = await fetch('subscribe.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Subscription successful! Thank you.');
            document.getElementById('subscribeForm').reset();
        } else {
            alert(result.error || 'Subscription failed');
        }
    } catch (error) {
        alert('Network error. Please try again later.');
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
});
// Complete Translations Dictionary with Kinyarwanda

  // EndLanguage Switcher Functionality

  // Complete Translations Dictionary
const translations = {
    en: {
        "site-title": "DUFATANYE Markaz",
        "site-subtitle": "Center for Peace and Guidance",
        "notification-text": "Welcome to our Mosque - Friday Prayer at 1:30 PM",
        "nav-home": "Home",
        "nav-about": "About",
        "nav-prayer": "Prayer Times",
        "nav-services": "Services",
        "nav-contact": "Contact",
        "welcome-title": "Welcome to DUFATANYE MARKAZ",
        "welcome-subtitle": "A place of worship, learning, and community",
        "prayer-times-btn": "View Prayer Times",
        "prayer-times-title": "Prayer Times",
        "today-prayer": "Today's Prayer Times",
        "services-title": "Our Services",
        "daily-prayers": "Daily Prayers",
        "daily-prayers-desc": "All five daily prayers with Imam leadership.",
        "quran-classes": "Quran Classes",
        "contact-title": "Contact Us",
        "visit-us": "Visit Us",
        "address": "123 Peace Street",
        "footer-mission": "Center for worship and education",
        "rights-reserved": "All Rights Reserved"
    },
    fr: {
        "site-title": "DUFATANYE Markaz",
        "site-subtitle": "Centre pour la Paix et l'Orientation",
        "notification-text": "Bienvenue - Prière du vendredi à 13h30",
        "nav-home": "Accueil",
        "nav-about": "À propos",
        "nav-prayer": "Heures de prière",
        "nav-services": "Services",
        "nav-contact": "Contact",
        "welcome-title": "Bienvenue à DUFATANYE MARKAZ",
        "welcome-subtitle": "Lieu de culte et d'apprentissage",
        "prayer-times-btn": "Voir les heures",
        "prayer-times-title": "Heures de Prière",
        "today-prayer": "Heures d'aujourd'hui",
        "services-title": "Nos Services",
        "daily-prayers": "Prière quotidiennes",
        "quran-classes": "Cours de Coran",
        "contact-title": "Contactez-nous",
        "visit-us": "Visitez-nous",
        "address": "123 Rue de la Paix",
        "footer-mission": "Centre de culte et éducation",
        "rights-reserved": "Tous droits réservés"
    },
    ar: {
        "site-title": "مركز الدفاع",
        "site-subtitle": "مركز للسلام والإرشاد",
        "notification-text": "مرحبًا - صلاة الجمعة ١:٣٠ م",
        "nav-home": "الرئيسية",
        "nav-about": "من نحن",
        "nav-prayer": "أوقات الصلاة",
        "nav-services": "خدماتنا",
        "nav-contact": "اتصل بنا",
        "welcome-title": "مرحبًا بكم",
        "welcome-subtitle": "مكان للعبادة والتعلم",
        "prayer-times-btn": "عرض الأوقات",
        "prayer-times-title": "أوقات الصلاة",
        "today-prayer": "أوقات اليوم",
        "services-title": "خدماتنا",
        "daily-prayers": "الصلوات اليومية",
        "quran-classes": "دروس القرآن",
        "contact-title": "اتصل بنا",
        "visit-us": "زيارتنا",
        "address": "١٢٣ شارع السلام",
        "footer-mission": "مركز للعبادة والتعليم",
        "rights-reserved": "جميع الحقوق محفوظة"
    },
    nl: {
        "site-title": "DUFATANYE Markaz",
        "site-subtitle": "Centrum voor Vrede",
        "notification-text": "Welkom - Vrijdaggebed om 13:30",
        "nav-home": "Home",
        "nav-about": "Over Ons",
        "nav-prayer": "Gebedstijden",
        "nav-services": "Diensten",
        "nav-contact": "Contact",
        "welcome-title": "Welkom bij DUFATANYE",
        "welcome-subtitle": "Plaats voor gebed en leren",
        "prayer-times-btn": "Bekijk tijden",
        "prayer-times-title": "Gebedstijden",
        "today-prayer": "Gebeden vandaag",
        "services-title": "Onze Diensten",
        "daily-prayers": "Dagelijkse Gebeden",
        "quran-classes": "Koranlessen",
        "contact-title": "Contacteer Ons",
        "visit-us": "Bezoek Ons",
        "address": "123 Vredestraat",
        "footer-mission": "Centrum voor gebed",
        "rights-reserved": "Alle rechten voorbehouden"
    },
    rw: {
        "site-title": "DUFATANYE Markaz",
        "site-subtitle": "Ubutumwa bw'Amahoro n'Inama",
        "notification-text": "Murakaza neza - Iswala ry'Icyumweru saa 13:30",
        "nav-home": "Ahabanza",
        "nav-about": "Ibyerekeye",
        "nav-prayer": "Igihe cy'Amaswala",
        "nav-services": "Serivisi",
        "nav-contact": "Twandikire",
        "welcome-title": "Murakaza neza DUFATANYE MARKAZ",
        "welcome-subtitle": "Ahantu h'ugusenga, kwiga no kugirana umubano",
        "prayer-times-btn": "Reba Igihe cy'Amaswala",
        "prayer-times-title": "Igihe cy'Amaswala",
        "today-prayer": "Amaswala y'uyu munsi",
        "services-title": "Serivisi zacu",
        "daily-prayers": "Amaswala y'umunsi",
        "daily-prayers-desc": "Amaswala y'umunsi yose atanu afatanyirizwa hamwe n'Imam.",
        "quran-classes": "Amasomo y'Qur'an",
        "contact-title": "Twandikire",
        "visit-us": "Dusure",
        "address": "123 Umuhanda w'Amahoro",
        "footer-mission": "Ahantu h'ugusenga no kwiga",
        "rights-reserved": "Ubutaka bwose buraganirizwa"
    }
};

// Language Switcher Functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageSwitcher = document.querySelector('.language-switcher');
    const selectedLanguage = document.getElementById('selected-language');
    const langButtons = document.querySelectorAll('.language-dropdown button');
    
    // Language display names
    const languageNames = {
        en: "English",
        fr: "Français",
        ar: "العربية",
        nl: "Nederlands",  // Changed from Urdu
        rw: "Kinyarwanda"
    };
    
    // Set initial language
    let currentLang = localStorage.getItem('mosqueLang') || 'en';
    
    function updateTranslations(lang) {
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        
        // Update selected language display
        selectedLanguage.querySelector('span').textContent = languageNames[lang];
        
        // Update active button state
        langButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.language-dropdown button[data-lang="${lang}"]`).classList.add('active');
        
        // Handle RTL for Arabic/Urdu
        if (lang === 'ar' || lang === 'ur') {
            document.body.setAttribute('dir', 'rtl');
            document.body.style.textAlign = 'right';
        } else {
            document.body.removeAttribute('dir');
            document.body.style.textAlign = 'left';
        }
        
        // Save preference
        localStorage.setItem('mosqueLang', lang);
    }
    
    // Initialize
    updateTranslations(currentLang);
    
    // Toggle dropdown
    selectedLanguage.addEventListener('click', function(e) {
        languageSwitcher.classList.toggle('active');
        e.stopPropagation();
    });
    
    // Handle language selection
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            updateTranslations(lang);
            languageSwitcher.classList.remove('active');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        languageSwitcher.classList.remove('active');
    });
});
  
  // Update time
// Update time function
// Update time function
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
  });
  
  // Create or update the time display
  let timeDisplay = document.querySelector('.time-container');
  if (!timeDisplay) {
      timeDisplay = document.createElement('div');
      timeDisplay.className = 'time-container';
      document.querySelector('.notification-content').appendChild(timeDisplay);
  }
  
  timeDisplay.innerHTML = `
      <span class="time-label">Current-Time:</span>
      <span class="current-time">${timeString}</span>
  `;
}

// Initialize notification
function initNotification() {
  const notificationBar = document.querySelector('.mosque-notification-bar');
  
  // Only show on Fridays (5 = Friday)
  if (new Date().getDay() !== 5) {
      notificationBar.style.display = 'none';
      return;
  }
  
  // Add styles dynamically
  const style = document.createElement('style');
  style.textContent = `
      .time-container {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-left: 15px;
      }
      .time-label, .current-time {
          font-family: inherit; /* Matches parent font */
          font-size: inherit; /* Matches parent size */
          color: gold; /* Same gold color as time */
          font-weight: bold; /* Same weight as time */
      }
      .time-label {
          opacity: 0.8; /* Slightly muted for visual hierarchy */
      }
  `;
  document.head.appendChild(style);
  
  updateTime();
  setInterval(updateTime, 60000); // Update every minute
  
  document.querySelector('.close-btn').addEventListener('click', function() {
      notificationBar.style.display = 'none';
  });
}

document.addEventListener('DOMContentLoaded', initNotification);
 // End  Update time 


 