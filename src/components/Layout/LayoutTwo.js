import React from "react";
import Head from "next/head";

import withScrollFixed from "../../common/withScrollFixed";
import HeaderTwo from "../Header/HeaderTwo";
import FooterOne from "../Footer/FooterOne";

import ReactPixel from 'react-facebook-pixel';


let ScrollFixedHeader = withScrollFixed(HeaderTwo);

export default function LayoutTwo(props) {
  const options = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
  };
  ReactPixel.init('471256527524029', advancedMatching, options);

  ReactPixel.pageView(); // For tracking page view
  ReactPixel.track(event, data); // For tracking default events. More info about standard events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#standard-events
  ReactPixel.trackSingle('471256527524029', event, data); // For tracking default events.
  ReactPixel.trackCustom(event, data); // For tracking custom events. More info about custom events: https://developers.facebook.com/docs/facebook-pixel/implementation/conversion-tracking#custom-events
  ReactPixel.trackSingleCustom('471256527524029', event, data); // For tracking custom events.

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
