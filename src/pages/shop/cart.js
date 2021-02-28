import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import LayoutFour from "../../components/Layout/LayoutFour";
import Quantity from "../../components/Control/Quantity";
import Button from "../../components/Control/Button";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import { formatCurrency } from "../../common/utils";
import { calculateTotalPrice } from "../../common/shopUtils";
import {
  removeFromCart,
  removeAllFromCart,
  increaseQuantityCart,
  decreaseQuantityCart,
} from "../../redux/actions/cartActions";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";

export default function () {
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const cartState = useSelector((state) => state.cartReducer);
  console.log('cart state', cartState);
  const onSubmit = (data) => console.log(data);
  const removeAllProduct = (e) => {
    e.preventDefault();
    dispatch(removeAllFromCart());
    return toast.error("Todos os produtos foram removidos");
  };
  const removeProduct = (e, cartId) => {
    e.preventDefault();
    dispatch(removeFromCart(cartId));
    return toast.error("Produto removido do carrinho");
  };
  return (
    <LayoutFour title="Carrinho">
      <Breadcrumb title="Carrinho da Mona">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Loja" />
        <BreadcrumbItem name="Carrinho" current />
      </Breadcrumb>
      <div className="cart">
        <div className="container">
          {!cartState || cartState.length === 0 ? (
            <div className="cart__empty">
              <h3>Sem produtos no carrinho</h3>
              <Button
                color="dark"
                action={process.env.PUBLIC_URL + "/"}
                content="Ir para Loja"
              />
            </div>
          ) : (
              <>
                <div className="cart__table">
                  <div className="cart__table__wrapper">
                    <table>
                      <colgroup>
                        <col style={{ width: "40%" }} />
                        <col style={{ width: "17%" }} />
                        <col style={{ width: "17%" }} />
                        <col style={{ width: "17%" }} />
                        <col style={{ width: "9%" }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Produto</th>
                          <th>Preço</th>
                          <th>Quantidade</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartState.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <div className="cart-product">
                                <div className="cart-product__image">
                                  <img src={item.image.formats.thumbnail.url} alt={item.name} />
                                </div>
                                <div className="cart-product__content">
                                  <h5>{item.category}</h5>
                                  <Link
                                    href={
                                      process.env.PUBLIC_URL +
                                      "/shop/product/[slug]"
                                    }
                                    as={
                                      process.env.PUBLIC_URL +
                                      "/shop/product/" +
                                      item.slug
                                    }
                                  >
                                    <a>{item.name}</a>
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>{formatCurrency(item.price)}</td>
                            <td>
                              <Quantity
                                defaultQuantity={item.cartQuantity}
                                onIncrease={() =>
                                  dispatch(increaseQuantityCart(item.cartId))
                                }
                                onDecrease={() =>
                                  dispatch(decreaseQuantityCart(item.cartId))
                                }
                              />
                            </td>
                            <td>
                              {formatCurrency(item.price * item.cartQuantity)}
                            </td>
                            <td>
                              <a
                                href={process.env.PUBLIC_URL + "#"}
                                onClick={(e) => removeProduct(e, item.cartId)}
                              >
                                <i className="fal fa-times"></i>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart__table__footer">
                    <Link href={process.env.PUBLIC_URL + "/"}>
                      <a>
                        <i className="fal fa-long-arrow-left"></i>
                      Continue comprando
                    </a>
                    </Link>

                    <Link href="#">
                      <a onClick={(e) => removeAllProduct(e)}>
                        <i className="fal fa-trash"></i>
                      Esvaziar o carrinho
                    </a>
                    </Link>
                  </div>
                </div>
                <div className="cart__total">
                  <div className="row">
                    <div className="col-12 col-md-4">
                      <div className="cart__total__content">
                        <h3>Total do carrinho</h3>
                        <table>
                          <tbody>
                            <tr>
                              <th>Subtotal</th>
                              <td>{calculateTotalPrice(cartState, true)}</td>
                            </tr>
                            <tr>
                              <th>Total</th>
                              <td className="final-price">
                                {calculateTotalPrice(cartState, true)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <Button
                          height={45 / 14 + "em"}
                          width="100%"
                          action={process.env.PUBLIC_URL + "/shop/checkout"}
                          color="dark"
                          content="Fazer o checkout"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
      {/* <InstagramTwo /> */}
    </LayoutFour>
  );
}
