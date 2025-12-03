document.addEventListener('DOMContentLoaded', function() {

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Floating WhatsApp Button
    const whatsappButton = document.createElement('a');
    whatsappButton.href = 'https://wa.me/5491130824210';
    whatsappButton.target = '_blank';
    whatsappButton.classList.add('whatsapp-float');

    const whatsappIcon = document.createElement('img');
    whatsappIcon.src = 'images/whatsapp-icon.png'; // Asegúrate de tener este ícono
    whatsappIcon.alt = 'WhatsApp';
    whatsappButton.appendChild(whatsappIcon);

    document.body.appendChild(whatsappButton);

    // CSS for the button
    const style = document.createElement('style');
    style.innerHTML = `
        .whatsapp-float {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background-color: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 100;
            transition: transform 0.3s ease, opacity 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
        }
        .whatsapp-float.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .whatsapp-float img {
            width: 35px;
            height: 35px;
        }
    `;
    document.head.appendChild(style);

    // Show button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            whatsappButton.classList.add('visible');
        } else {
            whatsappButton.classList.remove('visible');
        }
    });

});
