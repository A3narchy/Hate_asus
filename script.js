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
    document.querySelector('footer p:last-child').innerHTML = `© ${currentYear} - Почему я не рекомендую технику ASUS`;
    
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
    
    // Стили для кнопки "Наверх" - теперь добавляем через создание элемента style
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 12px 15px;
            background-color: #e74c3c;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s, transform 0.3s;
            z-index: 1000;
            font-size: 18px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-to-top:hover {
            background-color: #c0392b;
            transform: translateY(-3px);
        }
        
        .problem-list li {
            transition: background-color 0.2s;
            cursor: pointer;
        }
        
        .problem-list li.highlighted {
            background-color: #ffe6e6;
            border-radius: 4px;
        }
    `;
    
    document.head.appendChild(styleElement);
});
