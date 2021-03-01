import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Link from "next/link";


import ClientOnlyPortal from "../../../common/ClientOnlyPortal";
import NavigatorMobile from "./NavigatorMobile";
import SocialIcons from "../../Other/SocialIcons";
import Select from "../../Control/Select";

export default function MobileNavSidebar({ showMobileNav, setShowMobileNav }) {
  const [searchInput, setSearchInput] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("ENG");
  return (
    <>
      <ClientOnlyPortal selector="#nav-sidebar">
        <CSSTransition
          in={showMobileNav}
          unmountOnExit
          timeout={200}
          classNames="cart-sidebar"
        >
          <div className="navigation-sidebar">
            <NavigatorMobile />
            <div className="navigation-sidebar__footer">
              <div style={{marginBottom: '1rem'}}>
                <Link href={process.env.PUBLIC_URL + '/login'}>
                  <p style={{ textDecoration: 'none', marginBottom: '1rem' }}>Login</p>
                </Link>
                <Link href={process.env.PUBLIC_URL + '/register'}>
                  <p style={{ textDecoration: 'none' }}>Registrar</p>
                </Link>
              </div>
              <SocialIcons style={{ marginTop: 12 }} />
            </div>
          </div>
        </CSSTransition>
      </ClientOnlyPortal>
      {showMobileNav && (
        <ClientOnlyPortal selector="#overlay">
          <div
            className="overlay"
            onClick={() => setShowMobileNav(false)}
          ></div>
        </ClientOnlyPortal>
      )}
    </>
  );
}
