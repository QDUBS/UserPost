import express, { Application } from "express";
import config from "config";
import postsRouter from "./routes/posts";
import usersRouter from "./routes/users";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";
import cors from "cors";

const port = config.get("port") as number;

const app: Application = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// API routes
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CORS middleware
app.use(cors({ origin: "https://user-post-theta.vercel.app" }));

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
