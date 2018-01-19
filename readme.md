# WordPress starter theme

Basic wordpress coding workflow using Grunt with SASS, AutoPrefixer, Grunticon

Installation quide
1. Install [npm](https://docs.npmjs.com/)
1. Install [Grunt](https://gruntjs.com/)
1. Change [package.json](package.json) name `"name": "themeName",`
1. Install npm package `npm install`
1. Change [Gruntfile.js](Gruntfile.js) proxy url for development url like "http://localhost/project" `proxy: 'example.com'`
1. Change [style.css](style.css) theme info
1. Run `grunt` before coding theme
  1. Run `grunt styles` only to compile scss
  1. Run `grunt icons` to generate icons
  1. Run `grunt prod` before deploying theme to server

## What if I don't want to use Bootstrap?
No problem, I've started using it recently and only some parts of it. If you don't want use it, just delete scss/bootstrap folder and remove importing of those feiles in scss/style.scss

## How to use Grunticon?
Basically, just run `grunt` and copy your (.svg) icons into icons/source folder. Once you do that, Grunt runs all tasks

## How to deploy code?
I'm using [FTP deployment](https://github.com/dg/ftp-deployment)
Make sure that you ignore node_modules and cache. Also disable preprocessing, which can cause problems.
```
ignore = "
.git*
node_modules
.sass-cache
"

preprocess = no

allowDelete = yes
```

## No minification?
No. Use plugin like [Autoptimize](https://cs.wordpress.org/plugins/autoptimize/) to do this for you