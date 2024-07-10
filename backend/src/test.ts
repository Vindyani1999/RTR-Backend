import express from "express";
const app = express();
const port = 3000;

// Example endpoint
app.get("/", (req, res) => {
  res.send("Hello, this is your backend!");
});

// Example API endpoint
app.get("/api/data", (req, res) => {
  const data = {
    message: "This is your API data",
    timestamp: new Date().toISOString()
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
