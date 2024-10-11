import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gray-300 text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <h1 className="flex text-primary font-bold text-xl">corkcicle.</h1>
            <p className="text-sm">
              Our official online store provides high-quality products with the best service for customer satisfaction.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contacts" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>147 Kranggan St, Bekasi, 2239</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+62 123 4567 890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>corcicle@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe to Newsletter</h3>
            <p className="text-sm mb-4">Get the latest updates and exclusive offers.</p>
            <form className="flex flex-col space-y-2">
              <Input type="email" placeholder="Your Email Address" className="bg-white border-gray-700" />
              <Button type="submit" className="bg-primary hover:bg-primary/90">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="hover:text-white transition-colors"><Facebook /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter /></a>
            <a href="#" className="hover:text-white transition-colors"><Youtube /></a>
          </div>
          <p className="text-sm text-center md:text-right">
            &copy; {new Date().getFullYear()} Corcicle. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
