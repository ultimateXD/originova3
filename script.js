// ===========================
// AUTHENTICATION STATE
// ===========================

function setupAuthNavigation() {
    if (!window.OriginovaAuth || !window.OriginovaAuth.isAuthenticated()) {
        return;
    }

    const session = window.OriginovaAuth.getSession() || {};
    const loginNavButton = document.querySelector('.btn-login-nav');
    const mobileLoginLink = document.querySelector('.mobile-login-item a');

    const handleLogout = (event) => {
        event.preventDefault();
        window.OriginovaAuth.logout();
        window.location.href = 'login.html';
    };

    if (loginNavButton) {
        loginNavButton.textContent = 'Logout';
        loginNavButton.href = '#';
        loginNavButton.addEventListener('click', handleLogout);
    }

    if (mobileLoginLink) {
        mobileLoginLink.textContent = 'Logout';
        mobileLoginLink.href = '#';
        mobileLoginLink.addEventListener('click', handleLogout);
    }
}

setupAuthNavigation();

const isBookingPage = document.body?.classList.contains('booking-page');
const isHomePage = !isBookingPage;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ===========================
// NAVIGATION SCROLL EFFECT
// ===========================

const navbar = document.querySelector('.navbar');
const navLinksList = Array.from(document.querySelectorAll('.nav-link'));
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinkMap = new Map(
    navLinksList
        .filter(link => link.getAttribute('href')?.startsWith('#'))
        .map(link => [link.getAttribute('href').slice(1), link])
);
const heroImage = document.querySelector('.hero-image');
let scrollTicking = false;
let activeNavId = null;

// ===========================
// MOBILE MENU TOGGLE
// ===========================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
    });
});

// ===========================
// SMOOTH SCROLLING
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================

function updateScrollUI() {
    const scrollY = window.pageYOffset;

    if (navbar) {
        navbar.classList.toggle('scrolled', scrollY > 100);
    }

    if (heroImage && !prefersReducedMotion) {
        heroImage.style.transform = `translate3d(0, ${Math.round(scrollY * 0.35)}px, 0)`;
    }

    if (scrollToTopBtn) {
        const shouldShowScrollTop = scrollY > 500;
        scrollToTopBtn.style.opacity = shouldShowScrollTop ? '1' : '0';
        scrollToTopBtn.style.visibility = shouldShowScrollTop ? 'visible' : 'hidden';
    }

    if (sections.length > 0 && navLinksList.length > 0) {
        const currentSection = sections.find(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            return scrollY >= sectionTop && scrollY < sectionBottom;
        });

        const nextActiveId = currentSection?.id || null;
        if (nextActiveId !== activeNavId) {
            activeNavId = nextActiveId;
            navLinksList.forEach(link => link.classList.remove('active'));
            const activeLink = nextActiveId ? navLinkMap.get(nextActiveId) : null;
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    scrollTicking = false;
}

function requestScrollUIUpdate() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScrollUI);
}

window.addEventListener('scroll', requestScrollUIUpdate, { passive: true });

// ===========================
// SEARCH TABS
// ===========================

const searchTabs = document.querySelectorAll('.search-tab');

searchTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabText = tab.textContent.trim();

        // Handle different tab clicks
        if (tabText === 'Flights') {
            // Redirect to booking page
            window.location.href = 'booking-flight.html';
        } else if (tabText === 'Hotels') {
            showNotification('Hotel booking coming soon!', 'info');
        } else {
            // Destinations tab - keep current behavior
            searchTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        }
    });
});

// ===========================
// SEARCH FORM HANDLER
// ===========================

const floatingSearchForm = document.querySelector('.floating-search .search-form');

if (floatingSearchForm) {
    const searchButton = floatingSearchForm.querySelector('.btn-search');

    if (searchButton) {
        searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Get all inputs from the search form
            const locationInput = floatingSearchForm.querySelector('input[type="text"]');
            const dateInputs = floatingSearchForm.querySelectorAll('input[type="date"]');
            const guestsSelect = floatingSearchForm.querySelector('select');

            const formData = {
                location: locationInput ? locationInput.value : '',
                checkIn: dateInputs[0] ? dateInputs[0].value : '',
                checkOut: dateInputs[1] ? dateInputs[1].value : '',
                guests: guestsSelect ? guestsSelect.value : ''
            };


            if (formData.location && formData.checkIn && formData.checkOut) {
                showNotification('Searching for your perfect destination...', 'success');

                // Simulate search process
                setTimeout(() => {
                    showNotification('Results found! Explore our featured destinations below.', 'success');
                    document.querySelector('#destinations').scrollIntoView({ behavior: 'smooth' });
                }, 1500);
            } else {
                showNotification('Please fill in all required fields', 'error');
            }
        });
    } else {
    }

} else {
}


// ===========================
// DESTINATION CARDS INTERACTION
// ===========================

// Destination card interactions handled in new CTA section below

// ===========================
// OFFER CARDS INTERACTION
// ===========================

const offerCards = document.querySelectorAll('.offer-card');

offerCards.forEach(card => {
    const bookButton = card.querySelector('.btn-primary');

    if (bookButton) {
        bookButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const offerTitle = card.querySelector('.offer-title').textContent;
            const offerPrice = card.querySelector('.offer-price').textContent.trim().split(' ')[0];
            const offerDuration = card.querySelector('.offer-duration')?.textContent || '';
            const offerType = card.getAttribute('data-offer');

            // Prepare booking data
            const bookingData = {
                type: 'offer',
                name: offerTitle,
                price: offerPrice,
                amount: parseFloat(offerPrice.replace('$', '').replace(',', '')),
                duration: offerDuration,
                offerType: offerType,
                date: new Date().toISOString()
            };

            // Proceed to payment
            proceedToPayment(bookingData);
        });
    }
});

// ===========================
// CONTACT FORM HANDLER
// ===========================

const contactForm = document.querySelector('#contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            firstName: contactForm.querySelector('input[type="text"]:nth-of-type(1)').value,
            lastName: contactForm.querySelector('input[type="text"]:nth-of-type(2)').value,
            email: contactForm.querySelector('input[type="email"]').value,
            phone: contactForm.querySelector('input[type="tel"]').value,
            destination: contactForm.querySelector('select').value,
            message: contactForm.querySelector('textarea').value
        };

        if (formData.firstName && formData.lastName && formData.email && formData.message) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.textContent = 'Sending...';
            submitButton.style.pointerEvents = 'none';

            // Simulate form submission
            setTimeout(() => {
                showNotification('Message sent successfully! Our team will contact you within 24 hours.', 'success');
                contactForm.reset();
                submitButton.textContent = 'Send Message';
                submitButton.style.pointerEvents = 'auto';
            }, 1500);

        } else {
            showNotification('Please fill in all required fields', 'error');
        }
    });
}

// ===========================
// NEWSLETTER FORM HANDLER
// ===========================

const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (email && validateEmail(email)) {
            const submitButton = newsletterForm.querySelector('button');
            submitButton.textContent = '✓ Subscribed';
            submitButton.style.pointerEvents = 'none';

            showNotification('Successfully subscribed to our newsletter!', 'success');
            emailInput.value = '';

            setTimeout(() => {
                submitButton.textContent = 'Subscribe';
                submitButton.style.pointerEvents = 'auto';
            }, 3000);
        } else {
            showNotification('Please enter a valid email address', 'error');
        }
    });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animatedCards = document.querySelectorAll('.destination-card, .service-card, .offer-card');

if (animatedCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ===========================
// PARALLAX EFFECT FOR HERO
// ===========================

// ===========================
// HERO BUTTONS INTERACTION
// ===========================

const heroBtns = document.querySelectorAll('.hero-buttons .btn-primary');

heroBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('Explore')) {
            document.querySelector('#destinations').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===========================
// UTILITY FUNCTIONS
// ===========================

let notificationStylesInjected = false;

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    if (!notificationStylesInjected) {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        notificationStylesInjected = true;
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '40px',
        padding: '16px 24px',
        background: type === 'success' ? 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)' :
                    type === 'error' ? 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' :
                    'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
        color: type === 'info' ? '#fff' : '#000',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        zIndex: '10000',
        fontSize: '14px',
        fontWeight: '600',
        maxWidth: '400px',
        animation: 'slideInRight 0.4s ease',
        backdropFilter: 'blur(10px)'
    });

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 4000);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===========================
// CURSOR EFFECT (OPTIONAL)
// ===========================

const canUseCustomCursor = isHomePage && window.innerWidth > 968 && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion;
let cursor = null;

if (canUseCustomCursor) {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    Object.assign(cursor.style, {
        width: '20px',
        height: '20px',
        border: '2px solid #d4af37',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.2s ease',
        display: 'block'
    });

    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll('a, button, .destination-card, .service-card, .offer-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(212, 175, 55, 0.2)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });
}

// ===========================
// SCROLL TO TOP BUTTON
// ===========================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';

Object.assign(scrollToTopBtn.style, {
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    width: '56px',
    height: '56px',
    background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)',
    color: '#000',
    border: 'none',
    borderRadius: '50%',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: '9999',
    opacity: '0',
    visibility: 'hidden',
    transition: 'all 0.4s ease',
    boxShadow: '0 4px 16px rgba(212, 175, 55, 0.3)'
});

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
});

requestScrollUIUpdate();

// ===========================
// LOADING ANIMATION
// ===========================

window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
});

// ===========================
// DATE PICKER INITIALIZATION
// ===========================

// Set minimum date to today for date inputs
const dateInputs = document.querySelectorAll('input[type="date"]');
const today = new Date().toISOString().split('T')[0];

dateInputs.forEach(input => {
    input.setAttribute('min', today);
});

