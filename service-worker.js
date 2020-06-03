self.addEventListener("install", function (event) {
    event.waitUntil(
        caches
        .open("uwutube-placeholder-1")
        .then(function (cache) {
            return cache.addAll([
                "/",
                "/img/logo.svg",
                "/main.css",
                "/index.html"
            ]);
        })
        .then(function () {
            console.log("Service worker installed");
        })
    );
});