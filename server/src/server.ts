import express, { type Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const routesPath = path.join(__dirname, "routes");
fs.readdirSync(routesPath).forEach((file) => {
  const route = require(path.join(routesPath, file));
  const routeName = "/api/" + path.parse(file).name;
  if (route.default) {
    app.use(routeName, route.default);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
