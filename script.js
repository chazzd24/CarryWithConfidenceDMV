// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formStatus = document.getElementById('formStatus');
            const formData = new FormData(contactForm);
            
            // Show loading state
            formStatus.textContent = 'Sending...';
            formStatus.className = 'form-status';
            formStatus.style.display = 'block';

            // Submit to Formspree
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    formStatus.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    return response.json().then(data => {
                        if (data.errors) {
                            throw new Error(data.errors.map(error => error.message).join(', '));
                        }
                        throw new Error('Something went wrong. Please try again.');
                    });
                }
            })
            .catch(error => {
                formStatus.textContent = error.message || 'There was an error sending your message. Please try again or contact us directly.';
                formStatus.className = 'form-status error';
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Course Expand/Collapse Functionality
    const courseExpandButtons = document.querySelectorAll('.course-expand-btn');
    courseExpandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const expandText = this.querySelector('.expand-text');
            const isExpanded = courseCard.classList.contains('expanded');
            
            if (isExpanded) {
                courseCard.classList.remove('expanded');
                expandText.textContent = 'Show Details';
            } else {
                courseCard.classList.add('expanded');
                expandText.textContent = 'Hide Details';
            }
        });
    });

    // Course Thumbnail Expand/Collapse Functionality
    const courseThumbnailButtons = document.querySelectorAll('.course-thumbnail-expand-btn');
    courseThumbnailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseThumbnail = this.closest('.course-thumbnail');
            const expandableContent = courseThumbnail.querySelector('.course-thumbnail-details');
            const expandText = this.querySelector('.expand-text');
            const expandIcon = this.querySelector('.expand-icon');
            const isActive = courseThumbnail.classList.contains('active');
            
            if (isActive) {
                courseThumbnail.classList.remove('active');
                expandableContent.style.maxHeight = '0';
                expandText.textContent = 'Show Details';
                expandIcon.textContent = '▼';
            } else {
                courseThumbnail.classList.add('active');
                expandableContent.style.maxHeight = expandableContent.scrollHeight + 'px';
                expandText.textContent = 'Hide Details';
                expandIcon.textContent = '▲';
            }
        });
    });
});


