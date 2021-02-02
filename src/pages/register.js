import { useState, useContext, useEffect } from 'react'
import AuthContext from "../context/AuthContext";
import { registerUser } from "../../lib/auth";

import LayoutFour from "../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../components/Other/Breadcrumb";
import Benefits from "../components/Other/Benefits";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default function () {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)


  const authContext = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    registerUser(username, email ,password)
      .then((res) => {
        setLoading(false);
        authContext.setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoading(false);
      });
  };


  return (
    <LayoutFour title="Login">
      <Breadcrumb title="Login">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Login" current />
      </Breadcrumb>
      
      <Form style={{ marginBottom: '2em' }}>
        <FormGroup style={{ textAlign: 'center', marginBottom: '1em' }}>
          <Label for="Name" style={{ marginRight: '0.5em' }}>Nome</Label>
          <Input onChange={(e) => setName(e.target.value)} type="text" name="name" id="Name" placeholder="Qual seu nome?" />
        </FormGroup>
        <FormGroup style={{ textAlign: 'center', marginBottom: '1em' }}>
          <Label for="Email" style={{ marginRight: '0.5em' }}>Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="Email" placeholder="Digite seu email" />
        </FormGroup>
        <FormGroup style={{ textAlign: 'center', marginBottom: '1em' }}>
          <Label for="Password" style={{ marginRight: '0.5em' }}>Senha</Label>
          <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="Password" placeholder="Aqui você escolhe sua senha" />
        </FormGroup>

        <Button onClick={handleSubmit} style={{ display: 'flex', margin: 'auto', background: '#F083A6', color: 'white' }}>Faça seu cadastro</Button>
      </Form>
      <Benefits />
    </LayoutFour>
  );
}
