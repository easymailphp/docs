(async () => {
    var navtxt = await fetch('nav.htm');
    document.getElementById('nav').innerHTML = await navtxt.text();
    const response = await fetch('https://api.github.com/repos/easymailphp/docs/contents/');
    const data = await response.json();
    var htmlString = '';
    for (let file of data) {
        if (file.path.endsWith('.html')) {
            var r = await fetch(file.path);
            var text = await r.text();
            var el = document.createElement('html');
            el.innerHTML = text;
            if (file.path.replace(/^.*[\\\/]/, '') == window.location.href.replace(/^.*[\\\/]/, '')) {
                htmlString += `<div class="item active"><a href="${file.path}">${el.getElementsByTagName('title')[0].textContent}</a></div>`;
            } else {
                htmlString += `<div class="item"><a href="${file.path}">${el.getElementsByTagName('title')[0].textContent}</a></div>`;
            }
        }
    }
    document.getElementById('items').innerHTML = htmlString;
})();
