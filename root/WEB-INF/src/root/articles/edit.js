var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;
    
var Article = require("content/article").Article;

exports.GET = function (env) {
    var params = new Request(env).params,
        a = params.key ? Article.get(params.key) : new Article();

    if (!a) return Response.notFound("Article not found");

    return {data: {
        article: {
            key: params.key,
            title: a.title,
            summary: a.summary,
            content: a.content,
            created: a.created,
            tagsString: a.tagsString()
        }
    }}
}
