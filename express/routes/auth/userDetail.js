const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get("/api/users/detail/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const apiRes = await fetch(
      `${process.env.API_URL}/api/users/detail/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when trying to retrieve user detail",
    });
  }
});

module.exports = router;
