document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        // Filter projects based on category
        const filterProjects = (category) => {
            projectCards.forEach(card => {
                const cardCategories = card.dataset.category ? card.dataset.category.split(' ') : [];
                
                if (category === 'all' || cardCategories.includes(category)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        };
        
        // Add click event to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter category
                const filterCategory = button.getAttribute('data-filter');
                
                // Filter projects
                filterProjects(filterCategory);
            });
        });
        
        // Initialize with 'all' filter
        filterProjects('all');
    }
});
