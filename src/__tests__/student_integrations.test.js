import React from "react";
import moxios from "moxios";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";

import Root from "Root";
import Dashboard from "components/Dashboard/Dashboard";
import Navbar from "components/Dashboard/Navbar";

jest.mock('react-i18next', () => {
  // copy the real library to get initReactI18next method to pass on (need this to avoid initiation error)
  const i18next = jest.requireActual("react-i18next");
  // this mock makes sure any components using the translate HoC receive a mock t function as a prop
  const withTranslation = () => Component => {
      Component.defaultProps = { ...Component.defaultProps, t: () => "" };
      return Component;
    }
  return { withTranslation: withTranslation, initReactI18next: i18next.initReactI18next };
});

jest.mock("react", () => {
  const React = jest.requireActual("react");
  React.Suspense = ({ children }) => children;
  return React;
});

let wrapped;
beforeEach(() => {
  moxios.install();

  const initialState = {
    auth: {
      _id: "5c8d30c5d5d85aa69a3b706f",
      studentid: "12345",
      name: "David",
      department: "studentForms.departments.Management",
      choices: []
    },
    authMessage: null,
    form: {},
    language: "English",
    companies: ["Google"],
    signupAuth: true,
    numberOfAdmins: null,
    students: [],
    unsavedChanges: false
  };

  // enzyme does not yet support suspense
  wrapped = mount(
    <Root initialState={initialState}>
      <MemoryRouter>
        <React.Suspense>
          <Dashboard />
        </React.Suspense>
      </MemoryRouter>
    </Root>
  );
});

afterEach(() => {
  moxios.uninstall();
  wrapped.unmount();
});

describe("components rendered", () => {
  it("should render a Dashboard", () => {
    // console.log(wrapped.find(Dashboard).debug());
    expect(wrapped.find(Dashboard).length).toEqual(1);
  });
  it("should render a Navbar", () => {
    expect(wrapped.find(Navbar).length).toEqual(1);
  })
});
