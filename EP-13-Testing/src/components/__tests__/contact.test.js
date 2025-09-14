import { render,screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import ContactUs from '../ContactUs';


describe("Contact Us Page Test Cases",()=>{

    //we can also write it instead of test
it("Should load contact us component",()=>{
    render(<ContactUs/>);

    //Querying
    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
});

test("Should load button inside contact us component",()=>{
    render(<ContactUs/>);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
});

test("Should load input with Label Name inside contact us component",()=>{
    render(<ContactUs/>);

    const inputName = screen.getAllByLabelText("Name"); // whenever there are multiple items use All

    expect(inputName[0]).toBeInTheDocument();
});

});

