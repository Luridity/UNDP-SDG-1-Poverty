const carousel = document.querySelector('.carousel');

if (carousel) {
    const wrapper = document.createElement('div');
    const mobileQuery = window.matchMedia('(max-width: 768px)');

    function applyWrapperMargin() {
        wrapper.style.margin = mobileQuery.matches ? '1.5em 0' : '3em auto';
    }

    Object.assign(wrapper.style, {
        position: 'relative',
        width: '100%'
    });
    applyWrapperMargin();

    carousel.style.margin = '0'; 
    carousel.parentNode.insertBefore(wrapper, carousel);
    wrapper.appendChild(carousel);

    function createButton(side) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = side === 'left' ? '←' : '→';
        btn.setAttribute('aria-label', side === 'left' ? 'Previous' : 'Next');

        Object.assign(btn.style, {
            position: 'absolute',
            top: '50%',
            [side]: '0',
            transform: 'translateY(-50%) translateX(' + (side === 'left' ? '-25%' : '25%') + ')',
            zIndex: '3',
            width: '60px',
            height: '60px',
            padding: '0 0 .1em',
            border: 'none',
            borderRadius: '50%',
            backgroundColor: 'rgb(62, 106, 238)',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer'
        });

        wrapper.appendChild(btn);
        return btn;
    }

    const prevBtn = createButton('left');
    const nextBtn = createButton('right');

    function scrollAmount() {
        const card = carousel.querySelector('.card');
        const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
        return card ? card.getBoundingClientRect().width + gap : carousel.clientWidth;
    }

    function setDisabled(btn, disabled) {
        btn.disabled = disabled;
        btn.style.opacity = disabled ? '0.5' : '1';
        btn.style.cursor = disabled ? 'auto' : 'pointer';
    }

    function updateButtons() {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        setDisabled(prevBtn, carousel.scrollLeft <= 1);
        setDisabled(nextBtn, carousel.scrollLeft >= maxScroll - 1);
    }

    function applyVisibility() {
        const display = mobileQuery.matches ? 'none' : 'block';
        prevBtn.style.display = display;
        nextBtn.style.display = display;
        applyWrapperMargin();
    }

    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    carousel.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    window.addEventListener('load', updateButtons); 
    mobileQuery.addEventListener('change', applyVisibility);

    applyVisibility();
    updateButtons();
}
