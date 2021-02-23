import { useState, useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";

import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import Benefits from "../../components/Other/Benefits";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default function () {
  const authContext = useContext(AuthContext)
  const router = useRouter();

  return (
    <LayoutFour title="Pendente">
      <Breadcrumb title="Pendente">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Pendente" current />
      </Breadcrumb>
      <p style={{textAlign: 'center', marginBottom: 50}}>
        Sua ordem está pendente

      </p>
    
      <Benefits />
    </LayoutFour>
  );
}
