import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/savetopdf", async (req, res) => {
  // pdfsave
});

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running.");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
