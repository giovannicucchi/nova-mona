import { useState, useContext, useEffect } from 'react'
import AuthContext from "../context/AuthContext";
import { registerUser } from "../../lib/auth";

import LayoutFour from "../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../components/Other/Breadcrumb";
import Benefits from "../components/Other/Benefits";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default function () {
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

  const authContext = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    registerUser(username, email, password, address, complement, addressNumber, neighborhood, reference, cep, city)
      .then((res) => {
        setLoading(false);
        localStorage.setItem('token', res.data.jwt)
        authContext.setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };


  return (
    <LayoutFour title="Cadastro">
      <Breadcrumb title="Cadastro">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Cadastro" current />
      </Breadcrumb>
      
      <div className="col-xs-12 col-sm-9 col-md-6 form-register">
        <Form style={{ marginBottom: '2em' }}>
          <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.5em' }}>
            <Label for="Name" style={{ marginRight: '0.5em', marginBottom: '0.5em'}}>Nome</Label>
            <Input onChange={(e) => setUsername(e.target.value)} type="text" name="name" id="Name" placeholder="Qual seu nome?" />
          </FormGroup>

          <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
            <Label for="Email" style={{ marginRight: '0.5em', marginBottom: '0.5em'}}>Email</Label>
            <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="Email" placeholder="Digite seu email" />
          </FormGroup>

          <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
            <Label for="Password" style={{ marginRight: '0.5em', marginBottom: '0.5em'}}>Senha</Label>
            <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="Password" placeholder="Aqui você escolhe sua senha" />
          </FormGroup>

          <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
            <Label for="Address" style={{ marginRight: '0.5em', marginBottom: '0.5em'}}>Endereço</Label>
            <Input onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="Address" placeholder="Digite seu endereço" />
          </FormGroup>

          <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
            <Label for="Complement" style={{ marginRight: '0.5em', marginBottom: '0.5em'}}>Complemento</Label>
            <Input onChange={(e) => setComplement(e.target.value)} type="text" name="Complement" id="Complement" placeholder="Digite o complemento do endereço" />
          </FormGroup>

          <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
            <Label for="AddressNumber" style={{ marginRight: '0.5em', marginBottom: '0.5em'}}>Número</Label>
            <Input onChange={(e) => setAddressNumber(e.target.value)} type="text" name="AddressNumber" id="AddressNumber" placeholder="Digite o número do endereço" />
          </FormGroup>

          <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
            <Label for="Neighborhood" style={{ marginRight: '0.5em', marginBottom: '0.5em'}}>Bairro</Label>
            <Input onChange={(e) => setNeighborhood(e.target.value)} type="text" name="Neighborhood" id="Neighborhood" placeholder="Digite seu bairro" />
          </FormGroup>

          <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
            <Label for="Reference" style={{ marginRight: '0.5em', marginBottom: '0.5em'}}>Referência</Label>
            <Input onChange={(e) => setReference(e.target.value)} type="text" name="Reference" id="Reference" placeholder="Digite uma referência" />
          </FormGroup>

          <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1em' }}>
            <Label for="City" style={{ marginRight: '0.5em', marginBottom: '0.5em'}}>Cidade</Label>
            <Input onChange={(e) => setCity(e.target.value)} type="text" name="City" id="City" placeholder="Qual a sua cidade" />
          </FormGroup>

          <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '2em' }}>
            <Label for="cep" style={{ marginRight: '0.5em', marginBottom: '0.5em'}}>CEP</Label>
            <Input onChange={(e) => setCep(e.target.value)} type="number" name="cep" id="cep" placeholder="Qual o seu CEP?" />
          </FormGroup>


          <Button onClick={handleSubmit} style={{ display: 'flex', margin: 'auto', background: '#F083A6', color: 'white' }}>Terminar o cadastro</Button>
        </Form>
      </div>

      <Benefits />
    </LayoutFour>
  );
}
