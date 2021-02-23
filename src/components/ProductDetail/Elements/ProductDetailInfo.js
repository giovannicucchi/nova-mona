import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import classNames from "classnames";

import { formatCurrency } from "../../../common/utils";
import { addToCart } from "../../../redux/actions/cartActions";
import { addToWishlist } from "../../../redux/actions/wishlistActions";
import ProductDetailController from "./ProductDetailController";
import ProductDetailInfoTab from "./ProductDetailInfoTab";
import Rate from "../../Other/Rate";
import { checkProductInWishList } from "../../../common/shopUtils";
import axios from 'axios'
import AuthContext from "../../../context/AuthContext";

export default function ProductDetailInfo({ data, onReviewSubmit, hideTab }) {
  const authContext = useContext(AuthContext)
  const dispatch = useDispatch();
  const wishlistState = useSelector((state) => state.wishlistReducer);
  const [quantity, setQuantity] = useState();
  const [otherColor, setOtherColor] = useState();
  const user = authContext.user
  const getQuantity = (q) => {
    setQuantity(q);
  };
  

  //for paiment
  React.useEffect(()=> {
    
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.dataset.publicKey= 'APP_USR-c5c318e3-050d-4886-b223-b9737586524e'
    script.src = "https://www.mercadopago.com/v2/security.js"

    document.body.appendChild(script);
    return 
  }, [])

  const generateScript = (id)=> {
    window.open(id, "_self")
  }
 
  const onBuy = async () => {
    
    const preference = {
      items:  [{
        "id": data.id,
        "title": data.title,
        "description": data.description,
        "category_id": 'home',
        "quantity": data.quantity || 1,
        "currency_id": 'BRL',
        "unit_price": data.price,
      }],
      payer: {
        "email": user.name
      },
      "back_urls": {
        "success": "http://localhost:3000/order-status/success/",
        "failure": "http://localhost:3000/order-status/failure/",
        "pending": "http://localhost:3000/order-status/pending/"
      },
    }

    await axios.post(`http://localhost:1337/payment`, preference)
      .then(({data}) => {
        if(data.id)
          generateScript(data.id)
        
      }).catch(err => console.log(err))
   }  

   const onAddToCart = (e) => {
    e.preventDefault();
    onBuy()
    dispatch(addToCart(data, quantity, otherColor));
    toast.success("Redirecionando");
  };
  const onAddToWishList = (e) => {
    e.preventDefault();
    let product = checkProductInWishList(wishlistState, data.id);
    dispatch(addToWishlist(data));
    toast.dismiss();
    if (!product) {
      return toast.success("Product added to wishlist !");
    } else {
      return toast.error("Product removed from wishlist !");
    }
  };


  return (
    <div className="product-detail__content">
      <div className="product-detail__content__header">
        <h5>{data.category}</h5>
        <h2>{data.name}</h2>

        <h3>
          apenas ${data.price}
        </h3>
      </div>
      <div className="divider"></div>
      <div className="product-detail__content__footer">
        <p style={{marginBottom: 20}}>
          {data.description}
          </p>
        {/* {data.variation && (
          <div className="product-detail__colors">
            <span>Color:</span>
            {data.variation.map((color, index) => (
              <div
                key={index}
                className={`product-detail__colors__item ${classNames({
                  active: otherColor === color.color,
                })}`}
                style={{ backgroundColor: color.colorCode }}
                onClick={() => setOtherColor(color.color)}
              />
            ))}
          </div>
        )} */}
        <ProductDetailController
          data={data}
          getQuantity={getQuantity}
          onAddToCart={onAddToCart}
          // onAddToWishList={onAddToWishList}
          color={otherColor}
        />
      </div>
      {/* {!hideTab && (
        <>
          <div className="divider"></div>
          <div className="product-detail__content__tab">
            <ProductDetailInfoTab onReviewSubmit={onReviewSubmit} />
          </div>
        </>
      )} */}
    </div>
  );
}
