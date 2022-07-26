import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import AuthRouter from "./routes/auth.route.js";
import linkRouter from "./routes/link.route.js";
import redirectRoute from "./routes/redirect.route.js";
import { requireAuth } from "./middlewares/requireAuth.js";
import cors from "cors";

const app = express();

const whitelist = [];

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.includes(origin)) {
        return callback(null, origin);
      }
      return callback("error cors" + origin);
    },
  })
);

app.use(express.json());
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/links", linkRouter);
app.use("/", redirectRoute);

app.post("/api/v1/auth/test", requireAuth, (req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server on port 5000");
});
