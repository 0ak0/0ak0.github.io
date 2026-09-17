(function () {
    function initLightbox() {
        var links = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
        if (!links.length) return;

        var overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML =
            '<button class="lightbox-close" aria-label="Close">&times;</button>' +
            '<button class="lightbox-prev" aria-label="Previous image">&#10094;</button>' +
            '<img class="lightbox-image" src="" alt="">' +
            '<button class="lightbox-next" aria-label="Next image">&#10095;</button>';
        document.body.appendChild(overlay);

        var imageEl = overlay.querySelector('.lightbox-image');
        var closeBtn = overlay.querySelector('.lightbox-close');
        var prevBtn = overlay.querySelector('.lightbox-prev');
        var nextBtn = overlay.querySelector('.lightbox-next');
        var current = 0;

        function show(index) {
            current = (index + links.length) % links.length;
            imageEl.src = links[current].getAttribute('href');
        }

        function open(index) {
            show(index);
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function close() {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }

        links.forEach(function (link, index) {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                open(index);
            });
        });

        closeBtn.addEventListener('click', close);
        prevBtn.addEventListener('click', function () { show(current - 1); });
        nextBtn.addEventListener('click', function () { show(current + 1); });
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) close();
        });
        document.addEventListener('keydown', function (event) {
            if (!overlay.classList.contains('open')) return;
            if (event.key === 'Escape') close();
            if (event.key === 'ArrowLeft') show(current - 1);
            if (event.key === 'ArrowRight') show(current + 1);
        });
    }

    document.addEventListener('DOMContentLoaded', initLightbox);
})();
