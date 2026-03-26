document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href').slice(1);
        const target = targetId ? document.getElementById(targetId) : document.documentElement;
        if (!target) return;

        e.preventDefault();

        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 0;
        const extraOffset = 16;

        const startY = window.scrollY;
        const endY = Math.max(target.getBoundingClientRect().top + startY - navHeight - extraOffset, 0);
        const distance = endY - startY;
        const duration = Math.min(Math.abs(distance) * 0.5, 900);
        let startTime = null;

        const easeIn = (t) => t * t * t;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            window.scrollTo(0, startY + distance * easeIn(progress));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    });
});
