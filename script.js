document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка к якорям
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми секциями
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
    
    // Добавляем год в футер
    const currentYear = new Date().getFullYear();
    const footerText = document.querySelector('footer p:last-child');
    if (footerText) {
        footerText.innerHTML = `© ${currentYear} - Почему я не рекомендую технику ASUS`;
    }
    
    // Добавляем интерактивность для списков
    document.querySelectorAll('.problem-list li').forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('highlighted');
        });
    });
    
    // Добавляем кнопку для возврата к началу страницы
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑ Наверх';
    scrollToTopBtn.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Создаем лайтбокс
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content" src="" alt="">
        <div class="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    
    // Добавляем обработчики для галереи
    document.querySelectorAll('.gallery-image').forEach(image => {
        image.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightboxCaption.textContent = this.nextElementSibling?.textContent || '';
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Закрытие лайтбокса
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Функционал для отзывов
    const reviewModal = document.getElementById('reviewModal');
    const reviewForm = document.getElementById('reviewForm');
    const stars = document.querySelectorAll('.star');
    let selectedRating = 0;

    // Обработчики для звезд рейтинга
    stars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.value);
            updateStars(selectedRating);
        });
    });

    function updateStars(rating) {
        stars.forEach(star => {
            const value = parseInt(star.dataset.value);
            star.textContent = value <= rating ? '⭐' : '☆';
            star.classList.toggle('active', value <= rating);
        });
    }

    // Открытие модального окна
    window.openReviewForm = function() {
        reviewModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    // Закрытие модального окна
    window.closeReviewForm = function() {
        reviewModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        reviewForm.reset();
        selectedRating = 0;
        updateStars(0);
    };

    // Закрытие по клику вне окна
    window.addEventListener('click', function(event) {
        if (event.target === reviewModal) {
            closeReviewForm();
        }
    });

    // Обработка отправки формы
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (selectedRating === 0) {
            alert('Пожалуйста, выберите оценку');
            return;
        }

        const name = document.getElementById('reviewName').value;
        const device = document.getElementById('reviewDevice').value;
        const text = document.getElementById('reviewText').value;

        // Здесь можно добавить отправку на сервер
        // Пока просто покажем сообщение
        alert('Спасибо за ваш отзыв! После модерации он появится на сайте.');
        closeReviewForm();
    });

    // Функции для социальных сетей
    window.shareVK = function() {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        window.open(`https://vk.com/share.php?url=${url}&title=${title}`, '_blank');
        return false;
    };

    window.shareTelegram = function() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
        return false;
    };

    window.shareTwitter = function() {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        return false;
    };

    window.shareFacebook = function() {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        return false;
    };

    // Ленивая загрузка изображений
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
