// Example of how to use the throttle middleware for testing

// Import the throttle middleware
import testThrottle from "../utils/testThrottle.js";
import { Router } from "express";
import jobApplicantsService from "../services/jobApplicantsService.js";

const exampleRouter = Router();

// Example 1: Apply throttling to a specific route for testing
// This will delay the response by 2 seconds (default)
exampleRouter.get(
  "/api/slow/job-applicants",
  testThrottle(), // Add throttle middleware with default 2000ms delay
  async (req, res) => {
    try {
      const applicants = await jobApplicantsService.getAllJobApplicants();
      res.status(200).json(applicants);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Example 2: Apply throttling with a custom delay
// This will delay the response by 5 seconds
exampleRouter.get(
  "/api/very-slow/job-applicants/:id",
  testThrottle(5000), // Add throttle middleware with 5000ms delay
  async (req, res) => {
    try {
      const applicant = await jobApplicantsService.getJobApplicantById(
        req.params.id
      );
      if (!applicant) {
        return res.status(404).json({ message: "Job applicant not found" });
      }
      res.status(200).json(applicant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default exampleRouter;
