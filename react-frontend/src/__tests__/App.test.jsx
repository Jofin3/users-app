// App.test.jsx
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "../App";
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("@auth0/auth0-react");



describe("My test", () => {
    beforeEach(() => {
        // Mock the Auth0 hook and make it return a logged in state
        useAuth0.mockReturnValue({
            isAuthenticated: true,
            user:undefined,
            logout: jest.fn(),
            loginWithRedirect: jest.fn()
        });
    });
    test("our first test", () => {
        render(<App />);
    });
});