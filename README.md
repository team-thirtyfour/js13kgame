# js13kgame

Glitch or die trying

A simple game where you play a square trying to find its way out different levels. The problem is, it's almost always impossible without glitching (i.e. entering commands in the console).

## Dev

> npm install

> npm run dev

> open `dist/index.html` in browser

> open `src/unit-tests.html` in other tab and check all tests are good before commit

To add a new test, add a new spec file and export it in `src/mainSpec.js`. F5 in browser must show new tests.

## Build // Release // Deploy

#### Default
Default build uses uglify to minify js files. Html and css files are also minified.
##### Build
```sh
    npm run build
```
###### Build using Google closure compiler
To use google closure compiler instead of uglify for javascript minification
```sh
    npm run build-google
```
##### Release
Release will automatically rebuild the project and create a gzip file: game.gz
```sh
    npm run release
```
##### Deploy
To deploy a fresh version on [team-thirtyfour.github.io/js13kgame](https://team-thirtyfour.github.io/js13kgame/).

```sh
    npm run deploy
```

##debug mode
To debug minified files, add "-debug" to the earlier build tasks:
```sh
    npm run build-debug
```