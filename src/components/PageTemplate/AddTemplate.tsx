import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

type TemplateType = {
  children: ReactNode;
};
const PageTemplate: React.FC<TemplateType> = ({ children }) => {
  return (
    <div className={`flex flex-col h-screen `}>
      <Header />
      <main className={`flex-1 px-3 lg:px-5  ${montserrat.className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageTemplate;
