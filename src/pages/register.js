import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import Benefits from "../../components/Other/Benefits";

export default function () {
  return (
    <LayoutFour title="Login">
      <Breadcrumb title="Login">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Login" current />
      </Breadcrumb>
      
      <Benefits />
    </LayoutFour>
  );
}
