document.addEventListener("DOMContentLoaded", function() {
    // Mobile navigation toggle
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Load dynamic data from data.json
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Populate About text
            const aboutEl = document.getElementById('about-text');
            if (aboutEl && data.about) {
                aboutEl.textContent = data.about;
            }

            // Populate Education
            const eduContainer = document.getElementById('education-container');
            if (eduContainer && data.education) {
                eduContainer.innerHTML = data.education.map(edu => `
                    <div class="edu-card">
                        <div class="edu-header">
                            <h3 class="edu-degree">${edu.degree}</h3>
                            <span class="edu-period">${edu.period}</span>
                        </div>
                        <div class="edu-institution">${edu.institution}</div>
                        <p class="edu-details">${edu.details}</p>
                    </div>
                `).join('');
            }

            // Populate Skills categories
            const skillsContainer = document.getElementById('skills-container');
            if (skillsContainer && data.skills) {
                const categoryIcons = {
                    "Machine Learning & Data Science": "fas fa-brain",
                    "Software & Web Development": "fas fa-code",
                    "Systems & Systems Administration": "fas fa-server",
                    "Networking & Infrastructure": "fas fa-network-wired"
                };

                let skillsHtml = '';
                for (const [category, skillsList] of Object.entries(data.skills)) {
                    const iconClass = categoryIcons[category] || "fas fa-check-circle";
                    skillsHtml += `
                        <div class="skill-category-card">
                            <h3><i class="${iconClass}"></i> ${category}</h3>
                            <div class="tags-list">
                                ${skillsList.map(skill => `<span class="tag">${skill}</span>`).join('')}
                            </div>
                        </div>
                    `;
                }
                skillsContainer.innerHTML = skillsHtml;
            }

            // Populate Projects
            const projectsContainer = document.getElementById('projects-container');
            if (projectsContainer && data.projects) {
                projectsContainer.innerHTML = data.projects.map(proj => `
                    <div class="project-card">
                        <span class="project-badge">${proj.badge || 'Project'}</span>
                        <h3>${proj.title}</h3>
                        <p>${proj.description}</p>
                        <div class="project-tech">
                            ${(proj.tech || []).map(t => `<span>${t}</span>`).join('')}
                        </div>
                    </div>
                `).join('');
            }
        })
        .catch(err => {
            console.error("Could not load data.json:", err);
        });

    // Contact form handler
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            const statusEl = document.getElementById("form-status");

            if (name && email && message) {
                statusEl.innerText = "Thank you, " + name + "! Your message has been received.";
                statusEl.style.color = "#16a34a";
                this.reset();
            } else {
                statusEl.innerText = "Please complete all fields before sending.";
                statusEl.style.color = "#dc2626";
            }
        });
    }
});
