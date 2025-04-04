import { it, describe, expect, afterEach } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import React from "react";
import About from "./About";
import Home from "./Home";

afterEach(() => {
    cleanup();
});

describe('Initial render', () => {
    it('should render the about page', () => {
        const Stub = createRoutesStub([
            {
                path: "/about",
                Component: About
            }
        ]);

        render(<Stub initialEntries={["/about"]} />);
        expect(screen.getByText('About Us')).toBeInTheDocument();
    })
});

describe('Back to home button', () => {
    it('should navigate to the home page', () => {
        const Stub = createRoutesStub([
            {
                path: "/",
                Component: Home
            },
            {
                path: "/about",
                Component: About
            }
        ]);

        render(<Stub initialEntries={["/about"]} />);
        const backToHomeButton = screen.getByText('Back to Home');
        fireEvent.click(backToHomeButton);

        expect(screen.getByText('Find Your Dream Job Today')).toBeInTheDocument();
    });

    // TODO: Check if the back to home changes its styling when hovered
});

