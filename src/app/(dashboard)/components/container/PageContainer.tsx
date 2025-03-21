import { JSX } from "react";


type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

const PageContainer = ({ title, description, children }: Props) => (
  // <HelmetProvider>
    <div>
      {/* <Helmet> */}
        <title>{title}</title>
        <meta name="description" content={description} />
      {/* </Helmet> */}
      {children}
    </div>
 //</HelmetProvider> 
);

export default PageContainer;
