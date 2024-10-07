import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Header from "@/components/main/Header";
import ProductsCarousel from "@/components/main/ProductsCarousel";
import Promo from "@/components/main/Promo"
import TopSell from "@/components/main/TopSell"

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mx-10">
        <Header />
        <ProductsCarousel/>
        <Promo/>
        <TopSell/>
        <Footer/>
      </div>
    </div>
  );
}
