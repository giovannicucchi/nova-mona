import React from "react";
import Link from "next/link";

import Navigator from "../Elements/Navigator";
import MenuFunctionIcons from "../Elements/MenuFunctionIcons";
import { renderContainer } from "../../../common/utils";

export default function MenuThree({ hide, container }) {
  return (
    <div className="menu -style-3" style={{backgroundColor: ' #F083A6 ' }}>
      <div className={renderContainer(container)}>
        <div className="menu__wrapper">
          <Link href="/">
            <a className="menu__wrapper__logo">
              <img
                src={process.env.PUBLIC_URL + "/assets/images/logo.png"}
                alt="Logo"
              />
            </a>
          </Link>
          <Navigator className="-white" />
          {/* <MenuFunctionIcons hide={hide} white className="-white" /> */}
        </div>
      </div>
    </div>
  );
}