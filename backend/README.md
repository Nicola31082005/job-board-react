# Job Board API

This is the backend API for the Job Board application. It provides endpoints for managing job applicants.

## Setup

1. Install dependencies:

```
npm install
```

2. Create a `.env` file with the following variables:

```
PORT=5000
URI=mongodb://localhost:27017/job-board
```

3. Start the server:

```
npm run dev
```

## API Endpoints

### GET /

- Returns a welcome message and a list of available endpoints

### GET /api/job-applicants

- Returns a list of all job applicants

### GET /api/job-applicants/:id

- Returns a specific job applicant by ID

### POST /api/job-applicants

- Creates a new job applicant
- Required fields: first_name, last_name, email

### DELETE /api/job-applicants/:id

- Deletes a job applicant by ID

## Database

The application uses MongoDB to store job applicant data. Make sure you have MongoDB installed and running on your system.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
