// ============================================
// CONTROLE DE MANUTENÇÃO
// ============================================
// Para ATIVAR a página de manutenção: altere para true
// Para DESATIVAR a página de manutenção: altere para false
const MAINTENANCE_MODE = true;

// Função para controlar a exibição da página de manutenção
function checkMaintenanceMode() {
    const maintenancePage = document.getElementById('maintenance-page');
    const mainContent = document.getElementById('main-content');
    
    if (MAINTENANCE_MODE) {
        // Mostrar página de manutenção e esconder conteúdo principal
        if (maintenancePage) maintenancePage.style.display = 'flex';
        if (mainContent) mainContent.style.display = 'none';
    } else {
        // Mostrar conteúdo principal e esconder página de manutenção
        if (maintenancePage) maintenancePage.style.display = 'none';
        if (mainContent) mainContent.style.display = 'block';
    }
}

// Verificar modo de manutenção quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    checkMaintenanceMode();
});

// ============================================
// CRONÔMETRO REGRESSIVO
// ============================================
// Cronômetro regressivo até 22 de Dezembro de 2025 às 23h59 (Brasília)
function initCountdown() {
    // Data alvo: 22 de Dezembro de 2025 às 23h59 (Brasília - GMT-3)
    const targetDate = new Date('2025-12-22T23:59:59-03:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Se a data já passou, mostrar zeros
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        // Calcular dias, horas, minutos e segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Atualizar elementos
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Atualizar imediatamente
    updateCountdown();

    // Atualizar a cada segundo
    setInterval(updateCountdown, 1000);
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    // Não inicializar countdown se estiver em modo manutenção
    if (!MAINTENANCE_MODE) {
        initCountdown();
    }
    
    const animateElements = document.querySelectorAll('.learn-item, .for-who-item, .benefit-item, .about-content, .quote-box');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Adicionar evento de clique nos botões de ação - Redirecionar para Kiwify
const checkoutUrl = 'https://pay.kiwify.com.br/Zjhd39q';

// Só adicionar eventos se não estiver em modo manutenção
if (!MAINTENANCE_MODE) {
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Redirecionar para a página de checkout
            window.location.href = checkoutUrl;
        });
    });
}

// ============================================
// CARROSSEL MOBILE - SEÇÃO GABRIELA E RESULTADOS
// ============================================
function initMobileCarousel() {
    // Inicializar todos os carrosséis na página
    const carousels = document.querySelectorAll('.mobile-carousel');
    if (carousels.length === 0) return;
    
    carousels.forEach(carousel => {
        initSingleCarousel(carousel);
    });
}

function initSingleCarousel(carousel) {
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    const dotsContainer = carousel.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Garantir que o track tenha width correto
    track.style.width = `${totalSlides * 100}%`;

    // Criar dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        // Comportamento igual para desktop e mobile: uma imagem por vez
        // Remover todas as classes de desktop primeiro
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
            slide.style.opacity = '1';
            slide.style.transform = 'none';
        });
        
        // Calcular largura correta
        const containerWidth = track.parentElement.offsetWidth || track.parentElement.clientWidth;
        const slideWidth = containerWidth;
        
        // Garantir que cada slide tenha 100% da largura do container
        slides.forEach(slide => {
            slide.style.flex = '0 0 100%';
            slide.style.minWidth = '100%';
            slide.style.maxWidth = '100%';
            slide.style.width = `${slideWidth}px`;
        });
        
        track.style.width = `${totalSlides * slideWidth}px`;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        const translateX = -currentIndex * slideWidth;
        track.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Inicializar carrossel na posição correta
    updateCarousel();
    
    // Atualizar ao redimensionar a janela
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalcular larguras
            const containerWidth = track.parentElement.offsetWidth || track.parentElement.clientWidth;
            const slideWidth = containerWidth;
            slides.forEach(slide => {
                slide.style.width = `${slideWidth}px`;
            });
            track.style.width = `${totalSlides * slideWidth}px`;
            updateCarousel();
        }, 250);
    });

    function goToSlide(index) {
        // Garantir que o índice está dentro dos limites
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        // Forçar atualização
        updateCarousel();
    }

    function nextSlide() {
        const newIndex = (currentIndex + 1) % totalSlides;
        goToSlide(newIndex);
    }

    function prevSlide() {
        const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(newIndex);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Swipe para mobile - versão simplificada e corrigida
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        const diffX = startX - currentX;
        const threshold = 50;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe para direita = próximo slide
                nextSlide();
            } else {
                // Swipe para esquerda = slide anterior
                prevSlide();
            }
        }
    }, { passive: true });

    // Auto-play opcional (descomente se quiser)
    // let autoPlayInterval = setInterval(nextSlide, 5000);
    // carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    // carousel.addEventListener('mouseleave', () => {
    //     autoPlayInterval = setInterval(nextSlide, 5000);
    // });
}

// Inicializar carrosséis quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Não inicializar carrosséis se estiver em modo manutenção
    if (!MAINTENANCE_MODE) {
        initMobileCarousel();
    }
});
