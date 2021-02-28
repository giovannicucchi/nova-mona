import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useContext, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";

import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";
import { formatCurrency, formatSingleNumber } from "../../common/utils";
import { calculateTotalPrice } from "../../common/shopUtils";

export default function () {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  const cartState = useSelector((state) => state.cartReducer);
  const { register, handleSubmit, errors } = useForm();
  const {
    register: couponRegister,
    handleSubmit: couponHandleSubmit,
    errors: couponErrors,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    !authContext.user && router.push("/register");
  }

  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [complement, setComplement] = useState("")
  const [addressNumber, setAddressNumber] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [reference, setReference] = useState("")
  const [cep, setCep] = useState("")
  const [city, setCity] = useState("")

  useEffect(() => {
    if (authContext.user) {
      setEmail(authContext.user.email);
      setAddress(authContext.user.address);
      setComplement(authContext.user.complement);
      setAddressNumber(authContext.user.addressNumber);
      setNeighborhood(authContext.user.neighborhood);
      setReference(authContext.user.reference);
      setCep(authContext.user.cep)
      setCity(authContext.user.city)
    }
  }, [authContext])

  return (
    <LayoutFour title="Checkout">
      <Breadcrumb title="Checkout">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Shop" />
        <BreadcrumbItem name="Checkout" current />
      </Breadcrumb>
      <div className="checkout">
        <div className="container">
          <div className="row">
            <div className="col-12  col-lg-8">
              <form>
                <div className="checkout__form">
                  <div className="checkout__form__contact">
                    <div className="checkout__form__contact__title">
                      <h5 className="checkout-title">Informação de Contato</h5>
                      {!authContext.user && 
                      <p>
                        Já tem uma conta?
                        <Link href={process.env.PUBLIC_URL + "/login"}>
                          <a>Login</a>
                        </Link>
                      </p>
                      }
                    </div>
                    <div className="input-validator">
                      <input
                        type="text"
                        name="contact"
                        ref={register({ required: true })}
                        placeholder="Email ou número para contato"
                        value={email}
                      />
                      {errors.contact && (
                        <span className="input-error">
                          Por favor, preencha com um email ou número para contato
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="checkout__form__shipping">
                    <h5 className="checkout-title">Endereço para envio</h5>
                    <div className="row">
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Nome <span>*</span>
                            <input
                              type="text"
                              name="firstName"
                              placeholder="Seu nome"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.firstName && (
                            <span className="input-error">
                              Por favor, preencha com o seu nome
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Endereço <span>*</span>
                            <input
                              type="text"
                              name="streetAddress"
                              ref={register({ required: true })}
                              placeholder="Endereço"
                              value={address}
                            />
                            <input
                              type="text"
                              name="apartment"
                              ref={register({ required: true })}
                              placeholder="Número"
                              value={addressNumber}
                            />
                          </label>
                          {errors.streetAddress || errors.apartment ? (
                            <span className="input-error">
                              Por favor, preencha com o seu endereço
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Cidade <span>*</span>
                            <input
                              type="text"
                              name="town"
                              ref={register({ required: true })}
                              value={city}
                            />
                          </label>
                          {errors.town && (
                            <span className="input-error">
                              Por favor, preencha com a sua cidade
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Bairro <span>*</span>
                            <input
                              type="text"
                              name="state"
                              ref={register({ required: true })}
                              value={neighborhood}
                            />
                          </label>
                          {errors.state && (
                            <span className="input-error">
                              Por favor, preencha com o seu bairro
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Referência <span>*</span>               
                            <input
                              type="text"
                              name="reference"
                              ref={register({ required: false })}
                              value={reference}
                            />
                          </label>
                          
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Código Postal <span>*</span>
                            <input
                              type="text"
                              name="zip"
                              ref={register({ required: true })}
                              value={cep}
                            />
                          </label>
                          {errors.zip && (
                            <span className="input-error">
                              Preencha com o seu CEP
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Observações
                            <input
                              type="text"
                              name="note"
                              placeholder="Alguma observação especial?"
                              ref={register()}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-4">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-12 ml-auto">
                  <div className="checkout__total">
                    <h5 className="checkout-title">Carrinho</h5>
                    <div className="checkout__total__price">
                      <h5>Produto</h5>
                      <table>
                        <colgroup>
                          <col style={{ width: "70%" }} />
                          <col style={{ width: "30%" }} />
                        </colgroup>
                        <tbody>
                          {cartState.map((item) => (
                            <tr key={item.cartId}>
                              <td>
                                <span>
                                  {formatSingleNumber(item.cartQuantity)}
                                </span>{" "}
                                x {item.title}
                              </td>
                              <td>
                                {formatCurrency(item.price * item.cartQuantity)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="checkout__total__price__total-count">
                        <table>
                          <tbody>
                            <tr>
                              <td>Subtotal</td>
                              <td>{calculateTotalPrice(cartState, true)}</td>
                            </tr>
                            <tr>
                              <td>Total</td>
                              <td>{calculateTotalPrice(cartState, true)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button
                      className="btn -red"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Prosseguir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <InstagramTwo /> */}
    </LayoutFour>
  );
}
