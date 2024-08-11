const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get("/api/training-cycle", async (req, res) => {
  const { access } = req.cookies;
  const { training_log_id } = req.query;

  try {
    const apiRes = await fetch(
      `${process.env.API_URL}/api/training-cycle/macrocycles/?training_log_id=${training_log_id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access}`,
        },
      }
    );

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when trying to retrieve user",
    });
  }
});

module.exports = router;
