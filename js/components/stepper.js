

document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step-item');
    const visualImage = document.querySelector('.different-visual img');

    if (!steps.length || !visualImage) return;

    
    
    const observerOptions = {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                steps.forEach(s => s.classList.remove('active'));

                
                entry.target.classList.add('active');

                
                const newImageSrc = entry.target.getAttribute('data-image');
                if (newImageSrc && visualImage.getAttribute('src') !== newImageSrc) {
                    visualImage.style.opacity = '0';
                    visualImage.style.transform = 'translateY(10px)'; 

                    setTimeout(() => {
                        visualImage.src = newImageSrc;
                        visualImage.style.opacity = '1';
                        visualImage.style.transform = 'translateY(0)';
                    }, 400); 
                }
            }
        });
    }, observerOptions);

    
    steps.forEach(step => observer.observe(step));
});

