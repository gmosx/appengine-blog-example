var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

var Article = require("content/article").Article,
    Tag = require("content/tag").Tag;

var paginate = require("pagination").paginate;

exports.GET = function(env) {
    var params = new Request(env).params,
        label = params.label,
        tag = Tag.getByKeyName(label);
        
    if (!tag) return Response.notFound("Tag not found");

    var articles = paginate(env, Article.all().filter("tags =", label).order("-created"), 10);
        
    return {data: {
        tag: {
            label: tag.label
        },
        articles: articles.map(function(a) {
            return {
                key: a.key(),
                title: a.title,
                summary: a.summary,
                created: a.created,
                commentCount: a.commentCount,
                tagsLinks: a.tagsLinks("/tags/tag?label=")
            }
        }),
        prev: articles.prev,
        next: articles.next
    }};
}
