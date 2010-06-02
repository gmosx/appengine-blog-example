var Response = require("nitro/response").Response;
    
var Comment = require("content/comment").Comment;
    
exports.DELETE = function (env) {
    var c = Comment.get(env.params.key);
        
    if (c) { 
        c.remove();
        return Response.ok();
    } else {
        return Response.notFound();
    }
}
