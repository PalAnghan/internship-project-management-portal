const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());        // 👈 IMPORTANT
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend connected successfully" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
