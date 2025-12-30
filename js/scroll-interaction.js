

const stepItems = document.querySelectorAll('.step-item');
const visualImage = document.querySelector('.different-visual img');
const differentSection = document.querySelector('.different-section');

if (stepItems.length > 0 && visualImage && differentSection) {
    
    visualImage.style.transition = 'opacity 0.3s ease';

    let currentActiveIndex = 0;
    let isScrolling = false;
    let scrollTimeout;

    function updateActiveStep() {
        
        const sectionRect = differentSection.getBoundingClientRect();
        const sectionTop = sectionRect.top;

        
        if (sectionTop <= 200 && sectionTop >= -differentSection.offsetHeight + window.innerHeight) {
            
            const scrollProgress = window.scrollY - differentSection.offsetTop;
            const sectionHeight = differentSection.offsetHeight;

            
            const stepHeight = sectionHeight / stepItems.length;
            const activeIndex = Math.min(
                Math.floor(scrollProgress / stepHeight),
                stepItems.length - 1
            );

            
            if (activeIndex !== currentActiveIndex && activeIndex >= 0) {
                currentActiveIndex = activeIndex;

                
                stepItems.forEach(item => item.classList.remove('active'));

                
                if (stepItems[activeIndex]) {
                    stepItems[activeIndex].classList.add('active');

                    
                    const newImageSrc = stepItems[activeIndex].getAttribute('data-image');
                    if (newImageSrc && visualImage.getAttribute('src') !== newImageSrc) {
                        visualImage.style.opacity = '0';
                        setTimeout(() => {
                            visualImage.src = newImageSrc;
                            visualImage.style.opacity = '1';
                        }, 300);
                    }
                }
            }
        }
    }

    
    function handleWheel(e) {
        const sectionRect = differentSection.getBoundingClientRect();
        const sectionTop = sectionRect.top;

        
        if (sectionTop <= 200 && sectionTop >= -differentSection.offsetHeight + window.innerHeight) {
            
            e.preventDefault();

            if (!isScrolling) {
                isScrolling = true;

                
                const direction = e.deltaY > 0 ? 1 : -1;
                const nextIndex = Math.max(0, Math.min(stepItems.length - 1, currentActiveIndex + direction));

                if (nextIndex !== currentActiveIndex) {
                    
                    const stepHeight = differentSection.offsetHeight / stepItems.length;
                    const targetScroll = differentSection.offsetTop + (nextIndex * stepHeight);

                    
                    window.scrollTo({
                        top: targetScroll,
                        behavior: 'smooth'
                    });
                }

                
                setTimeout(() => {
                    isScrolling = false;
                }, 800);
            }
        }
    }

    
    window.addEventListener('scroll', updateActiveStep);

    
    window.addEventListener('wheel', handleWheel, { passive: false });

    
    updateActiveStep();
}

