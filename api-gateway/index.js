import express from "express"
import { createProxyMiddleware } from "http-proxy-middleware"
const app = express();
const routes = {
    "/api/auth": "http://localhost:8000/auth",
    "/api/users": "http://localhost:8000/users",
    "/api/msgs": "http://localhost:5000/msgs"
}

for (const route in routes) {
    const target = routes[route];
    app.use(route, createProxyMiddleware({ target, changeOrigin: true }))
}

const PORT = 8083;

app.listen(PORT, () => {
    console.log(`api gateway listening on port : ${PORT}`)
})