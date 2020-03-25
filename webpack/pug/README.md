# @niama/pug-bem-plain-loader

![npm (scoped)](https://flat.badgen.net/npm/v/@niama/pug-bem-plain-loader)
![Build Status](https://flat.badgen.net/travis/@niama/pug-bem-plain-loader)

A loader that compiles **Pug** templates into **HTML** with **BEM** shortcuts inspired by the great work of [Legostaev Vadim](https://github.com/legostaev-vadim/pug-bem-plain-loader).

## Installation

Note `pug` is a peer dependency, so make sure to install both:

``` sh
yarn add -D pug @niama/pug-bem-plain-loader
```

## Usage

This loader has been developed to fullfil the needs of our company to easily integrate [pug](https://pugjs.org) templates with a flexible [BEM](http://getbem.com/) styling syntax into [Quasar](https://quasar.dev).

It is not intended to be used directly. Therefore, you can find the documentation in the dedicated app extension section : [@niama/quasar-app-extension-pug](https://github.com/niama-strategies/niama/tree/master/quasar/pug).

Nevertheless, it is perfectly possible to use it with Webpack following instructions of the traditional [pug-plain-loader](https://github.com/yyx990803/pug-plain-loader).
