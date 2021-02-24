import { useState, useContext, useEffect } from 'react'
import { useRouter } from "next/router";
import AuthContext from "../../../context/AuthContext";

import LayoutFour from "../../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../../components/Other/Breadcrumb";
import Benefits from "../../../components/Other/Benefits";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default function () {
  const authContext = useContext(AuthContext)
  const router = useRouter();

  const params = new URLSearchParams(document.location.search);
  const order = {
    collection_id: params.get("collection_id"),
    collection_status: params.get("collection_status"),
    payment_id: params.get("payment_id"),
    status: params.get("status"),
    external_reference: params.get("external_reference"),
    payment_type: params.get("payment_type"),
    external_reference: params.get("external_reference"),
    preference_id: params.get("preference_id"),
    processing_mode: params.get("processing_mode"),
    merchant_account_id: params.get("merchant_account_id"),
  }
  console.info(order); //show C

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
// ?collection_id=13800597501&collection_status=pending&
// payment_id=13800597501&status=pending&external_reference=null
// &payment_type=ticket&merchant_order_id=2361170166&
// preference_id=202090798-c3b01ea4-6204-47b4-8e1c-6c3e87db11bf&site_id=MLB&
// processing_mode=aggregator&merchant_account_id=null