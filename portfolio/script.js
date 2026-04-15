    document.addEventListener('DOMContentLoaded', () => {
            // --- "View All Projects" Button Logic ---
            const viewAllBtn = document.getElementById('view-all-projects-btn');
            const extraProjects = document.querySelectorAll('[data-extra-project]');
            let allProjectsVisible = false;

            viewAllBtn.addEventListener('click', () => {
                allProjectsVisible = !allProjectsVisible;
                extraProjects.forEach(project => {
                    project.classList.toggle('hidden');
                });

                if (allProjectsVisible) {
                    viewAllBtn.textContent = 'Show Less';
                } else {
                    viewAllBtn.textContent = 'View All Projects';
                }
            });

        // --- Intersection Observer for Animations ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Animate Skill Bars only when the skills section is visible
                    if (entry.target.id === 'skills-section') {
                        const skillBars = document.querySelectorAll('.skill-bar');
                        skillBars.forEach(bar => {
                            const width = bar.getAttribute('data-width');
                            bar.classList.remove('w-0');
                            bar.classList.add(width);
                        });
                    }
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.fade-in-up').forEach((el) => {
            observer.observe(el);
        });
    });


    // mobile menu toggle

     const menuBtn = document.getElementById('menu-btn');
        const menuOpenIcon = document.getElementById('menu-open-icon');
        const menuCloseIcon = document.getElementById('menu-close-icon');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        // Function to toggle the menu state
        const toggleMenu = () => {
            mobileMenu.classList.toggle('hidden');
            menuOpenIcon.classList.toggle('hidden');
            menuCloseIcon.classList.toggle('hidden');
        };

        // Function to explicitly close the menu
        const closeMenu = () => {
            // Check if the menu is already closed to avoid unnecessary changes
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                menuOpenIcon.classList.remove('hidden');
                menuCloseIcon.classList.add('hidden');
            }
        };

        // Event listener for the main toggle button
        menuBtn.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked (for single-page navigation)
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });


        // api call for contact form

        document.getElementById("contactForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      try {
        const res = await fetch("https://rishi-portfolio-backendv2.onrender.com/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();
        document.getElementById("status").innerText = data.message;
        document.getElementById("status").style.color = "green";
        document.getElementById("contactForm").reset();
      } catch (err) {
        document.getElementById("status").innerText = "Error sending message!";
        document.getElementById("status").style.color = "red";
      }
    }); 
