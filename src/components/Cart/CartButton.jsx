import { useState, createRef, useEffect } from "react";
import Popper from "popper.js";
import CartDropdown from "./CartDropdown";
import { getItems } from "../../utils/cart";
import IMG from "../../assets/cart.png";

const CartButton = (props) => {
  const { loadCart, setLoadCart } = props;
  const [countCart, setCountCart] = useState(0);
  const btnDropdownRef = createRef();
  const popoverDropdownRef = createRef();
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
    setLoadCart(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  useEffect(() => {
    const items = getItems();
    setCountCart(items.length);
    setLoadCart(false);
  }, [loadCart, setLoadCart, setCountCart]);
  return (
    <>
      <div
        ref={btnDropdownRef}
        onClick={() => {
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
        className="fixed right-4 sm:right-14 top-20 cursor-pointer"
      >
        <span className="absolute z-10 bg-red-500 p-1 font-small sm:text-xs font-semibold rounded-full ml-6 sm:ml-8 text-white">
          {countCart}
        </span>
        <img src={IMG} alt="none" className="w-10 h-10 sm:w-12 sm:h-12" />
      </div>
      <div
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "text-base lg:left-0 border dpdown p-4 float-left list-none text-left rounded shadow-xl h-auto left-20 mr-10 -ml-28 bg-white"
        }
        ref={popoverDropdownRef}
      >
        <CartDropdown setLoadCart={setLoadCart} loadCart={loadCart} />
      </div>
    </>
  );
};

export default CartButton;