// Auto-fill check-out date when check-in is selected
const checkInInputs = document.querySelectorAll('input[type="date"]:nth-of-type(1)');
const checkOutInputs = document.querySelectorAll('input[type="date"]:nth-of-type(2)');

checkInInputs.forEach((checkIn, index) => {
    checkIn.addEventListener('change', () => {
        const checkInDate = new Date(checkIn.value);
        checkInDate.setDate(checkInDate.getDate() + 3); // Default 3 nights
        const checkOutDate = checkInDate.toISOString().split('T')[0];

        if (checkOutInputs[index]) {
            checkOutInputs[index].value = checkOutDate;
            checkOutInputs[index].setAttribute('min', checkIn.value);
        }
    });
});


// ===========================
// FLIGHT BOOKING SYSTEM
// ===========================

// Fake flight data - easily editable
const FLIGHT_DATA = {
    airlines: [
        { name: 'EgyptAir', code: 'MS', icon: '🛫' },
        { name: 'Emirates', code: 'EK', icon: '✈️' },
        { name: 'Qatar Airways', code: 'QR', icon: '🛩️' },
        { name: 'Turkish Airlines', code: 'TK', icon: '🛬' },
        { name: 'Etihad Airways', code: 'EY', icon: '✈️' },
        { name: 'Lufthansa', code: 'LH', icon: '🛫' }
    ],

    routes: {
        'Cairo': ['Dubai', 'London', 'Paris', 'New York', 'Istanbul', 'Riyadh', 'Jeddah'],
        'Dubai': ['Cairo', 'London', 'Paris', 'New York', 'Mumbai', 'Singapore'],
        'London': ['Cairo', 'Dubai', 'Paris', 'New York', 'Rome', 'Madrid'],
        'Paris': ['Cairo', 'Dubai', 'London', 'New York', 'Rome', 'Berlin'],
        'New York': ['Cairo', 'Dubai', 'London', 'Paris', 'Los Angeles', 'Miami'],
        'Istanbul': ['Cairo', 'Dubai', 'London', 'Paris', 'Berlin', 'Athens'],
        'Riyadh': ['Cairo', 'Dubai', 'London', 'Jeddah', 'Kuwait', 'Doha'],
        'Jeddah': ['Cairo', 'Dubai', 'Riyadh', 'Istanbul', 'London', 'Paris']
    },

    // Base prices per route (in USD)
    basePrices: {
        short: 150,      // < 3 hours
        medium: 350,     // 3-7 hours
        long: 650        // > 7 hours
    },

    // Cabin class multipliers
    cabinMultipliers: {
        economy: 1,
        premium: 1.5,
        business: 3,
        first: 5
    }
};

// Trip type handling
const tripTypeTabs = document.querySelectorAll('.trip-type-tab');
const returnDateField = document.querySelector('.return-date-field');
let currentTripType = 'oneway';

if (tripTypeTabs.length > 0 && returnDateField) {
    tripTypeTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission
            tripTypeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTripType = tab.dataset.trip;

            // Show/hide return date based on trip type
            if (currentTripType === 'roundtrip') {
                returnDateField.style.display = 'flex';
                const returnDateInput = document.getElementById('returnDate');
                if (returnDateInput) returnDateInput.required = true;
            } else {
                returnDateField.style.display = 'none';
                const returnDateInput = document.getElementById('returnDate');
                if (returnDateInput) returnDateInput.required = false;
            }

            if (currentTripType === 'multicity') {
                showNotification('Multi-city booking coming soon!', 'info');
            }
        });
    });
}

// Set minimum date to today for flight dates
const departureDateInput = document.getElementById('departureDate');
const returnDateInput = document.getElementById('returnDate');

if (departureDateInput) {
    departureDateInput.setAttribute('min', today);
}
if (returnDateInput) {
    returnDateInput.setAttribute('min', today);
}

// Flight search form handler
const flightSearchForm = document.getElementById('flightSearchForm');

if (flightSearchForm) {

    // Add submit event listener
    flightSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Get form values
        const from = document.getElementById('flightFrom').value.trim();
        const to = document.getElementById('flightTo').value.trim();
        const departureDate = document.getElementById('departureDate').value;
        const returnDate = document.getElementById('returnDate').value;
        const travellers = parseInt(document.getElementById('travellers').value);
        const cabinClass = document.getElementById('cabinClass').value;


        // Validate
        if (!from || !to || !departureDate) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        if (currentTripType === 'roundtrip' && !returnDate) {
            showNotification('Please select a return date', 'error');
            return;
        }

        if (currentTripType === 'multicity') {
            showNotification('Multi-city booking is coming soon!', 'info');
            return;
        }

        // Show loading
        showNotification('Searching for flights...', 'info');

        // Generate and display results
        setTimeout(() => {
            const flights = generateFlights(from, to, departureDate, returnDate, travellers, cabinClass);
            displayFlightResults(flights, from, to, travellers, cabinClass);

            // Scroll to results
            document.getElementById('flightResults').scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });

} else {
}


// Generate fake flight results
function generateFlights(from, to, departureDate, returnDate, travellers, cabinClass) {
    const flights = [];
    const numFlights = Math.floor(Math.random() * 3) + 4; // 4-6 flights

    // Extract city names (remove airport codes if present)
    const fromCity = from.split('(')[0].trim();
    const toCity = to.split('(')[0].trim();

    // Calculate flight duration based on route
    const duration = calculateDuration(fromCity, toCity);

    for (let i = 0; i < numFlights; i++) {
        const airline = FLIGHT_DATA.airlines[Math.floor(Math.random() * FLIGHT_DATA.airlines.length)];
        const flightNumber = airline.code + Math.floor(Math.random() * 9000 + 1000);

        // Generate departure time
        const depHour = Math.floor(Math.random() * 20) + 4; // 4am - 11pm
        const depMinute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
        const departureTime = `${depHour.toString().padStart(2, '0')}:${depMinute.toString().padStart(2, '0')}`;

        // Calculate arrival time
        const arrivalTime = calculateArrivalTime(departureTime, duration);

        // Determine stops
        const stops = duration > 6 ? (Math.random() > 0.5 ? 'Direct' : '1 Stop') : 'Direct';

        // Calculate price
        let basePrice;
        if (duration < 3) basePrice = FLIGHT_DATA.basePrices.short;
        else if (duration < 7) basePrice = FLIGHT_DATA.basePrices.medium;
        else basePrice = FLIGHT_DATA.basePrices.long;

        // Apply cabin class multiplier
        basePrice *= FLIGHT_DATA.cabinMultipliers[cabinClass];

        // Add some randomness
        basePrice += Math.floor(Math.random() * 100) - 50;

        // Double price for round trip
        if (currentTripType === 'roundtrip') {
            basePrice *= 2;
        }

        // Multiply by travellers
        const totalPrice = Math.round(basePrice * travellers);

        // Refundable status
        const refundable = Math.random() > 0.6;

        const seatMap = createSeatMap(cabinClass, travellers);
        const freeSeats = countAvailableSeats(seatMap);

        flights.push({
            id: `${flightNumber}-${Date.now()}-${i}`,
            airline: airline.name,
            airlineIcon: airline.icon,
            flightNumber,
            from: fromCity,
            to: toCity,
            departureTime,
            arrivalTime,
            duration: formatDuration(duration),
            stops,
            cabinClassKey: cabinClass,
            cabinClass: formatCabinClass(cabinClass),
            seatMap,
            freeSeats,
            capacity: seatMap.length,
            price: totalPrice,
            pricePerPerson: Math.round(totalPrice / travellers),
            refundable,
            departureDate,
            returnDate
        });
    }

    // Sort by price
    flights.sort((a, b) => a.price - b.price);

    return flights;
}

// Calculate flight duration based on cities
function calculateDuration(from, to) {
    const distances = {
        'Cairo-Dubai': 3.5,
        'Cairo-London': 5,
        'Cairo-Paris': 4.5,
        'Cairo-New York': 11,
        'Cairo-Istanbul': 2.5,
        'Dubai-London': 7,
        'Dubai-Paris': 7.5,
        'London-Paris': 1.5,
        'London-New York': 8
    };

    const key1 = `${from}-${to}`;
    const key2 = `${to}-${from}`;

    if (distances[key1]) return distances[key1];
    if (distances[key2]) return distances[key2];

    // Default random duration
    return Math.floor(Math.random() * 8) + 2;
}

// Calculate arrival time
function calculateArrivalTime(departureTime, duration) {
    const [depHour, depMinute] = departureTime.split(':').map(Number);
    const totalMinutes = depHour * 60 + depMinute + duration * 60;
    const arrHour = Math.floor(totalMinutes / 60) % 24;
    const arrMinute = totalMinutes % 60;
    return `${arrHour.toString().padStart(2, '0')}:${arrMinute.toString().padStart(2, '0')}`;
}

// Format duration
function formatDuration(hours) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
}

// Format cabin class
function formatCabinClass(cabin) {
    const classes = {
        economy: 'Economy',
        premium: 'Premium Economy',
        business: 'Business Class',
        first: 'First Class'
    };
    return classes[cabin] || 'Economy';
}

const seatSelectionState = {
    flight: null,
    travellers: 0,
    selectedSeats: [],
    totalWithFees: 0
};

// Handle scroll hint for mobile seat map
function initSeatMapScrollHint() {
    const seatMapStage = document.querySelector('.seat-map-stage');
    if (!seatMapStage) return;
    
    seatMapStage.addEventListener('scroll', function() {
        if (this.scrollLeft > 20) {
            this.classList.add('scrolled');
        } else {
            this.classList.remove('scrolled');
        }
    }, { passive: true });
}

