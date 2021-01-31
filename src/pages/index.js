import LayoutTwo from "../components/Layout/LayoutTwo";
import SliderTwo from "../components/Sections/Slider/SliderTwo";
import sliderData from "../data/slider/sliderTwo.json";
import CategoriesOne from "../components/Sections/Categories/CategoriesOne";
import categoriesOneData from "../data/categories/categoryOne.json";
import ProductTabOne from "../components/Sections/ProductThumb/ProductTab/ProductTabOne";
import productTabOneData from "../data/products.json";
import DaleOfWeekOne from "../components/Sections/DealOfWeek/DaleOfWeekOne";
import BlogOne from "../components/Sections/Blog/BlogOne";
import blogOneData from "../data/blog/blog.json";
import BrandsOne from "../components/Sections/Brands/BrandsOne";
import Benefits from "../components/Other/Benefits";
import InstagramOne from "../components/Sections/Instagram/InstagramOne";
import { shop } from "../common/variables";

export default function Home({banners, categories, products}) {

  return (
    <LayoutTwo title="Loja da Mona">
      <SliderTwo className="-style-2" data={banners} showDots />
      {/* <CategoriesOne data={categoriesOneData} /> */}
      <ProductTabOne data={products} categories={categories} />
      {/* <DaleOfWeekOne
        subTitle="Deal of the week"
        title="Lip and liner duo"
        last={100000000}
      /> */}
      {/* <BlogOne data={blogOneData.slice(0, 4)} /> */}
      {/* <BrandsOne /> */}
      <Benefits />
      {/* <InstagramOne /> */}
    </LayoutTwo>
  );
}
