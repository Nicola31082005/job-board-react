import { it, describe, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import React from 'react';
import Jobs from "./Jobs";

// Simple mock of the child component to avoid router/dependency issues
vi.mock("../components/common", () => ({
    JobApplicantListItem: () => <div>Job Applicant Item</div>
}));

describe('Jobs', () => {
    it('should render the jobs page', async () => {
        render(
            <BrowserRouter>
                <Jobs />
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('Job Applicants')).toBeInTheDocument();
        });
    });
});


