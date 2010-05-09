var Request = require("nitro/request").Request,
    Response = require("nitro/response").Response;

var Tag = require("content/tag").Tag;

exports.GET = function(env) {
    var params = new Request(env).params;

    if (params.args) {
        env["PATH_INFO"] = "/tags/tag.html";
        params.label = params.args[0]; 
        return env.dispatch(env);
    }

    var tags = Tag.all().order("-count").fetch(100);
    
    if (tags.length > 0) {
        var size, maxSize = 0;
        var maxCount = Number(tags[0].count);

        // The tags of the tagcloud are alphabetically sorted for convenience.
        tags = tags.sort();

        var t, cloud = [];
        
        for (var i = 0; i < tags.length; i++) {
            t = tags[i];
            size = (Number(t.count) / maxCount) * 5;
            if (size > maxSize) maxSize = size;
            cloud.push('<a href="/tags/tag?label=' + t.label + '" rel="tag" style="font-size: ' + size + 'em">' + t.label + '</a>');
        }
        
        return {data: {
            tags: cloud.join(" "),
            maxSize: maxSize
        }};
    } else {
        return Response.notFound("No tags found");
    }
}
