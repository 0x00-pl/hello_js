


function md_parser (md_file) {
    let header_info = md_file.match(/---([^]*)---/)[1]
    header_info = header_info.replace(/\\\n/g, '')
    let lines = header_info.split('\n').map(l=>l.trim()).filter(l=>l!=='')
    let ret = {}
    lines.forEach(function (line) {
        let [k, v] = line.split(':')
        k = k.trim()
        v = v.trim()
        ret[k] = v
    })
    return ret
}


module.exports = {
    md_parser
}
