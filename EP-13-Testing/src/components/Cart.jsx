import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeItem } from "../utils/CartSlice";

const Cart = () => {
  const itemsList = useSelector((store) => store.cart.items);
  const { imageId, title, location } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const [toRemove, setToRemove] = useState(null);

  // remove from Redux after render
  useEffect(() => {
    if (toRemove !== null) {
      dispatch(removeItem(toRemove));
      setToRemove(null);
    }
  }, [toRemove, dispatch]);

  // counts by id instead of index
  const [count, setCount] = useState(() => {
    const obj = {};
    itemsList.forEach((item) => {
      const id = item.card.info.id;
      obj[id] = 1;
    });
    return obj;
  });

  const handleIncrement = (id) => {
    setCount((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + 1
    }));
  };

  const handleDecrement = (id) => {
    setCount((prev) => {
      if (prev[id] > 1) {
        return { ...prev, [id]: prev[id] - 1 };
      } else {
        const copy = { ...prev };
        delete copy[id];
        setToRemove(id);
        return copy;
      }
    });
  };

  // Calculate total price
  const totalPrice = itemsList.reduce((acc, item) => {
    const id = item.card.info.id;
    const price =
      item?.card?.info?.defaultPrice || item?.card?.info?.price || 0;
    const qty = count[id] ?? 0;
    return acc + qty * (price / 100);
  }, 0);

  const toPay = totalPrice + 120 + 150;

  const clearCartHandler = () =>{
    dispatch(clearCart())
  }

  return (
    <>
    <div className="flex justify-center m-7"><button className="bg-green-600 p-2 text-black rounded-lg" onClick={clearCartHandler}>Clear Cart</button></div>
    <div className="flex justify-center items-center w-full m-2">
      {itemsList.length >0 ? <div className="flex justify-center items-center bg-pink-100 flex-col w-1/2 md:w-1/2 lg:w-1/2 2xl:w-1/3 xl:w-1/2 rounded-lg p-7">
        <div className="flex gap-4">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
            alt="image"
            className="size-20 rounded-lg my-2"
          />
          <div className="flex flex-col justify-end">
            <h2 className="text-base font-semibold">{title}</h2>
            <h3 className="border-b-2 border-black">{location}</h3>
          </div>
        </div>

        {itemsList.map((item) => {
          const id = item.card.info.id;
          const qty = count[id] ?? 0;
          const price =
            item?.card?.info?.defaultPrice || item?.card?.info?.price || 0;

          return (
            <div className="flex justify-around m-5 w-full" key={id}>
              <div className="flex w-full justify-around">
                <div className="flex gap-2">
                  <span title="Veg">
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <rect
                        x="2"
                        y="2"
                        width="16"
                        height="16"
                        rx="3"
                        fill="#fff"
                        stroke="#008000"
                        strokeWidth="2"
                      />
                      <circle cx="10" cy="10" r="5" fill="#008000" />
                    </svg>
                  </span>
                  <h3>{item?.card?.info?.name}</h3>
                </div>
                <div className="border border-black flex">
                  <div
                    className="p-2 cursor-pointer"
                    onClick={() => handleDecrement(id)}
                  >
                    -
                  </div>
                  <div className="p-2">{qty}</div>
                  <div
                    className="p-2 cursor-pointer"
                    onClick={() => handleIncrement(id)}
                  >
                    +
                  </div>
                </div>
                <div>
                  <h3>
                    ₹{(qty * (price / 100)).toFixed(2)}
                  </h3>
                </div>
              </div>
            </div>
          );
        })}

        <div className="flex flex-col gap-4 w-1/2 px-4 text-center ">
          <h3 className="font-semibold border-b-2 border-black">Bill Details</h3>
          <div className="flex justify-between">
            <h2 className="text-gray-600">Item Total</h2>
            <h2 className="text-gray-600">₹{totalPrice.toFixed(2)}</h2>
          </div>
          <div className="flex justify-between">
            <h2 className="text-gray-600">Delivery Charges</h2>
            <h2 className="text-gray-600">₹120</h2>
          </div>
          <div className="flex justify-between border-b-2 border-black">
            <h2 className="text-gray-600">GST & other Charges</h2>
            <h2 className="text-gray-600">₹150</h2>
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold">To pay</h2>
            <h2 className="font-semibold">₹{toPay.toFixed(2)}</h2>
          </div>
        </div>
      </div> :

      <div>
        <h2 className="font-semibold border-b-2 border-black">Cart Is Empty. Please Add Some Items.</h2>
     </div>
     }
    </div>
    </>
  );
};


export default Cart;
