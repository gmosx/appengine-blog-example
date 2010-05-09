var Article = require("content/article").Article,
    Taggable = require("content/tag").Taggable,
    Commentable = require("content/comment").Commentable;

Taggable.extend(Article);
Commentable.extend(Article);
