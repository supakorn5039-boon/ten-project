import express, { type Application } from "express";
import path from "path";
import fs from "fs"
import morgan from "morgan";

const app:Application = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(morgan("dev"))

const routesPath  = path.join(__dirname , "routes")
fs.readdirSync(routesPath).forEach((file) => {
    const route  = require(path.join(routesPath,file))
    const routeName = "/" + path.parse(file).name
    route.default && app.use(routeName , route.default)
})

app.listen(PORT , () => {
    console.log(`server is running on PORT ${PORT}`);
})