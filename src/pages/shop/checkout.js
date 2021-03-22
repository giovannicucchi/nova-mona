import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useForm } from "react-hook-form"
import AuthContext from "../../context/AuthContext"
import axios from 'axios'
import LayoutFour from "../../components/Layout/LayoutFour"
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb"
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo"
import { formatCurrency, formatSingleNumber } from "../../common/utils"
import { calculateTotalPrice } from "../../common/shopUtils"

export default function () {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  // console.log('user data', authContext.user)

  const cartState = useSelector((state) => state.cartReducer)
  const { register, handleSubmit, errors } = useForm()
  const {
    register: couponRegister,
    handleSubmit: couponHandleSubmit,
    errors: couponErrors,
  } = useForm()
  
  const onSubmit = (data) => {
    // console.log(data)
    !authContext.user && router.push("/register")
    calcFrete()
    onBuy()
  }

  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [complement, setComplement] = useState("")
  const [addressNumber, setAddressNumber] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [reference, setReference] = useState("")
  const [cep, setCep] = useState("")
  const [city, setCity] = useState("")
  const [observacoes, setOberservacoes] = useState("")
  const [cartItems, setCartItems] = useState([])
  const [deliveryPrice, setDeliveryPrice] = useState(0)

  const totalValue = () => { 
    let x = calculateTotalPrice(cartState, false)
    let y = Number(deliveryPrice)
    let z = x+y
    return z
  }

  const calcFrete = async () => {
    let array = []
    // console.log('cart items', cartItems)
    cartItems.map(p => {
      // console.log('map', p)
      let object = {
        "id": p.id,
        "width": 10,
        "height": 10,
        "length": 10,
        "weight": p.peso ? p.peso : 0.3,
        "insurance_value": p.unit_price,
        "quantity": p.quantity
      }
      array.push(object)
    })
    // console.log('array de products', array)
    var data = {
      "from": {
        "postal_code": "41301170"
      },
      "to": {
        "postal_code": `"${cep}"`
      }, "products": array
    }
    // console.log('DATA DO CALC FRETE', data)

    const options = {
      method: 'POST',
      url: 'https://api-loja-mona.herokuapp.com/shipping/calculate',
      headers: { 'Content-Type': 'application/json' },
      data: data
    };
    axios.request(options).then(function (response) {
      // console.log('response', response)
      let sedex = response.data.find(r => r.name==="SEDEX")
      setDeliveryPrice(sedex.price)
      // console.log('sedex obj', sedex)
      // console.log(response.data);
      
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    if (authContext.user) {
      // console.log("auth context user", authContext.user)
      setEmail(authContext.user.email)
      setAddress(authContext.user.address)
      setComplement(authContext.user.complement)
      setAddressNumber(authContext.user.addressNumber)
      setNeighborhood(authContext.user.neighborhood)
      setReference(authContext.user.reference)
      setCity(authContext.user.city)
      setCep(authContext.user.cep)

      // console.log('cart state', cartState)
      if (cartState) {
        let array = []
        cartState.map(item => {
          let productInfo = {
            "id": item.id,
            "title": item.title,
            "description": item.description,
            "category_id": 'home',
            "quantity": item.cartQuantity,
            "currency_id": 'BRL',
            "unit_price": item.price,
          }
          array.push(productInfo)
        })
        setCartItems(array)
      }
    }
  }, [authContext])

  const onBuy = async () => {
    if (!authContext.user) return router.push('/login')
    // console.log('local storage', localStorage)
    let token = localStorage.getItem('token')
    // console.log('token aqui nessa desgraça', token)
    // console.log('user')

    const preference = {
      items: cartItems,
      payer: {
        "user_id": authContext.user.id,
        "email": authContext.user.email,
        "name": authContext.user.name
      },
      "shipments": {
        "cost": totalValue(),
      },
      "back_urls": {
        "success": `loja-mona.vercel.app/order-status/success/params`,
        "failure": `loja-mona.vercel.app/order-status/failure/params`,
        "pending": `loja-mona.vercel.app/order-status/pending/params`
      },
      "address": {
        "street_name": `"endereço: ${address},
        numero: ${addressNumber},
        complemento: ${complement},
        referencia: ${reference},
        bairro: ${neighborhood},
        cidade: ${city},
        cep: ${cep},
        observacoes: ${observacoes}"`,
      }
    }
    // console.log('ordem aqui', preference)
    if (address && addressNumber && complement && reference && neighborhood && city && cep) {
      await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/order/preference`, preference, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(({ data }) => {
          if (data.id)
            generateScript(data.id)
  
        }).catch(err => console.log(err))
    }
  }

  useEffect(() => {
    if (cep) {
      calcFrete()
    }
  }, [cep])

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
                              onChange={(e) => setAddress(e.target.value)}

                            />
                            <input
                              type="text"
                              name="apartment"
                              ref={register({ required: true })}
                              placeholder="Número"
                              value={addressNumber}
                              onChange={(e) => setAddressNumber(e.target.value)}

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
                              onChange={(e) => setCity(e.target.value)}

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
                              onChange={(e) => setNeighborhood(e.target.value)}

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
                              onChange={(e) => setReference(e.target.value)}

                            />
                          </label>

                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            Código Postal <span>*</span>
                            <input
                              type="number"
                              name="zip"
                              ref={register({ required: true })}
                              value={cep}
                              onChange={(e) => setCep(e.target.value)}
                              placeholder="Apenas números"

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
                              onChange={(e) => setOberservacoes(e.target.value)}
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
                              <td>Total (+ frete)</td>
                              <td>{formatCurrency(totalValue())} </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button
                      className="btn -red"
                      onClick={() => onBuy()}
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
  )
}
