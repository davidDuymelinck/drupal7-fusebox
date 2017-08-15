if(document.querySelector('.test')) {
    (async function() {
        const test = await import("test");
        new test.default();
    })();
}
