var DB = require("google/appengine/ext/db");

/**
 * A content category.
 * Useful as a parent entity for other entities.
 */
var Category = exports.Category = DB.Model("Category", {
	label: new DB.StringProperty({required: true, multiline: false}),
	category: new DB.ReferenceProperty({referenceClass: Category}), // THINK: remove, use parent?
	index: new DB.IntegerProperty(), // optional, used for forced ordering.
	updated: new DB.DateTimeProperty({autoNow: true})
});

Object.defineProperty(Category.prototype, "term", {
    get: function() {
        return this.key().name();
    }
});

Category.prototype.toString = function () {
    return this.term;
}
