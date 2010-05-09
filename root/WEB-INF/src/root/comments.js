var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

var Article = require("content/article").Article,
    Comment = require("content/comment").Comment,
    CommentForm = require("google/appengine/ext/db/forms").ModelForm(Comment);

var brify = require("content/utils").brify,
    gravatarURI = require("gravatar").uri;

exports.POST = function(env) {
	var params = new Request(env).POST(),
    	article = Article.get(params.article);

    if (!article) return Response.notFound("Article not found");
    
    var c = params.key ? Comment.get(params.key) : new Comment({parent: article});
    c.content = brify(params.content);

    var form = new CommentForm(params, {instance: c});

    try {
        form.put();
    } catch (errors) {
        return Response.json({errors: errors});
    }

    var html = env.render("/comments/comment.inc.html", {
        key: c.key(),
        author: c.author,
        uri: c.uri,
        content: c.content,
        created: new Date(),
        gravatarURI: gravatarURI(c.email)
    });
    
    return Response.json({html: html});
}

