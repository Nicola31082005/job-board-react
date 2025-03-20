import React, { createContext, useContext, useState, useOptimistic } from "react";

const JobsContext = createContext(null);

export function useJobsContext() {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error("useJobsContext must be used within a JobsProvider");
  }
  return context;
}

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [optimisticJobs, addOptimisticJob] = useOptimistic(
    jobs,
    (state, newJob) => [
      ...state,
      { ...newJob, pending: true } // Mark optimistic entries as pending
    ]
  );

  const updateJobs = (newJobs) => {
    setJobs(newJobs);
  };

  return (
    <JobsContext.Provider value={{ jobs, optimisticJobs, updateJobs, addOptimisticJob }}>
      {children}
    </JobsContext.Provider>
  );
}