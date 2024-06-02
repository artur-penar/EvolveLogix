// Import required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Load environment variables from a .env file (if present)
require("dotenv").config();

// Import the "registerRoute" module (assuming it handles registration)
const loginRoute = require("./routes/user/login");
const logoutRoute = require("./routes/user/logout");
const registerRoute = require("./routes/user/register");
const meRoute = require("./routes/user/me");
const verifyAuth = require("./routes/user/verify");

// User Detail functionality routes
const userDetailsRoute = require("./routes/user/getUserDetails");
const createUserDetailsRoute = require("./routes/user/createUserDetails");
const updateUserDetailsRoute = require("./routes/user/updateUserDetails");

// Strength Records functionality routes
const strengthRecordsRoute = require("./routes/user/strengthRecords");
const createStrengthRecordsRoute = require("./routes/user/createStrengthRecord");

// Training functionality routes
const exercisesRoute = require("./routes/training_log/listExercises");
const trainingLogRoute = require("./routes/training_log/trainingLog");
const addTrainingSessionRoute = require("./routes/training_log/addTrainingSession");
const deleteTrainingSessionRoute = require("./routes/training_log/deleteTrainingSession");
const updateTrainingSessionRoute = require("./routes/training_log/updateTrainingSession");
const createTrainingLogRoute = require("./routes/training_log/createTrainingLog");

// Training Cycle functionality routes
const trainingCycleRoute = require("./routes/training_cycle/getTrainingCycles");
const createMacrocycleRoute = require("./routes/training_cycle/createMacrocycle");
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
app.use(verifyAuth);

// User Detail functionality routes
app.use(userDetailsRoute);
app.use(updateUserDetailsRoute);
app.use(createUserDetailsRoute);

// Strength Records functionality routes
app.use(strengthRecordsRoute);
app.use(createStrengthRecordsRoute);

// Training functionality routes
app.use(exercisesRoute);
app.use(trainingLogRoute);
app.use(addTrainingSessionRoute);
app.use(deleteTrainingSessionRoute);
app.use(updateTrainingSessionRoute);
app.use(createTrainingLogRoute);

// Training Cycle functionality routes
app.use(trainingCycleRoute);
app.use(createMacrocycleRoute);

// Catch-all route to serve the HTML file for client-side routing
app.get("*", (req, res) => {
  return res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Define the port to listen on, using environment variable PORT if available, or default to 5000
const PORT = process.env.PORT || 5000;

// Start the Express server and log a message when it's listening
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
