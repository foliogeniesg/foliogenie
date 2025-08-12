// Send email function for contact form
function sendEmail() {
    
    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create email body
    const emailBody = `New Contact Form Submission

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Company: ${company}
Inquiry Type: ${subject}

Message:
${message}

---
This message was sent from the FolioGenie website contact form.`;
    
    // Create mailto link
    const mailtoLink = `mailto:info@foliogenie.com?subject=Contact Form: ${subject}&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
}

// Form Validation and Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Login Form Validation
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateLoginForm()) {
                showSuccessMessage('Login successful! Redirecting to dashboard...');
                // Simulate redirect
                setTimeout(() => {
                    window.location.href = 'services.html';
                }, 2000);
            }
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendEmail();
        });
    }
    
    // Register Form Validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateRegisterForm()) {
                showSuccessMessage('Registration successful! Welcome to FolioGenie.');
                registerForm.reset();
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current navigation item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });
});

// Login Form Validation
function validateLoginForm() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    let isValid = true;
    
    // Clear previous error messages
    clearErrorMessages();
    
    // Validate email
    if (!email) {
        showFieldError('loginEmail', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('loginEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        showFieldError('loginPassword', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showFieldError('loginPassword', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    return isValid;
}



// Register Form Validation
function validateRegisterForm() {
    const requiredFields = [
        'firstName', 'lastName', 'companyName', 'address', 'city', 
        'state', 'zip', 'phone', 'brokerDealer', 'licenseNumber', 
        'hearAbout', 'database', 'email', 'password', 'confirmPassword'
    ];
    
    let isValid = true;
    
    // Clear previous error messages
    clearErrorMessages();
    
    // Validate all required fields
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        
        if (!value) {
            showFieldError(fieldId, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    if (email && !isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate password
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password && password.length < 8) {
        showFieldError('password', 'Password must be at least 8 characters');
        isValid = false;
    }
    
    if (password && confirmPassword && password !== confirmPassword) {
        showFieldError('confirmPassword', 'Passwords do not match');
        isValid = false;
    }
    
    // Validate phone number
    const phone = document.getElementById('phone').value.trim();
    if (phone && !isValidPhone(phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate zip code
    const zip = document.getElementById('zip').value.trim();
    if (zip && !isValidZip(zip)) {
        showFieldError('zip', 'Please enter a valid zip code');
        isValid = false;
    }
    
    return isValid;
}

// Helper Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function isValidZip(zip) {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(zip);
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-danger mt-1';
    errorDiv.textContent = message;
    errorDiv.style.fontSize = '0.875rem';
    
    field.classList.add('is-invalid');
    field.parentNode.appendChild(errorDiv);
}

function clearErrorMessages() {
    // Remove error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    // Remove invalid class from fields
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
}

function showSuccessMessage(message) {
    // Create success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at the top of the form
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(alertDiv, form);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Add loading states to buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.disabled = true;
    button.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Loading...';
    
    return () => {
        button.disabled = false;
        button.textContent = originalText;
    };
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.value-card, .service-card, .mission-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations when page loads
window.addEventListener('load', animateOnScroll); 

// Handle 404 errors and redirect to home page (GitHub Pages compatible)
function handle404Redirect() {
    // Check if current page exists
    if (document.title === '404 Not Found' || 
        window.location.pathname.includes('404') ||
        document.body.innerHTML.includes('404')) {
        
        // For GitHub Pages, use relative path
        const currentPath = window.location.pathname;
        
        // Smart URL handling for common patterns
        if (currentPath.endsWith('/') && currentPath !== '/') {
            // Remove trailing slash and handle appropriately
            const cleanPath = currentPath.slice(0, -1);
            
            // Smart routing for specific URLs
            const smartRoutes = {
                '/login1': 'index.html',           // login1 -> homepage
                '/login': 'index.html',             // login -> homepage  
                '/sign-up': 'register.html',        // sign-up -> register page
                '/signup': 'register.html',         // signup -> register page
                '/register': 'register.html',       // register -> register page
                '/custody': 'index.html',           // custody -> homepage
                '/dashboard': 'index.html',         // dashboard -> homepage
                '/admin': 'index.html',             // admin -> homepage
                '/portal': 'index.html'             // portal -> homepage
            };
            
            if (smartRoutes[cleanPath]) {
                const targetPage = smartRoutes[cleanPath];
                window.location.href = targetPage;
                return;
            }
            
            // For valid pages, redirect to .html version
            const validPages = ['/about', '/services', '/contact'];
            if (validPages.includes(cleanPath)) {
                const htmlUrl = window.location.origin + cleanPath + '.html';
                window.location.href = htmlUrl;
                return;
            }
            
            // For any other trailing slash URL, redirect to home
            window.location.href = 'index.html';
        } else if (!currentPath.includes('.') && currentPath !== '/' && currentPath !== '/index.html') {
            // Add .html extension
            const htmlUrl = currentPath + '.html';
            window.location.href = htmlUrl;
        } else {
            // Default redirect to home
            window.location.href = 'index.html';
        }
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', handle404Redirect);

// Also check on window load
window.addEventListener('load', handle404Redirect);

// Handle navigation errors
window.addEventListener('error', function(e) {
    if (e.message.includes('404') || e.message.includes('not found')) {
        window.location.href = 'index.html';
    }
});

// GitHub Pages specific: Handle hash-based routing issues
window.addEventListener('hashchange', function() {
    const hash = window.location.hash;
    if (hash && !document.querySelector(hash)) {
        // Invalid hash, redirect to home
        window.location.href = 'index.html';
    }
}); 
