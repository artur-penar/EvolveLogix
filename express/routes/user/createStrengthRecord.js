const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post("/api/users/strength-records/create", async (req, res) => {
  const { access } = req.cookies;
  const strengthRecord = req.body; // This is where the createUserDetail object will come from

  try {
    const apiRes = await fetch(`${process.env.API_URL}/api/users/detail/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(strengthRecord), // Send the createUserDetail object as the request body
    });

    const data = await apiRes.json();

    return res.status(apiRes.status).json(data);
  } catch (err) {
    return res.status(500).json({
      error: "Something went wrong when trying to create user detail",
    });
  }
});

module.exports = router;
