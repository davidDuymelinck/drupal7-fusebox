const { FuseBox, CSSPlugin, SassPlugin, WebIndexPlugin } = require("fuse-box");

const fuse = FuseBox.init({
    homeDir: "theme_assets",
    output: "$name.js"
});

fuse.bundle("sites/all/themes/my_theme/js/main")
    .plugin(SassPlugin(), CSSPlugin({
        outFile: (file) => `sites/all/themes/my_theme/css/main.css`
    }))
    .instructions("> my_theme/index.ts");

fuse.run();