import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import PopularProductsSection from "@/components/home/PopularProductsSection";
import ServicesSection from "@/components/home/ServicesSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import PartsSection from "@/components/home/PartsSection";
import RentSection from "@/components/home/RentSection";
import VideoShowcaseSection from "@/components/home/VideoShowcaseSection";
import NewsSection from "@/components/home/NewsSection";
import PartnersSection from "@/components/home/PartnersSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import SeoSection from "@/components/home/SeoSection";
import ContactsSection from "@/components/home/ContactsSection";
import MaxPopup from "@/components/MaxPopup";

const Index = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main className="overflow-x-hidden">
        <HeroSection />
        <PopularProductsSection />
        <VideoShowcaseSection />
        <CategoriesSection />
        <PartsSection />
        <ServicesSection />
        <RentSection />
        <NewsSection />
        <PartnersSection />
        <ReviewsSection />
        <SeoSection />
        <ContactsSection />
      </main>
      <Footer />
      <MaxPopup />
    </div>
  );
};

export default Index;
