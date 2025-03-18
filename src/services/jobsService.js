const API_BASE_URL = "http://localhost:5000";

export default {
    async addApplicant(data) {
        const response = await fetch(`${API_BASE_URL}/api/job-applicants`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit application');
        }
    }

}