// Seat layout definitions per cabin class
// layout: defines the physical column groups separated by aisles
// Each entry in `groups` is an array of column letters for that block
// premiumRows: exit/premium rows (row offsets from startRow, 0-indexed)
function getSeatLayout(cabinClass) {
    const layouts = {
        // A330-200 style: 2-4-2
        economy: {
            startRow: 10,
            rows: 20,
            groups: [['A', 'B'], ['C', 'D', 'E', 'F'], ['G', 'H']],
            premiumRows: [4, 5],      // exit rows (0-indexed offsets)
            cssLayout: 'layout-2-4-2',
            seatFeeStd: 0,
            seatFeePremium: 25
        },
        // Premium economy: 2-4-2 fewer rows
        premium: {
            startRow: 6,
            rows: 10,
            groups: [['A', 'B'], ['C', 'D', 'E', 'F'], ['G', 'H']],
            premiumRows: [0, 1],
            cssLayout: 'layout-2-4-2',
            seatFeeStd: 15,
            seatFeePremium: 40
        },
        // Business: 2-2
        business: {
            startRow: 2,
            rows: 8,
            groups: [['A', 'C'], ['D', 'F']],
            premiumRows: [0],
            cssLayout: 'layout-2-2',
            seatFeeStd: 0,
            seatFeePremium: 75
        },
        // First: 1-2-1
        first: {
            startRow: 1,
            rows: 4,
            groups: [['A'], ['C', 'D'], ['F']],
            premiumRows: [],
            cssLayout: 'layout-1-2-1',
            seatFeeStd: 0,
            seatFeePremium: 0
        }
    };

    return layouts[cabinClass] || layouts.economy;
}

function createSeatMap(cabinClass, travellers) {
    const layout = getSeatLayout(cabinClass);
    const allColumns = layout.groups.flat();
    const minAvailable = Math.max(travellers + 8, Math.floor(layout.rows * allColumns.length * 0.45));
    const seatMap = [];

    allColumns.forEach((column, columnIndex) => {
        const isWindow = columnIndex === 0 || columnIndex === allColumns.length - 1;
        const isAisle = layout.groups.some((group, gi) => {
            // Last column of a non-last group or first column of a non-first group
            const lastInGroup = group[group.length - 1] === column && gi < layout.groups.length - 1;
            const firstInGroup = group[0] === column && gi > 0;
            return lastInGroup || firstInGroup;
        });
        const groupIndex = layout.groups.findIndex(g => g.includes(column));

        for (let rowOffset = 0; rowOffset < layout.rows; rowOffset++) {
            const rowNumber = layout.startRow + rowOffset;
            const isPremiumRow = layout.premiumRows.includes(rowOffset);
            seatMap.push({
                id: `${rowNumber}${column}`,
                row: rowNumber,
                column,
                columnIndex,
                groupIndex,
                status: Math.random() > 0.33 ? 'available' : 'occupied',
                type: isPremiumRow ? 'premium' : (isWindow ? (columnIndex === 0 ? 'window-left' : 'window-right') : isAisle ? 'aisle' : 'middle')
            });
        }
    });

    while (countAvailableSeats(seatMap) < minAvailable) {
        const occupiedSeats = seatMap.filter(seat => seat.status === 'occupied');
        if (!occupiedSeats.length) break;
        occupiedSeats[Math.floor(Math.random() * occupiedSeats.length)].status = 'available';
    }

    return seatMap.sort((a, b) => {
        if (a.row === b.row) return a.column.localeCompare(b.column);
        return a.row - b.row;
    });
}

function countAvailableSeats(seatMap) {
    return seatMap.filter(seat => seat.status === 'available').length;
}

function openSeatSelectionModal(flight, travellers) {
    const modal = document.getElementById('seatSelectionModal');
    if (!modal) {
        showNotification('Seat selection is unavailable right now.', 'error');
        return;
    }

    seatSelectionState.flight = flight;
    seatSelectionState.travellers = travellers;
    seatSelectionState.selectedSeats = [];
    seatSelectionState.totalWithFees = flight.price;

    renderSeatSelectionModal();

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    
    // Initialize scroll hint for mobile
    requestAnimationFrame(initSeatMapScrollHint);
}

