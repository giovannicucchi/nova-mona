import { useState, useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import { updateUser } from "../../lib/auth";


import LayoutFour from "../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../components/Other/Breadcrumb";
import Benefits from "../components/Other/Benefits";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // setLoading(true);

    updateUser(authContext.user.id, username, email, password, address, complement, addressNumber, neighborhood, reference, cep, city)
      .then((res) => {
        console.log('res', res)
        // setLoading(false);
        authContext.setUser(res.data);
      })
      .catch((error) => {
        console.log('error', error);
        // setLoading(false);
      });
  };

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

  return (
    <LayoutFour title="Minha conta">
      <Breadcrumb title="Minha conta">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Minha conta" current />
      </Breadcrumb>

      <div className="col-xs-12 col-sm-9 col-md-6 form-register">
        {loading ?
          <p>CARREGANDO...</p>
          :
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
        }
      </div>
      <Benefits />
    </LayoutFour>
  );
}
