var Article = require("content/article").Article;

var paginate = require("pagination").paginate,
    Aside = require("../wrap").Aside;

exports.GET = Aside(function (request) {
    var articles = paginate(request, Article.all().order("-created"), 10);
    
    return {data: {
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
});
