import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";

import SectionTitleOne from "../../SectionTitle/SectionTitleOne";
import Product from "../../../Product";
import Button from "../../../Control/Button";
import { getCategory, getProducts } from '../../../../utils/api'

export default function ProductTabOne({ data, categories }) {
  // console.log('data', data)
  const [filteredProduct, setFilteredProduct] = useState(data)
  const [currentCategory, setCurrentCategory] = useState(
    categories ? categories[0] : "loja"
  );

  useEffect(() => {
    async function fetchData() {
      const response = await getCategory(currentCategory.slug);
      setFilteredProduct(response.products)
    }
    fetchData();
  }, [currentCategory]);
  
  return (
    <div className="product-tab -style-1" >
      <div className="container">
        <SectionTitleOne align="center">Confira nossos produtos</SectionTitleOne>
        <div className="product-tab__header">
          <ul>
            {categories.map((category, index) => (
              <li
                className={classNames({ active: currentCategory === category })}
                key={index}
              >
                <Link href={process.env.PUBLIC_URL + "#"}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentCategory(category);
                    }}
                  >
                    {category.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="product-tab__content">
          {!filteredProduct || filteredProduct.length === 0 ? (
            <div className="product-tab__content__empty">
              <h3>Nenhum produto encontrado</h3>
            </div>
          ) : (
              <>
                <div className="product-tab__content__wrapper">
                  <div className="row">
                    {filteredProduct && filteredProduct.map((p, index) => (
                      <div
                        key={index}
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                      >
                        <Product data={p} products={filteredProduct}/>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
}
