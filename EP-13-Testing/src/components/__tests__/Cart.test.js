import { act } from "react";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import RestaurantMenuItems from "../RestaurantMenuItems";
import AppStore from "../../utils/AppStore";
import MOCK_DATA from "../mocks/resMenuList.json";
import Header from "../Header";
import Cart from "../Cart";

global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json:()=>{
            Promise.resolve(MOCK_DATA)
        }
    })
})

const regularCardGroup = MOCK_DATA?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR;
const cards = regularCardGroup?.cards || [];
let itemCards = cards.filter(card => {
    if (card?.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory") {
        return card;
    }
    else if (card?.card?.card?.['@type'] === "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory") {
        return card;
    }
});

it("Should Load Restuarant Menu Component",async()=>{
    await act(async()=>{
        render(
            <BrowserRouter>
                <Provider store={AppStore}>
                    <Header/>
                    <RestaurantMenuItems data={itemCards}/>
                </Provider>
            </BrowserRouter>
        )
    });

    const accordianHeader = screen.getByText("Recommended");
    expect(accordianHeader).toBeInTheDocument();
    
    const accordianItems = screen.getAllByTestId('foodItems');
    expect(accordianItems.length).toBe(119);
});

it("Should toggle accordion",async()=>{
    await act(async()=>{
        render(
            <BrowserRouter>
                <Provider store={AppStore}>
                    <Header/>
                    <RestaurantMenuItems data={itemCards}/>
                </Provider>
            </BrowserRouter>
        )
    });

    const awwowBtns= screen.getAllByTestId('arrow');
    fireEvent.click(awwowBtns[0]);
    
    const accordianItems = screen.getAllByTestId('foodItems');
    expect(accordianItems.length).toBe(99);
});

it("should add items in cart",async()=>{
    await act(async()=>{
        render(
            <BrowserRouter>
                <Provider store={AppStore}>
                    <Header/>
                    <RestaurantMenuItems data={itemCards}/>
                </Provider>
            </BrowserRouter>
        )
    });

    const addBtns = screen.getAllByRole("button",{name:"Add"});
    expect(addBtns[0]).toBeInTheDocument();

    expect(screen.getByTestId("cart").textContent).toBe("0");

    fireEvent.click(addBtns[0]);

    expect(screen.getByTestId("cart").textContent).toBe("1");

    fireEvent.click(addBtns[1]);

    expect(screen.getByTestId("cart").textContent).toBe("2");
});

it("should update cart page",async()=>{
    await act(async()=>{
        render(
            <BrowserRouter>
                <Provider store={AppStore}>
                    <Header/>
                    <Cart/>
                    <RestaurantMenuItems data={itemCards}/>
                </Provider>
            </BrowserRouter>
        )
    });

    const cartItems = screen.getAllByTestId("cartItem");
    expect(cartItems.length).toBe(2);
});

it("should handle increment and decrement in cart",async ()=>{
    await act(async()=>{
        render(
            <BrowserRouter>
                <Provider store={AppStore}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )
    });

    const incrementBtns = screen.getAllByTestId("increment");
    fireEvent.click(incrementBtns[0]);
    const qtys = screen.getAllByTestId("qty");
    expect(qtys[0].textContent).toBe("2");

    const decrementBtns = screen.getAllByTestId("decrement");
    fireEvent.click(decrementBtns[0]);
    expect(qtys[0].textContent).toBe("1");
})

it("should remove item from cartList when on decrement val is less than 1",async()=>{
    await act(async()=>{
        render(
            <BrowserRouter>
                <Provider store={AppStore}>
                    <Cart/>
                </Provider>
            </BrowserRouter>
        )
    });

    const decrementBtns = screen.getAllByTestId("decrement");
    fireEvent.click(decrementBtns[0]);
    expect(screen.getAllByTestId("cartItem").length).toBe(1);

})

it("Should clear cart items",async()=>{
    await act(async()=>{
        render(
            <BrowserRouter>
                <Provider store={AppStore}>
                    <Header/>
                    <Cart/>
                    <RestaurantMenuItems data={itemCards}/>
                </Provider>
            </BrowserRouter>
        )
    });

    const clearCartItemBtn = screen.getByRole("button",{name:"Clear Cart"});
    expect(clearCartItemBtn).toBeInTheDocument();

    fireEvent.click(clearCartItemBtn);

    expect(screen.getByText("Cart Is Empty. Please Add Some Items.")).toBeInTheDocument();
});

it("should toggle sub-category accordion", async () => {
    await act(async () => {
        render(
            <BrowserRouter>
                <Provider store={AppStore}>
                    <Header />
                    <RestaurantMenuItems data={itemCards} />
                </Provider>
            </BrowserRouter>
        );
    });

    // Get all sub-category arrows
    const catArrows = screen.getAllByTestId("catArrow");
    // Get initial sub-category items count
    const initialSubCartItems = screen.getAllByTestId("subCartItem");
    console.log(initialSubCartItems.length);
    
    expect(initialSubCartItems.length).toBe(43);

    // Click the first sub-category arrow to collapse
    fireEvent.click(catArrows[0]);
    // After toggle, count should decrease
    const afterToggleSubCartItems = screen.getAllByTestId("subCartItem");
    
    expect(afterToggleSubCartItems.length).toBe(39);

    // Click again to expand
    fireEvent.click(catArrows[0]);
    const afterExpandSubCartItems = screen.getAllByTestId("subCartItem");
    expect(afterExpandSubCartItems.length).toBe(43);
});