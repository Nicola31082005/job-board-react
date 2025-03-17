import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, it, describe, expect, beforeEach } from "vitest";
import { createRoutesStub } from "react-router";
import PostJob from "./PostJob";

// Mock the API fetch call
global.fetch = vi.fn();

// Mock the API_BASE_URL value
vi.mock("../hooks/useForm", () => {
    return {
        default: (initialFormData, submitCallback, validateFunction) => {
            return [
                initialFormData,
                vi.fn(), // onChange
                vi.fn(), // onSubmit
                false, // isSubmitting
                null, // formError
                vi.fn() // setFormError
            ];
        }
    };
});

describe('PostJob Component', () => {
    // Reset fetch mock before each test
    beforeEach(() => {
        fetch.mockReset();
        // Mock successful fetch response
        fetch.mockResolvedValue({
            ok: true,
            json: async () => ({ message: "Job application submitted successfully!" })
        });
    });

    it('should render the form correctly', () => {
        const Stub = createRoutesStub([
            {
                path: "/post-job",
                Component: PostJob
            }
        ]);

        render(<Stub initialEntries={["/post-job"]} />);

        // Check that the form elements are rendered
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Cover Letter/i)).toBeInTheDocument();
        expect(screen.getByText(/Submit Application/i)).toBeInTheDocument();
    });

    // You can add more tests here to verify form submission,
    // error handling, etc. using the mocked fetch
});


