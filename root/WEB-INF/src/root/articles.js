var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;
    
var Article = require("content/article").Article,
    ArticleForm = require("google/appengine/ext/db/forms").ModelForm(Article);
    
exports.POST = function (request) {
    var params = request.params,
        a = params.key ? Article.get(params.key) : new Article();

    a.updateTags(params.tagsString);

    var form = new ArticleForm(params, {instance: a});

    try {
        form.put();
    } catch (errors) {
        return Response.json({errors: errors});
    }
    
    return Response.json({uri: "/articles/article?key=" + a.key()});
}
