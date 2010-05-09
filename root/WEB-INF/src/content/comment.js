var db = require("google/appengine/ext/db");

/**
 * An unclaimed comment.
 * The parent is the Article.
 */
var Comment = exports.Comment = db.Model("Comment", {
    author: new db.StringProperty({required: true, multiline: false}),
    email: new db.EmailProperty({required: true}),
    uri: new db.StringProperty({multiline: false}),
	content: new db.TextProperty({required: true}),
	created: new db.DateProperty({autoNowAdd: true})
});

// Modify the put method.
var old_put = Comment.prototype.put; 
Comment.prototype.put = function () {
    var self = this;
    db.runInTransaction(function () {
        var parent = self.parent();
        if (!self.isSaved()) {
            parent.commentCount += 1;
        }
        // THINK: use db.put(parent, self) ?
        parent.put();
        old_put.call(self);
    });
}

// Modify the remove method.
var old_remove = Comment.prototype.remove; 
Comment.prototype.remove = function () {
    var self = this;
    db.runInTransaction(function () {
        var parent = self.parent();
        parent.commentCount -= 1;
        parent.put();
        old_remove.call(self);
    });
}

/**
 * This mixin makes a content object commentable.
 */
var Commentable = exports.Commentable = function (base) {
    this.extend(base);
};

Commentable.extend = function (base) {
    if (!base.kind) throw new TypeError("Can only be mixed into model objects");
    
    base.updateProperties({
        commentCount: new db.IntegerProperty({defaultValue: 0})    
    })
    
    // Modify the remove method to remove Comments when the parent is removed.
    var old_remove = base.prototype.remove; 
    base.prototype.remove = function () {
        db.remove(Comment.all().ancestor(this).keys());
        old_remove.call(this);
    }        
}
