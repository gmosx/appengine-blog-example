var DB = require("google/appengine/ext/db");

var Category = require("./category").Category,
    slugify = require("./utils").slugify;

/**
 * An article is the basic content unit.
 * Follows the Atom Publishing Format.
 */
var Article = exports.Article = DB.Model("Article", {
    category: new DB.ReferenceProperty({referenceClass: Category}),
	title: new DB.StringProperty({required: true, multiline: false}),
    summary: new DB.TextProperty(), 
	content: new DB.TextProperty({required: true}),
	created: new DB.DateTimeProperty({autoNowAdd: true}),
	updated: new DB.DateTimeProperty({autoNow: true}),
});

Object.defineProperty (Article.prototype, "slug", {
    get: function() {
        return slugify(this.title);
    }
});

Article.prototype.path = function () {
    return "" + this.key() + "/" + this.slug + ".html";
}

Article.prototype.toString = function () {
    return this.title;
}
