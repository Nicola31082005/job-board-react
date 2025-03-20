import { Router } from "express";
import jobApplicantsService from "../services/jobApplicantsService.js";
import getErrorMessage from "../utils/getError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import testThrottle from "../utils/testThrottle.js"; // Import throttle middleware

dotenv.config();

const jobApplicantsController = Router();

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    req.user = null;
    next();
  }
};

// Required authentication middleware (for protected routes)
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
};

// Get all job applicants - public endpoint
jobApplicantsController.get("/api/job-applicants", async (req, res) => {
  try {
    const applicants = await jobApplicantsService.getAllJobApplicants();

    // Return applicants without ownership info
    const formattedApplicants = applicants.map((applicant) => ({
      id: applicant.id || applicant._id,
      first_name: applicant.first_name,
      last_name: applicant.last_name,
      email: applicant.email,
      avatar: applicant.avatar,
    }));

    res.status(200).json(formattedApplicants);
  } catch (error) {
    console.error("Error fetching job applicants:", error);
    const err = getErrorMessage(error);
    return res.status(500).json({ message: err });
  }
});

// Get a specific job applicant by ID - public endpoint WITH THROTTLING FOR TESTING
jobApplicantsController.get(
  "/api/job-applicants/:id",
  testThrottle(3000), // Add 3 second delay for testing
  async (req, res) => {
    try {
      const applicant = await jobApplicantsService.getJobApplicantById(
        req.params.id
      );

      if (!applicant) {
        return res.status(404).json({ message: "Job applicant not found" });
      }

      // Return the applicant data without ownership information
      res.status(200).json({
        id: applicant.id || applicant._id,
        first_name: applicant.first_name,
        last_name: applicant.last_name,
        email: applicant.email,
        avatar: applicant.avatar,
        coverLetter: applicant.coverLetter,
      });
    } catch (error) {
      console.error("Error fetching job applicant:", error);
      const err = getErrorMessage(error);
      return res.status(500).json({ message: err });
    }
  }
);

// Create a new job applicant - authentication optional but tracked
jobApplicantsController.post(
  "/api/job-applicants",
  authenticateToken,
  testThrottle(3000), // Add 3 second delay for testing
  async (req, res) => {
    const applicantData = req.body;

    try {
      // Validate that required fields are present
      if (
        !applicantData.first_name ||
        !applicantData.last_name ||
        !applicantData.email
      ) {
        return res.status(400).json({
          message:
            "Missing required fields. Please provide first_name, last_name, and email.",
        });
      }

      // Add the user ID to the applicant data if user is authenticated
      if (req.user) {
        applicantData.userId = req.user.id;
      }

      // Create the job applicant
      const newApplicant = await jobApplicantsService.createJobApplicant(
        applicantData
      );

      // Return success response
      res.status(201).json({
        message: "Job application submitted successfully!",
        applicant: {
          id: newApplicant.id || newApplicant._id,
          first_name: newApplicant.first_name,
          last_name: newApplicant.last_name,
          email: newApplicant.email,
          avatar: newApplicant.avatar,
          coverLetter: newApplicant.coverLetter,
        },
      });
    } catch (error) {
      console.error("Job application submission error:", error);
      const err = getErrorMessage(error);
      return res.status(400).json({ message: err });
    }
  }
);

// Delete a job applicant - requires authentication
jobApplicantsController.delete(
  "/api/job-applicants/:id",
  authenticateToken,
  async (req, res) => {
    try {
      // Get applicant ID from params
      const applicantId = req.params.id;

      // First get the applicant
      const applicant = await jobApplicantsService.getJobApplicantById(
        applicantId
      );

      if (!applicant) {
        return res.status(404).json({ message: "Job applicant not found" });
      }

      // console.log(req.user);
      // console.log(applicant);

      await jobApplicantsService.deleteJobApplicant(applicantId);
      return res
        .status(200)
        .json({ message: "Job applicant deleted successfully" });
    } catch (error) {
      console.error("Error deleting job applicant:", error);
      const err = getErrorMessage(error);
      return res.status(500).json({ message: err });
    }
  }
);

export default jobApplicantsController;
