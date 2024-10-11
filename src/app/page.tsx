import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/main/Header";
import ProductsShow from "@/components/main/ProductsShow";
import { Testimonial } from "@/components/main/testimonial";
import Globe from "@/components/main/globe"
import Inovasion from "@/components/main/inovasion";
import Majesty from "@/components/main/majesty";


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="font-serif">
        <Header />
        <ProductsShow/>
        <Testimonial/>
        <Globe/>
        <Inovasion/>
        <Majesty/>
        <Footer/>
      </div>
    </div>
  );
}
