self.addEventListener("install", function (event) {
    event.waitUntil(
        caches
        .open("uwutube-placeholder-1")
        .then(function (cache) {
            return cache.addAll([
                "/",
                "/images/logo.svg",
                "/main.css",
                "/index.html"
            ]);
        })
        .then(function () {
            console.log("Service worker installed");
        })
    );
});

self.addEventListener("fetch", function (event) {
    if (event.request.method !== "GET") {
        return;
    }
    event.respondWith(
        caches
        .match(event.request)
        .then(function (cached) {
            var networked = fetch(event.request)
                .then(fetchedFromNetwork, unableToResolve)
                .catch(unableToResolve);
            return cached || networked;

            function fetchedFromNetwork(response) {
                var cacheCopy = response.clone();
                caches
                    .open("uwutube-placeholder-1-pages")
                    .then(function add(cache) {
                        cache.put(event.request, cacheCopy);
                    });

                return response;
            }

            function unableToResolve() {
                return new Response("<h1>Service Unavailable</h1>", {
                    status: 503,
                    statusText: "Service Unavailable",
                    headers: new Headers({
                        "Content-Type": "text/html"
                    })
                });
            }
        })
    );
});