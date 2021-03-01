import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import IntroductionOne from "../../components/Sections/Introduction/IntroductionOne";
import introductionOneData from "../../data/introduction/introductionOne.json";
import IntroductionTwo from "../../components/Sections/Introduction/IntroductionTwo";
import introductionTwoData from "../../data/pages/about.json";
import Benefits from "../../components/Other/Benefits";

export default function () {
  return (
    <LayoutFour title="Sobre nós">
      <Breadcrumb title="Sobre nós">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Sobre nós" current />
      </Breadcrumb>
      <IntroductionOne data={introductionOneData} />
      {/* <IntroductionTwo data={introductionTwoData} style={{ marginBottom: 0 }} /> */}
      <Benefits />
    </LayoutFour>
  );
}
