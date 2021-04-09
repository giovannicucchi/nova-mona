import React, { useState, useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import { updateUser } from "../../lib/auth";
import LayoutFour from "../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../components/Other/Breadcrumb";
import Benefits from "../components/Other/Benefits";
import { Button, Form, FormGroup, Label, Input, FormText, UncontrolledCollapse, CardBody, Card } from 'reactstrap';

import Loading from "../components/Other/Loading";
import styled from 'styled-components'
import axios from 'axios';

export default function () {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  // console.log('auth', authContext)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [complement, setComplement] = useState("")
  const [addressNumber, setAddressNumber] = useState("")
  const [neighborhood, setNeighborhood] = useState("")
  const [reference, setReference] = useState("")
  const [cep, setCep] = useState("")
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [listaPedidos, setListaPedidos] = useState([])

  useEffect(() => {
    let token = localStorage.getItem('token')
    // console.log('token', token)
    if (token) {
      console.log('entrou no if')
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          // console.log("res", res)
          if (res.status === 200)
            setListaPedidos(res.data)
        })
        .catch(err => console.log('Erro', err))
    } else {
      router.push('/login')
    }
  }, [])

  const handleSubmit = async (e) => {
    // console.log('submit')
    let token = localStorage.getItem('token')

    e.preventDefault();
    setLoading(true);
    updateUser({
      address: address,
      complement: complement,
      addressNumber: addressNumber,
      neighborhood: neighborhood,
      reference: reference,
      cep: cep,
      city: city,
      token: token
    })

      .then((res) => {
        console.log('res', res)
        // authContext.setUser(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
        setLoading(false);
      });
  };

  const DivPedidos = styled.div`
    display: flex;
  `

  useEffect(() => {
    if (authContext.user) {
      setUsername(authContext.user.username);
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

  const calculateValue = (pedido) => {
    let total = 0
    pedido.produtos.map(p => {
      total = total + p.valor
    })
    return total
  }

  return (
    <LayoutFour title="Minha conta">
      <Breadcrumb title="Minha conta">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Minha conta" current />
      </Breadcrumb>

      <div className="col-xs-12 col-sm-9 col-md-6 form-register">
        {loading ?
          <div style={{ width: '100%', height: '15em' }}>
            <Loading />
          </div>
          :
          <>
            <div className="col-xs-12">
              {listaPedidos.length > 0 && <h5>Lista de Pedidos</h5>}
              {listaPedidos.map((item, index) => (
                <div key={index} style={{ marginBottom: '2em' }}>
                  <Button color="primary" id={'toggler' + index} style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      Pedido Nº {item.id}
                    </div>
                    <div style={{ display: 'flex' }}>
                      <div style={{ marginRight: '1rem' }}>
                        {item.status}
                      </div>
                      <div>
                        Total: {item.total_amount.toFixed(2)}
                      </div>

                    </div>
                  </Button>
                  <UncontrolledCollapse toggler={'#toggler' + index}>
                    <Card>
                      <CardBody>
                        {item.items.map((p, index) => (
                          <li key={index}>{p.title} - R${p.unit_price}</li>
                        ))}
                      </CardBody>
                    </Card>
                  </UncontrolledCollapse>
                </div>
              ))}
            </div>
            <div className="col-xs-12">
              <Form style={{ marginBottom: '2em' }}>
                <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.5em' }}>
                  <Label for="Name" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Nome</Label>
                  <Input onChange={(e) => setUsername(e.target.value)} value={username} type="text" name="name" id="Name" placeholder="Qual seu nome?" />
                </FormGroup>

                <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
                  <Label for="Address" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Endereço</Label>
                  <Input onChange={(e) => setAddress(e.target.value)} value={address} type="text" name="address" id="Address" placeholder="Digite seu endereço" />
                </FormGroup>

                <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
                  <Label for="Complement" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Complemento</Label>
                  <Input onChange={(e) => setComplement(e.target.value)} value={complement} type="text" name="Complement" id="Complement" placeholder="Digite o complemento do endereço" />
                </FormGroup>

                <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
                  <Label for="AddressNumber" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Número</Label>
                  <Input onChange={(e) => setAddressNumber(e.target.value)} value={addressNumber} type="text" name="AddressNumber" id="AddressNumber" placeholder="Digite o número do endereço" />
                </FormGroup>

                <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
                  <Label for="Neighborhood" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Bairro</Label>
                  <Input onChange={(e) => setNeighborhood(e.target.value)} value={neighborhood} type="text" name="Neighborhood" id="Neighborhood" placeholder="Digite seu bairro" />
                </FormGroup>

                <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
                  <Label for="Reference" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Referência</Label>
                  <Input onChange={(e) => setReference(e.target.value)} value={reference} type="text" name="Reference" id="Reference" placeholder="Digite uma referência" />
                </FormGroup>

                <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
                  <Label for="City" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Cidade</Label>
                  <Input onChange={(e) => setCity(e.target.value)} value={city} type="text" name="City" id="City" placeholder="Qual a sua cidade" />
                </FormGroup>

                <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '2em' }}>
                  <Label for="cep" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>CEP</Label>
                  <Input onChange={(e) => setCep(e.target.value)} value={cep} type="number" name="cep" id="cep" placeholder="Qual o seu CEP?" />
                </FormGroup>

                <Button onClick={handleSubmit} style={{ display: 'flex', margin: 'auto', background: '#F083A6', color: 'white' }}>Atualizar dados</Button>
              </Form>
            </div>
          </>
        }
      </div>
      <Benefits />
    </LayoutFour>
  );
}
