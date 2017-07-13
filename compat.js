const HttpStatus = require('http-status-codes');

module.exports = (includeErrorStack = process.env.NODE_ENV === "development") => fn => (req,res) => __async(function*(){
    try {
        return yield fn(req,res);
    } catch(error) {
        let errorHttpStatusMessage;
        try {
            errorHttpStatusMessage = HttpStatus.getStatusText(error.statusCode || 500);
        } catch(_) {
            errorHttpStatusMessage = "Server Error"
        }
        const errorData = {
            statusCode: error.statusCode || 500,
            error: errorHttpStatusMessage,
            message: error.message
        };
        if(includeErrorStack) {
            errorData.stack = error.stack.replace(/^\s+at\s+/gm,"").split("\n").splice(1)
        }
        return errorData;
    }
}());

function __async(g){return new Promise(function(s,j){function c(a,x){try{var r=g[x?"throw":"next"](a)}catch(e){j(e);return}r.done?s(r.value):Promise.resolve(r.value).then(c,d)}function d(e){c(e,1)}c()})}
