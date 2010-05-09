var Request = require("jack/request").Request;

exports.paginate = function (env, query, limit) {
    var params = new Request(env).params(),
        items = query.withCursor(params._c).fetch(limit);

    if (params._c) {
        items.prev = "javascript:window.history.back()";
    }        
    
    if (items.length == limit) {
        items.cursor = query.cursor();
        items.next = "?_c=" + items.cursor;
    }
    
    return items;
}

var Query = require("google/appengine/ext/db/query").Query;

Query.prototype.paginate = function (env, limit) {
    return exports.paginate(env, this, limit);
}
