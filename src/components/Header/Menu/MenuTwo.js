import React, { useContext } from "react";
import { Container } from "reactstrap";
import Link from "next/link";

import Navigator from "../Elements/Navigator";
import MenuFunctionIcons from "../Elements/MenuFunctionIcons";
import { renderContainer } from "../../../common/utils";

import AuthContext from '../../../context/AuthContext'
import { logout } from "../../../../lib/auth";


const data = [
  { title: "Sobre nós", to: "/other/about" },
  { title: "Contato", to: "/other/contact" }
];

export default function MenuTwo({ container }) {
  const { user, setUser } = useContext(AuthContext)

  return (
    <div className="menu -style-2">
      <div className={renderContainer(container)}>
        <div className="menu__wrapper">
          {/* <MenuFunctionIcons hide="cart" /> */}
          <div className="navigator" style={{alignItems: 'center'}}>
            <ul className="navigator_part -left">
              {/* {data.slice(0, 4).map((item, index) => (
                <li key={index}>
                  <Link href={process.env.PUBLIC_URL + item.to}>
                    <a>{item.title}</a>
                  </Link>
                </li>
              ))} */}
            </ul>
            <Link href={process.env.PUBLIC_URL + "/"}>
              <a className="menu__wrapper__logo">
                <img src="/assets/images/logo.png" alt="Logo" />
              </a>
            </Link>
            <ul className="navigator_part -right">
              {data.map((item, index) => (
                <li key={index}>
                  <Link href={process.env.PUBLIC_URL + item.to}>
                    <a>{item.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="navigator">
            <ul className="navigator_part -right">


              {user ?
                <li>
                  <a onClick={() => {
                    logout();
                    setUser(null);
                  }}>Logout</a>
                </li>
                :
                <>
                  <li>
                    <Link href={process.env.PUBLIC_URL + '/login'}>
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link href={process.env.PUBLIC_URL + '/register'}>
                      <a>Registrar</a>
                    </Link>
                  </li>
                </>
              }
            </ul>

          </div>

          <MenuFunctionIcons hide="search" />
        </div>
      </div>
    </div>
  );
}
