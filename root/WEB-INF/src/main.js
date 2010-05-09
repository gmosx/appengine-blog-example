require("./templatefilters");
require("./setup");
    
var Setup = require("nitro/middleware/setup").Setup,
    Path = require("nitro/middleware/path").Path,
    Errors = require("nitro/middleware/errors").Errors,
    Render = require("nitro/middleware/render").Render,
    Dispatch = require("nitro/middleware/dispatch").Dispatch;

var Wrap = require("./wrap").Wrap;
    
exports.app = Setup(Path(Errors(Render(Wrap(Dispatch({dispatchRoot: "WEB-INF/src/root"})), {templateRoot: "WEB-INF/src/templates"}))));
