const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.get("/api/users/detail/all", async (req, res) => {
  const { access } = req.cookies;

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/users/detail/all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
        // 'Content-Type': 'application/json',
        // 'X-Requested-With': 'XMLHttpRequest'
      },
    });

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when trying to retrieve user detail",
    });
  }
});

module.exports = router;
