var md5 = require("narwhal/md5").hash,
    base16 = require("narwhal/base16").encode;

/**
 * A gravatar, or globally recognized avatar, is quite simply an avatar 
 * image that follows you from weblog to weblog appearing beside your 
 * name when you comment on gravatar enabled sites. Avatars help 
 * identify your posts on web forums, so why not on weblogs?
 *
 * http://www.gravatar.com
 */

/**
 * Generate the gravatar uri.
 * Examples: 
 *   "http://gravatar.com/e9e719b44653a9300e1567f09f6b2e9e.png?r=PG&s=512"
 *   "https://secure.gravatar.com/e9e719b44653a9300e1567f09f6b2e9e.png?r=PG"
 */
var gravatarURI = exports.gravatarUTI = exports.uri = function(email, extra, prefix) {
    if (!email) return "";
    return "http://gravatar.com/avatar/" + base16(md5(email)) + ".png" + (extra || "?d=identicon");
}

exports.gravatarURI_small = function() {
    return gravatarURI(this.email, "?d=identicon&s=32");
}
