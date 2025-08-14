import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
  <footer className="bg-black text-white dark:bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-3xl font-bold mb-4 flex items-center text-black-200 dark:text-green-100">
              <span className="animate-pulse text-2xl">🌱</span>
              <span className="ml-3">Greenlands</span>
            </h3>
            <p className="mb-6 text-green-900 dark:text-green-200 font-medium">
              Empowering sustainable land management through technology and innovation.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-green-700 dark:text-green-200 hover:text-green-500 dark:hover:text-green-300 transition duration-300 transform hover:scale-110" aria-label="Facebook">
                <span className="text-2xl font-bold">f</span>
              </a>
              <a href="#" className="text-green-700 dark:text-green-200 hover:text-green-500 dark:hover:text-green-300 transition duration-300 transform hover:scale-110" aria-label="Twitter">
                <span className="text-2xl font-bold">t</span>
              </a>
              <a href="#" className="text-green-700 dark:text-green-200 hover:text-green-500 dark:hover:text-green-300 transition duration-300 transform hover:scale-110" aria-label="Instagram">
                <span className="text-2xl font-bold">i</span>
              </a>
              <a href="#" className="text-green-700 dark:text-green-200 hover:text-green-500 dark:hover:text-green-300 transition duration-300 transform hover:scale-110" aria-label="YouTube">
                <span className="text-2xl font-bold">y</span>
              </a>
              <a href="#" className="text-green-700 dark:text-green-200 hover:text-green-500 dark:hover:text-green-300 transition duration-300 transform hover:scale-110" aria-label="LinkedIn">
                <span className="text-2xl font-bold">l</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-bold mb-6 text-black-200 dark:text-green-100">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-green-900 dark:text-green-200 hover:text-black-200 dark:hover:text-green-100 transition duration-300 hover:underline">Home</Link></li>
              <li><Link to="/about" className="text-green-900 dark:text-green-200 hover:text-black-200 dark:hover:text-green-100 transition duration-300 hover:underline">About</Link></li>
              <li><Link to="/services" className="text-green-900 dark:text-green-200 hover:text-black-200 dark:hover:text-green-100 transition duration-300 hover:underline">Services</Link></li>
              <li><Link to="/contact" className="text-green-900 dark:text-green-200 hover:text-black-200 dark:hover:text-green-100 transition duration-300 hover:underline">Contact</Link></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-2xl font-bold mb-6 text-green-900 dark:text-green-100">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/land-monitoring" className="text-green-900 dark:text-green-200 hover:text-black-200 dark:hover:text-green-100 transition duration-300 hover:underline">Land Monitoring</Link></li>
              <li><Link to="/analytics" className="text-green-900 dark:text-green-200 hover:text-black-200 dark:hover:text-green-100 transition duration-300 hover:underline">Analytics</Link></li>
              <li><Link to="/subsidies" className="text-green-900 dark:text-green-200 hover:text-black-200 dark:hover:text-green-100 transition duration-300 hover:underline">Subsidy Programs</Link></li>
              <li><Link to="/equipment" className="text-green-900 dark:text-green-200 hover:text-black-200 dark:hover:text-green-100 transition duration-300 hover:underline">Equipment Management</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-2xl font-bold mb-6 text-green-900 dark:text-green-100">Contact Us</h4>
            <ul className="space-y-4 text-green-900 dark:text-green-200">
              <li className="flex items-start">
                <span className="mr-3 text-xl">📍</span>
                <span className="font-medium">123 Green Street, Eco City, EC 10001</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">📞</span>
                <span className="font-medium">+254742301119</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-xl">✉️</span>
                <span className="font-medium">info@greenlands.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-400 mt-10 pt-8 text-center text-green-900 dark:text-green-200">
          <p className="text-lg">&copy; {new Date().getFullYear()} Greenlands. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
