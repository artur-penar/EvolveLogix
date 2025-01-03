const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();
router.use(express.json());

router.delete(
  "/api/training-log/training-session/:sessionId/delete",
  async (req, res) => {
    const { access } = req.cookies;
    const { sessionId } = req.params;

    const pk = sessionId
    try {
      const apiRes = await fetch(
        `${process.env.API_URL}/api/training-log/training-session/${pk}/delete/`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      // Only parse the response body if the status is not 204
      let data;
      if (apiRes.status !== 204) {
        data = await apiRes.json();
      }

      return res.status(apiRes.status).json(data);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when deleting training session",
      });
    }
  }
);

module.exports = router;