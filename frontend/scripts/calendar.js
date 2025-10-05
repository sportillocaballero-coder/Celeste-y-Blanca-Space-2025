document.addEventListener('DOMContentLoaded', function() {
    console.log('📅 Calendario script cargado');

    // Elementos del DOM
    const calendarBtn = document.getElementById('calendar-btn');
    const calendarModal = document.getElementById('calendar-modal');
    const closeCalendar = document.getElementById('close-calendar');
    const addGoogleEvent = document.getElementById('addGoogleEvent');

    // Verificar que existan los elementos
    if (!calendarBtn) {
        console.error('Botón de calendario no encontrado');
        return;
    }

    if (!calendarModal) {
        console.error('Modal de calendario no encontrado');
        return;
    }

    // Abrir modal
    calendarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('📅 Abriendo calendario');
        calendarModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del fondo
    });

    // Cerrar modal
    function closeModal() {
        calendarModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll
    }

    // Cerrar con X
    if (closeCalendar) {
        closeCalendar.addEventListener('click', closeModal);
    }

    // Cerrar al hacer click fuera del modal
    calendarModal.addEventListener('click', function(e) {
        if (e.target === calendarModal) {
            closeModal();
        }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && calendarModal.style.display === 'block') {
            closeModal();
        }
    });

    // Botón de Google Calendar - CORREGIDO
    if (addGoogleEvent) {
        addGoogleEvent.addEventListener('click', function() {
            // Crear evento específico para Apophis (próximo evento importante)
            const eventDetails = {
                title: '🔴 Apophis - Máximo Acercamiento a la Tierra',
                startDate: '2029-04-13T10:00:00',
                endDate: '2029-04-13T23:59:59',
                description: 'El asteroide 99942 Apophis realizará su máximo acercamiento a la Tierra (31,600 km). Evento monitoreado por NASA CNEOS.',
                location: 'Órbita terrestre'
            };

            // Formatear fechas para Google Calendar
            const formatDate = (dateStr) => {
                return new Date(dateStr).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            };

            // Construir URL de Google Calendar
            const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
            googleCalendarUrl.searchParams.set('action', 'TEMPLATE');
            googleCalendarUrl.searchParams.set('text', eventDetails.title);
            googleCalendarUrl.searchParams.set('dates', `${formatDate(eventDetails.startDate)}/${formatDate(eventDetails.endDate)}`);
            googleCalendarUrl.searchParams.set('details', eventDetails.description);
            googleCalendarUrl.searchParams.set('location', eventDetails.location);
            googleCalendarUrl.searchParams.set('sf', 'true');
            googleCalendarUrl.searchParams.set('output', 'xml');

            console.log('📅 Abriendo Google Calendar con evento:', googleCalendarUrl.toString());
            window.open(googleCalendarUrl.toString(), '_blank');
        });
    }

    // Función para agregar eventos individuales al calendario
    function addEventToCalendar(eventData) {
        const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
        googleCalendarUrl.searchParams.set('action', 'TEMPLATE');
        googleCalendarUrl.searchParams.set('text', eventData.title);
        googleCalendarUrl.searchParams.set('dates', eventData.dates);
        googleCalendarUrl.searchParams.set('details', eventData.description);
        googleCalendarUrl.searchParams.set('location', eventData.location || '');

        window.open(googleCalendarUrl.toString(), '_blank');
    }

    // Agregar event listeners a cada evento individual
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const eventDate = item.querySelector('.event-date').textContent;
            const eventDesc = item.querySelector('.event-desc').textContent;
            const eventType = item.querySelector('.event-type').textContent;

            let eventData = {};

            // Configurar eventos específicos según el índice - FECHAS ACTUALIZADAS
            switch(index) {
                case 0: // Gemínidas 2025
                    eventData = {
                        title: '🌠 Lluvia de Meteoros Gemínidas',
                        dates: '20251214T200000Z/20251215T060000Z',
                        description: 'Lluvia de meteoros Gemínidas, una de las más intensas del año.',
                        location: 'Cielo nocturno'
                    };
                    break;
                case 1: // Cuadrántidas 2026
                    eventData = {
                        title: '🌠 Lluvia de Meteoros Cuadrántidas',
                        dates: '20260103T200000Z/20260104T060000Z',
                        description: 'Primera lluvia de meteoros del año 2026.',
                        location: 'Cielo nocturno'
                    };
                    break;
                case 2: // Perseidas 2026
                    eventData = {
                        title: '🌠 Lluvia de Meteoros Perseidas',
                        dates: '20260812T200000Z/20260813T060000Z',
                        description: 'Pico de actividad de la lluvia de meteoros Perseidas 2026.',
                        location: 'Cielo nocturno'
                    };
                    break;
                case 3: // NEO Surveyor 2027
                    eventData = {
                        title: '🚀 Lanzamiento NEO Surveyor',
                        dates: '20270915T120000Z/20270915T140000Z',
                        description: 'Lanzamiento de la misión NEO Surveyor de NASA para detección de asteroides.',
                        location: 'Centro espacial NASA'
                    };
                    break;
                case 4: // Apophis 2029
                    eventData = {
                        title: '🔴 Apophis - Máximo Acercamiento',
                        dates: '20290413T100000Z/20290413T235959Z',
                        description: 'El asteroide 99942 Apophis realizará su máximo acercamiento a la Tierra (31,600 km).',
                        location: 'Órbita terrestre'
                    };
                    break;
                case 5: // YR4 2032
                    eventData = {
                        title: '🟡 Asteroide 2024 YR₄ - Aproximación',
                        dates: '20320701T100000Z/20320701T235959Z',
                        description: 'Asteroide 2024 YR₄ pasará cerca de la órbita lunar.',
                        location: 'Órbita lunar'
                    };
                    break;
            }

            addEventToCalendar(eventData);
        });

        // Agregar indicador visual de que es clickeable
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });
    });
});