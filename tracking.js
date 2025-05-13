// tracking.js - Sistema de seguimiento para Google Apps Script

// URL del despliegue de Google Apps Script (WebApp)
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxwebyRv2SM_k6BXLLW3KVZYBFW1cwG5ENZ-yfPXcaujtrQoA5bJaqjK2VpaawkTwmKDg/exec';

/**
 * Función para registrar eventos en Google Sheets mediante Google Apps Script
 * @param {string} eventType - Tipo de evento (page_view, affiliate_click, etc.)
 * @param {Object} eventData - Datos adicionales del evento
 */
function trackEvent(eventType, eventData = {}) {
    // Añadir datos comunes del evento
    const eventPayload = {
        timestamp: new Date().toISOString(),
        eventType: eventType,
        url: window.location.href,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenSize: `${window.innerWidth}x${window.innerHeight}`,
        ...eventData
    };
    
    // Enviar datos a Google Apps Script
    fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Importante para evitar problemas de CORS
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload)
    }).catch(error => {
        console.error('Error sending tracking data:', error);
    });
    
    // También enviar el evento a Meta Pixel si está configurado
    if (typeof fbq === 'function') {
        fbq('trackCustom', eventType, eventData);
    }
    
    // También enviar el evento a Google Analytics si está configurado
    if (typeof gtag === 'function') {
        gtag('event', eventType, eventData);
    }
}

// Configurar seguimiento de clics en enlaces de afiliados
document.addEventListener('DOMContentLoaded', function() {
    // Añadir evento de clic a todos los enlaces de afiliados
    const affiliateLinks = document.querySelectorAll('.affiliate-link');
    
    affiliateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Obtener datos del enlace
            const linkId = this.getAttribute('data-link-id') || 'unknown';
            const linkUrl = this.getAttribute('href');
            
            // Registrar el evento de clic
            trackEvent('affiliate_click', {
                linkId: linkId,
                linkUrl: linkUrl,
                linkText: this.innerText.trim(),
                sectionId: findParentSection(this)
            });
        });
    });
    
    // Registrar evento de carga de página
    trackEvent('page_load', {
        loadTime: performance.now()
    });
    
    // Configurar seguimiento de tiempo en la página
    setupTimeTracking();
});

/**
 * Encuentra la sección padre de un elemento
 * @param {HTMLElement} element - Elemento del que buscar la sección padre
 * @return {string} - ID de la sección padre o 'unknown'
 */
function findParentSection(element) {
    let current = element;
    while (current && current !== document.body) {
        if (current.tagName === 'SECTION') {
            return current.className || 'section';
        }
        current = current.parentElement;
    }
    return 'unknown';
}

/**
 * Configura el seguimiento de tiempo en la página
 */
function setupTimeTracking() {
    // Variables para seguimiento de tiempo
    let startTime = Date.now();
    let tracking = true;
    let timeOnPage = 0;
    
    // Actualizar tiempo cada 5 segundos
    const timeInterval = setInterval(() => {
        if (tracking) {
            timeOnPage = Math.floor((Date.now() - startTime) / 1000);
            
            // Registrar tiempo en página cada 30 segundos
            if (timeOnPage % 30 === 0 && timeOnPage > 0) {
                trackEvent('time_on_page', {
                    seconds: timeOnPage
                });
            }
        }
    }, 5000);
    
    // Detectar cuando la página pierde el foco
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            tracking = false;
            // Registrar tiempo acumulado cuando se pierde el foco
            trackEvent('time_on_page', {
                seconds: Math.floor((Date.now() - startTime) / 1000)
            });
        } else {
            tracking = true;
            startTime = Date.now(); // Reiniciar el temporizador
        }
    });
    
    // Registrar tiempo cuando se cierra la página
    window.addEventListener('beforeunload', () => {
        trackEvent('page_exit', {
            timeOnPage: Math.floor((Date.now() - startTime) / 1000)
        });
        clearInterval(timeInterval);
    });
}