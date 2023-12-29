const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
// Use express.json() middleware to parse JSON bodies
router.use(express.json());

router.post("/api/training-log/addTrainingSession", async (req, res) => {
  const { access } = req.cookies;
  const { training_log_id, name, training_sessions } = req.body;

  const body = JSON.stringify({
    name,
    training_sessions,
    training_log_id,
  });

  console.log("Add training session body:");
  console.log(body);

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/training-log/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when adding training session",
    });
  }
});

module.exports = router;
