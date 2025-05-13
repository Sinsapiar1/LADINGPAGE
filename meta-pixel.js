// meta-pixel.js - Integración del Píxel de Meta (Facebook)

// Código de inicialización del Píxel de Meta
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');

// Inicializa tu Píxel - Reemplaza 'YOUR_PIXEL_ID' con tu ID real del Píxel de Meta
fbq('init', 'YOUR_PIXEL_ID');

// Registra una vista de página por defecto
fbq('track', 'PageView');

// Función para seguimiento de eventos personalizados del Píxel de Meta
function trackMetaEvent(eventName, eventData = {}) {
    if (typeof fbq === 'function') {
        fbq('trackCustom', eventName, eventData);
    } else {
        console.error('Meta Pixel (fbq) is not available');
    }
}

// Añadir seguimiento de eventos específicos para Meta
document.addEventListener('DOMContentLoaded', function() {
    // Seguimiento de clics en CTAs principales
    const ctaButtons = document.querySelectorAll('.cta-button, .large-cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Para Meta Pixel usamos eventos estándar cuando sea posible
            trackMetaEvent('Lead', {
                content_name: document.title,
                content_category: 'CTA',
                button_id: this.getAttribute('data-link-id') || 'unknown'
            });
        });
    });
    
    // Seguimiento de scroll profundo
    setupScrollTracking();
    
    // Seguimiento de tiempo en la página
    setupEngagementTracking();
});

/**
 * Configura el seguimiento de scroll para eventos del Píxel de Meta
 */
function setupScrollTracking() {
    let scrollDepthTriggers = [25, 50, 75, 90];
    let scrollDepthTriggered = new Set();
    
    window.addEventListener('scroll', function() {
        // Calcular el porcentaje de scroll
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrollPercentage = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
        
        // Comprobar si se han alcanzado puntos de profundidad de scroll
        scrollDepthTriggers.forEach(trigger => {
            if (scrollPercentage >= trigger && !scrollDepthTriggered.has(trigger)) {
                scrollDepthTriggered.add(trigger);
                
                // Registrar evento de profundidad de scroll
                trackMetaEvent('ScrollDepth', {
                    percentage: trigger
                });
            }
        });
    }, { passive: true });
}

/**
 * Configura el seguimiento de engagement para eventos del Píxel de Meta
 */
function setupEngagementTracking() {
    // Registrar un evento de engagement después de 30 segundos
    setTimeout(() => {
        trackMetaEvent('TimeOnPage', {
            duration: '30s'
        });
    }, 30000);
    
    // Registrar un evento de engagement después de 60 segundos
    setTimeout(() => {
        trackMetaEvent('TimeOnPage', {
            duration: '60s'
        });
    }, 60000);
}