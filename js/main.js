// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('June 13, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Hero Carousel
const carouselImages = [
    { src: 'images/mahabodhi.jpg', caption: 'Mahabodhi Temple' },
    { src: 'images/nalanda.jpg', caption: 'Nalanda University' },
    { src: 'images/madhubani.jpg', caption: 'Madhubani Art' }
];

let currentSlide = 0;
const carousel = document.getElementById('heroCarousel');

function createCarousel() {
    carouselImages.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
        slide.style.backgroundImage = `url(${image.src})`;
        
        const caption = document.createElement('p');
        caption.className = 'carousel-caption';
        caption.textContent = image.caption;
        
        slide.appendChild(caption);
        carousel.appendChild(slide);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Slider functionality
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
let sliderCurrentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function nextSlide() {
    sliderCurrentSlide = (sliderCurrentSlide + 1) % slides.length;
    showSlide(sliderCurrentSlide);
}

// Add click events to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        sliderCurrentSlide = index;
        showSlide(sliderCurrentSlide);
    });
});

// Auto advance slides
setInterval(nextSlide, 5000);

// Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Mobile Navigation
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form EmailJS Integration
function sendEmail(event) {
    event.preventDefault();
    
    // Get the form elements
    const form = document.getElementById('contact-form');
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const subject = form.querySelector('#subject').value;
    const message = form.querySelector('#message').value;
    
    // Show loading spinner
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.loading-spinner');
    
    btnText.style.display = 'none';
    spinner.style.display = 'block';
    submitBtn.disabled = true;

    // EmailJS send
    emailjs.send('default_service', 'template_2nil198', {
        from_name: name,
        reply_to: email,
        subject: subject,
        message: message,
        to_email: 'mrsachinchaurasiya@gmail.com'
    })
    .then(function(response) {
        // Success
        showNotification('Message sent successfully!', 'success');
        form.reset();
    })
    .catch(function(error) {
        // Error
        console.error('EmailJS error:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    })
    .finally(function() {
        // Reset button state
        btnText.style.display = 'block';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    });

    return false;
}

// Notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', sendEmail);
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Schedule Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const timelines = document.querySelectorAll('.timeline');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const day = button.getAttribute('data-day');
            
            // Update active state of buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding timeline
            timelines.forEach(timeline => {
                if (timeline.getAttribute('data-day') === day) {
                    timeline.classList.add('active');
                } else {
                    timeline.classList.remove('active');
                }
            });
        });
    });
});
