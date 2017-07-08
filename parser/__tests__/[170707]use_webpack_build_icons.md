---
Title: 使用 Webpack 打包图标
Author: Rabbit
Date: 170707
Keywords: Webpack Iconfont
Lang: JavaScript
SubTitle: Little shape of your mind.
Description: \
项目开发中经常会使用到各式各样的图标小图片，在之前，我们会将他们放置在一张大的图片中，\
来减少过多的网络请求，这个技术被称为制作 sprite。再近些年的开发中，大家更倾向于使用 \
Webfont 来实现图标的加载，即在在浏览器中加载字体。有很多的现代 css 框架也有包含了这\
一功能，比如 Bootstrap，Foundation 等。这里会介绍一些关于 Icon 开发和产品环境下的 \
idea。
---

* Icon 图标

** 开发环境中可能遇到的两种 icon 使用方式

*** 成熟的第三方 icon 库

比如 Bootstrap Fontawesome Ionicons 等等等，这些 css 库或有自己的图标字体库，比如
bootstrap 和 foundation，或本身就是icon 文件的集合，并自带打包好的字体文件，典型一
些的像 fontawesome 和 ionicons。使用第三方库的好处就是，可以快速开发产品，但是会缺乏
一定的自由定制能力。一个麻烦的事就是，如果在库中找不到合适的 icon，或是想要将其他的 
icon 加到现有字体文件中，是一件麻烦事。嘛，这是第三方库的特点。

我们也可以在网站上自由选择一些icon供我们使用，如阿里的[[http://www.iconfont.cn/]]或
是 [[https://icomoon.io/]] 都是很不错的选择。由于处理办法和第三方库类似，所以把他们
归为一类。


*** 自己构建源文件或设计师来定制的 icon

一般是设计师创作的一个个的图片源文件，svg png 或是其他格式的 icon。根据产品风格来定制
icon，也是非常有必要的。但缺点也显而易见，由于只是些原文件，我们需要工具将他们打包在一
起使用，比如 sprite 或 font 文件。这会带来构建上面的问题。



** 配置开发环境下的第三方 icon 库 

对于第三方库来说，开发换进比较简单，毕竟人家已经做好了成品。这里只需要将字体文件配置好
规则即可。

#+BEGIN_SRC js
// ..webpack.config.js
{
    test: /\.{ttf|eot|woff|woff2}$/,
    use: 'url-loader'
}
#+END_SRC



*** 将 svg 源文件前置打包成 dll

如果只是当作小图片来用，那从一开，其实就已经失去了一些东西。icon 通常使用一些矢量图软件
来制作，像 Adobe AI 这类，最后也一般是一个个的 svg 文件。一些现代浏览器已经支持使用 svg
嵌入 dom 中 [[http://caniuse.com/#search=svg][caniuse#svg]]。将 svg 当作 dom 来用
的话，就可以使用代码来微调一些样式。

#+BEGIN_SRC html
<div class="icon">
    <svg viewbox="0 0 16 16" width="16" height="16">
        <rect x="0" y="0" width="40" height="40" fill="#000"></rect>
    </svg>
<div>
#+END_SRC

现在的问题是，要怎么样将 svg 文件放入 dom 中。使用 [[https://github.com/boopathi/react-svg-loader][react-svg-loader]] 
来说，可以很容易办到这件事。


#+BEGIN_SRC js
// ... webpack.dll-icon.config.js
{
    test: /icon[^.]+\.svg$/,
    use: ['babel-loader', 'react-svg-loader']
}
#+END_SRC


借助 react-svg-loader 和 babel-loader 就可以很容易的将 svg 作为 dom 来用。

#+BEGIN_SRC js
// icon.js
const Icon = require('icon/path/to/foo.svg')

export default () => (
  <div>
    <Icon />
  </div>
)
#+END_SRC

[[/assets/labels/info.png]] icon 是一个 webpack 别名，这么做的原因是可以选择性的
来使用 icon。比如我想使用 ionicons 的 icon 可以写成 ~require('ionicons/src/alert.svg')~。
但由于项目需求，现在必须使用 feather 的 icon，只能改为 ~require('feather/icons/alert.svg')~。
所以可以用一个别名来引用用到的库。

#+BEGIN_SRC js
// ... webpack.dev.config.js
alias: {
    icon: "feather/icons"
}
#+END_SRC

TODO Multi icon source supports.

那，做成 dll 的原因是什么？



*** 将 svg 源文件前置打包成 sprite


** 一个 Icon 的接口组件

#+BEGIN_SRC js
interface Icon {
    name: string,
    className: string
}
#+END_SRC
