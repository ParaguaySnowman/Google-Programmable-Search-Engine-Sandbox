const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Replace with your API key and Search Engine ID
const API_KEY = "YOUR_GOOGLE_API_KEY";
const CX = "YOUR_SEARCH_ENGINE_ID";

app.use(express.static("."));

// Search endpoint
app.get("/search", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).send({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get("https://www.googleapis.com/customsearch/v1", {
      params: {
        key: API_KEY,
        cx: CX,
        q: query,
      },
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
