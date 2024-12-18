import React from 'react';
import { Link } from 'react-router-dom';
import { Tv2, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Tv2 className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold">StreamVerse</span>
            </Link>
            <p className="mt-4 text-gray-300">
              Premium TV streaming service for all your entertainment needs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/pricing" className="text-gray-300 hover:text-emerald-500">Pricing</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-emerald-500">Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-emerald-500">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-500">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-500">FAQ</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-emerald-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-emerald-500">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-300 text-sm text-center">
            © 2024 StreamVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}