(function () {
    const BOOKING_KEY = 'originova_booking';

    function getBookingData() {
        try {
            const data = localStorage.getItem(BOOKING_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Unable to read booking data:', error);
            return null;
        }
    }

    function clearBookingData() {
        try {
            localStorage.removeItem(BOOKING_KEY);
            sessionStorage.removeItem('originova_booking_number');
        } catch (error) {
            console.error('Unable to clear booking data:', error);
        }
    }

    function generateBookingNumber() {
        const prefix = 'ORG';
        const year = new Date().getFullYear();
        const random = Math.floor(Math.random() * 900000) + 100000;
        return `${prefix}-${year}-${random}`;
    }

    function ensureNotificationStyles() {
        if (document.getElementById('originova-notification-styles')) return;

        const style = document.createElement('style');
        style.id = 'originova-notification-styles';
        style.textContent = `
            @keyframes originovaSlideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes originovaSlideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function showNotification(message, type = 'info') {
        if (!document.body) return;

        ensureNotificationStyles();

        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '40px',
            padding: '16px 24px',
            background: type === 'success'
                ? 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)'
                : type === 'error'
                    ? 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)'
                    : 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
            color: type === 'info' ? '#fff' : '#000',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            zIndex: '10000',
            fontSize: '14px',
            fontWeight: '600',
            maxWidth: '400px',
            animation: 'originovaSlideInRight 0.4s ease',
            backdropFilter: 'blur(10px)'
        });

        document.body.appendChild(notification);

        window.setTimeout(() => {
            notification.style.animation = 'originovaSlideOutRight 0.4s ease';
            window.setTimeout(() => {
                notification.remove();
            }, 400);
        }, 4000);
    }

    window.getBookingData = getBookingData;
    window.clearBookingData = clearBookingData;
    window.generateBookingNumber = generateBookingNumber;
    window.showNotification = showNotification;
})();
