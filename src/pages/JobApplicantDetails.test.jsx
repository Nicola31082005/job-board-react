import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { it, describe, expect, afterEach, beforeEach } from "vitest";
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

const mockAuthContext = {
    authData: {
        user: mockApplicant,
        token: "mock-token"
    },
    setAuthData: vi.fn(),
    clearAuthData: vi.fn()
};

const TestWrapper = ({ children }) => (
    <AuthContext.Provider value={mockAuthContext}>
        {children}
    </AuthContext.Provider>
);

beforeEach(() => {
    // Reset mock functions
    mockAuthContext.setAuthData.mockClear();
    mockAuthContext.clearAuthData.mockClear();
});

afterEach(() => {
    cleanup();
});

describe('Initial component render', () => {
    it('should render the component with applicant details', async () => {
        const Stub = createRoutesStub([
            {
                path: "/jobs/:id",
                Component: JobApplicantDetails
            }
        ]);

        render(
            <TestWrapper>
                <Stub initialEntries={["/jobs/1"]} />
            </TestWrapper>
        );

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

        render(
            <TestWrapper>
                <Stub initialEntries={["/jobs/1"]} />
            </TestWrapper>
        );

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

        render(
            <TestWrapper>
                <Stub initialEntries={["/jobs/1"]} />
            </TestWrapper>
        );

        const backButton = screen.getByText('Back to Jobs');
        fireEvent.click(backButton);

        expect(screen.getByText('Jobs Page')).toBeInTheDocument();
    });
});

