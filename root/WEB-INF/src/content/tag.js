var DB = require("google/appengine/ext/db"),
    Key = DB.Key;

var Hash = require("narwhal/hash").Hash;    

var CLEANUP_RE = /[\!|\.|\(|\)|\[|\]|\{|\}|\?|\&|\@]/g;

var cleanupTagsString = exports.cleanupTagsString = function (str) {
    return str.replace(CLEANUP_RE, "").replace(/, /g, ",").replace(/,$/, "");
}

/**
 * A Tag.
 */
var Tag = exports.Tag = DB.Model("Tag", {
    count: new DB.IntegerProperty({defaultValue: 1})
});

Object.defineProperty(Tag.prototype, "label", {
    get: function () {
        return this.key().name();
    }
});

Tag.prototype.toString = function () {
    return this.key().name();
}

// Increment the count of an existing tag or insert.
// Runs inside a transaction. Returns the tag label.
var _incrementOrInsert = function (label) {
    var tag;

    DB.runInTransaction(function () {
        tag = Tag.getByKeyName(label);
        if (tag) {
            tag.count += 1;
        } else {
            tag = new Tag({keyName: label});
        }
        tag.put();
    });
        
    return tag.label;
}

// Decrement the count of an existing tag or remove if count == 0.
// Runs inside a transaction.
var _decrementOrRemove = function (label) {
    var tag;
    
    DB.runInTransaction(function () {
        var tag = Tag.getByKeyName(label);
        tag.count -= 1;
        
        if (tag.count > 0) {
            tag.put();
        } else {
            tag.remove();
        }
    });
}

/**
 * Taggable mixin.
 */
var Taggable = exports.Taggable = function () {};

Taggable.extend = function(base) {
    if (!base.kind) throw new TypeError("Can only be mixed into model objects");
    
    base.updateProperties({
        tags: new DB.StringListProperty()    
    })

    Hash.update(base.prototype, Taggable.prototype);
    
    // Modify the remove method to remove Tags when the content is removed.
    var old_remove = base.prototype.remove; 
    base.prototype.remove = function () {
        this.removeTags();
        old_remove.call(this);
    }    
}

Taggable.prototype.updateTags = function (labels) {
    if (labels) {
        if (typeof(labels) == "string") {
            labels = cleanupTagsString(labels).split(",");
        }
        // TODO: something more optimal here.
        this.removeTags();
        this.tags = labels.map(function(l) {
            return _incrementOrInsert(l);
        });
    }
}

/**
 */
Taggable.prototype.removeTags = function () {
    if (this.tags) {
        this.tags.forEach(function(t) {
            _decrementOrRemove(t);
        });
    }
}

Taggable.prototype.tagLabels = function () {
    if (!this.tags) return [];
    return this.tags;
}

Taggable.prototype.tagsString = function (sep) {
    if (!this.tags) return "";
    return this.tags.join(sep || ", ");        
}

Taggable.prototype.tagsLinks = function (prefix, sep) {
    if (!this.tags) return "";
    
    return this.tags.map(function (t) { 
        return '<a href="' + prefix + t + '" rel="tag">' + t + '</a>'; 
    }).join(sep || ", ");
}
