// Import required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Load environment variables from a .env file (if present)
require("dotenv").config();

// Import the "registerRoute" module (assuming it handles registration)
const loginRoute = require("./routes/auth/login");
const logoutRoute = require("./routes/auth/logout");
const registerRoute = require("./routes/auth/register");
const meRoute = require("./routes/auth/me");
const veryfiAuth = require("./routes/auth/verify");

// User Detail functionality routes
const userDetailRoute = require("./routes/auth/userDetail");
const createUserDetailRoute = require("./routes/auth/createUserDetail");
const updateUserDetailRoute = require("./routes/auth/updateUserDetail");

// Training functionality routes
const exercisesRoute = require("./routes/training_log/listExercises");
const trainingLogRoute = require("./routes/training_log/trainingLog");
const addTrainingSessionRoute = require("./routes/training_log/addTrainingSession");
const deleteTrainingSessionRoute = require("./routes/training_log/deleteTrainingSession");
const updateTrainingSessionRoute = require("./routes/training_log/updateTrainingSession");
const createTrainingLogRoute = require("./routes/training_log/createTrainingLog");
// Create an instance of the Express application
const app = express();

// Middleware: Parse incoming JSON data
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware: Serve static files from the "client/build" directory
app.use(express.static("client/build"));

app.use(registerRoute);
app.use(loginRoute);
app.use(logoutRoute);
app.use(meRoute);
app.use(veryfiAuth);

// User Detail functionality routes
app.use(userDetailRoute);
app.use(updateUserDetailRoute);
app.use(createUserDetailRoute);

// Training functionality routes
app.use(exercisesRoute);
app.use(trainingLogRoute);
app.use(addTrainingSessionRoute);
app.use(deleteTrainingSessionRoute);
app.use(updateTrainingSessionRoute);
app.use(createTrainingLogRoute);

// Catch-all route to serve the HTML file for client-side routing
app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Define the port to listen on, using environment variable PORT if available, or default to 5000
const PORT = process.env.PORT || 5000;

// Start the Express server and log a message when it's listening
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
