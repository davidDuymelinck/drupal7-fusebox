const { FuseBox, CSSPlugin, SassPlugin, UglifyJSPlugin, Sparky } = require("fuse-box");

let fuse, myTheme, isProduction = false;

Sparky.task("config", () => {
    fuse = FuseBox.init({
        homeDir: "theme_assets",
        output: "$name.js",
        sourceMaps: !isProduction,
        plugins: [
            isProduction && UglifyJSPlugin()
        ]
    });

    myTheme = fuse.bundle("sites/all/themes/my_theme/js/main")
        .instructions("> my_theme/index.ts");
});

const myThemeCSSConfig = { outFile: (file) => `sites/all/themes/my_theme/css/main.css`, inject: false };

Sparky.task("default", ["config"], () => {
    myTheme.plugin(SassPlugin(), CSSPlugin(myThemeCSSConfig)).watch();
    return fuse.run();
});


Sparky.task("live", ["set-production", "config"], () => {
    myTheme.plugin(SassPlugin({ outputStyle: 'compressed' }), CSSPlugin(myThemeCSSConfig));
    return fuse.run();
});

Sparky.task("set-production", () => {
    isProduction = true;
});




