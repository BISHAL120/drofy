import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h3 className="text-xl font-semibold mb-2 text-white">
            Subscribe to Our Newsletter
          </h3>
          <p className="mb-6 text-gray-400">
            Stay updated with our latest offers, new arrivals and exclusive
            deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-gray-800 text-white border-gray-700 focus-visible:ring-orange-500"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap">
              Subscribe <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>

        {/* Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-white text-lg mb-4">Drofy</h4>
            <p className="text-gray-400 mb-4">
              Your trusted destination for online shopping with thousands of
              products and reliable delivery services.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Return & Refund
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>1234 Street Name, City</li>
              <li>Country, Postal Code</li>
              <li>+1 234 567 8901</li>
              <li>info@drofy.com</li>
              <li>Mon - Fri: 9:00AM - 10:00PM</li>
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Drofy. All rights reserved.
          </p>
          <div className="flex items-center">
            <Image
              width={24}
              height={24}
              src="/placeholder.svg"
              alt="Payment Methods"
              className="h-6"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
