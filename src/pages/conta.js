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

export default function () {
  const authContext = useContext(AuthContext)
  const router = useRouter()
  console.log('auth', authContext)
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

  const ListaPedidos = [
    {
      id: 0,
      produtos: [
        {
          id: 33,
          nome: 'aaaa',
          valor: 1.90
        },
        {
          id: 22,
          nome: 'bbbb',
          valor: 9.99
        },
        {
          id: 15,
          nome: 'cccc',
          valor: 17.90
        },
        {
          id: 66,
          nome: 'dddd',
          valor: 1.99
        }
      ],
      status: 'Entregue'
    },
    {
      id: 1,
      produtos: [
        {
          id: 34,
          nome: 'mdasinod',
          valor: 6.90
        },
        {
          id: 26,
          nome: 'dmeqioidsa',
          valor: 19.99
        },
        {
          id: 24,
          nome: 'dawndioa dnioasd',
          valor: 12.90
        },
        {
          id: 10,
          nome: 'diasn disandw ind sixnwn',
          valor: 10.90
        }
      ],
      status: 'Pendente'
    },

  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    updateUser(authContext.user.id, username, email, password, address, complement, addressNumber, neighborhood, reference, cep, city)
      .then((res) => {
        console.log('res', res)
        authContext.setUser(res.data);
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
              <h5>Lista de Pedidos</h5>
              {ListaPedidos.map((item, index) => (
                <div key={index} style={{marginBottom: '2em'}}>
                  <Button color="primary" id={'toggler' + index} style={{ marginTop: '1rem', width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                      Pedido Nº {item.id}
                    </div>
                    <div style={{display: 'flex'}}>
                      <div style={{marginRight: '1rem'}}>
                        {item.status}
                      </div>
                      <div>
                        Total: {calculateValue(item).toFixed(2)}
                      </div>

                    </div>
                  </Button>
                  <UncontrolledCollapse toggler={'#toggler' + index}>
                    <Card>
                      <CardBody>
                        {item.produtos.map((p, index) => (
                          <li key={index}>{p.nome} - R${p.valor}</li>
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
                  <Label for="Email" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Email</Label>
                  <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="Email" placeholder="Digite seu email" />
                </FormGroup>

                {/* <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
            <Label for="Password" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Senha</Label>
            <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="Password" placeholder="Aqui você escolhe sua senha" />
          </FormGroup> */}

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

                <Button onClick={handleSubmit} style={{ display: 'flex', margin: 'auto', background: '#F083A6', color: 'white' }}>Terminar o cadastro</Button>
              </Form>
            </div>
          </>
        }
      </div>
      <Benefits />
    </LayoutFour>
  );
}
