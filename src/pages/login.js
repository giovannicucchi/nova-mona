import { useState, useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import { login } from "../../lib/auth";

import LayoutFour from "../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../components/Other/Breadcrumb";
import Benefits from "../components/Other/Benefits";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Loading from "../components/Other/Loading";



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
        authContext.setUser(res.data.user);
      })
      .catch((error) => {
        // console.log(error.response.data);
      });
  };

  const goToRegister = () => {
    setLoading(true);
    router.push("/register");
  }

  return (
    <LayoutFour title="Login">
      <Breadcrumb title="Login">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Login" current />
      </Breadcrumb>
      <div className="col-xs-12 col-sm-9 col-md-6 form-register">
        {loading ?
        <div style={{width: '100%', height: '15em'}}>
          <Loading />
        </div>
          :
          <Form style={{ marginBottom: '2em' }}>
            <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.5em' }}>
              <Label for="exampleEmail" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Usuário</Label>
              <Input onChange={(e) => setUsername(e.target.value)} type="email" name="email" id="exampleEmail" placeholder="Qual seu usuário?" />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.5em' }}>
              <Label for="examplePassword" style={{ marginRight: '0.5em', marginBottom: '0.5em' }}>Senha</Label>
              <Input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="examplePassword" placeholder="Digite sua senha" />
            </FormGroup>

            <Button onClick={handleSubmit} style={{ display: 'flex', margin: 'auto', background: '#F083A6', color: 'white', marginBottom:'1em' }}>Login</Button>
            <Button onClick={goToRegister} style={{ display: 'flex', margin: 'auto', background: '#F083A6', color: 'white' }}>Registrar</Button>
          </Form>
        }
      </div>
      <Benefits />
    </LayoutFour>
  );
}
