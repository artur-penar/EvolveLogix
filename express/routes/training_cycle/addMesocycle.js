const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
router.use(express.json());

router.post("/api/training-cycle/mesocycles/", async (req, res) => {
  const { access } = req.cookies;
  const { name, macrocycle } = req.body;

  const body = JSON.stringify({
    name,
    macrocycle,
  });

  try {
    const apiRes = await fetch(
      `${process.env.API_URL}/api/training-cycle/mesocycles/`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const data = await apiRes.json();

    console.log(data);

    return res.status(apiRes.status).json(data);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});
module.exports = router;
