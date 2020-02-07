(function (p){

    const fontsizeHtml = document.getElementById('fsize');
    const fontfamilyHtml = document.getElementById('ffamily');
    const themeHtml = document.getElementById('theme');
    const saveHtml = document.getElementById('save');
    const root = document.getElementById('root');
    const html = document.getElementById('html');

    function validateStorage () {
        const storage = localStorage;
        if (storage.getItem('font-size')) {
            root.style.fontSize = storage.getItem('font-size');
            fontsizeHtml.value = storage.getItem('font-size');
        } else {
            storage.setItem('font-size', '10px');  
        }
        
        if (storage.getItem('theme')) {
            html.className = storage.getItem('theme');
            themeHtml.value = storage.getItem('theme');

        } else {
            storage.setItem('theme', 'light-theme');
        }

        if (storage.getItem('font-family')) {
            root.style.fontFamily = storage.getItem('font-family');
            fontfamilyHtml.value = storage.getItem('font-family');

        } else {
            storage.setItem('font-family', 'arial');
        }
    }
    function saveSettings(applychanges) {
        localStorage.setItem('font-family', fontfamilyHtml.value);
        localStorage.setItem('font-size', fontsizeHtml.value);
        localStorage.setItem('theme', themeHtml.value);
        applychanges();
    }
    function applychanges() {
        const storage = localStorage;
        root.style.fontSize = storage.getItem('font-size');
        html.className = storage.getItem('theme');
        root.style.fontFamily = storage.getItem('font-family');
    }
    saveHtml.addEventListener('click', function () {
        saveSettings(applychanges);
    }, false);
    validateStorage()
})(console.dir)