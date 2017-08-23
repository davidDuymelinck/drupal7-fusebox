const { FuseBox, CSSPlugin, SassPlugin, PostCSSPlugin, QuantumPlugin, Sparky } = require("fuse-box");


let fuse, main, isProduction = false;

Sparky.task("config", () => {
  fuse = FuseBox.init({
    homeDir: "../theme_assets/my_theme",
    output: "../sites/all/themes/my_theme/js/$name.js",
    experimentalFeatures: true,
    sourceMaps: !isProduction,
    debug: !isProduction,
    plugins: [
      isProduction && QuantumPlugin({bakeApiIntoBundle : 'main'})
    ]
  });

  main = fuse.bundle('main')
      .splitConfig({browser: '/sites/all/themes/my_theme/js/'})
      .split('ts/handlers/**', 'test > ts/handlers/testHandler.ts')
      .instructions("> [index.ts] [ts/**/**.ts]");

});

const myThemeCSSConfig = { outFile: (file) => `../sites/all/themes/my_theme/css/main.css`, inject: false };
const postCssPlugins = [ require('autoprefixer') ];

Sparky.task("default", ["config"], () => {
  main.plugin(SassPlugin(), PostCSSPlugin(postCssPlugins), CSSPlugin(myThemeCSSConfig)).watch();
  return fuse.run()
});


Sparky.task("live", ["set-production", "config"], () => {
  main.plugin(SassPlugin({ outputStyle: 'compressed', sourceMap: false }), PostCSSPlugin(postCssPlugins), CSSPlugin(myThemeCSSConfig));
  return fuse.run();
});

Sparky.task("set-production", () => {
  isProduction = true;
});