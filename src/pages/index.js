import LayoutTwo from "../components/Layout/LayoutTwo";
import SliderTwo from "../components/Sections/Slider/SliderTwo";
import ProductTabOne from "../components/Sections/ProductThumb/ProductTab/ProductTabOne";
import Benefits from "../components/Other/Benefits";
import InstagramOne from "../components/Sections/Instagram/InstagramOne";
import { getCategories, getBanners, getProducts } from '../utils/api'


export default function Home({ pageProps }) {
  // console.log('page props home', pageProps)
  const { banners, categories, products } = pageProps
  return (
    <LayoutTwo title="Loja da Mona">
      <SliderTwo className="-style-2" data={banners} showDots />
      <ProductTabOne data={products} categories={categories} />
      <Benefits />
    </LayoutTwo>
  );
}

export async function getServerSideProps(context) {
  const categories = await getCategories();
  const banners = await getBanners();
  const products = await getProducts();

  return {
    props: {
      categories: categories,
      banners: banners,
      products: products,
    }
  };
}