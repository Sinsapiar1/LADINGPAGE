// google-analytics.js - Integración de Google Analytics

// Código de inicialización de Google Analytics (GA4)
// Reemplaza 'G-XXXXXXXXXX' con tu ID real de medición de Google Analytics
function initializeGoogleAnalytics() {
    // Añadir el script de Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    document.head.appendChild(script);
    
    // Inicializar Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-8KMTSJC8W0');
    
    // Activar eventos mejorados
    gtag('set', 'send_page_view', true);
    gtag('set', 'allow_google_signals', true);
}

// Inicializar Google Analytics
initializeGoogleAnalytics();

// Función para enviar eventos personalizados a Google Analytics
function trackGAEvent(eventName, eventParams = {}) {
    if (typeof gtag === 'function') {
        gtag('event', eventName, eventParams);
    } else {
        console.error('Google Analytics (gtag) is not available');
    }
}

// Añadir seguimiento de eventos específicos para Google Analytics
document.addEventListener('DOMContentLoaded', function() {
    // Seguimiento de clics en enlaces de afiliados
    const affiliateLinks = document.querySelectorAll('.affiliate-link');
    
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Datos del enlace
            const linkId = this.getAttribute('data-link-id') || 'unknown';
            const linkUrl = this.getAttribute('href');
            
            // Evento de Google Analytics para clics en afiliados
            trackGAEvent('affiliate_click', {
                link_id: linkId,
                link_url: linkUrl,
                link_text: this.innerText.trim(),
                event_category: 'affiliate',
                event_label: linkId
            });
        });
    });
    
    // Configurar seguimiento de interacción con secciones
    setupSectionInteractionTracking();
    
    // Configurar seguimiento para cambios de idioma
    setupLanguageTracking();
    
    // Medición de rendimiento
    measurePerformance();
});

/**
 * Configura el seguimiento de interacción con secciones para GA
 */
function setupSectionInteractionTracking() {
    // Opciones para el observador de intersección
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // 50% del elemento visible
    };
    
    // Elementos a observar (todas las secciones)
    const sections = document.querySelectorAll('section');
    
    // Conjunto para rastrear qué secciones ya han sido vistas
    const sectionsViewed = new Set();
    
    // Callback para el observador
    const intersectionCallback = (entries) => {
        entries.forEach(entry => {
            // Si la sección es visible y no ha sido registrada aún
            if (entry.isIntersecting && !sectionsViewed.has(entry.target.className)) {
                // Marcar la sección como vista
                sectionsViewed.add(entry.target.className);
                
                // Registrar evento en GA
                trackGAEvent('section_view', {
                    section_name: entry.target.className,
                    event_category: 'engagement',
                    event_label: entry.target.className
                });
            }
        });
    };
    
    // Crear el observador
    const observer = new IntersectionObserver(intersectionCallback, observerOptions);
    
    // Observar todas las secciones
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Configura el seguimiento de cambios de idioma para GA
 */
function setupLanguageTracking() {
    // Escuchar cambios de idioma
    document.getElementById('langToggle').addEventListener('click', function() {
        const newLang = this.getAttribute('data-lang') === 'en' ? 'es' : 'en';
        
        // Registrar cambio de idioma en GA
        trackGAEvent('language_change', {
            language: newLang === 'en' ? 'english' : 'spanish',
            event_category: 'settings',
            event_label: newLang
        });
    });
}

/**
 * Mide el rendimiento de la página para GA
 */
function measurePerformance() {
    // Esperar a que la página esté completamente cargada
    window.addEventListener('load', () => {
        // Obtener métricas de rendimiento
        setTimeout(() => {
            if (window.performance && window.performance.timing) {
                const timing = window.performance.timing;
                
                // Calcular tiempos clave
                const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
                const domReadyTime = timing.domComplete - timing.domLoading;
                
                // Enviar métricas a GA
                trackGAEvent('performance_metrics', {
                    page_load_time: pageLoadTime,
                    dom_ready_time: domReadyTime,
                    event_category: 'performance',
                    event_label: 'page_speed'
                });
            }
        }, 0);
    });
}