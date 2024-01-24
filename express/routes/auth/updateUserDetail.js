const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.put("/api/users/detail/me", async (req, res) => {
  const { access } = req.cookies;
  const updatedUserDetail = req.body;

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/users/update/me`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
        // 'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify(updatedUserDetail),
    });

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when trying to update user detail",
    });
  }
});

module.exports = router;
