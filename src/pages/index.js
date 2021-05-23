import LayoutTwo from "../components/Layout/LayoutTwo";
import SliderTwo from "../components/Sections/Slider/SliderTwo";
import ProductTabOne from "../components/Sections/ProductThumb/ProductTab/ProductTabOne";
import Benefits from "../components/Other/Benefits";
import InstagramOne from "../components/Sections/Instagram/InstagramOne";

export default function Home({banners, categories, products}) {

  return (
    <LayoutTwo title="Loja da Mona">
      <SliderTwo className="-style-2" data={banners} showDots />
      <ProductTabOne data={products} categories={categories} />
      <Benefits />
    </LayoutTwo>
  );
}
