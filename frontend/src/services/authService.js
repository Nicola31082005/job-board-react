const API_BASE_URL = "http://localhost:5000";

export default {
  async login({ email, password }) {
    const response = await fetch(`${API_BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  },
  async register(registrationData) {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    return data;
  },
  async passwordChange(currentPassword, newPassword, token) {
    const passwordResponse = await fetch(`${API_BASE_URL}/api/users/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

    const response = await passwordResponse.json();

    if (!passwordResponse.ok) {
      throw new Error(response.message);
    }

    return response;
  },
  async profileUpdate(currentPassword, email, username, token) {
    const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username,
        email,
        currentPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  },
  async deleteApplicant(applicantId, token) {
    const response = await fetch(
      `${API_BASE_URL}/api/job-applicants/${applicantId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Try to parse the response as JSON
    let data;
    try {
      data = await response.json();
    } catch (e) {
      // If parsing fails, create a generic error object
      data = { message: "Failed to delete applicant" };
    }

    // If the response was not OK, throw an error with the message from the server
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete applicant");
    }

    return data;
  },
};
