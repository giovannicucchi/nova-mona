import { useState, useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import { login } from "../../lib/auth";

import LayoutFour from "../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../components/Other/Breadcrumb";
import Benefits from "../components/Other/Benefits";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default function () {
  const authContext = useContext(AuthContext)
  const router = useRouter();

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (authContext.isAuthenticated) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    login(username, password)
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
          <Label for="exampleEmail" style={{ marginRight: '0.5em' }}>Email</Label>
          <Input onChange={(e) => setUsername(e.target.value)} type="email" name="email" id="exampleEmail" placeholder="Qual seu email?" />
        </FormGroup>
        <FormGroup style={{ textAlign: 'center', marginBottom: '1em' }}>
          <Label for="examplePassword" style={{ marginRight: '0.5em' }}>Password</Label>
          <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="examplePassword" placeholder="Digite sua senha" />
        </FormGroup>
        
        <Button onClick={handleSubmit} style={{ display: 'flex', margin: 'auto', background: '#F083A6', color: 'white' }}>Login</Button>
      </Form>
      <Benefits />
    </LayoutFour>
  );
}
