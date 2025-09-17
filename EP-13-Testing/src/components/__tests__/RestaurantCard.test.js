import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import ResturantCard from "../RestaurantCard";
import { WithPromotedLabel } from "../RestaurantCard";
import MOCK_DATA from "../mocks/resCardMock.json";

it("Should render restaurantCard with data", () => {
    render(<ResturantCard data={MOCK_DATA}/>)

    const name = screen.getByText("Theobroma");

    expect(name).toBeInTheDocument();
});

it("Should render restaurantCard with label Promoted.",()=>{
    const RestaurantCardWithPromoted = WithPromotedLabel(ResturantCard);

    render(<RestaurantCardWithPromoted data={ MOCK_DATA }/>)

    const label = screen.getByText("Promoted");

    expect(label).toBeInTheDocument();
});