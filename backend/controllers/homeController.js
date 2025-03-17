import { Router } from "express";

const homeController = Router();

homeController.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Job Board API",
    endpoints: {
      "GET /api/job-applicants": "Get all job applicants",
      "GET /api/job-applicants/:id": "Get a specific job applicant by ID",
      "POST /api/job-applicants": "Create a new job applicant",
      "DELETE /api/job-applicants/:id": "Delete a job applicant",
    },
  });
});

export default homeController;
