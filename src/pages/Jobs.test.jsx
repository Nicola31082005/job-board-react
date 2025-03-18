import { it, describe, expect, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import React from 'react';
import Jobs from "./Jobs";
import AuthContext from "../context/authContext";

const mockAuthContext = {
    authData: {
        user: {
            id: 1,
            username: "testuser",
            email: "test@example.com"
        },
        token: "mock-token"
    },
    setAuthData: vi.fn(),
    clearAuthData: vi.fn()
};

const TestWrapper = ({ children }) => (
    <AuthContext.Provider value={mockAuthContext}>
        <BrowserRouter>
            {children}
        </BrowserRouter>
    </AuthContext.Provider>
);

beforeEach(() => {
    // Reset mock functions
    mockAuthContext.setAuthData.mockClear();
    mockAuthContext.clearAuthData.mockClear();
});

// Clean up after each test
afterEach(() => {
    cleanup();
});

// Mock the JobApplicantListItem component to display props
vi.mock("../components/common", () => ({
    JobApplicantListItem: ({ first_name, last_name, email }) => (
        <div>
            {first_name} {last_name} - {email}
        </div>
    )
}));

describe('Jobs initial render', () => {
    it('should render the jobs page', async () => {
        render(
            <TestWrapper>
                <Jobs />
            </TestWrapper>
        );
        await waitFor(() => {
            expect(screen.getByText('Job Applicants')).toBeInTheDocument();
        });
    });

    it('should render loading spinner when fetching jobs', async () => {
        // Mock fetch to delay the response
        global.fetch = vi.fn(() =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        ok: true,
                        json: () => Promise.resolve({ data: [] }),
                    });
                }, 100); // Delay to simulate loading
            })
        );

        render(
            <TestWrapper>
                <Jobs />
            </TestWrapper>
        );

        //Check for loading spinner
        await waitFor(() => {
            expect(screen.getByText('Loading jobs...')).toBeInTheDocument();
        });

        //Wait for the spinner to disappear
        await waitFor(() => {
            expect(screen.queryByText('Loading jobs...')).not.toBeInTheDocument();
        });
    });

    it('should render job applicants when fetched', async () => {
        // Mock fetch to return sample data from API
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: [
                    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', avatar: 'https://example.com/avatar1.jpg' },
                    { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', avatar: 'https://example.com/avatar2.jpg' },
                ] }),
            })
        );

        render(
            <TestWrapper>
                <Jobs />
            </TestWrapper>
        );

        await waitFor(() => {
            expect(screen.getByText('John Doe - john.doe@example.com')).toBeInTheDocument();
            expect(screen.getByText('Jane Smith - jane.smith@example.com')).toBeInTheDocument();
        });
    });
});





