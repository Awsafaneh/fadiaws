// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- Accessibility Features - Added ---

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

    // Text Resizing Event Listeners
    if (increaseTextBtn && decreaseTextBtn) {
        increaseTextBtn.addEventListener('click', increaseTextSize);
        decreaseTextBtn.addEventListener('click', decreaseTextSize);
         console.log('Text resizing buttons found and event listeners attached.'); // Added for debugging
    } else {
         console.error('Text resizing buttons not found!'); // Added for debugging
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
        // Use getComputedStyle to get the actual calculated font size, including any default browser style or CSS
        let currentSize = parseFloat(window.getComputedStyle(body).fontSize);
        currentSize += 1; // Increase by 1px
         if (currentSize <= 24) { // Set a maximum limit (e.g., 24px)
             body.style.fontSize = currentSize + 'px'; // Set the inline style
             localStorage.setItem('textSize', currentSize);
              console.log('Increased text size to: ' + body.style.fontSize); // Added for debugging
         } else {
              console.log('Reached maximum text size: ' + currentSize); // Added for debugging
         }
    }

    function decreaseTextSize() {
         // Use getComputedStyle to get the actual calculated font size
        let currentSize = parseFloat(window.getComputedStyle(body).fontSize);
        currentSize -= 1; // Decrease by 1px
        if (currentSize >= 14) { // Set a minimum limit (e.g., 14px)
            body.style.fontSize = currentSize + 'px'; // Set the inline style
            localStorage.setItem('textSize', currentSize);
             console.log('Decreased text size to: ' + body.style.fontSize); // Added for debugging
        } else {
             console.log('Reached minimum text size: ' + currentSize); // Added for debugging
        }
    }

    function loadPreferences() {
        const savedTheme = localStorage.getItem('theme');
        const savedTextSize = localStorage.getItem('textSize');

        if (savedTheme === 'dark') {
            enableDarkMode();
        } else {
             // Default to light mode if no preference or 'light' is saved
             // No action needed here as light mode is the default CSS
             if (themeToggle) {
                 themeToggle.checked = false;
             }
        }

        if (savedTextSize) {
            body.style.fontSize = savedTextSize + 'px'; // Apply saved size
             console.log('Loaded text size preference: ' + savedTextSize + 'px.'); // Added for debugging
        } else {
             body.style.fontSize = '16px'; // Set default size if no preference saved
              console.log('No text size preference found, defaulting to 16px.'); // Added for debugging
        }
    }


    // --- Existing JavaScript - Integrated ---

    // Initialize loading animation (Keep existing)
    const loading = document.querySelector('.loading');
    if (loading) {
        window.addEventListener('load', () => {
            loading.style.display = 'none';
        });
    }

    // Smooth scrolling for anchor links (Keep existing)
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

    // Add fade-in animation to elements when they come into view (Keep existing)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // entry.target.classList.add('visible'); // Original was 'fade-in', changed to 'visible' in previous turn based on style.css
                 entry.target.classList.add('fade-in'); // Reverted to 'fade-in' based on original JS and CSS
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards (Keep existing, adjust selectors if needed)
    // document.querySelectorAll('section, .card, .feature-card, .program-card, .tip-card').forEach(element => { // Selectors from previous turn
    document.querySelectorAll('section, .card, .feature-box, .program-item, .nutrition-item, .goal-item, .contact-info .card, .contact-form-box, .faq-item').forEach(element => { // Selectors based on original HTML
        observer.observe(element);
    });

    // Form validation (Keep existing)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
             // Prevent form submission if validation fails
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    // Add a class for invalid fields
                    field.classList.add('is-invalid');
                } else {
                     field.classList.remove('is-invalid');
                }
            });

            if (!isValid) {
                 e.preventDefault();
                 // showNotification('يرجى ملء جميع الحقول المطلوبة', 'error'); // Uncomment if you want a notification and have the function
            } else {
                 // Here you would typically send the form data to a server
                 // showNotification('تم إرسال النموذج بنجاح!', 'success'); // Uncomment if you want a notification and have the function
                 // form.reset(); // Uncomment if you want to reset the form after submission
                 // If you uncomment e.preventDefault() above, you need to handle the actual submission here
            }
        });
    });

    // Notification system (Keep existing if used)
    // Add the showNotification function if it was used elsewhere and is needed.
    // function showNotification(message, type = 'info') { ... }


    // Mobile menu toggle (Keep existing, adjusted based on original HTML structure with #hamburger and #navbar)
     const hamburger = document.getElementById('hamburger');
     const navbar = document.getElementById('navbar'); // Assuming the menu still has id="navbar"

     if (hamburger && navbar) {
         hamburger.addEventListener('click', function() {
             navbar.classList.toggle('show');
              console.log('Hamburger clicked, toggling navbar class.'); // Added for debugging
         });

         // Close mobile menu when a link is clicked
         document.querySelectorAll('#navbar a').forEach(link => {
             link.addEventListener('click', () => {
                 navbar.classList.remove('show');
                  console.log('Nav link clicked, hiding navbar.'); // Added for debugging
             });
         });

          // Close mobile menu when clicking outside
          document.addEventListener('click', (e) => {
              if (navbar.classList.contains('show') && !hamburger.contains(e.target) && !navbar.contains(e.target)) {
                  navbar.classList.remove('show');
                   console.log('Clicked outside menu, hiding navbar.'); // Added for debugging
              }
          });
     } else {
         console.error('Hamburger or Navbar element not found!'); // Added for debugging
     }


    // Back to top button (Keep existing)
    // The original JS creates the button, so we keep that logic if the button is not in HTML
    const backToTopButton = document.querySelector('.back-to-top');
    if (!backToTopButton) { // If button doesn't exist, create it
         const newBackToTopButton = document.createElement('button');
         newBackToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
         newBackToTopButton.className = 'back-to-top';
         document.body.appendChild(newBackToTopButton);

         window.addEventListener('scroll', () => {
             if (window.pageYOffset > 300) {
                 newBackToTopButton.classList.add('show');
             } else {
                 newBackToTopButton.classList.remove('show');
             }
         });

         newBackToTopButton.addEventListener('click', () => {
             window.scrollTo({
                 top: 0,
                 behavior: 'smooth'
             });
         });
    } else { // If button already exists in HTML, just add the scroll listener
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


    // Image lazy loading (Keep existing)
    // Check if the browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
             // If the browser supports native lazy loading, just ensure the src is set if using data-src
             if (img.dataset.src) {
                 img.src = img.dataset.src;
             }
        });
         console.log('Native lazy loading supported and applied.'); // Added for debugging
    } else {
        // Fallback for browsers that don't support lazy loading - load lazysizes library
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
         console.log('Native lazy loading not supported, loading lazysizes fallback.'); // Added for debugging
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
              console.log('FAQ question clicked.'); // Added for debugging
         });
     });

     // Placeholder form submissions (Keep existing)
      document.querySelectorAll('form[action="submit-form.php"]').forEach(form => {
           form.addEventListener('submit', function(e) {
               // e.preventDefault(); // uncomment this line to prevent actual submission for testing
               // alert('تم إرسال النموذج بنجاح (هذه رسالة تجريبية، يجب إضافة معالجة فعلية في الخلفية)'); // Uncomment for alert
               // Add actual form submission logic here (e.g., Fetch API)
                console.log('Contact form submitted (placeholder).'); // Added for debugging
            });
      });

       document.querySelectorAll('form[action="subscribe.php"]').forEach(form => {
          form.addEventListener('submit', function(e) {
               // e.preventDefault(); // uncomment this line to prevent actual submission for testing
               // alert('تم الاشتراك في النشرة البريدية بنجاح (هذه رسالة تجريبية)'); // Uncomment for alert
               // Add actual subscription logic here
                console.log('Subscription form submitted (placeholder).'); // Added for debugging
            });
       });


}); // End DOMContentLoaded
