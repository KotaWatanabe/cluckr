const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const rootRouter = require("./routes/root")
const clucksRouter = require("./routes/clucks");

const app = express(); // http.createServer(...)

app.set("view engine", "ejs");


app.use(logger("dev"));


app.use(express.urlencoded({ extended: true }));



// COOKIER PARSER
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use((request, response, next) => {
response.locals.username = "";
const username = request.cookies.username;
if (username) {
response.locals.username = username;
}

next();
});

// -= ROUTERS =-

app.use("/", rootRouter);
app.use("/clucks", clucksRouter);


const PORT = 4520;
const ADDRESS = "localhost"; // 127.0.0.1
app.listen(PORT, ADDRESS, () => {
console.log(`Server listenning on http://${ADDRESS}:${PORT}`);
});