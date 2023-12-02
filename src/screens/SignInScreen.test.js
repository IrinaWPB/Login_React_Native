import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import SignInScreen from "./SignInScreen";
import { Alert } from "react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

/**testing:
 *
 * on app load:
 * - if token: token view
 * - no token: login view
 *
 * submitting form:
 * - empty inputs
 * - invalid credentials
 * - success renders token view
 *
 * logout:
 * - should render login view
 *
 */

describe("loading app for logged in/not logged in users", () => {
  test("should render LOGIN view if no token in local storage", async () => {
    render(<SignInScreen token={null} setToken={jest.mock()} />);
    let loginBtn = screen.getByText("Login");
    expect(loginBtn).toBeOnTheScreen();
  });

  test("should render TOKEN view token available", async () => {
    render(<SignInScreen token="Some token" setToken={jest.mock()} />);
    let logoutBtn = screen.getByText("Logout");
    expect(logoutBtn).toBeOnTheScreen();
  });
});

describe("testing login button", () => {
  beforeEach(async () => {
    render(<SignInScreen token={null} setToken={jest.mock()} />);
  });

  test("should display alert when there are empty fields", async () => {
    Alert.alert = jest.fn();
    let loginBtn = screen.getByText("Login");
    fireEvent.press(loginBtn);
    expect(Alert.alert.mock.calls.length).toBe(1);
    expect(Alert.alert.mock.calls[0][0]).toBe(
      "Enter your username and password"
    );
  });

  test("should display alert when credentials are invalid", async () => {
    Alert.alert = jest.fn();
    let loginBtn = screen.getByText("Login");
    let usernameInput = screen.getByPlaceholderText("Enter your username");
    let passwordInput = screen.getByPlaceholderText("Enter your password");
    usernameInput.value = "wrong name";
    passwordInput.value = "password";
    fireEvent.press(loginBtn);
    expect(Alert.alert.mock.calls.length).toBe(1);

    // ????

    // expect(Alert.alert.mock.calls[0][0]).toBe(
    //   "Username and password don't match"
    // );
  });

  test("should log user in if credentials are valid", async () => {
    jest.mock("@react-native-async-storage/async-storage", () => ({
      setItem: jest.fn(),
    }));
    let loginBtn = screen.getByText("Login");
    let usernameInput = screen.getByPlaceholderText("Enter your username");
    let passwordInput = screen.getByPlaceholderText("Enter your password");
    usernameInput.value = "ira";
    passwordInput.value = "password";
    fireEvent.press(loginBtn);

    //expect(AsyncStorage.setItem).toBeCalled();
    //expect("You are now logged in.").toBeOnTheScreen();
  });
});

describe("testing logout button", () => {
  test("should logout user", async () => {
    render(<SignInScreen token="Some token" setToken={jest.mock()} />);
    jest.mock("@react-native-async-storage/async-storage", () => ({
      removeItem: jest.fn(),
    }));
    let logoutBtn = screen.getByText("Logout");
    fireEvent.press(logoutBtn);

    // expect(AsyncStorage.removeItem).toBeCalled();
    // expect("Login").toBeOnTheScreen();
  });
});

/**testing:
 *
 * submitting form:
 * - empty inputs
 * - invalid credentials
 * - server down
 * - success returns renders token view
 *
 * logout:
 * - should render login view
 *
 * on app load:
 * - if token: token view
 * - no token: login view
 */
