class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    position: sticky;
                    top: 0;
                    z-index: 50;
                    background-color: white;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                
                @media (prefers-color-scheme: dark) {
                    :host {
                        background-color: #1e293b;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                    }
                    
                    .nav-item {
                        color: #e2e8f0;
                    }
                    
                    .nav-item:hover {
                        color: #818cf8;
                    }
                }
                
                .nav-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    max-width: 100%;
                    margin: 0 auto;
                }
                
                slot[name="right"] {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .logo {
                    display: flex;
                    align-items: center;
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: #6366f1;
                    text-decoration: none;
                }
                
                .logo-icon {
                    margin-right: 0.5rem;
                }
                
                .nav-links {
                    display: none;
                }
                
                .mobile-menu-btn {
                    display: block;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 1.5rem;
                }
                
                .nav-item {
                    padding: 0.5rem 1rem;
                    font-weight: 500;
                    color: #334155;
                    text-decoration: none;
                    transition: color 0.2s;
                    display: inline-block;
                }
                
                .nav-item:hover {
                    color: #6366f1;
                }
                
                .nav-cta {
                    background-color: #6366f1;
                    color: white;
                    border-radius: 9999px;
                    padding: 0.5rem 1.5rem;
                    font-weight: 500;
                    transition: background-color 0.2s;
                    text-decoration: none;
                }
                
                .nav-cta:hover {
                    background-color: #4f46e5;
                    color: white;
                }
                
                @media (min-width: 768px) {
                    .nav-links {
                        display: flex;
                        align-items: center;
                        gap: 1rem;
                    }
                    
                    .mobile-menu-btn {
                        display: none;
                    }
                }
            </style>
            <div class="nav-container">
                <a href="index.html" class="logo">
                    <span class="logo-icon">🚀</span>
                    EduFusion Nexus
                </a>
                <nav class="nav-links">
                    <a href="index.html" class="nav-item">Home</a>
                    <a href="courses.html" class="nav-item">Courses</a>
                    <a href="about.html" class="nav-item">About</a>
                    <a href="signup.html" class="nav-cta">Get Started</a>
                </nav>
                <button class="mobile-menu-btn">☰</button>
                <slot name="right"></slot>
            </div>
        `;
    }
}

customElements.define('custom-navbar', CustomNavbar);