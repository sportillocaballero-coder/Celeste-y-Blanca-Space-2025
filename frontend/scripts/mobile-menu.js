
/* FUNCIONALIDAD DEL MENÚ MÓVIL HAMBURGUESA                       */

/* 
 * Este script maneja la funcionalidad del menú móvil:
 * - Abrir/cerrar menú al hacer clic en el botón hamburguesa
 * - Cerrar menú al hacer clic en un enlace
 * - Cerrar menú al hacer clic fuera de él
 * - Manejar accesibilidad con teclado
 */

document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    
    // Variable para controlar el estado del menú
    let isMenuOpen = false;
    
    
    /* FUNCIÓN PARA ABRIR/CERRAR EL MENÚ */
    
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        
        // Alternar clases CSS para animaciones
        hamburgerBtn.classList.toggle('active', isMenuOpen);
        mobileNav.classList.toggle('active', isMenuOpen);
        
        // Actualizar atributos de accesibilidad
        hamburgerBtn.setAttribute('aria-expanded', isMenuOpen);
        hamburgerBtn.setAttribute('aria-label', 
            isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
        );
        
        // Prevenir scroll del body cuando el menú está abierto
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }
    
    
    /* FUNCIÓN PARA CERRAR EL MENÚ */
    
    function closeMenu() {
        if (isMenuOpen) {
            toggleMenu();
        }
    }
    
    
    /* EVENT LISTENERS */
    
    
    // Clic en el botón hamburguesa
    hamburgerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
    
    // Clic en enlaces del menú móvil (cierra el menú)
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    // Clic fuera del menú (cierra el menú)
    document.addEventListener('click', function(e) {
        const isClickInsideMenu = mobileNav.contains(e.target);
        const isClickOnHamburger = hamburgerBtn.contains(e.target);
        
        if (isMenuOpen && !isClickInsideMenu && !isClickOnHamburger) {
            closeMenu();
        }
    });
    
    // Tecla Escape para cerrar el menú
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    
    /* MANEJO DE REDIMENSIONAMIENTO DE VENTANA */
    
    
    // Cerrar menú si la ventana se redimensiona a desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900 && isMenuOpen) {
            closeMenu();
        }
    });
    
    
    /* ACCESIBILIDAD MEJORADA */
    
    
    // Manejar navegación con teclado en el menú móvil
    mobileNav.addEventListener('keydown', function(e) {
        const focusableElements = mobileNav.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        // Tab hacia adelante desde el último elemento - volver al primero
        if (e.key === 'Tab' && !e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
        
        // Shift+Tab desde el primer elemento - ir al último
        if (e.key === 'Tab' && e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
    });
    
    console.log('✅ Menú móvil inicializado correctamente');
});
