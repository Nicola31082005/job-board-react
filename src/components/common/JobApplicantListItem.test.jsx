import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { it, describe, expect, afterEach, beforeEach } from "vitest";
import { createRoutesStub } from "react-router";
import React from "react";
import JobApplicantListItem from "./JobApplicantListItem";
import { JobApplicantDetails } from "../../pages";
import AuthContext from "../../context/authContext";

const mockApplicant = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    avatar: "https://example.com/avatar1.jpg"
}

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

describe('initial render', () => {
    it('should render the component', () => {
        const Stub = createRoutesStub([
            {
                path: "/jobs",
                Component: () => <JobApplicantListItem {...mockApplicant} />
            }
        ]);

        render(
            <TestWrapper>
                <Stub initialEntries={["/jobs"]} />
            </TestWrapper>
        );

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
});

describe('Redirect to the job applicant details page', () => {
    it('click on the view details button', () => {
        const Stub = createRoutesStub([
            {
                path: "/jobs",
                Component: () => <JobApplicantListItem {...mockApplicant} />
            },
            {
                path: "/jobs/:id",
                Component: JobApplicantDetails
            }
        ]);

        render(
            <TestWrapper>
                <Stub initialEntries={["/jobs"]} />
            </TestWrapper>
        );

        const detailsButton = screen.getByText('View Details');
        fireEvent.click(detailsButton);

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });

    it('click on the whole applicant list item', () => {
        const Stub = createRoutesStub([
            {
                path: "/jobs",
                Component: () => <JobApplicantListItem {...mockApplicant} />
            },
            {
                path: "/jobs/:id",
                Component: JobApplicantDetails
            }
        ]);

        render(
            <TestWrapper>
                <Stub initialEntries={["/jobs"]} />
            </TestWrapper>
        );

        const applicantListItem = screen.getByTestId('job-applicant-list-item');
        fireEvent.click(applicantListItem);

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Doe')).toBeInTheDocument();
        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
});


