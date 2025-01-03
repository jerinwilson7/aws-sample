"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser")); // Use 'import' instead of 'require'
const body_parser_1 = __importDefault(require("body-parser")); // Use 'import' instead of 'require'
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const PORT = 8080;
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "options"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json()); //For parsing incoming request as json
app.use((0, morgan_1.default)("dev")); // For logging the route
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "50mb" }));
app.use(body_parser_1.default.json());
app.use("/users", user_1.default);
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config();
}
app.use(() => {
    throw (0, http_errors_1.default)(404, "Route Not Found");
});
const errorHandler = (err, req, res, next) => {
    console.log(err.message, err.statusCode);
    if (res.headersSent) {
        return next(err);
    }
    res
        .status(err.statusCode || 500)
        .json({ message: err.message || "An unknown Error" });
};
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
