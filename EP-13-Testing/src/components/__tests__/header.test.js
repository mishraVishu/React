import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import  AppStore from "../../utils/AppStore";
import "@testing-library/jest-dom";

it("should render Header component with a login button",()=>{
    render(
        <BrowserRouter>
            <Provider store={ AppStore }>
              <Header/>
            </Provider>
        </BrowserRouter>
    );

    const loginButton = screen.getByRole("button",{name:"Login"}); // if there are multiple buttons then we can find button with extra parameter like {name: ""}

    // const loginButton = screen.getByText("Login");

    expect(loginButton).toBeInTheDocument();

});

it("should change login button to logout button",()=>{
    render(
        <BrowserRouter>
            <Provider store={ AppStore }>
              <Header/>
            </Provider>
        </BrowserRouter>
    );

    const loginButton = screen.getByRole("button",{name:"Login"});

    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button",{name:"Logout"});

    expect(logoutButton).toBeInTheDocument();

});