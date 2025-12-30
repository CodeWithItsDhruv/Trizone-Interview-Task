

document.addEventListener('DOMContentLoaded', () => {
    const newsCarousel = document.querySelector('.news-carousel');
    const newsTrack = document.querySelector('.news-track');
    const prevBtn = document.querySelector('.prev-news');
    const nextBtn = document.querySelector('.next-news');
    const dots = document.querySelectorAll('.news-dot');

    if (newsCarousel && newsTrack && prevBtn && nextBtn) {
        let isDown = false;
        let startX;
        let scrollStart;

        
        const originalCards = Array.from(newsTrack.children);
        const cardCount = originalCards.length;

        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            newsTrack.appendChild(clone);
        });

        [...originalCards].reverse().forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            newsTrack.insertBefore(clone, newsTrack.firstChild);
        });

        const getCardWidth = () => {
            const card = newsCarousel.querySelector('.news-card');
            return card ? card.offsetWidth + 30 : 0;
        };

        const initializeScroll = () => {
            const cardWidth = getCardWidth();
            if (cardWidth === 0) return;
            newsCarousel.scrollLeft = cardCount * cardWidth;
            updateDots();
        };

        
        setTimeout(initializeScroll, 100);

        
        const updateDots = () => {
            const cardWidth = getCardWidth();
            if (cardWidth === 0) return;

            
            let scrollIndex = Math.round(newsCarousel.scrollLeft / cardWidth);

            
            
            let realIndex = (scrollIndex - cardCount) % cardCount;

            
            if (realIndex < 0) realIndex += cardCount;

            dots.forEach((dot, index) => {
                if (index === realIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        };

        
        const handleScroll = () => {
            const cardWidth = getCardWidth();
            if (cardWidth === 0) return;

            const setWidth = cardCount * cardWidth;
            const maxScroll = setWidth * 2;

            
            if (newsCarousel.scrollLeft >= maxScroll) { 
                newsCarousel.scrollLeft -= setWidth;
                if (isDown) scrollStart -= setWidth;
            }
            else if (newsCarousel.scrollLeft <= 0) { 
                
                newsCarousel.scrollLeft += setWidth;
                if (isDown) scrollStart += setWidth;
            }

            updateDots();
        };

        newsCarousel.addEventListener('scroll', handleScroll);

        
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                const cardWidth = getCardWidth();
                if (cardWidth === 0) return;

                
                const targetScroll = (cardCount + index) * cardWidth;

                newsCarousel.scrollTo({
                    left: targetScroll,
                    behavior: 'smooth'
                });
            });
        });

        
        prevBtn.addEventListener('click', () => {
            const itemWidth = getCardWidth();
            newsCarousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const itemWidth = getCardWidth();
            newsCarousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
        });

        
        newsCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            newsCarousel.classList.add('active');
            startX = e.pageX - newsCarousel.offsetLeft;
            scrollStart = newsCarousel.scrollLeft;
            newsCarousel.style.scrollBehavior = 'auto'; 
            e.preventDefault();
        });

        const stopDrag = () => {
            if (!isDown) return;
            isDown = false;
            newsCarousel.classList.remove('active');
            newsCarousel.style.scrollBehavior = 'smooth';

            
            const cardWidth = getCardWidth();
            if (cardWidth > 0) {
                const nearestIndex = Math.round(newsCarousel.scrollLeft / cardWidth);
                newsCarousel.scrollTo({
                    left: nearestIndex * cardWidth,
                    behavior: 'smooth'
                });
            }
        };

        newsCarousel.addEventListener('mouseleave', () => {
            if (isDown) stopDrag();
        });
        newsCarousel.addEventListener('mouseup', stopDrag);

        newsCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - newsCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            newsCarousel.scrollLeft = scrollStart - walk;
        });
    }
});

