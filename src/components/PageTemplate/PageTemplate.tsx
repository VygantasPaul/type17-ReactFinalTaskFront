import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
type TemplateType = {
  children: ReactNode;
};
const PageTemplate: React.FC<TemplateType> = ({ children }) => {
  return (
    <div>
      <div className={`flex flex-col h-screen `}>
        <Header />
        <main
          className={`flex  flex-col items-center justify-between  flex-1 p-24 ${montserrat.className}`}
        >
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default PageTemplate;
