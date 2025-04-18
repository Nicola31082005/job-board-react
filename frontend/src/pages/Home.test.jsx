import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { it, describe, expect, afterEach } from "vitest";
import { createRoutesStub } from "react-router";
import React from "react";
import Home from "./Home";

// Clean up after each test
afterEach(() => {
  cleanup();
});

describe('Home page', () => {
  it('should render the home page', async () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: Home
      }
    ]);

    render(<Stub initialEntries={["/"]} />);
    expect(screen.getByText('Find Your Dream Job Today')).toBeInTheDocument();
  });

  it('should navigate to the jobs page when the button is clicked', async () => {
    const JobsPage = () => <div>Jobs Page</div>;
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: Home
      },
      {
        path: "/jobs",
        Component: JobsPage
      }
    ]);

    render(<Stub initialEntries={["/"]} />);
    const browseApplicantsButton = screen.getByTestId('browse-applicants-button');
    fireEvent.click(browseApplicantsButton);

    // Wait for the Jobs Page component to be rendered
    await screen.findByText('Jobs Page');
  });
  it('should navigate to the post-job page when the button is clicked', async () => {
    const PostJob = () => <div>Post Job Page</div>;
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: Home
      },
      {
        path: "/post-job",
        Component: PostJob
      }
    ]);

    render(<Stub initialEntries={["/"]} />);
    const applyForJobButton = screen.getByText('Apply for a job');
    fireEvent.click(applyForJobButton);

    // Wait for the Jobs Page component to be rendered
    await screen.findByText('Post Job Page');
  });
});
