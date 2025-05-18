// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // --- Accessibility Features - Added ---

    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle'); // Assuming the theme toggle switch has this ID
    const increaseTextBtn = document.getElementById('increase-text'); // Assuming the increase text button has this ID
    const decreaseTextBtn = document.getElementById('decrease-text'); // Assuming the decrease text button has this ID

    // Load saved preferences on page load
    loadPreferences();

    // Theme Toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                enableDarkMode();
            } else {
                disableDarkMode();
            }
        });
         console.log('Theme toggle found and listener attached.');
    } else {
        console.warn('Theme toggle element (#theme-toggle) not found.');
    }

    // Text Resizing functionality
    if (increaseTextBtn && decreaseTextBtn) {
        increaseTextBtn.addEventListener('click', increaseTextSize);
        decreaseTextBtn.addEventListener('click', decreaseTextSize);
        console.log('Text resizing buttons found and event listeners attached.');
    } else {
        console.warn('Text resizing buttons (#increase-text or #decrease-text) not found.');
    }


    function enableDarkMode() {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        // Ensure the toggle is checked visually if dark mode is enabled programmatically
        if (themeToggle) {
             themeToggle.checked = true;
        }
         console.log('Dark mode enabled.');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
         // Ensure the toggle is unchecked visually if light mode is enabled programmatically
         if (themeToggle) {
            themeToggle.checked = false;
         }
         console.log('Dark mode disabled.');
    }

    function increaseTextSize() {
        // Get the current computed font size of the body
        let currentSize = parseFloat(window.getComputedStyle(body).fontSize);
        currentSize += 1; // Increase by 1 pixel
         // Set a maximum limit for text size to prevent layout issues
         if (currentSize <= 24) { // Example limit: 24px
             body.style.fontSize = currentSize + 'px'; // Apply the new size
             localStorage.setItem('textSize', currentSize); // Save preference
             console.log('Increased text size to: ' + body.style.fontSize);
         } else {
             console.log('Reached maximum text size: ' + currentSize);
         }
    }

    function decreaseTextSize() {
         // Get the current computed font size of the body
        let currentSize = parseFloat(window.getComputedStyle(body).fontSize);
        currentSize -= 1; // Decrease by 1 pixel
         // Set a minimum limit for text size
        if (currentSize >= 14) { // Example limit: 14px
            body.style.fontSize = currentSize + 'px'; // Apply the new size
            localStorage.setItem('textSize', currentSize); // Save preference
             console.log('Decreased text size to: ' + body.style.fontSize);
        } else {
             console.log('Reached minimum text size: ' + currentSize);
        }
    }

    function loadPreferences() {
        const savedTheme = localStorage.getItem('theme');
        const savedTextSize = localStorage.getItem('textSize');

        // Load theme preference
        if (savedTheme === 'dark') {
            enableDarkMode();
        } else {
            // If no preference or 'light' is saved, ensure default light mode is active
            disableDarkMode(); // Explicitly call disableDarkMode to ensure the class is removed and toggle is unchecked
        }

        // Load text size preference
        if (savedTextSize) {
            body.style.fontSize = savedTextSize + 'px'; // Apply saved size
            console.log('Loaded text size preference: ' + savedTextSize + 'px.');
        } else {
            // If no preference saved, ensure default size (defined in CSS or browser default) is used.
            // body.style.fontSize = '16px'; // Optional: set a specific default if needed
            console.log('No text size preference found.');
        }
    }


    // --- Existing JavaScript - Integrated ---

    // Initialize loading animation
    const loading = document.querySelector('.loading');
    if (loading) {
        // Use 'load' event on window to ensure all resources are loaded
        window.addEventListener('load', () => {
            loading.style.display = 'none';
             console.log('Loading screen hidden.');
        });
         // Fallback in case load event doesn't fire (e.g., cached page)
         setTimeout(() => {
             if (loading.style.display !== 'none') {
                 loading.style.display = 'none';
                  console.log('Loading screen hidden by timeout.');
             }
         }, 5000); // Hide after 5 seconds if not already hidden
         console.log('Loading screen element found.');
    } else {
        console.warn('Loading screen element (.loading) not found.');
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
                 console.log('Smooth scrolling to: ' + this.getAttribute('href'));
            }
        });
         console.log('Smooth scrolling listeners attached.');
    });


    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that triggers the fade-in animation
                entry.target.classList.add('fade-in');
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
                 console.log('Element is intersecting, adding fade-in class:', entry.target);
            }
        });
    }, observerOptions);

    // Observe elements you want to animate.
    // Keep existing selectors, but adjust if needed based on your HTML structure.
    document.querySelectorAll('section, .card, .feature-box, .program-item, .nutrition-item, .goal-item, .contact-info .card, .contact-form-box, .faq-item').forEach(element => {
        observer.observe(element);
    });
     console.log('Intersection Observer set up.');


    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Prevent default form submission for client-side validation/processing
            e.preventDefault();

            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    // Add a class for invalid fields (ensure you have CSS for '.is-invalid')
                    field.classList.add('is-invalid');
                     console.warn('Required field is empty:', field);
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            if (isValid) {
                // If form is valid, you would typically send the data using Fetch API or XMLHttpRequest
                console.log('Form is valid. Ready to submit data.');
                // Example of sending data (replace with your actual endpoint and method)
                /*
                const formData = new FormData(form);
                fetch(form.action, {
                    method: form.method,
                    body: formData
                }).then(response => {
                    if (response.ok) {
                        showNotification('تم إرسال النموذج بنجاح!', 'success');
                        form.reset();
                    } else {
                        showNotification('حدث خطأ أثناء إرسال النموذج.', 'error');
                    }
                }).catch(error => {
                    console.error('Error submitting form:', error);
                    showNotification('حدث خطأ أثناء إرسال النموذج.', 'error');
                });
                */

                 // Placeholder success action if not submitting via fetch
                 showNotification('تم إرسال النموذج بنجاح!', 'success'); // Ensure showNotification function exists
                 form.reset(); // Reset form after successful fake submission

            } else {
                // If form is invalid, show an error notification
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error'); // Ensure showNotification function exists
                 console.error('Form is invalid. Required fields are missing.');
            }
        });
         console.log('Form submission listeners attached.');
    });


    // Notification system (Assuming this function exists elsewhere or is added here)
    // Add this function if you intend to use showNotification as called in form validation
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add to body
        document.body.appendChild(notification);

        // Trigger animation (show)
        setTimeout(() => {
            notification.classList.add('show');
        }, 100); // Small delay to allow element to be added to DOM

        // Remove notification after a delay
        setTimeout(() => {
            notification.classList.remove('show');
            // Remove from DOM after fade-out transition
            notification.addEventListener('transitionend', () => {
                 notification.remove();
                 console.log('Notification removed.');
            }, { once: true }); // Use { once: true } to automatically remove listener
        }, 3000); // Show for 3 seconds
         console.log('showNotification function defined.');
    }


    // Mobile menu toggle
    // Assuming you are using elements with class .navbar-toggler and .navbar-collapse
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // If using the HTML structure from the previous response with #hamburger and #navbar
     const hamburger = document.getElementById('hamburger');
     const navbar = document.getElementById('navbar'); // Assuming the menu still has id="navbar"

     if (hamburger && navbar) {
         hamburger.addEventListener('click', function() {
             navbar.classList.toggle('show');
              console.log('Hamburger clicked, toggling navbar class.');
         });

         // Close mobile menu when a link is clicked
         document.querySelectorAll('#navbar a').forEach(link => {
             link.addEventListener('click', () => {
                 navbar.classList.remove('show');
                  console.log('Nav link clicked, hiding navbar.');
             });
         });

          // Close mobile menu when clicking outside
          document.addEventListener('click', (e) => {
              if (navbar.classList.contains('show') && !hamburger.contains(e.target) && !navbar.contains(e.target)) {
                  navbar.classList.remove('show');
                   console.log('Clicked outside menu, hiding navbar.');
              }
          });
          console.log('Mobile menu listeners attached (using #hamburger and #navbar).');

     } else if (navbarToggler && navbarCollapse) {
        // Fallback for Bootstrap-like structure if needed
         navbarToggler.addEventListener('click', () => {
             navbarCollapse.classList.toggle('show');
              console.log('Navbar toggler clicked, toggling collapse class.');
         });

         // Close mobile menu when clicking outside
         document.addEventListener('click', (e) => {
             if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                 navbarCollapse.classList.remove('show');
                  console.log('Clicked outside menu, hiding navbar collapse.');
             }
         });
          console.log('Mobile menu listeners attached (using .navbar-toggler and .navbar-collapse).');
    } else {
         console.warn('Mobile menu toggler or collapse element not found.');
    }


    // Back to top button
    // Check if a button with class 'back-to-top' already exists in the HTML
    const existingBackToTopButton = document.querySelector('.back-to-top');

    if (!existingBackToTopButton) {
        // If button doesn't exist, create it dynamically as in the original code
        const newBackToTopButton = document.createElement('button');
        newBackToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
        newBackToTopButton.className = 'back-to-top';
        document.body.appendChild(newBackToTopButton);
         console.log('Back to top button created dynamically.');

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
             console.log('Scrolled to top (dynamic button).');
        });
         console.log('Scroll listener attached to dynamic back to top button.');

    } else {
        // If the button exists in HTML, just attach the scroll listener to it
        window.addEventListener('scroll', () => {
             if (window.pageYOffset > 300) {
                 existingBackToTopButton.classList.add('show');
             } else {
                 existingBackToTopButton.classList.remove('show');
             }
         });

         existingBackToTopButton.addEventListener('click', () => {
             window.scrollTo({
                 top: 0,
                 behavior: 'smooth'
             });
              console.log('Scrolled to top (existing button).');
         });
         console.log('Scroll listener attached to existing back to top button.');
    }


    // Image lazy loading
    // Check if the browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
             // If the browser supports native lazy loading, just ensure the src is set if using data-src
             if (img.dataset.src) {
                 img.src = img.dataset.src;
                 console.log('Applied native lazy loading for image:', img.src);
             }
        });
         console.log('Native lazy loading supported.');
    } else {
        // Fallback for browsers that don't support lazy loading - load lazysizes library
        // Check if lazysizes is already loaded
        if (!window.lazySizes) {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
            document.body.appendChild(script);
             console.log('Native lazy loading not supported, loading lazysizes fallback.');
        } else {
             console.log('Native lazy loading not supported, but lazysizes is already loaded.');
        }
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
                     // Find the icon in the previously open question
                     const prevIcon = item.previousElementSibling.querySelector('i');
                     if (prevIcon) {
                        prevIcon.classList.remove('rotated');
                     }
                }
            });

            // Toggle the clicked answer
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.classList.remove('rotated');
                 console.log('FAQ answer hidden.');
            } else {
                answer.style.display = 'block';
                icon.classList.add('rotated');
                 console.log('FAQ answer shown.');
            }
        });
         console.log('FAQ accordion listeners attached.');
    });


     // Placeholder form submissions (Ensure these match your HTML form actions)
      document.querySelectorAll('form[action="submit-form.php"]').forEach(form => {
           form.addEventListener('submit', function(e) {
               // Note: e.preventDefault() is already handled by the form validation logic above
               console.log('Contact form submitted (placeholder).');
               // Add your actual form submission logic here (e.g., using Fetch API)
            });
            console.log('Contact form submit listener attached.');
      });

       document.querySelectorAll('form[action="subscribe.php"]').forEach(form => {
          form.addEventListener('submit', function(e) {
               // Note: e.preventDefault() is already handled by the form validation logic above
               console.log('Subscription form submitted (placeholder).');
               // Add your actual subscription logic here (e.g., using Fetch API)
            });
           console.log('Subscription form submit listener attached.');
       });


}); // End DOMContentLoaded
