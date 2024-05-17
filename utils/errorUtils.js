// errorUtils.js
class ErrorUtils {
    static mapError(err) {
        if (err.message === "Bad Request: Missing request body" || "Invalid parameter") {
            return { error: err.message, status: 400 };
        } else if (err.message === "Data not found") {
            return { error: err.message, status: 404 };
        } else {
            return { error: err?.message ? err?.message : 'Internal Server Error', status: 500 };
        }
    }
}

module.exports = ErrorUtils;
