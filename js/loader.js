document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");

    // 1. Logique de masquage (à l'arrivée sur n'importe quelle page)
    // Se déclenche une fois que TOUTES les ressources sont chargées.
    window.addEventListener("load", () => {
        // Ajoute un délai de 800ms pour l'effet de fondu CSS
        setTimeout(() => {
            // Utilise requestAnimationFrame pour s'assurer que l'opération est prête pour la prochaine image
            requestAnimationFrame(() => {
                preloader.classList.add("hidden");
            });
        }, 800); 
    });

    // 2. Logique de transition (au départ de la page)
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            const url = link.getAttribute('href');

            // Exclure les ancres (#), mails, téléphones et liens JS
            if (url && !url.startsWith('#') && !url.startsWith('mailto') && !url.startsWith('tel') && url !== 'javascript:void(0)') {
                
                // Si l'URL pointe vers la page actuelle (ex: on est sur contact.html et on clique sur "contact.html"), on annule la transition.
                const currentPath = window.location.pathname.replace(/\/$/, '');
                const targetPath = (new URL(url, window.location.href)).pathname.replace(/\/$/, '');

                if (currentPath.endsWith(targetPath)) {
                    return; 
                }

                e.preventDefault();
                
                // Affiche le préchargeur pour la transition
                preloader.classList.remove('hidden');
                
                // Change de page après 500ms (délai de transition)
                setTimeout(() => {
                    window.location.href = url;
                }, 500);
            }
        });
    });
});

// Ajoutez ce script à la fin de votre fichier principal JS (ex: js/main.js ou juste avant </body>)

const timelineItems = document.querySelectorAll('.timeline-item');

function checkTimelineVisibility() {
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Si l'élément est dans la fenêtre visible (ajustement de 150px pour une meilleure expérience)
        if (itemTop < windowHeight - 150) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
}

// Vérifie au chargement et au défilement
window.addEventListener('scroll', checkTimelineVisibility);
window.addEventListener('load', checkTimelineVisibility);

document.addEventListener("DOMContentLoaded", () => {
    const skillContainers = document.querySelectorAll('.skill-circle-container');

    const animateSkillCircles = () => {
        skillContainers.forEach(container => {
            const rect = container.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight - 100 && rect.bottom >= 0);

            if (isVisible && !container.classList.contains('animated')) {
                const percent = parseInt(container.getAttribute('data-percent'));
                const circleProgress = container.querySelector('.skill-circle-progress');
                
                // Le périmètre du cercle est 2 * PI * rayon. Pour un rayon de 15.9155, le périmètre est 100.
                // Donc, un dashoffset de (100 - pourcentage) animera la jauge.
                const offset = 100 - percent;
                circleProgress.style.strokeDashoffset = offset;
                
                container.classList.add('animated'); // Empêche l'animation de se re-déclencher
            }
        });
    };

    // Déclenche l'animation au chargement et au défilement
    window.addEventListener('scroll', animateSkillCircles);
    window.addEventListener('load', animateSkillCircles);
    
    // Pour s'assurer que les jauges déjà visibles au chargement s'animent
    animateSkillCircles(); 
});