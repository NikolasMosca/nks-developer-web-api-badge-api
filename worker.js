let counter = 0;
setInterval(() => {
    navigator.setAppBadge(counter)
    console.log("service worker counter", counter)
    counter++;
    if (counter >= 100) {
        counter = 0;
    }
}, 1000)