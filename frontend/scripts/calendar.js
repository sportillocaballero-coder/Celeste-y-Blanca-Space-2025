document.addEventListener('DOMContentLoaded', function() {
    console.log('📅 Calendar script loaded');

    // DOM elements
    const calendarBtn = document.getElementById('calendar-btn');
    const calendarModal = document.getElementById('calendar-modal');
    const closeCalendar = document.getElementById('close-calendar');
    const addGoogleEvent = document.getElementById('addGoogleEvent');

    // Check that elements exist
    if (!calendarBtn) {
        console.error('Calendar button not found');
        return;
    }

    if (!calendarModal) {
        console.error('Calendar modal not found');
        return;
    }

    // Open modal
    calendarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('📅 Opening calendar');
        calendarModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    });

    // Close modal
    function closeModal() {
        calendarModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scroll
    }

    // Close with X
    if (closeCalendar) {
        closeCalendar.addEventListener('click', closeModal);
    }

    // Close when clicking outside the modal
    calendarModal.addEventListener('click', function(e) {
        if (e.target === calendarModal) {
            closeModal();
        }
    });

    // Close with ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && calendarModal.style.display === 'block') {
            closeModal();
        }
    });

    // Google Calendar button - FIXED
    if (addGoogleEvent) {
        addGoogleEvent.addEventListener('click', function() {
            // Create specific event for Apophis (next important event)
            const eventDetails = {
                title: '🔴 Apophis - Maximum Approach to Earth',
                startDate: '2029-04-13T10:00:00',
                endDate: '2029-04-13T23:59:59',
                description: 'Asteroid 99942 Apophis will make its maximum approach to Earth (31,600 km). Event monitored by NASA CNEOS.',
                location: 'Earth orbit'
            };

            // Format dates for Google Calendar
            const formatDate = (dateStr) => {
                return new Date(dateStr).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
            };

            // Build Google Calendar URL
            const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
            googleCalendarUrl.searchParams.set('action', 'TEMPLATE');
            googleCalendarUrl.searchParams.set('text', eventDetails.title);
            googleCalendarUrl.searchParams.set('dates', `${formatDate(eventDetails.startDate)}/${formatDate(eventDetails.endDate)}`);
            googleCalendarUrl.searchParams.set('details', eventDetails.description);
            googleCalendarUrl.searchParams.set('location', eventDetails.location);
            googleCalendarUrl.searchParams.set('sf', 'true');
            googleCalendarUrl.searchParams.set('output', 'xml');

            console.log('📅 Opening Google Calendar with event:', googleCalendarUrl.toString());
            window.open(googleCalendarUrl.toString(), '_blank');
        });
    }

    // Function to add individual events to calendar
    function addEventToCalendar(eventData) {
        const googleCalendarUrl = new URL('https://calendar.google.com/calendar/render');
        googleCalendarUrl.searchParams.set('action', 'TEMPLATE');
        googleCalendarUrl.searchParams.set('text', eventData.title);
        googleCalendarUrl.searchParams.set('dates', eventData.dates);
        googleCalendarUrl.searchParams.set('details', eventData.description);
        googleCalendarUrl.searchParams.set('location', eventData.location || '');

        window.open(googleCalendarUrl.toString(), '_blank');
    }

    // Add event listeners to each individual event
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const eventDate = item.querySelector('.event-date').textContent;
            const eventDesc = item.querySelector('.event-desc').textContent;
            const eventType = item.querySelector('.event-type').textContent;

            let eventData = {};

            // Configure specific events by index - UPDATED DATES
            switch(index) {
                case 0: // Geminids 2025
                    eventData = {
                        title: '🌠 Geminids Meteor Shower',
                        dates: '20251214T200000Z/20251215T060000Z',
                        description: 'Geminids meteor shower, one of the most intense of the year.',
                        location: 'Night sky'
                    };
                    break;
                case 1: // Quadrantids 2026
                    eventData = {
                        title: '🌠 Quadrantids Meteor Shower',
                        dates: '20260103T200000Z/20260104T060000Z',
                        description: 'First meteor shower of the year 2026.',
                        location: 'Night sky'
                    };
                    break;
                case 2: // Perseids 2026
                    eventData = {
                        title: '🌠 Perseids Meteor Shower',
                        dates: '20260812T200000Z/20260813T060000Z',
                        description: 'Peak activity of the Perseids meteor shower 2026.',
                        location: 'Night sky'
                    };
                    break;
                case 3: // NEO Surveyor 2027
                    eventData = {
                        title: '🚀 NEO Surveyor Launch',
                        dates: '20270915T120000Z/20270915T140000Z',
                        description: 'Launch of NASA NEO Surveyor mission for asteroid detection.',
                        location: 'NASA Space Center'
                    };
                    break;
                case 4: // Apophis 2029
                    eventData = {
                        title: '🔴 Apophis - Maximum Approach',
                        dates: '20290413T100000Z/20290413T235959Z',
                        description: 'Asteroid 99942 Apophis will make its maximum approach to Earth (31,600 km).',
                        location: 'Earth orbit'
                    };
                    break;
                case 5: // YR4 2032
                    eventData = {
                        title: '🟡 Asteroid 2024 YR₄ - Approach',
                        dates: '20320701T100000Z/20320701T235959Z',
                        description: 'Asteroid 2024 YR₄ will pass near lunar orbit.',
                        location: 'Lunar orbit'
                    };
                    break;
            }

            addEventToCalendar(eventData);
        });

        // Add visual indicator that it's clickable
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });
    });
});