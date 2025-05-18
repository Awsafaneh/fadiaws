// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading animation (Keep existing code)
    const loading = document.querySelector('.loading');
    if (loading) {
        window.addEventListener('load', () => {
            loading.style.display = 'none';
        });
    }

    // Smooth scrolling for anchor links (Keep existing code)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to elements when they come into view (Keep existing code)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards (Keep existing code)
    document.querySelectorAll('section, .card, .feature-box').forEach(element => {
        observer.observe(element);
    });

    // Form validation (Keep existing code, simplified alerts)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // e.preventDefault(); // Uncomment this line to prevent actual form submission for testing

            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                // Here you would typically send the form data to a server
                // Use custom notification if implemented, otherwise simple alert
                // showNotification('تم إرسال النموذج بنجاح!', 'success');
                 if (!e.defaultPrevented) { // Check if preventDefault was not called
                     alert('تم إرسال النموذج بنجاح (هذه رسالة تجريبية)'); // Using simple alert for now
                     form.reset();
                 }

            } else {
                // Use custom notification if implemented, otherwise simple alert
                // showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
                 alert('يرجى ملء جميع الحقول المطلوبة'); // Using simple alert for now
                 e.preventDefault(); // Prevent submission if validation fails
            }
        });
    });

    // Notification system (Keep existing code, ensure CSS for .notification is in style.css)
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Mobile menu toggle (Keep existing code, adjusted variable names to match HTML snippets)
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar'); // Assuming the nav ul has id="navbar"

    if (hamburger && navbar) {
        hamburger.addEventListener('click', function() {
            navbar.classList.toggle('show');
        });

        // Optional: Close mobile menu when a link is clicked
        document.querySelectorAll('#navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('show');
            });
        });
    }


    // Back to top button (Keep existing code, ensure CSS for .back-to-top is in style.css)
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
     // Append to body only once if it doesn't exist
     if (!document.querySelector('.back-to-top')) {
         document.body.appendChild(backToTopButton);
     }


    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Image lazy loading (Keep existing code)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) { // Check if data-src exists
                img.src = img.dataset.src;
            }
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        // Append script only once
        if (!document.querySelector('script[src*="lazysizes"]')) {
             document.body.appendChild(script);
        }
    }

    // --- Accessibility Features ---

    // Dark Mode Toggle
    // Assuming you add a button/checkbox with id="dark-mode-toggle" in your HTML
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        // If the toggle is a checkbox, make sure it's checked
        if (darkModeToggle && darkModeToggle.type === 'checkbox') {
             darkModeToggle.checked = true;
        }
    } else {
         // Ensure the body does not have dark-mode class if preference is light or not set
         document.body.classList.remove('dark-mode');
         // If the toggle is a checkbox, make sure it's unchecked
         if (darkModeToggle && darkModeToggle.type === 'checkbox') {
              darkModeToggle.checked = false;
         }
    }


    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => { // Use 'change' for checkbox/switch
             if (darkModeToggle.type === 'checkbox') {
                  if (darkModeToggle.checked) {
                     document.body.classList.add('dark-mode');
                     localStorage.setItem('theme', 'dark');
                  } else {
                     document.body.classList.remove('dark-mode');
                     localStorage.setItem('theme', 'light');
                  }
             } else { // Assume it's a button if not a checkbox
                document.body.classList.toggle('dark-mode');
                // Save theme preference to local storage based on current class
                if (document.body.classList.contains('dark-mode')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
             }
        });
    }


    // Text Resizing
    // Assuming you add buttons with ids: text-increase, text-decrease, text-reset
    const textIncreaseButton = document.getElementById('text-increase');
    const textDecreaseButton = document.getElementById('text-decrease');
    const textResetButton = document.getElementById('text-reset');

    const rootElement = document.documentElement; // The <html> element
    const defaultFontSize = 16; // Base font size in px - Should match the default in :root
    const minFontSize = 12; // Minimum font size in px
    const maxFontSize = 24; // Maximum font size in px

    // Get saved font size from localStorage, parse it, or use default
    let currentFontSize = parseFloat(localStorage.getItem('fontSize')) || defaultFontSize;

    // Ensure the saved size is within limits
    currentFontSize = Math.max(minFontSize, Math.min(maxFontSize, currentFontSize));


    // Apply saved font size on load
    rootElement.style.setProperty('--base-font-size', currentFontSize + 'px');

    if (textIncreaseButton) {
        textIncreaseButton.addEventListener('click', () => {
            if (currentFontSize < maxFontSize) {
                currentFontSize += 2; // Increase font size by 2px
                rootElement.style.setProperty('--base-font-size', currentFontSize + 'px');
                localStorage.setItem('fontSize', currentFontSize); // Save new size
            }
        });
    }

    if (textDecreaseButton) {
        textDecreaseButton.addEventListener('click', () => {
            // Prevent decreasing below the minimum limit
            if (currentFontSize > minFontSize) {
                currentFontSize -= 2; // Decrease font size by 2px
                rootElement.style.setProperty('--base-font-size', currentFontSize + 'px');
                localStorage.setItem('fontSize', currentFontSize); // Save new size
            }
        });
    }

    // Optional: Reset text size to default
    if (textResetButton) {
        textResetButton.addEventListener('click', () => {
             currentFontSize = defaultFontSize;
             rootElement.style.setProperty('--base-font-size', currentFontSize + 'px');
             localStorage.setItem('fontSize', currentFontSize); // Save default size
        });
    }


    // Keep other existing scripts if necessary (like FAQ accordion from contact.html)
    // JavaScript for FAQ Accordion (Copied from contact.html)
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            // Close all other open answers
            document.querySelectorAll('.faq-answer').forEach(item => {
                if (item !== answer && item.style.display === 'block') {
                     item.style.display = 'none';
                     item.previousElementSibling.querySelector('i').classList.remove('rotated');
                }
            });

            // Toggle the clicked answer
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.classList.remove('rotated');
            } else {
                answer.style.display = 'block';
                icon.classList.add('rotated');
            }
        });
    });

     // JavaScript for Newsletter Submission (Placeholder) (Copied from other HTML files)
     // Note: This assumes there's only one form with action="subscribe.php" on the page.
     // If there are multiple, you might need a more specific selector.
     const subscribeForm = document.querySelector('form[action="subscribe.php"]');
     if (subscribeForm) {
         subscribeForm.addEventListener('submit', function(e) {
            // e.preventDefault(); // uncomment this line to prevent actual submission for testing
            alert('تم الاشتراك في النشرة البريدية بنجاح (هذه رسالة تجريبية)');
            // Add actual subscription logic here
         });
     }


});