function closeSeatSelectionModal() {
    const modal = document.getElementById('seatSelectionModal');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function renderSeatSelectionModal() {
    const { flight, travellers, selectedSeats } = seatSelectionState;
    if (!flight) return;

    const seatMapGrid = document.getElementById('seatMapGrid');
    const seatColHeaders = document.getElementById('seatColHeaders');
    const seatFlightSummary = document.getElementById('seatFlightSummary');
    const availabilityCount = document.getElementById('seatAvailabilityCount');
    const neededCount = document.getElementById('seatNeededCount');
    const selectedPreview = document.getElementById('selectedSeatsPreview');
    const confirmButton = document.getElementById('confirmSeatReservation');

    if (!seatMapGrid || !seatFlightSummary || !availabilityCount || !neededCount || !selectedPreview || !confirmButton) {
        return;
    }

    const layout = getSeatLayout(flight.cabinClassKey);
    const freeSeats = countAvailableSeats(flight.seatMap);
    flight.freeSeats = freeSeats;

    // --- Flight Summary ---
    seatFlightSummary.innerHTML = `
        <h4>${flight.airline} &middot; ${flight.flightNumber}</h4>
        <p>${flight.from} &rarr; ${flight.to}</p>
        <p>${formatDate(flight.departureDate)} &middot; ${flight.departureTime} &ndash; ${flight.arrivalTime}</p>
        <p>${flight.cabinClass} &middot; ${flight.stops}</p>
    `;

    availabilityCount.textContent = `${freeSeats} free`;
    neededCount.textContent = `${travellers} ${travellers === 1 ? 'seat' : 'seats'}`;

    // --- Legend prices ---
    const legendPriceStd = document.getElementById('legendPriceStd');
    const legendPricePremium = document.getElementById('legendPricePremium');
    if (legendPriceStd) legendPriceStd.textContent = layout.seatFeeStd > 0 ? `+$${layout.seatFeeStd}` : 'Free';
    if (legendPricePremium) legendPricePremium.textContent = `+$${layout.seatFeePremium}`;

    // --- Selected Seats Preview ---
    if (!selectedSeats.length) {
        selectedPreview.textContent = 'No seats selected yet';
    } else {
        selectedPreview.innerHTML = selectedSeats
            .map(seatId => `<span class="selected-seat-chip">${seatId}</span>`)
            .join('');
    }

    // --- Booking Summary ---
    updateBookingSummary(flight, travellers, selectedSeats, layout);

    // --- Confirm Button ---
    confirmButton.disabled = selectedSeats.length !== travellers;
    confirmButton.innerHTML = selectedSeats.length === travellers
        ? `Reserve ${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''} &rarr;`
        : `Select ${travellers - selectedSeats.length} More Seat${travellers - selectedSeats.length === 1 ? '' : 's'}`;

    // --- Build seat map ---
    const rows = [...new Set(flight.seatMap.map(seat => seat.row))];
    const allColumns = layout.groups.flat();

    // Column header row
    if (seatColHeaders) {
        const headerCols = buildRowGridStyle(layout);
        seatColHeaders.innerHTML = `
            <div class="seat-col-headers seat-row ${layout.cssLayout}" style="margin-bottom:4px;">
                <div></div>
                ${allColumns.map((col, i) => {
                    // Insert aisle gap markers
                    const colHtml = `<div class="seat-col-header">${col}</div>`;
                    // Check if we need an aisle gap before this column
                    const needsAisleBefore = layout.groups.some((g, gi) => gi > 0 && g[0] === col);
                    return needsAisleBefore
                        ? `<div class="aisle-gap"></div>${colHtml}`
                        : colHtml;
                }).join('')}
            </div>
        `;
    }

    // Determine if we need to add a section label for premium rows
    const premiumRowNumbers = layout.premiumRows.map(offset => layout.startRow + offset);
    let sectionLabelRendered = false;
    let premiumSectionLabelRendered = false;

    seatMapGrid.innerHTML = rows.map(rowNum => {
        const rowSeats = flight.seatMap.filter(seat => seat.row === rowNum);
        let labelHtml = '';

        if (!premiumSectionLabelRendered && premiumRowNumbers.includes(rowNum)) {
            premiumSectionLabelRendered = true;
            labelHtml = `<div class="seat-section-label"><span class="seat-section-label-text">Exit / Premium Rows</span></div>`;
        } else if (!sectionLabelRendered && !premiumRowNumbers.includes(rowNum) && premiumSectionLabelRendered) {
            sectionLabelRendered = true;
            labelHtml = `<div class="seat-section-label"><span class="seat-section-label-text">Standard Rows</span></div>`;
        } else if (!sectionLabelRendered && rowNum === rows[0]) {
            sectionLabelRendered = true;
            const sectionName = { economy: 'Economy Class', premium: 'Premium Economy', business: 'Business Class', first: 'First Class' }[flight.cabinClassKey] || 'Economy Class';
            labelHtml = `<div class="seat-section-label"><span class="seat-section-label-text">${sectionName}</span></div>`;
        }

        return `${labelHtml}${renderSeatRow(rowNum, rowSeats, layout)}`;
    }).join('');

    // Use event delegation - attach listener once to parent instead of each button
    // Remove old listener first to prevent duplicates
    seatMapGrid.removeEventListener('click', handleSeatMapClick);
    seatMapGrid.addEventListener('click', handleSeatMapClick);
}

// Event delegation handler for seat map clicks - better performance
function handleSeatMapClick(e) {
    const button = e.target.closest('.seat-btn:not([disabled])');
    if (button && button.dataset.seatId) {
        toggleSeatSelection(button.dataset.seatId);
    }
}

function buildRowGridStyle(layout) {
    // Not needed for CSS grid, handled via layout class
    return '';
}

function renderSeatRow(rowNum, rowSeats, layout) {
    const seatsByCol = {};
    rowSeats.forEach(s => { seatsByCol[s.column] = s; });

    const allColumns = layout.groups.flat();
    const cells = [];

    // row label
    cells.push(`<div class="row-label">${rowNum}</div>`);

    allColumns.forEach((col, i) => {
        const needsAisleBefore = layout.groups.some((g, gi) => gi > 0 && g[0] === col);
        if (needsAisleBefore) {
            cells.push(`<div class="aisle-gap"><div class="aisle-gap-inner"></div></div>`);
        }

        const seat = seatsByCol[col];
        if (seat) {
            cells.push(renderSeatButton(seat));
        } else {
            cells.push(`<div></div>`);
        }
    });

    return `<div class="seat-row ${layout.cssLayout}" role="row">${cells.join('')}</div>`;
}

function updateBookingSummary(flight, travellers, selectedSeats, layout) {
    const baseFareEl = document.getElementById('summaryBaseFare');
    const seatFeeEl = document.getElementById('summarySeatFee');
    const seatFeeRowEl = document.getElementById('summarySeatFeeRow');
    const totalEl = document.getElementById('summaryTotal');

    if (!baseFareEl || !seatFeeEl || !totalEl) return;

    const baseTotal = flight.price;
    baseFareEl.textContent = `$${baseTotal.toLocaleString()}`;

    // Calculate seat fee for selected premium seats
    let seatFeeTotal = 0;
    selectedSeats.forEach(seatId => {
        const seat = flight.seatMap.find(s => s.id === seatId);
        if (seat) {
            if (seat.type === 'premium') {
                seatFeeTotal += layout.seatFeePremium;
            } else {
                seatFeeTotal += layout.seatFeeStd;
            }
        }
    });

    if (seatFeeTotal > 0) {
        seatFeeEl.textContent = `+$${seatFeeTotal.toLocaleString()}`;
        if (seatFeeRowEl) seatFeeRowEl.style.display = 'flex';
    } else {
        if (seatFeeRowEl) seatFeeRowEl.style.display = 'none';
    }

    const grandTotal = baseTotal + seatFeeTotal;
    totalEl.textContent = `$${grandTotal.toLocaleString()}`;
    seatSelectionState.totalWithFees = grandTotal;
}

function renderSeatButton(seat) {
    const isSelected = seatSelectionState.selectedSeats.includes(seat.id);
    const isOccupied = seat.status === 'occupied';
    // Build class list — include type class for styling (window-left, window-right, aisle, middle, premium)
    const classes = [
        'seat-btn',
        seat.status,   // 'available' or 'occupied'
        seat.type,     // 'premium', 'window-left', 'window-right', 'aisle', 'middle'
        isSelected ? 'selected' : ''
    ].filter(Boolean).join(' ');

    const layout = getSeatLayout(seatSelectionState.flight?.cabinClassKey || 'economy');
    const feeLabel = seat.type === 'premium' && layout.seatFeePremium > 0
        ? ` +$${layout.seatFeePremium}`
        : (layout.seatFeeStd > 0 && !isOccupied ? ` +$${layout.seatFeeStd}` : '');

    return `<button
        type="button"
        class="${classes}"
        data-seat-id="${seat.id}"
        aria-label="Seat ${seat.id}${isOccupied ? ', reserved' : ''}${isSelected ? ', selected' : ''}"
        aria-pressed="${isSelected}"
        ${isOccupied ? 'disabled aria-disabled="true"' : ''}
    >${seat.id}</button>`;
}

function toggleSeatSelection(seatId) {
    const { selectedSeats, travellers, flight } = seatSelectionState;
    const selectedIndex = selectedSeats.indexOf(seatId);

    if (selectedIndex > -1) {
        selectedSeats.splice(selectedIndex, 1);
    } else {
        if (selectedSeats.length >= travellers) {
            showNotification(`You can select up to ${travellers} seat${travellers === 1 ? '' : 's'} for this booking.`, 'info');
            return;
        }
        selectedSeats.push(seatId);
        selectedSeats.sort((a, b) => {
            const rowA = parseInt(a, 10);
            const rowB = parseInt(b, 10);
            if (rowA === rowB) return a.localeCompare(b);
            return rowA - rowB;
        });
    }
    
    // Optimized update - only update changed elements instead of full re-render
    updateSeatSelectionUI(seatId, flight, travellers, selectedSeats);
}

// Lightweight UI update function - avoids full DOM rebuild
function updateSeatSelectionUI(changedSeatId, flight, travellers, selectedSeats) {
    const layout = getSeatLayout(flight.cabinClassKey);
    
    // Update only the changed seat button
    const seatBtn = document.querySelector(`.seat-btn[data-seat-id="${changedSeatId}"]`);
    if (seatBtn) {
        const isSelected = selectedSeats.includes(changedSeatId);
        seatBtn.classList.toggle('selected', isSelected);
        seatBtn.setAttribute('aria-pressed', isSelected.toString());
    }
    
    // Update selected seats preview (lightweight innerHTML)
    const selectedPreview = document.getElementById('selectedSeatsPreview');
    if (selectedPreview) {
        if (!selectedSeats.length) {
            selectedPreview.textContent = 'No seats selected yet';
        } else {
            selectedPreview.innerHTML = selectedSeats
                .map(id => `<span class="selected-seat-chip">${id}</span>`)
                .join('');
        }
    }
    
    // Update booking summary
    updateBookingSummary(flight, travellers, selectedSeats, layout);
    
    // Update confirm button
    const confirmButton = document.getElementById('confirmSeatReservation');
    if (confirmButton) {
        confirmButton.disabled = selectedSeats.length !== travellers;
        confirmButton.innerHTML = selectedSeats.length === travellers
            ? `Reserve ${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''} &rarr;`
            : `Select ${travellers - selectedSeats.length} More Seat${travellers - selectedSeats.length === 1 ? '' : 's'}`;
    }
}

function confirmSeatReservation() {
    const { flight, selectedSeats, travellers, totalWithFees } = seatSelectionState;
    if (!flight) return;

    if (selectedSeats.length !== travellers) {
        showNotification(`Please choose ${travellers} seat${travellers === 1 ? '' : 's'} before reserving.`, 'error');
        return;
    }

    selectedSeats.forEach(seatId => {
        const seat = flight.seatMap.find(item => item.id === seatId);
        if (seat) seat.status = 'occupied';
    });

    flight.freeSeats = countAvailableSeats(flight.seatMap);
    updateFlightSeatBadges(flight.id, flight.freeSeats);
    closeSeatSelectionModal();

    const finalAmount = totalWithFees || flight.price;

    const bookingData = {
        type: 'flight',
        name: `${flight.airline} ${flight.flightNumber}`,
        airline: flight.airline,
        flightNumber: flight.flightNumber,
        from: flight.from,
        to: flight.to,
        departureDate: flight.departureDate,
        returnDate: flight.returnDate,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        duration: flight.duration,
        stops: flight.stops,
        cabinClass: flight.cabinClass,
        travellers,
        tripType: currentTripType,
        refundable: flight.refundable,
        price: `$${finalAmount.toLocaleString()}`,
        amount: finalAmount,
        pricePerPerson: Math.round(finalAmount / travellers),
        selectedSeats: [...selectedSeats],
        seatsReserved: true,
        freeSeatsRemaining: flight.freeSeats,
        date: new Date().toISOString()
    };

    showNotification(`Seats ${selectedSeats.join(', ')} reserved successfully!`, 'success');
    proceedToPayment(bookingData);
}

function updateFlightSeatBadges(flightId, freeSeats) {
    const seatBadges = document.querySelectorAll(`[data-flight-seat-id="${flightId}"]`);
    seatBadges.forEach(badge => {
        badge.innerHTML = `${freeSeats} free seats <span>live availability</span>`;
    });
}

// Display flight results
function displayFlightResults(flights, from, to, travellers, cabinClass) {
    const resultsSection = document.getElementById('flightResults');
    const resultsList = document.getElementById('flightResultsList');
    const resultsCount = document.querySelector('.results-count');

    if (!resultsSection || !resultsList || !resultsCount) {
        console.error('Flight results elements not found');
        return;
    }

    // Clear previous results
    resultsList.innerHTML = '';

    // Update count
    const tripTypeText = currentTripType === 'roundtrip' ? 'round-trip' : 'one-way';
    resultsCount.textContent = `${flights.length} ${tripTypeText} flights found from ${from} to ${to}`;

    // Generate flight cards
    flights.forEach(flight => {
        const card = document.createElement('div');
        card.className = 'flight-result-card';

        // Build return flight info if round trip
        let returnFlightHTML = '';
        if (currentTripType === 'roundtrip' && flight.returnDate) {
            returnFlightHTML = `
                <div class="return-flight-divider">
                    <span>Return Flight</span>
                </div>
                <div class="flight-card-body">
                    <div class="flight-time-info">
                        <div class="flight-time">${flight.departureTime}</div>
                        <div class="flight-location">${flight.to}</div>
                    </div>

                    <div class="flight-duration-info">
                        <div class="flight-duration">${flight.duration}</div>
                        <div class="flight-route">
                            <span class="route-line"></span>
                        </div>
                        <div class="flight-stops">${flight.stops}</div>
                    </div>

                    <div class="flight-time-info">
                        <div class="flight-time">${flight.arrivalTime}</div>
                        <div class="flight-location">${flight.from}</div>
                    </div>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="flight-card-header">
                <div class="flight-card-topline">
                    <div class="airline-info">
                        <div class="airline-logo">${flight.airlineIcon}</div>
                        <div class="airline-details">
                            <h4>${flight.airline}</h4>
                            <p class="flight-number">${flight.flightNumber}</p>
                        </div>
                    </div>
                    <div class="flight-seat-badge" data-flight-seat-id="${flight.id}">
                        ${flight.freeSeats} free seats <span>live availability</span>
                    </div>
                </div>
                <span class="flight-badge ${flight.refundable ? 'badge-refundable' : 'badge-non-refundable'}">
                    ${flight.refundable ? 'Refundable' : 'Non-refundable'}
                </span>
            </div>

            <div class="flight-card-body">
                <div class="flight-time-info">
                    <div class="flight-time">${flight.departureTime}</div>
                    <div class="flight-location">${flight.from}</div>
                </div>

                <div class="flight-duration-info">
                    <div class="flight-duration">${flight.duration}</div>
                    <div class="flight-route">
                        <span class="route-line"></span>
                    </div>
                    <div class="flight-stops">${flight.stops}</div>
                </div>

                <div class="flight-time-info">
                    <div class="flight-time">${flight.arrivalTime}</div>
                    <div class="flight-location">${flight.to}</div>
                </div>
            </div>

            ${returnFlightHTML}

            <div class="flight-card-footer">
                <div class="flight-details-list">
                    <div class="flight-detail-item">
                        <span class="detail-label">Cabin</span>
                        <span class="detail-value">${flight.cabinClass}</span>
                    </div>
                    <div class="flight-detail-item">
                        <span class="detail-label">Travellers</span>
                        <span class="detail-value">${travellers}</span>
                    </div>
                    <div class="flight-detail-item">
                        <span class="detail-label">Free Seats</span>
                        <span class="detail-value">${flight.freeSeats}/${flight.capacity}</span>
                    </div>
                    <div class="flight-detail-item">
                        <span class="detail-label">Departure</span>
                        <span class="detail-value">${formatDate(flight.departureDate)}</span>
                    </div>
                    ${currentTripType === 'roundtrip' && flight.returnDate ? `
                    <div class="flight-detail-item">
                        <span class="detail-label">Return</span>
                        <span class="detail-value">${formatDate(flight.returnDate)}</span>
                    </div>
                    ` : ''}
                </div>

                <div class="flight-price-section">
                    <div class="flight-price">$${flight.price.toLocaleString()}</div>
                    <div class="price-per-person">$${flight.pricePerPerson.toLocaleString()} per person</div>
                    <button class="btn-book-flight">Book Now</button>
                </div>
            </div>
        `;

        // Add book button handler
        const bookBtn = card.querySelector('.btn-book-flight');
        bookBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSeatSelectionModal(flight, travellers);
        });

        resultsList.appendChild(card);
    });

    // Show results section
    resultsSection.style.display = 'block';
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

const seatSelectionModal = document.getElementById('seatSelectionModal');
const seatModalCloseButton = document.getElementById('closeSeatSelection');
const seatConfirmButton = document.getElementById('confirmSeatReservation');

document.querySelectorAll('[data-close-seat-modal]').forEach(closeTarget => {
    closeTarget.addEventListener('click', closeSeatSelectionModal);
});

if (seatModalCloseButton) {
    seatModalCloseButton.addEventListener('click', closeSeatSelectionModal);
}

if (seatConfirmButton) {
    seatConfirmButton.addEventListener('click', confirmSeatReservation);
}

if (seatSelectionModal) {
    seatSelectionModal.addEventListener('click', (event) => {
        if (event.target === seatSelectionModal) {
            closeSeatSelectionModal();
        }
    });
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && seatSelectionModal && seatSelectionModal.classList.contains('active')) {
        closeSeatSelectionModal();
    }
});

