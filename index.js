const HttpStatus = require('http-status-codes');

module.exports = (includeErrorStack = process.env.NODE_ENV === "development") => fn => async (req,res) => {
    try {
        return await fn(req,res);
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
};
