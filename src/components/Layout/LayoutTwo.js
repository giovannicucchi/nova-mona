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
        <script>
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                      n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '471256527524029');
          fbq('track', 'PageView');
          </script>
        <noscript><img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=471256527524029&ev=PageView&noscript=1"
        /></noscript>
      </Head>
      <ScrollFixedHeader container={props.container} />
      {props.children}
      <FooterOne />
    </>
  );
}
