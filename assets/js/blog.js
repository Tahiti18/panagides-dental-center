document.addEventListener('DOMContentLoaded', () => {
    const postsGrid = document.getElementById('blog-posts-grid');
    const paginationContainer = document.getElementById('blog-pagination');
    const searchInput = document.getElementById('search-posts');
    const categoryButtons = document.querySelectorAll('#category-filter-container .tag-btn');

    if (!postsGrid) return;

    let allPosts = [];
    let filteredPosts = [];
    let selectedCategory = 'all';
    let searchQuery = '';
    let currentPage = 1;
    const postsPerPage = 4; // Show 4 per page since we have 6 posts total, giving 2 pages

    // Mapping slugs to categories (allows multiple tags matching)
    const categoryMap = {
        "World-No-Tobacco-Day": ["general"],
        "CEREC-MCXL-Premium": ["aesthetic", "technology"],
        "menopause-and-oral-health": ["womens", "general"],
        "the-rise-of-ai-in-dentistry": ["technology"],
        "what-is-a-dental-implant": ["implants"],
        "wisdom-teeth-what-you-need-to-know": ["general", "implants"]
    };

    // Human-friendly visual tags map
    const displayTagMap = {
        "World-No-Tobacco-Day": "Oral Hygiene",
        "CEREC-MCXL-Premium": "Technology",
        "menopause-and-oral-health": "Women's Health",
        "the-rise-of-ai-in-dentistry": "AI & Tech",
        "what-is-a-dental-implant": "Implants",
        "wisdom-teeth-what-you-need-to-know": "Oral Surgery"
    };

    // Load blog posts data
    fetch('blog-posts.json')
        .then(res => res.json())
        .then(data => {
            allPosts = data;
            
            // Check if there is a search query in the URL (e.g. from sidebar search)
            const urlParams = new URLSearchParams(window.location.search);
            const q = urlParams.get('q');
            if (q) {
                searchQuery = q.trim();
                if (searchInput) searchInput.value = searchQuery;
            }

            filterAndRender();
        })
        .catch(err => {
            console.error("Error loading blog posts:", err);
            postsGrid.innerHTML = `
                <div class="text-center" style="grid-column: 1/-1; padding: 40px;">
                    <i class="fa-solid fa-triangle-exclamation" style="font-size: 3rem; color: #ef4444; margin-bottom: 15px;"></i>
                    <p>Failed to load articles. Please refresh or try again later.</p>
                </div>
            `;
        });

    // 1. Filter Logic
    function filterAndRender() {
        filteredPosts = allPosts.filter(post => {
            // Category check
            const categories = categoryMap[post.slug] || [];
            const matchesCategory = selectedCategory === 'all' || categories.includes(selectedCategory);

            // Search query check (title + summary)
            const query = searchQuery.toLowerCase();
            const matchesSearch = post.title.toLowerCase().includes(query) || 
                                  post.summary.toLowerCase().includes(query) ||
                                  post.content.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });

        currentPage = 1; // Reset to page 1 on search or filter change
        renderPosts();
        renderPagination();
    }

    // 2. Render Grid Cards
    function renderPosts() {
        postsGrid.innerHTML = '';

        if (filteredPosts.length === 0) {
            postsGrid.innerHTML = `
                <div class="text-center" style="grid-column: 1/-1; padding: 60px 20px;">
                    <i class="fa-solid fa-magnifying-glass" style="font-size: 3rem; color: var(--text-light); margin-bottom: 20px;"></i>
                    <h3>No articles match your search</h3>
                    <p style="margin-top: 10px; color: var(--text-muted);">Try checking for spelling errors, using simpler keywords, or resetting category filters.</p>
                </div>
            `;
            return;
        }

        // Pagination slicing
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

        paginatedPosts.forEach(post => {
            const tag = displayTagMap[post.slug] || "Dental Care";
            const cleanImgSrc = post.img_src;

            const card = document.createElement('div');
            card.className = 'blog-card reveal active'; // trigger active immediately
            card.innerHTML = `
                <div class="blog-card-img-wrapper">
                    <img src="${cleanImgSrc}" alt="${post.title}" class="blog-card-img" loading="lazy">
                </div>
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span class="blog-tag">${tag}</span>
                        <span>Clinical Insight</span>
                    </div>
                    <h3><a href="blog-post.html?post=${post.slug}">${post.title}</a></h3>
                    <p class="blog-card-desc">${post.summary}</p>
                    <a href="blog-post.html?post=${post.slug}" class="blog-readmore">
                        READ ARTICLE <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            `;
            postsGrid.appendChild(card);
        });

        // Scroll back to top of section when page changes
        if (currentPage > 1) {
            document.querySelector('.blog-header').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // 3. Render Pagination Controls
    function renderPagination() {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';

        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        if (totalPages <= 1) return; // No pagination needed for 1 page

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPosts();
                renderPagination();
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-item ${currentPage === i ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderPosts();
                renderPagination();
            });
            paginationContainer.appendChild(pageBtn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPosts();
                renderPagination();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // 4. Search Handler
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterAndRender();
        });
    }

    // 5. Category Tabs Handler
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            selectedCategory = btn.getAttribute('data-category');
            filterAndRender();
        });
    });
});
