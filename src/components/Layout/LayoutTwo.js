import React from "react";
import Head from "next/head";

import withScrollFixed from "../../common/withScrollFixed";
import HeaderTwo from "../Header/HeaderTwo";
import FooterOne from "../Footer/FooterOne";


let ScrollFixedHeader = withScrollFixed(HeaderTwo);

export default function LayoutTwo(props) {
  return (
    <>
      <Head>
        <title>{props.title || "Loja da Mona"}</title>
        <meta name="facebook-domain-verification" content="xy25p141l9eqommx4yvnykxde1jil6" />

        <img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=471256527524029&ev=PageView&noscript=1"
        />
      </Head>
      <ScrollFixedHeader container={props.container} />
      {props.children}
      <FooterOne />
    </>
  );
}
