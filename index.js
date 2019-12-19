if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        // .register('./assets/js/sw.js')
        .register('./sw.js')
        .then(function () {console.log('Service Worker Registered');});
}
