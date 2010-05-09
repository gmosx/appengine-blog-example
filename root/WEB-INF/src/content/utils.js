/**
 * Create a title slug.
 */
// Something like this is better: return re.sub('[^a-zA-Z0-9-]+', '-', s).strip('-'),
// use squeeze/strip.
exports.slugify = function (str) {
    if (str) {
        return encodeURIComponent(str.replace(/ |%|!|"|\/|\(|\)|\*|\[|\]|\$|#|\?|\;|,|\&|=|@|\./g, "-").replace(/-{2,}/g, "-").replace(/^-/, "").replace(/-$/, "").toLowerCase());
    } else {
        return "";
    }
}
    
exports.nofollowify = function (str) {
    return str.replace(/<\s*a\s*(.+?)>/i, '<a $1 rel="nofollow">')
}

exports.brify = function (src) {
    return src.replace(/\n/g, "<br />");
}

exports.unbrify = function (src) {
    return src.replace(/<br \/>/g, "\n");
}
