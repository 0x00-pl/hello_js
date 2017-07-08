const { md_parser } = require('../index')
const fs = require('fs')

describe("test", function () {
    it("test_parse", function () {
        const test_md_string = fs.readFileSync(__dirname+'/[170707]use_webpack_build_icons.md').toString()
        const parsed = md_parser(test_md_string)
        const e = {
            "Author": "Rabbit",
            "Date": "170707",
            "Description": "项目开发中经常会使用到各式各样的图标小图片，在之前，我们会将他们放置在一张大的图片中，来减少过多的网络请求，这个技术被称为制作 sprite。再近些年的开发中，大家更倾向于使用 Webfont 来实现图标的加载，即在在浏览器中加载字体。有很多的现代 css 框架也有包含了这一功能，比如 Bootstrap，Foundation 等。这里会介绍一些关于 Icon 开发和产品环境下的 idea。",
            "Keywords": "Webpack Iconfont",
            "Lang": "JavaScript",
            "SubTitle": "Little shape of your mind.",
            "Title": "使用 Webpack 打包图标"
        }
        expect(parsed).toEqual(e)
    })
})
