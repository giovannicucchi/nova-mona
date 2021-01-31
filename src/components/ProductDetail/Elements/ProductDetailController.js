import { useState } from "react";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import classNames from "classnames";

import Quantity from "../../Control/Quantity";
import AddToCart from "../../Control/AddToCart";
import Button from "../../Control/Button";
import {
  getAvaiableQuantityInCart,
  checkProductInWishList,
} from "../../../common/shopUtils";

export default function ProductDetailController({
  data,
  getQuantity,
  onAddToCart,
  onAddToWishList,
  color,
}) {
  const [quantity, setQuantity] = useState();
  const cartState = useSelector((state) => state.cartReducer);
  const wishlistState = useSelector((state) => state.wishlistReducer);

  const avaiableProduct = getAvaiableQuantityInCart(
    cartState,
    data.id,
    data.quantity
  );
  return (
    <div className="product-detail__controler">
      {/* <Quantity
        className="-border -round"
        getQuantity={(q) => {
          setQuantity(q), getQuantity(q);
        }}
        maxValue={avaiableProduct}
      /> */}
      <AddToCart
        className={`-dark`}
        className={`-dark ${classNames({
          "-disable": quantity > avaiableProduct || data.quantity < 1,
        })}`}
        onClick={onAddToCart}
      />
      <div className="product-detail__controler__actions">
        {/* <div data-tip data-for="add-wishlist">
          <Button
            action="#"
            height="3.85em"
            width="3.85em"
            className={`-round ${classNames({
              active: checkProductInWishList(wishlistState, data.id),
            })}`}
            onClick={onAddToWishList}
            color="white"
            content={<i className="fas fa-heart"></i>}
          />
        </div>
        <ReactTooltip id="add-wishlist" type="dark" effect="solid">
          <span>Add to wishlist</span>
        </ReactTooltip> */}
      </div>
    </div>
  );
}
