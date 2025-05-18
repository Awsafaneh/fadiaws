// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- Accessibility Features ---

    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const increaseTextBtn = document.getElementById('increase-text');
    const decreaseTextBtn = document.getElementById('decrease-text');

    // Load saved preferences on page load
    loadPreferences();

    // Theme Toggle
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
    }

    // Text Resizing
    if (increaseTextBtn && decreaseTextBtn) {
        increaseTextBtn.addEventListener('click', increaseTextSize);
        decreaseTextBtn.addEventListener('click', decreaseTextSize);
    }

    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        if (themeToggle) {
             themeToggle.checked = true;
        }
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
         if (themeToggle) {
            themeToggle.checked = false;
         }
    }

    function increaseTextSize() {
        let currentSize = parseFloat(body.style.fontSize) || 16; // Get current size or default to 16px
        currentSize += 1; // Increase by 1px
         if (currentSize <= 24) { // Set a maximum limit (e.g., 24px)
             body.style.fontSize = currentSize + 'px';
             localStorage.setItem('textSize', currentSize);
         }
    }

    function decreaseTextSize() {
        let currentSize = parseFloat(body.style.fontSize) || 16; // Get current size or default to 16px
        currentSize -= 1; // Decrease by 1px
        if (currentSize >= 14) { // Set a minimum limit (e.g., 14px)
            body.style.fontSize = currentSize + 'px';
            localStorage.setItem('textSize', currentSize);
        }
    }

    function loadPreferences() {
        const savedTheme = localStorage.getItem('theme');
        const savedTextSize = localStorage.getItem('textSize');

        if (savedTheme === 'dark') {
            enableDarkMode();
        } else {
             disableDarkMode(); // Ensure light mode is applied if no preference or 'light' is saved
        }

        if (savedTextSize) {
            body.style.fontSize = savedTextSize + 'px';
        } else {
             body.style.fontSize = '16px'; // Set default size if no preference saved
        }
    }


    // --- Existing JavaScript Below ---

    // Initialize loading animation
    const loading = document.querySelector('.loading');
    if (loading) {
        window.addEventListener('load', () => {
            loading.style.display = 'none';
        });
    }

    // Smooth scrolling for anchor links
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

    // Add fade-in animation to elements when they come into view
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

    // Observe all sections and cards
    document.querySelectorAll('section, .card, .feature-box').forEach(element => {
        observer.observe(element);
    });

    // Form validation (Keep existing)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // e.preventDefault(); // Keep this line if you handle submission via JS (e.g., Fetch)
            // else, remove it to allow standard form submission

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
                // showNotification('تم إرسال النموذج بنجاح!', 'success'); // Uncomment if you want a notification
                // form.reset(); // Uncomment if you want to reset the form after submission
            } else {
                // showNotification('يرجى ملء جميع الحقول المطلوبة', 'error'); // Uncomment if you want a notification
                 e.preventDefault(); // Prevent form submission if validation fails
            }
        });
    });

    // Notification system (Keep existing if used)
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


    // Mobile menu toggle (Keep existing)
     const hamburger = document.getElementById('hamburger'); // Use the correct ID from HTML
     const navbar = document.getElementById('navbar'); // Use the correct ID from HTML

     if (hamburger && navbar) {
         hamburger.addEventListener('click', function() {
             navbar.classList.toggle('show');
         });

          // Close mobile menu when a link is clicked (Keep existing)
         document.querySelectorAll('#navbar a').forEach(link => {
             link.addEventListener('click', () => {
                 navbar.classList.remove('show');
             });
         });

          // Close mobile menu when clicking outside (Add this if not already handled)
          document.addEventListener('click', (e) => {
              if (!hamburger.contains(e.target) && !navbar.contains(e.target)) {
                  navbar.classList.remove('show');
              }
          });
     }


    // Back to top button (Keep existing if needed, ensure its HTML exists or is created by JS)
    // Assuming your HTML already has a button with class 'back-to-top' or you create it via JS as shown below
    const backToTopButton = document.querySelector('.back-to-top'); // Select existing button

    if (!backToTopButton) { // If button doesn't exist, create it (keeping original JS logic)
        const backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopButton.className = 'back-to-top';
        document.body.appendChild(backToTopButton);

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
    } else { // If button exists, just add the scroll listener
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
    }


    // Image lazy loading (Keep existing if used)
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // FAQ Accordion (Keep existing if used on contact page)
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

     // Placeholder form submissions (Keep existing if used)
      document.querySelectorAll('form[action="submit-form.php"]').forEach(form => {
           form.addEventListener('submit', function(e) {
               // e.preventDefault(); // uncomment this line to prevent actual submission for testing
               // alert('تم إرسال النموذج بنجاح (هذه رسالة تجريبية، يجب إضافة معالجة فعلية في الخلفية)'); // Uncomment for alert
               // Add actual form submission logic here (e.g., Fetch API)
            });
      });

       document.querySelectorAll('form[action="subscribe.php"]').forEach(form => {
          form.addEventListener('submit', function(e) {
               // e.preventDefault(); // uncomment this line to prevent actual submission for testing
               // alert('تم الاشتراك في النشرة البريدية بنجاح (هذه رسالة تجريبية)'); // Uncomment for alert
               // Add actual subscription logic here
            });
       });


}); // End DOMContentLoaded
