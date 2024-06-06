// NE PAS SUPPRIMER

console.log('matomo_script_loaded');

var _paq = window._paq || [];

window.addEventListener('hashchange', function () {
    console.log('pushing');
    _paq.push(['setCustomUrl', '/' + window.location.hash.substr(1)]);
    _paq.push(['setDocumentTitle', 'My New Title']);
    _paq.push(['trackPageView']);
})

/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function () {
    var u = "//api.thisscpdoesnotexist.ml/";
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = u + 'matomo.js';
    s.parentNode.insertBefore(g, s);
})();