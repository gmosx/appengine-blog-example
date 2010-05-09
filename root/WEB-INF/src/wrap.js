exports.Wrap = function (app) {
    return function (env) {
        // This middleware wraps all actions, add code here, 
        // to be executed on every request.
        return app(env);
    }
}

var Tag = require("content/tag").Tag;

exports.Aside = function (app) {
    return function (env) {
        var response = app(env);
        response.data.asideTags = Tag.all().order("-count").fetch(10).map(function (t) {
            return {
                label: t.label,
                count: t.count
            }                
        });
        return response;
    }        
}
