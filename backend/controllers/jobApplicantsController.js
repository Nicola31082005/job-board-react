import { Router } from "express";
import jobApplicantsService from "../services/jobApplicantsService.js";
import getErrorMessage from "../utils/getError.js";

const jobApplicantsController = Router();

// Get all job applicants
jobApplicantsController.get("/api/job-applicants", async (req, res) => {
  try {
    const applicants = await jobApplicantsService.getAllJobApplicants();
    res.status(200).json(applicants);
  } catch (error) {
    console.error("Error fetching job applicants:", error);
    const err = getErrorMessage(error);
    return res.status(500).json({ message: err });
  }
});

// Get a specific job applicant by ID
jobApplicantsController.get("/api/job-applicants/:id", async (req, res) => {
  try {
    const applicant = await jobApplicantsService.getJobApplicantById(
      Number(req.params.id)
    );

    if (!applicant) {
      return res.status(404).json({ message: "Job applicant not found" });
    }

    res.status(200).json(applicant);
  } catch (error) {
    console.error("Error fetching job applicant:", error);
    const err = getErrorMessage(error);
    return res.status(500).json({ message: err });
  }
});

// Create a new job applicant
jobApplicantsController.post("/api/job-applicants", async (req, res) => {
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

    // Generate an ID if not provided
    if (!applicantData.id) {
      applicantData.id = Date.now();
    }

    // Create the job applicant
    const newApplicant = await jobApplicantsService.createJobApplicant(
      applicantData
    );

    // Return success response
    res.status(201).json({
      message: "Job application submitted successfully!",
      applicant: newApplicant,
    });
  } catch (error) {
    console.error("Job application submission error:", error);
    const err = getErrorMessage(error);
    return res.status(400).json({ message: err });
  }
});

// Delete a job applicant
jobApplicantsController.delete("/api/job-applicants/:id", async (req, res) => {
  try {
    const result = await jobApplicantsService.deleteJobApplicant(
      Number(req.params.id)
    );

    if (!result) {
      return res.status(404).json({ message: "Job applicant not found" });
    }

    res.status(200).json({ message: "Job applicant deleted successfully" });
  } catch (error) {
    console.error("Error deleting job applicant:", error);
    const err = getErrorMessage(error);
    return res.status(500).json({ message: err });
  }
});

export default jobApplicantsController;
