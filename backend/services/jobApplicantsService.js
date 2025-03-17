import JobApplicant from "../models/JobApplicants.js";

export default {
  async createJobApplicant(applicantData) {
    return await JobApplicant.create(applicantData);
  },

  async getAllJobApplicants() {
    return await JobApplicant.find().sort({ createdAt: -1 });
  },

  async getJobApplicantById(id) {
    return await JobApplicant.findOne({ id: id });
  },

  async deleteJobApplicant(id) {
    return await JobApplicant.findOneAndDelete({ id: id });
  },
};
