import mongoose from "mongoose";

const jobApplicantSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(
          this.first_name + " " + this.last_name
        )}&background=random`;
      },
    },
    coverLetter: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const JobApplicant = mongoose.model("JobApplicant", jobApplicantSchema);

export default JobApplicant;
