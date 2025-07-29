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
        validateContactForm();
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

// Contact Form Validation
function validateContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error messages
        clearErrorMessages();
        
        let isValid = true;
        
        // Validate first name
        const firstName = document.getElementById('firstName');
        if (!firstName.value.trim()) {
            showFieldError('firstNameError', 'First name is required');
            isValid = false;
        }
        
        // Validate last name
        const lastName = document.getElementById('lastName');
        if (!lastName.value.trim()) {
            showFieldError('lastNameError', 'Last name is required');
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        if (!email.value.trim()) {
            showFieldError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showFieldError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone
        const phone = document.getElementById('phone');
        if (!phone.value.trim()) {
            showFieldError('phoneError', 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showFieldError('phoneError', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate company
        const company = document.getElementById('company');
        if (!company.value.trim()) {
            showFieldError('companyError', 'Company name is required');
            isValid = false;
        }
        
        // Validate subject
        const subject = document.getElementById('subject');
        if (!subject.value) {
            showFieldError('subjectError', 'Please select an inquiry type');
            isValid = false;
        }
        
        // Validate message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showFieldError('messageError', 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showFieldError('messageError', 'Message must be at least 10 characters long');
            isValid = false;
        }
        
        if (isValid) {
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            addLoadingState(submitBtn, 'Sending...');
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you within 24 hours.');
                form.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
                submitBtn.disabled = false;
            }, 2000);
        }
    });
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