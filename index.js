import express, { response } from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();
server.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "*");
    next();
});

const router = jsonServer.router("./data/db.json");
server.use("/api", router);
server.db = router.db;

const middlewares = jsonServer.defaults();
const rules = auth.rewriter({
    products: 444,
    featured_products: 444,
    orders: 660,
    users: 600,
});

server.use(rules);
server.use(auth);
server.use(middlewares);
server.use(router);

server.listen(8000);
