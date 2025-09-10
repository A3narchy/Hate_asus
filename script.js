document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка к якорям
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
            
            // Обновляем URL без перезагрузки страницы
            history.pushState(null, null, targetId);
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
    
    // Добавляем лайтбокс для галереи
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            // Создаем overlay для лайтбокса
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = '0';
            overlay.style.left = '0';
            overlay.style.width = '100%';
            overlay.style.height = '100%';
            overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            overlay.style.display = 'flex';
            overlay.style.justifyContent = 'center';
            overlay.style.alignItems = 'center';
            overlay.style.zIndex = '2000';
            overlay.style.cursor = 'pointer';
            
            // Создаем увеличенное изображение
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.alt = this.alt;
            enlargedImg.style.maxWidth = '90%';
            enlargedImg.style.maxHeight = '90%';
            enlargedImg.style.objectFit = 'contain';
            enlargedImg.style.borderRadius = '8px';
            
            // Добавляем изображение в overlay
            overlay.appendChild(enlargedImg);
            
            // Закрытие при клике
            overlay.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });
            
            // Добавляем overlay на страницу
            document.body.appendChild(overlay);
        });
    });
});
