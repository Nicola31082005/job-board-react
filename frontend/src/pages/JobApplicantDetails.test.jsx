import { fireEvent, render, screen, cleanup, waitFor } from "@testing-library/react";
import { it, describe, expect, afterEach, vi } from "vitest";
import { createRoutesStub } from "react-router";
import React from "react";
import JobApplicantDetails from "./JobApplicantDetails";
import AuthContext from "../context/authContext";





const mockApplicant = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com"
};

vi.mock("../hooks/useFetch", () => ({
    useFetch: () => [mockApplicant, false, null] // Returns mock data, no loading, no error
}));


afterEach(() => {
    cleanup();
});

describe('JobApplicantDetails Component', () => {
    it('should render applicant details correctly', async () => {
        const Stub = createRoutesStub([
            {
                path: "/jobs/:id",
                Component: JobApplicantDetails
            }
        ]);

        render(<Stub initialEntries={["/jobs/1"]} />);

        await waitFor(() => {
            expect(screen.getByText('Applicant Details')).toBeInTheDocument();
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Doe')).toBeInTheDocument();
            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        });
    });

    it('should render the back button with correct link', async () => {
        const Stub = createRoutesStub([
            {
                path: "/jobs/:id",
                Component: JobApplicantDetails
            }
        ]);

        render(
            <AuthContext.Provider value={{ authData: { user: { email: "john.doe@example.com" } } }}>
                <Stub initialEntries={["/jobs/1"]} />
            </AuthContext.Provider>
        );

        await waitFor(() => {
            const backButton = screen.getByText('Back to Jobs');
            expect(backButton).toBeInTheDocument();
            expect(backButton.closest('a')).toHaveAttribute('href', '/jobs');
        });
    });

    it('should navigate to the jobs page when clicking the back button', async () => {
        const JobsPage = () => <div>Jobs Page</div>;

        const Stub = createRoutesStub([
            {
                path: "/jobs/:id",
                Component: JobApplicantDetails
            },
            {
                path: "/jobs",
                Component: JobsPage
            }
        ]);

        render(
            <AuthContext.Provider value={{ authData: { user: { email: "john.doe@example.com" } } }}>
                <Stub initialEntries={["/jobs/1"]} />
            </AuthContext.Provider>
        );

        const backButton = await screen.findByText('Back to Jobs');
        fireEvent.click(backButton);

        // Ensure navigation to jobs page occurs
        await screen.findByText('Jobs Page');
    });
});
