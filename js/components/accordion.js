

(function () {
    'use strict';

    
    
    
    const accordionItems = document.querySelectorAll('.accordion-item');

    
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('expanded');
    }

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('expanded')) {
                    otherItem.classList.remove('expanded');
                }
            });

            
            item.classList.toggle('expanded');
        });
    });

})();

