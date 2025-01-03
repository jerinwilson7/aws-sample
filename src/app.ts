import express, { Application, ErrorRequestHandler } from "express";
import createHttpError from "http-errors";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser"; // Use 'import' instead of 'require'
import bodyParser from "body-parser"; // Use 'import' instead of 'require'
import userRouter from "./routes/user";

const app: Application = express();

const PORT: number = 8080;
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "options"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json()); //For parsing incoming request as json
app.use(morgan("dev")); // For logging the route
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(bodyParser.json());

app.use("/users", userRouter);

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

app.use(() => {
  throw createHttpError(404, "Route Not Found");
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.message, err.statusCode);
  if (res.headersSent) {
    return next(err);
  }
  res
    .status(err.statusCode || 500)
    .json({ message: err.message || "An unknown Error" });
};

app.use(errorHandler);

app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;