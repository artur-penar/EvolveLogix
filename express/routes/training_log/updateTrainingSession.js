const express = require("express");
const { route } = require("./deleteTrainingSession");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
router.use(express.json());

router.patch(
  "/api/training-log/training-session/:sessionId/update",
  async (req, res) => {
    const { access } = req.cookies;
    const { sessionId } = req.params;
    const trainingSession = req.body;

    const body = JSON.stringify(trainingSession);

    try {
      const apiRes = await fetch(
        `${process.env.API_URL}/api/training-log/training-session/${sessionId}/update/`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access}`,
            "Content-Type": "application/json",
          },
          body,
        }
      );

      const data = await apiRes.json();

      return res.status(apiRes.status).json(data);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when updating training session",
      });
    }
  }
);

module.exports = router;
