import { useForm } from "react-hook-form";

import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import ContactInfoItem from "../../components/Pages/Contact/ContactInfoItem";
import contactData from "../../data/pages/contact.json";

export default function () {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <LayoutFour title="Entre em Contato">
      <Breadcrumb title="Entre em Contato">
        <BreadcrumbItem name="Home" />
        <BreadcrumbItem name="Entre em Contato" current />
      </Breadcrumb>
      <div className="contact">
        <div className="container">
          <div className="row" style={{justifyContent: 'center'}}>
            <div className="col-12 col-md-6">
              <h3 className="contact-title">Informação para contato</h3>
              {contactData &&
                contactData.map((item, index) => (
                  <ContactInfoItem
                    key={index}
                    iconClass={item.iconClass}
                    title={item.title}
                    detail={item.detail}
                  />
                ))}
            </div>
            
            {/* <div className="col-12 col-md-6">
              <iframe
                className="contact-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26544.761428132653!2d105.83081260286463!3d21.01523825635793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2zSMOgIE7hu5lpLCBIb8OgbiBLaeG6v20sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1594639675485!5m2!1svi!2s"
                width="100%"
                height="450"
                frameBorder="0"
                allowFullScreen
              />
            </div> */}
          </div>
        </div>
      </div>
    </LayoutFour>
  );
}
