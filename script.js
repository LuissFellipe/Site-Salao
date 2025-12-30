document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-fallback]');

    images.forEach(img => {
        const fallbackSrc = img.getAttribute('data-fallback');
        if (!fallbackSrc) return;

        img.addEventListener('error', () => {
            if (img.src === fallbackSrc) return;
            img.src = fallbackSrc;
        });
    });

    // Carrossel de Transformações
    const carouselTrack = document.querySelector('.carousel-track');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    const carouselPrevBtn = document.getElementById('carousel-prev');
    const carouselNextBtn = document.getElementById('carousel-next');
    const carouselIndicatorsContainer = document.getElementById('carousel-indicators');

    if (carouselTrack && carouselSlides.length > 0) {
        let currentIndex = 0;
        const totalSlides = carouselSlides.length;

        // Criar indicadores
        carouselSlides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.setAttribute('aria-label', `Ir para slide ${index + 1}`);
            indicator.addEventListener('click', () => goToSlide(index));
            carouselIndicatorsContainer.appendChild(indicator);
        });

        function updateCarousel() {
            const offset = -currentIndex * 100;
            carouselTrack.style.transform = `translateX(${offset}%)`;

            // Atualizar indicadores
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
        }

        // Event listeners dos botões
        carouselNextBtn.addEventListener('click', nextSlide);
        carouselPrevBtn.addEventListener('click', prevSlide);

        // Teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    }
});
