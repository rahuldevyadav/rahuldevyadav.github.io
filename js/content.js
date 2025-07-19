// Load and display content dynamically
class ContentManager {
    constructor() {
        this.loadContent();
    }

    async loadContent() {
        try {
            const [blogs, projects, miscPosts] = await Promise.all([
                fetch('data/blogs.json').then(r => r.json()),
                fetch('data/projects.json').then(r => r.json()),
                fetch('data/misc-posts.json').then(r => r.json())
            ]);

            this.renderBlogs(blogs);
            this.renderProjects(projects);
            this.renderMiscPosts(miscPosts);
        } catch (error) {
            console.error('Error loading content:', error);
            this.loadFallbackContent();
        }
    }

    renderBlogs(blogs) {
        const container = document.getElementById('tech-blogs');
        const latestBlogs = blogs.slice(0, 3); // Show only 3 latest
        
        container.innerHTML = latestBlogs.map(blog => `
            <article class="blog-card">
                <img src="${blog.image}" alt="${blog.title}">
                <div class="blog-card-content">
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt}</p>
                    <div class="blog-meta">
                        <span class="category-tag">${blog.category}</span>
                        <span>${blog.date}</span>
                    </div>
                    <button class="read-more" onclick="location.href='${blog.url}'">Read More ..</button>
                </div>
            </article>
        `).join('');
    }

    renderProjects(projects) {
        const container = document.getElementById('projects-grid');
        const featuredProjects = projects.slice(0, 3); // Show only 3 featured
        
        container.innerHTML = featuredProjects.map(project => `
            <div class="project-card">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.demo ? `<a href="${project.demo}" target="_blank">Live Demo</a>` : ''}
                    ${project.github ? `<a href="${project.github}" target="_blank">GitHub</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderMiscPosts(posts) {
        const container = document.getElementById('misc-blogs');
        const latestPosts = posts.slice(0, 3); // Show only 3 latest
        
        container.innerHTML = latestPosts.map(post => `
            <article class="blog-card">
                <img src="${post.image}" alt="${post.title}">
                <div class="blog-card-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="blog-meta">
                        <span class="category-tag">${post.category}</span>
                        <span>${post.date}</span>
                        <button class="read-more" onclick="location.href='${post.url}'">Read More ..</button>
                    </div>
                </div>
            </article>
        `).join('');
    }

    loadFallbackContent() {
        // Fallback content if JSON loading fails
        console.log('Loading fallback content...');
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContentManager();
});