// ===========================
// END FLIGHT BOOKING SYSTEM
// ===========================

// ===========================
// VIDEO MODAL HANDLER
// ===========================

const videoModal = document.getElementById("videoModal");
const openVideoBtn = document.getElementById("openVideoBtn");
const videoCloseBtn = document.getElementById("closeBtn");
const videoPlayer = document.getElementById("videoPlayer");

// Ensure modal is closed on page load
if (videoModal && videoPlayer) {
    videoModal.classList.remove("show");
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
}

if (openVideoBtn && videoModal) {
    openVideoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        videoModal.classList.add("show");

        // Auto-play the video when modal opens
        if (videoPlayer) {
            videoPlayer.play().catch(err => {
            });
        }
    });
}

if (videoCloseBtn && videoModal) {
    videoCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        videoModal.classList.remove("show");
        if (videoPlayer) {
            videoPlayer.pause();
            videoPlayer.currentTime = 0;
        }
    });
}

// Close modal when clicking outside
if (videoModal) {
    window.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.classList.remove("show");
            if (videoPlayer) {
                videoPlayer.pause();
                videoPlayer.currentTime = 0;
            }
        }
    });
}

// ===========================
// PREMIUM SERVICES MODAL SYSTEM
// ===========================

const serviceModal = document.getElementById('serviceModal');
const serviceModalClose = document.getElementById('serviceModalClose');
const serviceModalBody = document.getElementById('serviceModalBody');

// Service card click handlers
const serviceCards = document.querySelectorAll('.service-card');

if (serviceCards.length > 0) {
    serviceCards.forEach(card => {
        const learnMoreBtn = card.querySelector('.service-link');
        if (learnMoreBtn) {
            learnMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const serviceType = card.getAttribute('data-service');
                openServiceModal(serviceType);
            });
        }
    });
}

// Close modal handlers
if (serviceModalClose && serviceModal) {
    serviceModalClose.addEventListener('click', () => {
        closeServiceModal();
    });

    // Close on outside click
    serviceModal.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            closeServiceModal();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && serviceModal.classList.contains('show')) {
            closeServiceModal();
        }
    });
}

