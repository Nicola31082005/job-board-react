import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { it, describe, expect, afterEach, beforeEach } from "vitest";
import { createRoutesStub } from "react-router";
import React from "react";
import JobApplicantDetails from "./JobApplicantDetails";

// Mock localStorage
const mockApplicant = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com"
};

beforeEach(() => {
    // Set up localStorage with mock data
    localStorage.setItem('jobApplicants', JSON.stringify([mockApplicant]));
});

afterEach(() => {
    cleanup();
    // Clear localStorage after each test
    localStorage.clear();
});

describe('Initial component render', () => {
    it('should render the component with applicant details', async () => {
        const Stub = createRoutesStub([
            {
                path: "/jobs/:id",
                Component: JobApplicantDetails
            }
        ]);

        render(<Stub initialEntries={["/jobs/1"]} />);

        // Wait for the component to load and display the data
        expect(screen.getByText('Applicant Details')).toBeInTheDocument();
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });

    it('should render back button with correct link', () => {
        const Stub = createRoutesStub([
            {
                path: "/jobs/:id",
                Component: JobApplicantDetails
            }
        ]);

        render(<Stub initialEntries={["/jobs/1"]} />);

        const backButton = screen.getByText('Back to Jobs');
        expect(backButton).toBeInTheDocument();
        expect(backButton.closest('a')).toHaveAttribute('href', '/jobs');
    });
});

describe('Back button navigation', () => {
    it('should navigate to the jobs page when clicked', () => {

        const JobsPage = () => {
            return (
                <div>
                    <h1>Jobs Page</h1>
                </div>
            )
        }

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

        render(<Stub initialEntries={["/jobs/1"]} />);

        const backButton = screen.getByText('Back to Jobs');
        fireEvent.click(backButton);

        expect(screen.getByText('Jobs Page')).toBeInTheDocument();
    });
});

