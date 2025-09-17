import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom";

import Body from "../Body";
import MOCK_DATA from "../mocks/resListMockData.json";
import { BrowserRouter } from "react-router";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA);
        }
    })
})

it("should search Res List for Pizza", async () => {
    await act(async () => render
        (
        <BrowserRouter>
            <Body />
        </BrowserRouter>
    ));
    const cards = screen.getAllByTestId("resCard");
    expect(cards.length).toBe(20);

    const searchInput= screen.getByPlaceholderText("search...");
    fireEvent.change(searchInput,{target:{ value:"Pizza" }});
    const result = screen.getAllByTestId("resCard");
    //screen should show burger related results
    //expect(searchBox).toBeInTheDocument();
    expect(result.length).toBe(3);
});

it("should render body component with Top Rated Testaurant", async () => {
    await act(async () => render
        (
        <BrowserRouter>
            <Body />
        </BrowserRouter>
    ));
    const TopRatedRes = screen.getByRole("button");

    expect(TopRatedRes).toBeInTheDocument();
});

it("Should filter based on Top Rated Restaurant button",async()=>{
    await(act(
        async()=>{
            render(
                   <BrowserRouter>
                        <Body />
                    </BrowserRouter>
            )
        }
    ));

    const totalCards = screen.getAllByTestId("resCard");
    expect(totalCards.length).toBe(20);

    const filterBtn = screen.getByRole("button", {name:"Top Rated Restaurants"});
    fireEvent.click(filterBtn);
    const cardsAfterFilter = screen.getAllByTestId('resCard');
    expect(cardsAfterFilter.length).toBe(13);
})
