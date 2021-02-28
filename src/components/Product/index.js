import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import classNames from "classnames";

import Rate from "../Other/Rate";
import Button from "../Control/Button";
import Modal from "../Control/Modal";
import ProductQuickView from "../ProductDetail/ProductQuickView";
import { formatCurrency } from "../../common/utils";
import {
  checkProductInWishList,
  checkProductInCart,
} from "../../common/shopUtils";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlistActions";
import AddToCart from "../Control/AddToCart";

function Product({ data, type, className }) {
  // console.log('product data', data)
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const wishlistData = useSelector((state) => state.wishlistReducer);
  const [showQuickView, setShowQuickView] = useState(false);
  const [otherColor, setOtherColor] = useState();
  const percentDiscount = data.discount
    ? Math.ceil(100 - (100 * data.discount) / data.price)
    : null;
  function renderType() {
    if (data.new) {
      return <h5 className="-new">New</h5>;
    }
    if (data.discount && typeof data.discount === "number") {
      return <h5 className="-sale">-{percentDiscount}%</h5>;
    }
    return null;
  }
  
  const addToCartHandle = (e) => {
    e.preventDefault();
    let productItem = checkProductInCart(cartState, data.id);
    if (!productItem) {
      dispatch(addToCart(data, 1, otherColor && otherColor.color));
      return toast.success("Produto adicionado ao carrinho!");
    }
  };
  

  return (
    <>
        <div className={`product ${classNames(className)}`}>
          <div className="product-type">{renderType()}</div>
          <div className="product__thumb" style={{ marginBottom: '0.5em' }}>
            <Link
              href={`${process.env.PUBLIC_URL}/shop/product/[slug]`}
              as={`${process.env.PUBLIC_URL}/shop/product/${data.slug}`}
            >
              <a className="product__thumb__image" style={{ border: '2px solid #F8AAC3', display: 'flex' }}>
                {data.image.formats.small &&
                  <img
                    src={process.env.PUBLIC_URL + data.image.formats.small.url}
                    alt="Product image"
                    style={{ height: 345, objectFit: 'cover', zIndex: -1 }}
                  />
                }
              </a>
            </Link>
            <div className="product__thumb__actions">
              <div className="product-btn" data-tip data-for="cartIcon">
                <Button
                  height="50px"
                  width="50px"
                  color="white"
                  className={`product__actions__item -round ${classNames({
                    "active -disable":
                      checkProductInCart(cartState, data.id) ||
                      data.quantity < 1,
                  })}
                  `}
                  action="#"
                  onClick={addToCartHandle}
                  content={<i className="fas fa-shopping-bag" />}
                ></Button>
              </div>
              <ReactTooltip id="cartIcon" type="dark" effect="solid">
                <span>Adicionar ao Carrinho</span>
              </ReactTooltip>
              <div className="product-btn" data-tip data-for="qvIcon">
                <Button
                  height={50 / 14 + "em"}
                  width={50 / 14 + "em"}
                  color="white"
                  className="product__actions__item -round"
                  action="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQuickView(true);
                  }}
                  content={<i className="fas fa-eye" />}
                ></Button>
              </div>
              <ReactTooltip id="qvIcon" type="dark" effect="solid">
                <span>Espiar</span>
              </ReactTooltip>
           
            </div>
          </div>
          <div className="product__content">
            {/* <div className="product__content__header">
              <h5 className="product-category">{data.category}</h5>
              <Rate currentRate={data.rate} />
            </div> */}
            <Link
              href={`${process.env.PUBLIC_URL}/shop/product/[slug]`}
              as={`${process.env.PUBLIC_URL}/shop/product/${data.slug}`}
            >
              <a className="product-name">{data.title}</a>
            </Link>
            <div className="product__content__footer">
              <h5 className="product-price--main">
                {data.discount
                  ? formatCurrency(data.discount)
                  : formatCurrency(data.price)}
              </h5>
              {data.discount && (
                <h5 className="product-price--discount">
                  {formatCurrency(data.price)}
                </h5>
              )}
              {data.variation && (
                <div className="product-colors">
                  {data.variation.map((color, index) => (
                    <div
                      key={index}
                      className={`product-colors__item ${classNames({
                        active:
                          otherColor &&
                          otherColor.colorCode === color.colorCode,
                      })}`}
                      style={{ backgroundColor: color.colorCode }}
                      onClick={() => setOtherColor(color)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      
      <Modal
        showModal={showQuickView}
        setShowModal={setShowQuickView}
        width={1170}
      >
        <ProductQuickView data={data} />
      </Modal>
    </>
  );
}

export default Product;
