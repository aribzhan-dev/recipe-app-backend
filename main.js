const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


const MONGO_URL = "mongodb+srv://recipe:02082008jon@cluster0.odag97a.mongodb.net/recipes?retryWrites=true&w=majority";
const PORT = 3000;
const JWT_SECRET = "Aribzha123";

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running...");
});


app.use("/api/auth", require("./routes/auth"));
app.use("/api/category", require("./routes/CategoryRoutes"));
app.use("/api/recipe", require("./routes/RecipeRoutes"));

mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

/* Start server */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});