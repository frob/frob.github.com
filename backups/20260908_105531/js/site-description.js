// Rotate the visible site description through a configured list.
// The canonical description stays in the DOM as an sr-only sibling for SEO / assistive tech.
(function () {
    var el = document.querySelector('.site-description-rotating');
    if (!el) return;

    var list;
    try { list = JSON.parse(el.getAttribute('data-rotate')); } catch (e) { return; }
    if (!Array.isArray(list) || list.length === 0) return;

    var interval = parseInt(el.getAttribute('data-interval'), 10);
    if (!interval || interval < 100) interval = 3000;

    var i = Math.floor(Math.random() * list.length);
    el.textContent = list[i];
    if (list.length === 1) return;

    setInterval(function () {
        i = (i + 1) % list.length;
        el.textContent = list[i];
    }, interval);
})();
