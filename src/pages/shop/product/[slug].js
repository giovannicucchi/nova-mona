import { useEffect, useState } from 'react'
import { useRouter } from "next/router";

import { getProductBySlug } from "../../../common/productSelect";
import { getProduct } from '../../../utils/api'
import ProductDetail from "../../../components/ProductDetail/ProductDetail";
import InstagramTwo from "../../../components/Sections/Instagram/InstagramTwo";
import LayoutFour from "../../../components/Layout/LayoutFour";
import {
  Breadcrumb,
  BreadcrumbItem,
} from "../../../components/Other/Breadcrumb";
import Loading from "../../../components/Other/Loading";

import ProductSlideTwo from "../../../components/Sections/ProductThumb/ProductSlide/ProductSlideTwo";

export default function ({products}) {
  const [foundProduct, setFoundProduct] = useState()
  const router = useRouter();
  const { slug } = router.query;
  // console.log('SLUG', slug)
  const onReviewSubmit = (data) => {
    // console.log(data);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getProduct(slug);
      // console.log('response', response)
      setFoundProduct(response)
    }
    fetchData();
  }, []);


  return (
    foundProduct ? (
      <LayoutFour title={foundProduct.title}>
        <Breadcrumb title={foundProduct.title}>
          <BreadcrumbItem name="Mona" />
          <BreadcrumbItem name="Loja" />
          <BreadcrumbItem name={foundProduct.name} current />
        </Breadcrumb>
        <ProductDetail data={foundProduct} onReviewSubmit={onReviewSubmit} />
        <ProductSlideTwo data={products} />
        {/* <InstagramTwo /> */}
      </LayoutFour>
    )
      :
      <Loading />);
}
