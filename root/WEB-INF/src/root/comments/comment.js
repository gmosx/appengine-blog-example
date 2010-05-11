var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;
    
var Comment = require("content/comment").Comment;
    
exports.DELETE = function(env) {
    var params = new Request(env).params,
        c = Comment.get(params.key);
        
    if (c) { 
        c.remove();
        return Response.ok();
    } else {
        return Response.notFound();
    }
}
