(function () {
    var LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

    // link support
    function fillCaption(el, text) {
        var last = 0;
        text.replace(LINK_PATTERN, function (match, label, url, index) {
            el.appendChild(document.createTextNode(text.slice(last, index)));
            var a = document.createElement('a');
            a.href = url;
            a.textContent = label;
            a.target = '_blank';
            a.rel = 'noopener';
            el.appendChild(a);
            last = index + match.length;
        });
        el.appendChild(document.createTextNode(text.slice(last)));
    }

    var grid = document.getElementById('portfolio');
    if (!grid || typeof PORTFOLIO === 'undefined') return;

    PORTFOLIO.forEach(function (piece) {
        var figure = document.createElement('figure');
        figure.className = 'portfolio-item';

        var link = document.createElement('a');
        link.href = piece.image;
        link.setAttribute('data-lightbox', '');

        var img = document.createElement('img');
        img.src = piece.image;
        img.alt = piece.alt || (piece.caption || '').replace(LINK_PATTERN, '$1');
        img.loading = 'lazy';
        link.appendChild(img);
        figure.appendChild(link);

        if (piece.caption) {
            var caption = document.createElement('figcaption');
            fillCaption(caption, piece.caption);
            figure.appendChild(caption);
        }

        grid.appendChild(figure);
    });
})();
