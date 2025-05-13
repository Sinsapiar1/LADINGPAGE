// translation.js - Sistema de traducción para landing page de salud

// Objeto de traducciones - Añadir todos los textos aquí
const translations = {
    // Hero Section
    'Transform Your Health, Transform Your Life': 'Transforma Tu Salud, Transforma Tu Vida',
    'Discover the revolutionary supplement that thousands are using to reclaim their energy, vitality, and well-being.': 'Descubre el suplemento revolucionario que miles están usando para recuperar su energía, vitalidad y bienestar.',
    'Start Your Transformation Now': 'Comienza Tu Transformación Ahora',
    'FDA Approved': 'Aprobado por la FDA',
    '100% Organic': '100% Orgánico',
    'Lab Tested': 'Probado en Laboratorio',
    
    // Benefits Section
    'Experience These Life-Changing Benefits': 'Experimenta Estos Beneficios Transformadores',
    'Boosted Energy': 'Energía Potenciada',
    'Feel more energized throughout the day without crashes or jitters': 'Siéntete más energizado durante todo el día sin caídas ni nerviosismo',
    'Learn how it works': 'Aprende cómo funciona',
    'Enhanced Immunity': 'Inmunidad Mejorada',
    'Strengthen your body\'s natural defenses with our powerful formula': 'Fortalece las defensas naturales de tu cuerpo con nuestra potente fórmula',
    'See the ingredients': 'Ver los ingredientes',
    'Improved Sleep': 'Mejor Sueño',
    'Enjoy deeper, more restful sleep that leaves you refreshed in the morning': 'Disfruta de un sueño más profundo y reparador que te deja renovado por la mañana',
    'Discover the science': 'Descubre la ciencia',
    
    // Features Section
    'Why VitalLife Is Different': 'Por Qué VitalLife Es Diferente',
    'Science-Backed Formula': 'Fórmula Respaldada por la Ciencia',
    'Our unique blend of adaptogens, vitamins, and minerals is based on the latest clinical research to optimize your body\'s natural processes.': 'Nuestra mezcla única de adaptógenos, vitaminas y minerales está basada en las últimas investigaciones clínicas para optimizar los procesos naturales de tu cuerpo.',
    'Read the Research': 'Leer la Investigación',
    'Premium Quality Ingredients': 'Ingredientes de Calidad Premium',
    'We source only the highest quality, organic ingredients and test each batch for purity and potency in our certified lab.': 'Obtenemos solo ingredientes orgánicos de la más alta calidad y probamos cada lote para verificar su pureza y potencia en nuestro laboratorio certificado.',
    'View Certification': 'Ver Certificación',
    
    // Results Section
    'Real Results from Real People': 'Resultados Reales de Personas Reales',
    'Sarah\'s 30-Day Transformation': 'Transformación de Sarah en 30 Días',
    '"After just one month, my energy levels are through the roof. I no longer need afternoon coffee, and I\'m sleeping better than I have in years!"': '"Después de solo un mes, mis niveles de energía están por las nubes. Ya no necesito café por la tarde, ¡y estoy durmiendo mejor de lo que he dormido en años!"',
    'Michael\'s Immunity Journey': 'El Viaje de Inmunidad de Michael',
    '"I used to catch every cold going around the office. Since starting VitalLife, I haven\'t been sick once in six months. It\'s truly remarkable!"': '"Solía contraer todos los resfriados que circulaban por la oficina. Desde que comencé con VitalLife, no me he enfermado ni una vez en seis meses. ¡Es realmente extraordinario!"',
    'Start Your Transformation Today': 'Comienza Tu Transformación Hoy',
    
    // Guarantee Section
    '100% Money Back Guarantee': 'Garantía de Devolución del 100%',
    'We\'re so confident you\'ll love VitalLife that we offer a 60-day, no-questions-asked money back guarantee. If you don\'t see results, we\'ll refund every penny.': 'Estamos tan seguros de que te encantará VitalLife que ofrecemos una garantía de devolución de dinero de 60 días sin hacer preguntas. Si no ves resultados, te devolveremos hasta el último centavo.',
    
    // Final CTA Section
    'Ready to Transform Your Health?': '¿Listo para Transformar tu Salud?',
    'Join thousands of satisfied customers who have already experienced the VitalLife difference.': 'Únete a miles de clientes satisfechos que ya han experimentado la diferencia VitalLife.',
    'Special Limited Time Offer': 'Oferta Especial por Tiempo Limitado',
    'Regular Price: $89.99': 'Precio Regular: $89.99',
    'Today\'s Price: $59.99': 'Precio de Hoy: $59.99',
    'You Save: $30 (33% OFF)': 'Ahorras: $30 (33% DESCUENTO)',
    'Get VitalLife Now': 'Obtén VitalLife Ahora',
    'Free Shipping': 'Envío Gratis',
    'Secure Checkout': 'Pago Seguro',
    'Privacy Protected': 'Privacidad Protegida',
    
    // Footer
    '© 2025 VitalLife. All rights reserved.': '© 2025 VitalLife. Todos los derechos reservados.',
    'Privacy Policy': 'Política de Privacidad',
    'Terms of Service': 'Términos de Servicio',
    '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.': '*Estas declaraciones no han sido evaluadas por la Administración de Alimentos y Medicamentos. Este producto no está destinado a diagnosticar, tratar, curar o prevenir ninguna enfermedad.',
    
    // Language Toggle
    'English': 'Inglés',
    'Español': 'Español'
};

// Función para cambiar el idioma
function toggleLanguage() {
    // Obtener idioma actual
    const currentLang = document.getElementById('langToggle').getAttribute('data-lang');
    // Cambiar al otro idioma
    const newLang = currentLang === 'en' ? 'es' : 'en';
    
    // Actualizar el atributo de idioma
    document.getElementById('langToggle').setAttribute('data-lang', newLang);
    
    // Mostrar/ocultar elementos según el idioma
    const enElements = document.querySelectorAll('.lang-en');
    const esElements = document.querySelectorAll('.lang-es');
    
    if (newLang === 'es') {
        // Cambiar a español
        enElements.forEach(el => el.style.display = 'none');
        esElements.forEach(el => el.style.display = 'block');
        
        // Registrar evento de cambio de idioma
        trackEvent('language_change', { language: 'spanish' });
    } else {
        // Cambiar a inglés
        enElements.forEach(el => el.style.display = 'block');
        esElements.forEach(el => el.style.display = 'none');
        
        // Registrar evento de cambio de idioma
        trackEvent('language_change', { language: 'english' });
    }
    
    // Guardar preferencia de idioma
    localStorage.setItem('preferredLanguage', newLang);
}

// Configurar el botón de cambio de idioma
document.addEventListener('DOMContentLoaded', function() {
    // Añadir evento al botón de cambio de idioma
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    
    // Comprobar si hay una preferencia de idioma guardada
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== 'en') {
        // Si la preferencia guardada no es inglés (predeterminado), cambiar al idioma guardado
        document.getElementById('langToggle').setAttribute('data-lang', 'en'); // Forzamos el valor inicial para que el toggle funcione correctamente
        toggleLanguage();
    }
    
    // Registrar evento de vista de página
    trackEvent('page_view', { page: window.location.pathname });
});