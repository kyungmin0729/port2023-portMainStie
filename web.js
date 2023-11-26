const express = import("express");
const { createProxyMiddleware } = import("http-proxy-middleware");
const app = express();
const path = import("path");
const POST = 3000;
const HOST = "localhost";
const API_URL = "<http://kyungmindevport.site>";

//미들웨어 생성
app.use(express.static(path.join(__dirname, "build")));

// 클라이언트 요청
app.get("/api/data", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
// GET
app.get("/api/status", (req, res, next) => {
  res.send("This is a proxy service");
});

const proxyOptions = {
  target: API_URL,
  changeOrigin: true,
  pathRewrite: {
    [`^/api/posts`]: "/posts",
  },
};

const proxy = createProxyMiddleware(proxyOptions);

app.use("/api/posts", proxy);

app.listen(PORT, HOST, () => {
  // 프록시
  console.log(`Proxy Started at ${HOST}:${PORT}`);
});