function openServiceModal(serviceType) {
    if (!serviceModal || !serviceModalBody) return;

    const serviceData = SERVICES_DATA[serviceType];
    if (!serviceData) {
        console.error('Service data not found:', serviceType);
        return;
    }

    let modalHTML = '';

    // Special handling for private-flights
    if (serviceType === 'private-flights') {
        modalHTML = `
            <div class="service-detail-header">
                <div class="service-detail-icon">${serviceData.icon}</div>
                <h2 class="service-detail-title">${serviceData.title}</h2>
                <p class="service-detail-subtitle">${serviceData.subtitle}</p>
            </div>
            <div class="service-detail-body">
                <h3 class="section-subtitle">Select Your Aircraft</h3>
                <div class="aircraft-grid">
                    ${serviceData.aircraft.map((aircraft, index) => `
                        <div class="aircraft-card">
                            <img src="${aircraft.image}" alt="${aircraft.name}" class="aircraft-image" onerror="this.src='https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&auto=format&fit=crop'">
                            <div class="aircraft-badge">${aircraft.type}</div>
                            <h3 class="aircraft-name">${aircraft.name}</h3>
                            <div class="aircraft-specs">
                                <div class="aircraft-spec">
                                    <span class="spec-icon">👥</span>
                                    <span class="spec-text">${aircraft.capacity}</span>
                                </div>
                                <div class="aircraft-spec">
                                    <span class="spec-icon">✈️</span>
                                    <span class="spec-text">${aircraft.range}</span>
                                </div>
                                <div class="aircraft-spec">
                                    <span class="spec-icon">⚡</span>
                                    <span class="spec-text">${aircraft.speed}</span>
                                </div>
                            </div>
                            <p class="aircraft-description">${aircraft.description}</p>
                            <div class="aircraft-amenities">
                                ${aircraft.amenities.map(amenity => `<span class="amenity-tag">✓ ${amenity}</span>`).join('')}
                            </div>
                            <div class="aircraft-price">$${aircraft.pricePerHour.toLocaleString()}<span>/hour</span></div>
                        </div>
                    `).join('')}
                </div>

                <div class="service-reservation-form" id="reservationForm-${serviceType}">
                    <h3 class="reservation-form-title">Book Your Private Flight</h3>
                    <form id="serviceReservationForm">
                        <div class="reservation-form-grid">
                            ${generatePrivateFlightFields(serviceData)}
                        </div>
                        <div class="reservation-price-display">
                            <div class="reservation-price-label">Estimated Total</div>
                            <div class="reservation-price-amount" id="reservationTotal">$0</div>
                        </div>
                        <button type="submit" class="btn-submit-reservation">Confirm Booking</button>
                    </form>
                </div>
            </div>
        `;
    } else {
        // Standard modal for other services
        modalHTML = `
            <div class="service-detail-header">
                <div class="service-detail-icon">${serviceData.icon}</div>
                <h2 class="service-detail-title">${serviceData.title}</h2>
                <p class="service-detail-subtitle">${serviceData.subtitle}</p>
            </div>
            <div class="service-detail-body">
                <div class="service-options-grid">
                    ${serviceData.options.map((option, index) => `
                        <div class="service-option-card">
                            <img src="${option.image}" alt="${option.name}" class="service-option-image" onerror="this.src='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop'">
                            <h3 class="service-option-name">${option.name}</h3>
                            <p class="service-option-location">📍 ${option.location}</p>
                            <p class="service-option-description">${option.description}</p>
                            ${option.duration ? `<p class="service-option-location">⏱️ ${option.duration}</p>` : ''}
                            ${option.capacity ? `<p class="service-option-location">👥 ${option.capacity}</p>` : ''}
                            ${option.rating ? `<p class="service-option-location">⭐ ${option.rating}</p>` : ''}
                            ${option.cuisine ? `<p class="service-option-location">🍴 ${option.cuisine}</p>` : ''}
                            ${option.languages ? `<p class="service-option-location">🗣️ ${option.languages}</p>` : ''}
                            ${option.vehicles ? `<p class="service-option-location">🚗 ${option.vehicles}</p>` : ''}
                            ${option.includes ? `<p class="service-option-location">✓ ${option.includes}</p>` : ''}
                            ${option.availability ? `<p class="service-option-location">📞 ${option.availability}</p>` : ''}
                            ${option.highlights ? `<p class="service-option-location">✨ ${option.highlights}</p>` : ''}
                            <div class="service-option-price">
                                ${option.price}
                                ${option.perNight ? '<span>per night</span>' : ''}
                                ${option.perPerson ? '<span>per person</span>' : ''}
                            </div>
                            <button class="btn-book-service" data-service="${serviceType}" data-option="${index}">
                                Book Now
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="service-reservation-form" id="reservationForm-${serviceType}" style="display: none;">
                    <h3 class="reservation-form-title">Complete Your Reservation</h3>
                    <form id="serviceReservationForm">
                        <div class="reservation-form-grid">
                            ${generateReservationFields(serviceData.reservationFields, serviceData.options)}
                        </div>
                        <div class="reservation-price-display">
                            <div class="reservation-price-label">Estimated Total</div>
                            <div class="reservation-price-amount" id="reservationTotal">$0</div>
                        </div>
                        <button type="submit" class="btn-submit-reservation">Confirm Reservation</button>
                    </form>
                </div>
            </div>
        `;
    }

    serviceModalBody.innerHTML = modalHTML;
    serviceModal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Attach book button handlers
    attachBookButtonHandlers(serviceType);

    // For private-flights, initialize autocomplete after DOM is ready
    if (serviceType === 'private-flights') {
        setTimeout(() => {
            attachPrivateFlightHandlers();
        }, 100);
    }
}

function closeServiceModal() {
    if (serviceModal) {
        serviceModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function generatePrivateFlightFields(serviceData) {
    return `
        <div class="reservation-field autocomplete-field">
            <label>Departure City</label>
            <input type="text" name="departure" id="departureCity" placeholder="Search airports..." required autocomplete="off">
            <div class="autocomplete-dropdown" id="departureDropdown"></div>
        </div>
        <div class="reservation-field autocomplete-field">
            <label>Destination City</label>
            <input type="text" name="destination" id="destinationCity" placeholder="Search airports..." required autocomplete="off">
            <div class="autocomplete-dropdown" id="destinationDropdown"></div>
        </div>
        <div class="reservation-field">
            <label>Flight Date</label>
            <input type="date" name="date" id="flightDate" required>
        </div>
        <div class="reservation-field">
            <label>Departure Time</label>
            <input type="time" name="time" id="departureTime" required>
        </div>
        <div class="reservation-field">
            <label>Select Aircraft</label>
            <select name="aircraft" id="aircraftSelect" required>
                <option value="">Choose your jet</option>
                ${serviceData.aircraft.map((aircraft, index) =>
                    `<option value="${index}">${aircraft.name} - ${aircraft.type} ($${aircraft.pricePerHour.toLocaleString()}/hr)</option>`
                ).join('')}
            </select>
        </div>
        <div class="reservation-field full-width">
            <label>Special Requirements</label>
            <input type="text" name="requirements" placeholder="Catering preferences, special requests...">
        </div>
    `;
}

function attachPrivateFlightHandlers() {
    const serviceData = SERVICES_DATA['private-flights'];
    const departureInput = document.getElementById('departureCity');
    const destinationInput = document.getElementById('destinationCity');
    const aircraftSelect = document.getElementById('aircraftSelect');
    const priceDisplay = document.getElementById('reservationTotal');

    if (!departureInput || !destinationInput || !aircraftSelect) return;

    // Build autocomplete system
    buildAutocompleteSystem(departureInput, 'departureDropdown');
    buildAutocompleteSystem(destinationInput, 'destinationDropdown');

    // Update price when aircraft changes
    aircraftSelect.addEventListener('change', () => {
        updatePrivateFlightPrice();
    });

    // Update price when departure changes
    departureInput.addEventListener('input', updatePrivateFlightPrice);
    departureInput.addEventListener('change', updatePrivateFlightPrice);

    // Update price when destination changes
    destinationInput.addEventListener('input', updatePrivateFlightPrice);
    destinationInput.addEventListener('change', updatePrivateFlightPrice);

    function updatePrivateFlightPrice() {
        const departure = departureInput?.value.trim();
        const destination = destinationInput?.value.trim();
        const aircraftIndex = aircraftSelect?.value;

        if (!departure || !destination || !aircraftIndex || !priceDisplay) {
            if (priceDisplay) priceDisplay.textContent = '$0';
            return;
        }

        const aircraft = serviceData.aircraft[aircraftIndex];
        if (!aircraft) {
            priceDisplay.textContent = '$0';
            return;
        }

        // Calculate estimated flight duration and price
        let flightHours = 1.0; // Default
        let routeFound = false;

        // Check if route exists in predefined routes
        if (serviceData.routes[departure] && serviceData.routes[departure][destination]) {
            flightHours = serviceData.routes[departure][destination].duration;
            routeFound = true;
        } else if (serviceData.routes[destination] && serviceData.routes[destination][departure]) {
            // Check reverse route
            flightHours = serviceData.routes[destination][departure].duration;
            routeFound = true;
        } else {
            // Estimate based on distance heuristic for Egyptian cities
            flightHours = estimateFlightDuration(departure, destination);
        }

        // Calculate base price
        let totalPrice = aircraft.pricePerHour * flightHours;

        // Add minimum booking fee
        const minimumBooking = 2.0; // Minimum 2 hours
        if (flightHours < minimumBooking) {
            totalPrice = aircraft.pricePerHour * minimumBooking;
        }

        // Round to nearest hundred
        totalPrice = Math.round(totalPrice / 100) * 100;

        priceDisplay.textContent = `$${totalPrice.toLocaleString()}`;
    }

    function estimateFlightDuration(city1, city2) {
        // Simple heuristic for Egyptian cities
        const majorCities = {
            'Cairo': { lat: 30.0444, lon: 31.2357 },
            'Alexandria': { lat: 31.2001, lon: 29.9187 },
            'Luxor': { lat: 25.6872, lon: 32.6396 },
            'Aswan': { lat: 24.0889, lon: 32.8998 },
            'Sharm El-Sheikh': { lat: 27.9158, lon: 34.3300 },
            'Hurghada': { lat: 27.2579, lon: 33.8116 },
            'Marsa Alam': { lat: 25.0631, lon: 34.8944 }
        };

        const c1 = majorCities[city1];
        const c2 = majorCities[city2];

        if (c1 && c2) {
            // Calculate approximate distance using lat/lon
            const latDiff = Math.abs(c1.lat - c2.lat);
            const lonDiff = Math.abs(c1.lon - c2.lon);
            const distance = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff) * 111; // km per degree

            // Estimate flight time: ~500 km/h average speed
            return Math.max(0.5, distance / 500);
        }

        // Default estimate for unknown cities
        return 1.2;
    }
}

function generateReservationFields(fields, options) {
    const fieldMap = {
        'date': '<div class="reservation-field"><label>Date</label><input type="date" name="date" required></div>',
        'checkIn': '<div class="reservation-field"><label>Check-In Date</label><input type="date" name="checkIn" required></div>',
        'checkOut': '<div class="reservation-field"><label>Check-Out Date</label><input type="date" name="checkOut" required></div>',
        'startDate': '<div class="reservation-field"><label>Start Date</label><input type="date" name="startDate" required></div>',
        'route': `<div class="reservation-field"><label>Route</label><select name="route" required>${options.map(opt => `<option value="${opt.name}">${opt.name}</option>`).join('')}</select></div>`,
        'hotel': `<div class="reservation-field"><label>Hotel</label><select name="hotel" required>${options.map(opt => `<option value="${opt.name}">${opt.name}</option>`).join('')}</select></div>`,
        'itinerary': `<div class="reservation-field"><label>Itinerary</label><select name="itinerary" required>${options.map(opt => `<option value="${opt.name}">${opt.name}</option>`).join('')}</select></div>`,
        'experience': `<div class="reservation-field"><label>Experience</label><select name="experience" required>${options.map(opt => `<option value="${opt.name}">${opt.name}</option>`).join('')}</select></div>`,
        'restaurant': `<div class="reservation-field"><label>Restaurant</label><select name="restaurant" required>${options.map(opt => `<option value="${opt.name}">${opt.name}</option>`).join('')}</select></div>`,
        'service': `<div class="reservation-field"><label>Service</label><select name="service" required>${options.map(opt => `<option value="${opt.name}">${opt.name}</option>`).join('')}</select></div>`,
        'passengers': '<div class="reservation-field"><label>Passengers</label><select name="passengers" required><option value="1">1 Passenger</option><option value="2">2 Passengers</option><option value="3">3 Passengers</option><option value="4">4 Passengers</option><option value="5">5 Passengers</option><option value="6">6 Passengers</option><option value="7">7 Passengers</option><option value="8">8 Passengers</option></select></div>',
        'guests': '<div class="reservation-field"><label>Guests</label><select name="guests" required><option value="1">1 Guest</option><option value="2">2 Guests</option><option value="3">3 Guests</option><option value="4">4 Guests</option><option value="5">5 Guests</option><option value="6">6 Guests</option><option value="7">7 Guests</option><option value="8">8 Guests</option><option value="9">9 Guests</option><option value="10">10 Guests</option><option value="11">11 Guests</option><option value="12">12 Guests</option></select><small id="guestWarning" style="color: #d4af37; display: none; margin-top: 4px; font-size: 12px;"></small></div>',
        'travelers': '<div class="reservation-field"><label>Travelers</label><select name="travelers" required><option value="1">1 Traveler</option><option value="2">2 Travelers</option><option value="3">3 Travelers</option><option value="4">4 Travelers</option><option value="5">5+ Travelers</option></select></div>',
        'time': '<div class="reservation-field"><label>Preferred Time</label><select name="time" required><option value="morning">Morning (6AM-12PM)</option><option value="afternoon">Afternoon (12PM-6PM)</option><option value="evening">Evening (6PM-12AM)</option></select></div>',
        'duration': '<div class="reservation-field"><label>Duration</label><select name="duration" required><option value="1">1 Day</option><option value="2">2 Days</option><option value="3">3 Days</option><option value="5">5 Days</option><option value="7">7 Days</option><option value="custom">Custom</option></select></div>',
        'requirements': '<div class="reservation-field"><label>Special Requirements</label><input type="text" name="requirements" placeholder="Any special requests..."></div>'
    };

    return fields.map(field => fieldMap[field] || '').join('');
}

function attachBookButtonHandlers(serviceType) {
    const bookButtons = document.querySelectorAll('.btn-book-service');
    const reservationForm = document.getElementById(`reservationForm-${serviceType}`);
    const serviceReservationForm = document.getElementById('serviceReservationForm');
    const serviceData = SERVICES_DATA[serviceType];

    // For vip-experiences, attach guest limit handlers
    if (serviceType === 'vip-experiences') {
        attachVIPExperienceHandlers();
    }

    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const optionIndex = btn.getAttribute('data-option');
            const selectedOption = serviceData.options[optionIndex];

            // Show reservation form
            if (reservationForm) {
                reservationForm.style.display = 'block';
                reservationForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                // Update price display with proper calculation
                const priceDisplay = document.getElementById('reservationTotal');
                if (priceDisplay && selectedOption) {
                    let displayPrice = parseFloat(selectedOption.price.replace(/[$,]/g, ''));
                    priceDisplay.textContent = `$${displayPrice.toLocaleString()}`;
                }

                // Pre-select the option in dropdown if exists
                const selects = reservationForm.querySelectorAll('select');
                selects.forEach(select => {
                    if (select.name === 'route' || select.name === 'hotel' || select.name === 'itinerary' ||
                        select.name === 'experience' || select.name === 'restaurant' || select.name === 'service') {
                        select.value = selectedOption.name;

                        // For VIP experiences, trigger change to update guest limit
                        if (select.name === 'experience') {
                            select.dispatchEvent(new Event('change'));
                        }
                    }
                });

                // Attach dynamic price update listeners
                attachPriceUpdateListeners(serviceType, reservationForm);
            }

            showNotification(`Selected: ${selectedOption.name}`, 'success');
        });
    });

    // Handle form submission
    if (serviceReservationForm) {
        serviceReservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(serviceReservationForm);
            const reservationData = {};
            formData.forEach((value, key) => {
                reservationData[key] = value;
            });

            // Get price from display
            const priceDisplay = document.getElementById('reservationTotal');
            const priceText = priceDisplay ? priceDisplay.textContent : '$0';
            const amount = parseFloat(priceText.replace(/[$,]/g, ''));

            // Get service name
            const serviceTitle = document.querySelector('.service-detail-title')?.textContent || 'Service';

            // Prepare booking data
            const bookingData = {
                type: 'service',
                name: serviceTitle,
                serviceType: serviceType,
                price: priceText,
                amount: amount,
                details: reservationData,
                date: new Date().toISOString()
            };

            // Close modal and proceed to payment
            closeServiceModal();
            proceedToPayment(bookingData);
        });
    }
}

function attachVIPExperienceHandlers() {
    const serviceData = SERVICES_DATA['vip-experiences'];
    const experienceSelect = document.querySelector('select[name="experience"]');
    const guestSelect = document.querySelector('select[name="guests"]');
    const guestWarning = document.getElementById('guestWarning');

    if (!experienceSelect || !guestSelect) return;

    // Update guest limit when experience changes
    experienceSelect.addEventListener('change', () => {
        const selectedName = experienceSelect.value;
        const selectedExperience = serviceData.options.find(opt => opt.name === selectedName);

        if (selectedExperience && selectedExperience.maxGuests) {
            const maxGuests = selectedExperience.maxGuests;

            // Update guest select options
            const currentGuests = parseInt(guestSelect.value) || 1;

            // Rebuild guest options up to max (no hardcoded limit)
            guestSelect.innerHTML = '';
            for (let i = 1; i <= maxGuests; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i === 1 ? '1 Guest' : `${i} Guests`;
                guestSelect.appendChild(option);
            }

            // If current selection exceeds max, adjust it
            if (currentGuests > maxGuests) {
                guestSelect.value = maxGuests;
                showGuestWarning(`Adjusted to ${maxGuests} guests (max capacity for ${selectedExperience.name})`);
            } else {
                guestSelect.value = Math.min(currentGuests, maxGuests);
                hideGuestWarning();
            }
        }
    });

    function showGuestWarning(message) {
        if (guestWarning) {
            guestWarning.textContent = message;
            guestWarning.style.display = 'block';
        }
    }

    function hideGuestWarning() {
        if (guestWarning) {
            guestWarning.style.display = 'none';
        }
    }
}

function attachPriceUpdateListeners(serviceType, reservationForm) {
    const serviceData = SERVICES_DATA[serviceType];
    const priceDisplay = document.getElementById('reservationTotal');

    if (!priceDisplay || !serviceData) return;

    // Find the main service selection dropdown
    const serviceSelect = reservationForm.querySelector('select[name="route"], select[name="hotel"], select[name="itinerary"], select[name="experience"], select[name="restaurant"], select[name="service"]');

    // Find guest/passenger/traveler count selects
    const guestSelect = reservationForm.querySelector('select[name="guests"], select[name="passengers"], select[name="travelers"]');

    // Find duration select
    const durationSelect = reservationForm.querySelector('select[name="duration"]');

    // Find check-in/check-out date inputs (for hotels)
    const checkInInput = reservationForm.querySelector('input[name="checkIn"]');
    const checkOutInput = reservationForm.querySelector('input[name="checkOut"]');

    // Update price when service selection changes
    if (serviceSelect) {
        serviceSelect.addEventListener('change', () => {
            updateTotalPrice(serviceType, serviceSelect, guestSelect, durationSelect, checkInInput, checkOutInput, priceDisplay);
        });
    }

    // Update price when guest count changes
    if (guestSelect) {
        guestSelect.addEventListener('change', () => {
            updateTotalPrice(serviceType, serviceSelect, guestSelect, durationSelect, checkInInput, checkOutInput, priceDisplay);
        });
    }

    // Update price when duration changes
    if (durationSelect) {
        durationSelect.addEventListener('change', () => {
            updateTotalPrice(serviceType, serviceSelect, guestSelect, durationSelect, checkInInput, checkOutInput, priceDisplay);
        });
    }

    // Update price when check-in/check-out dates change (for hotels)
    if (checkInInput && checkOutInput) {
        checkInInput.addEventListener('change', () => {
            updateTotalPrice(serviceType, serviceSelect, guestSelect, durationSelect, checkInInput, checkOutInput, priceDisplay);
        });
        checkOutInput.addEventListener('change', () => {
            updateTotalPrice(serviceType, serviceSelect, guestSelect, durationSelect, checkInInput, checkOutInput, priceDisplay);
        });
    }
}

function updateTotalPrice(serviceType, serviceSelect, guestSelect, durationSelect, checkInInput, checkOutInput, priceDisplay) {
    const serviceData = SERVICES_DATA[serviceType];
    if (!serviceData || !serviceSelect || !priceDisplay) return;

    // Find the selected option by name
    const selectedName = serviceSelect.value;
    const selectedOption = serviceData.options.find(opt => opt.name === selectedName);

    if (!selectedOption) return;

    // Get base price (remove $ and commas)
    let basePrice = parseFloat(selectedOption.price.replace(/[$,]/g, ''));
    let multiplier = 1;

    // Calculate number of nights for hotels (if check-in/check-out dates exist)
    let nights = 1;
    if (checkInInput && checkOutInput && checkInInput.value && checkOutInput.value) {
        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);
        const timeDiff = checkOut - checkIn;
        nights = Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
    }

    // If per-night pricing (hotels), multiply by nights FIRST
    if (selectedOption.perNight) {
        multiplier *= nights;
    }

    // If per-person pricing, multiply by guest/traveler count
    if (selectedOption.perPerson && guestSelect) {
        const guestCount = parseInt(guestSelect.value) || 1;
        multiplier *= guestCount;
    }

    // If per-day pricing (concierge), multiply by days
    if (selectedOption.perDay && durationSelect) {
        const days = parseInt(durationSelect.value) || 1;
        multiplier *= days;
    }

    // Apply multiplier
    basePrice *= multiplier;

    // Update display
    priceDisplay.textContent = `$${Math.round(basePrice).toLocaleString()}`;
}


// ===========================
// FAQ ACCORDION
// ===========================

const faqItems = document.querySelectorAll('.faq-item');

if (faqItems.length > 0) {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

}

// ===========================
// DESTINATION CTA HANDLERS
// ===========================

const destinationCards = document.querySelectorAll('.destination-card');

if (destinationCards.length > 0) {
    destinationCards.forEach(card => {
        const ctaBtn = card.querySelector('.btn-destination-cta');

        if (ctaBtn) {
            ctaBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const destinationName = card.querySelector('.destination-title').textContent;
                const destinationPrice = card.querySelector('.destination-price').textContent;

                showNotification(`Planning your trip to ${destinationName}...`, 'success');

                // Scroll to contact form
                setTimeout(() => {
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });

                        // Pre-fill destination in contact form if possible
                        const destinationSelect = document.querySelector('#contactForm select');
                        if (destinationSelect) {
                            const options = Array.from(destinationSelect.options);
                            const matchingOption = options.find(opt =>
                                opt.text.toLowerCase().includes(destinationName.toLowerCase())
                            );
                            if (matchingOption) {
                                destinationSelect.value = matchingOption.value;
                            }
                        }
                    }
                }, 500);
            });
        }
    });

}

// ===========================
// OFFER DETAILS SYSTEM
// ===========================

const OFFERS_DATA = {
    'alexandria': {
        title: 'Alexandria Mediterranean Cruise',
        subtitle: '7 Days / 6 Nights • Save 30%',
        price: '$279',
        originalPrice: '$999',
        itinerary: [
            'Day 1: Arrival in Alexandria - Welcome dinner at waterfront restaurant',
            'Day 2: Alexandria City Tour - Library, Citadel, Catacombs',
            'Day 3: Mediterranean Cruise - Luxury yacht experience',
            'Day 4: Beach Day - Private beach club access',
            'Day 5: El Alamein War Memorial - Historical tour',
            'Day 6: Coastal Villages - Traditional fishing villages tour',
            'Day 7: Departure - Breakfast and airport transfer'
        ],
        inclusions: [
            '6 nights at 5-star beachfront hotel',
            'All breakfasts and 4 dinners',
            'Private luxury yacht cruise',
            'Professional English-speaking guide',
            'All entrance fees and activities',
            'Airport transfers in luxury vehicle',
            'Travel insurance'
        ],
        exclusions: [
            'International flights',
            'Lunches (except on cruise day)',
            'Personal expenses and souvenirs',
            'Tips and gratuities',
            'Visa fees',
            'Optional activities not listed'
        ],
        idealFor: 'Perfect for couples and families seeking a relaxing Mediterranean escape with cultural experiences. Ideal for history enthusiasts who want to explore Alexandria\'s rich Greco-Roman heritage while enjoying luxury beach resort amenities.',
        upgrades: [
            { name: 'Suite Upgrade', price: '+$150' },
            { name: 'Private Chef Dinner', price: '+$200' },
            { name: 'Spa Package', price: '+$180' },
            { name: 'Extra Night', price: '+$120' }
        ]
    },
    'luxor-aswan': {
        title: 'Luxor & Aswan Timeless Journey',
        subtitle: '4 Days / 3 Nights • Save 25%',
        price: '$299',
        originalPrice: '$1,199',
        itinerary: [
            'Day 1: Luxor East Bank - Karnak & Luxor Temples at sunset',
            'Day 2: Luxor West Bank - Valley of Kings, Hatshepsut Temple, Colossi',
            'Day 3: Nile Cruise to Aswan - Edfu & Kom Ombo Temples en route',
            'Day 4: Aswan Highlights - Philae Temple, High Dam, Unfinished Obelisk'
        ],
        inclusions: [
            '3 nights luxury Nile cruise ship',
            'All meals (breakfast, lunch, dinner)',
            'Private Egyptologist guide',
            'All entrance fees to temples and tombs',
            'Hot air balloon ride over Luxor',
            'Felucca sailing in Aswan',
            'Airport/train transfers'
        ],
        exclusions: [
            'Domestic flights Cairo-Luxor-Cairo',
            'Beverages and alcoholic drinks',
            'Optional Abu Simbel excursion',
            'Personal expenses',
            'Tips for guide and crew',
            'Travel insurance'
        ],
        idealFor: 'Ideal for history lovers and culture enthusiasts who want to experience Egypt\'s most iconic ancient sites in comfort. Perfect for first-time visitors to Egypt seeking a comprehensive introduction to pharaonic civilization.',
        upgrades: [
            { name: 'Abu Simbel Day Trip', price: '+$180' },
            { name: 'Royal Suite Upgrade', price: '+$250' },
            { name: 'Private Tomb Access', price: '+$150' },
            { name: 'Sunset Felucca Dinner', price: '+$90' }
        ]
    },
    'hurghada': {
        title: 'Hurghada Red Sea Escape',
        subtitle: '5 Days / 4 Nights • Save 40%',
        price: '$199',
        originalPrice: '$699',
        itinerary: [
            'Day 1: Arrival & Beach Relaxation - Welcome cocktail',
            'Day 2: Snorkeling Trip - Giftun Island & coral reefs',
            'Day 3: Desert Safari - Quad biking & Bedouin dinner',
            'Day 4: Diving Experience - Beginner or advanced diving',
            'Day 5: Leisure Day & Departure - Spa or beach time'
        ],
        inclusions: [
            '4 nights at 5-star beach resort',
            'All-inclusive meals and drinks',
            'Snorkeling trip with equipment',
            'Desert safari with dinner',
            '2 diving sessions with instructor',
            'Beach activities and water sports',
            'Airport transfers'
        ],
        exclusions: [
            'International flights',
            'Premium alcoholic beverages',
            'Spa treatments',
            'Advanced diving certification course',
            'Personal expenses',
            'Travel insurance'
        ],
        idealFor: 'Perfect for beach lovers, water sports enthusiasts, and families seeking sun, sea, and adventure. Ideal for those who want to combine relaxation with exciting activities like diving, snorkeling, and desert exploration.',
        upgrades: [
            { name: 'PADI Certification', price: '+$280' },
            { name: 'Private Yacht Day', price: '+$350' },
            { name: 'Couples Spa Package', price: '+$160' },
            { name: 'Parasailing Experience', price: '+$80' }
        ]
    }
};

const offerDetailModal = document.getElementById('offerDetailModal');
const offerDetailClose = document.getElementById('offerDetailClose');
const offerDetailBody = document.getElementById('offerDetailBody');

// Offer detail button handlers
const offerDetailButtons = document.querySelectorAll('.btn-offer-details');

if (offerDetailButtons.length > 0) {
    offerDetailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const offerCard = btn.closest('.offer-card');
            const offerType = offerCard.getAttribute('data-offer');
            openOfferDetail(offerType);
        });
    });

}

// Close modal handlers
if (offerDetailClose && offerDetailModal) {
    offerDetailClose.addEventListener('click', () => {
        closeOfferDetail();
    });

    offerDetailModal.addEventListener('click', (e) => {
        if (e.target === offerDetailModal) {
            closeOfferDetail();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && offerDetailModal.classList.contains('show')) {
            closeOfferDetail();
        }
    });
}

function openOfferDetail(offerType) {
    if (!offerDetailModal || !offerDetailBody) return;

    const offerData = OFFERS_DATA[offerType];
    if (!offerData) {
        return;
    }

    const modalHTML = `
        <div class="offer-detail-header">
            <h2 class="offer-detail-title">${offerData.title}</h2>
            <p class="offer-detail-subtitle">${offerData.subtitle}</p>
            <div style="margin-top: 20px;">
                <span style="font-size: 32px; color: #d4af37; font-weight: 700;">${offerData.price}</span>
                <span style="font-size: 20px; color: #888; text-decoration: line-through; margin-left: 12px;">${offerData.originalPrice}</span>
            </div>
        </div>
        <div class="offer-detail-body">
            <div class="offer-section">
                <h3 class="offer-section-title">Day-by-Day Itinerary</h3>
                <ul class="offer-itinerary-list">
                    ${offerData.itinerary.map(day => `<li>${day}</li>`).join('')}
                </ul>
            </div>

            <div class="offer-section">
                <h3 class="offer-section-title">What's Included</h3>
                <ul class="offer-inclusions-list">
                    ${offerData.inclusions.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <div class="offer-section">
                <h3 class="offer-section-title">What's Not Included</h3>
                <ul class="offer-exclusions-list">
                    ${offerData.exclusions.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>

            <div class="offer-section">
                <h3 class="offer-section-title">Ideal For</h3>
                <div class="offer-traveler-type">
                    ${offerData.idealFor}
                </div>
            </div>

            <div class="offer-section">
                <h3 class="offer-section-title">Available Upgrades</h3>
                <div class="offer-upgrades">
                    ${offerData.upgrades.map(upgrade => `
                        <div class="upgrade-option">
                            <div class="upgrade-name">${upgrade.name}</div>
                            <div class="upgrade-price">${upgrade.price}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <button class="btn-primary full-width" style="margin-top: 40px;" onclick="bookOfferPackage('${offerType}');">
                Book This Package
            </button>
        </div>
    `;

    offerDetailBody.innerHTML = modalHTML;
    offerDetailModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeOfferDetail() {
    if (offerDetailModal) {
        offerDetailModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Book offer package function
function bookOfferPackage(offerType) {
    const offerData = OFFERS_DATA[offerType];
    if (!offerData) return;

    const bookingData = {
        type: 'package',
        name: offerData.title,
        price: offerData.price,
        amount: parseFloat(offerData.price.replace(/[$,]/g, '')),
        duration: offerData.subtitle,
        offerType: offerType,
        date: new Date().toISOString()
    };

    closeOfferDetail();
    proceedToPayment(bookingData);
}


// ===========================
// BOOKING DATA STORAGE & PAYMENT FLOW
// ===========================

// Save booking data to localStorage and redirect to payment
function proceedToPayment(bookingData) {
    // Validate booking data
    if (!bookingData || !bookingData.type || !bookingData.amount) {
        showNotification('Booking data is incomplete. Please try again.', 'error');
        return;
    }

    try {
        // Reset prior confirmation reference for new bookings
        sessionStorage.removeItem('originova_booking_number');
        localStorage.setItem('originova_booking', JSON.stringify(bookingData));
    } catch (error) {
        showNotification('Unable to continue to payment right now. Please try again.', 'error');
        return;
    }

    // Redirect to payment page
    window.location.href = 'payment.html';
}

// Get booking data from localStorage
function getBookingData() {
    try {
        const data = localStorage.getItem('originova_booking');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        return null;
    }
}

// Clear booking data
function clearBookingData() {
    localStorage.removeItem('originova_booking');
    sessionStorage.removeItem('originova_booking_number');
}

// Generate random booking number
function generateBookingNumber() {
    const prefix = 'ORG';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 900000) + 100000;
    return `${prefix}-${year}-${random}`;
}

