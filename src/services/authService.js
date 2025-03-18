const API_BASE_URL = "http://localhost:5000";

export default {
    async login({email, password}) {
        const response = await fetch(`${API_BASE_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
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


          const data = await response.json()

          if (!response.ok) {
            throw new Error(data.message || "Registration failed");
          }

          return data

    }

}