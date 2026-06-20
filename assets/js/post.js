document.addEventListener('DOMContentLoaded', () => {
    const postHero = document.getElementById('post-hero-banner');
    const bannerImg = document.getElementById('post-banner-img');
    const breadcrumbTitle = document.getElementById('breadcrumb-title');
    const mainTitle = document.getElementById('post-main-title');
    const mainBody = document.getElementById('post-main-body');
    const postTag = document.getElementById('post-tag');
    const postDate = document.getElementById('post-date');
    const postReadTime = document.getElementById('post-read-time');
    const relatedContainer = document.getElementById('sidebar-related-posts');

    if (!mainBody) return;

    // Human-friendly visual tags map
    const displayTagMap = {
        "World-No-Tobacco-Day": "Oral Hygiene",
        "CEREC-MCXL-Premium": "Technology",
        "menopause-and-oral-health": "Women's Health",
        "the-rise-of-ai-in-dentistry": "AI & Tech",
        "what-is-a-dental-implant": "Implants",
        "wisdom-teeth-what-you-need-to-know": "Oral Surgery"
    };

    // Human-friendly reading times
    const readTimeMap = {
        "World-No-Tobacco-Day": "5 min read",
        "CEREC-MCXL-Premium": "3 min read",
        "menopause-and-oral-health": "4 min read",
        "the-rise-of-ai-in-dentistry": "3 min read",
        "what-is-a-dental-implant": "6 min read",
        "wisdom-teeth-what-you-need-to-know": "5 min read"
    };

    // Dates map
    const dateMap = {
        "World-No-Tobacco-Day": "May 31, 2026",
        "CEREC-MCXL-Premium": "April 15, 2026",
        "menopause-and-oral-health": "March 20, 2026",
        "the-rise-of-ai-in-dentistry": "Feb 12, 2026",
        "what-is-a-dental-implant": "Jan 28, 2026",
        "wisdom-teeth-what-you-need-to-know": "Nov 15, 2025"
    };

    // Get URL post query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const postSlug = urlParams.get('post');

    if (!postSlug) {
        // Redirect to blog if no slug
        window.location.href = 'blog.html';
        return;
    }

    // Fetch blog data
    fetch('blog-posts.json')
        .then(res => res.json())
        .then(posts => {
            const currentPost = posts.find(p => p.slug === postSlug);
            
            if (!currentPost) {
                // If post not found in JSON, show error
                mainTitle.textContent = "Article Not Found";
                mainBody.innerHTML = `<p>Sorry, the article you are looking for does not exist or has been moved. <a href="blog.html">Go back to Blog</a>.</p>`;
                return;
            }

            // 1. Populate metadata & headings
            const title = currentPost.title;
            document.title = `${title} | Dr. Adonis Panagidis Dental Center`;
            
            // Set dynamic meta description for SEO
            let metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute('content', currentPost.summary);
            } else {
                metaDesc = document.createElement('meta');
                metaDesc.name = "description";
                metaDesc.content = currentPost.summary;
                document.head.appendChild(metaDesc);
            }

            // 2. Populate Header Banner & Breadcrumbs
            const cleanImgSrc = currentPost.img_src;
            
            if (bannerImg) bannerImg.src = cleanImgSrc;
            if (breadcrumbTitle) breadcrumbTitle.textContent = title;
            if (mainTitle) mainTitle.textContent = title;
            
            // 3. Tags & Dates
            const tag = displayTagMap[postSlug] || "Dental Care";
            if (postTag) {
                postTag.textContent = tag;
                // Style tags depending on category
                if(postSlug === "menopause-and-oral-health") postTag.style.backgroundColor = "rgba(236, 72, 153, 0.15)";
                if(postSlug === "menopause-and-oral-health") postTag.style.color = "#ec4899";
            }
            if (postDate) postDate.textContent = dateMap[postSlug] || "Recent Article";
            if (postReadTime) postReadTime.textContent = readTimeMap[postSlug] || "4 min read";

            // 4. Populate Content Body
            let rawContent = currentPost.content;

            if (mainBody) {
                mainBody.innerHTML = rawContent;
            }

            // 5. Render Related Posts Sidebar (exclude current post)
            renderRelatedPosts(posts, postSlug);
        })
        .catch(err => {
            console.error("Error loading blog article content:", err);
            mainTitle.textContent = "Error Loading Article";
            mainBody.innerHTML = `<p>There was a technical issue fetching the article content. Please check your connection and <a href="javascript:location.reload()">try again</a>.</p>`;
        });

    function renderRelatedPosts(allPosts, currentSlug) {
        if (!relatedContainer) return;
        relatedContainer.innerHTML = '';

        // Filter out current post
        const related = allPosts.filter(p => p.slug !== currentSlug).slice(0, 3);

        related.forEach(post => {
            const cleanImgSrc = post.img_src;
            const date = dateMap[post.slug] || "Recent";

            const item = document.createElement('div');
            item.className = 'related-item';
            item.innerHTML = `
                <img src="${cleanImgSrc}" alt="${post.title}" class="related-img">
                <div class="related-info">
                    <h4><a href="blog-post.html?post=${post.slug}">${post.title}</a></h4>
                    <span class="related-date">${date}</span>
                </div>
            `;
            relatedContainer.appendChild(item);
        });
    }
});
