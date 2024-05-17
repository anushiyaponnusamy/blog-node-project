// responseFormatter.js

class ResponseFormatter {
    static formatResponse(res, message, status = 200, data = [], metadata = {}) {
        const response = {
            message: message,
            status: status,
            data: data,
            metadata: {
                count: data.length,
                host: res.req.hostname,
                port: res.req.socket.localPort,

            }
        };

        return res.status(status).json(response);
    }
}

module.exports = ResponseFormatter;
