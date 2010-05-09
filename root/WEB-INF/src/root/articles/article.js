var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

var Article = require("content/article").Article,
    Comment = require("content/comment").Comment,
    gravatarURI = require("gravatar").uri;
    
exports.GET = function(env) {
    var params = new Request(env).params,
        a = Article.get(params.key);

    if (!a) return Response.notFound();
    
    var comments = Comment.all().ancestor(a).fetch();
    
    return {data: {
        article: {
            key: a.key(),
            title: a.title,
            content: a.content,
            created: a.created,
            tagsLinks: a.tagsLinks("/blog/tags/", " "),
            commentCount: a.commentCount
        },
        comments: comments.map(function (c) {
            return {
                key: c.key(),
                author: c.author,
                email: c.email,
                uri: c.uri,
                content: c.content,
                created: c.created,
                gravatarURI: gravatarURI(c.email)                
            }
        }),
        keywords: a.tagLabels().join(",")
    }}
}
    
exports.DELETE = function(env) {
    var params = new Request(env).params(),
        a = Article.get(params.key);
        
    if (a) { 
        a.remove();
        return Response.ok();
    } else {
        return Response.notFound();
    }
}
