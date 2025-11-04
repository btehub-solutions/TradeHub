import Link from "next/link";
import { Search, Plus, MapPin, Tag } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Buy & Sell Pre-Loved Items
            </h1>
            <p className="text-lg sm:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Nigeria's trusted marketplace for quality second-hand items
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full px-4 py-3 sm:py-4 pl-12 pr-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                href="/listings"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Listings
              </Link>
              <Link
                href="/listings/new"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-800 text-white rounded-lg font-semibold hover:bg-primary-900 transition-colors border-2 border-white"
              >
                <Plus className="w-5 h-5 mr-2" />
                Post an Ad
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/listings?category=${category.slug}`}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-3">
                  <Tag className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.count} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 TradeHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const categories = [
  { name: "Electronics", slug: "electronics", count: 1234 },
  { name: "Fashion", slug: "fashion", count: 2456 },
  { name: "Furniture", slug: "furniture", count: 789 },
  { name: "Phones", slug: "phones", count: 3421 },
  { name: "Vehicles", slug: "vehicles", count: 567 },
  { name: "Home & Garden", slug: "home-garden", count: 890 },
  { name: "Sports", slug: "sports", count: 345 },
  { name: "Books", slug: "books", count: 678 },
];

const steps = [
  {
    title: "Create Account",
    description: "Sign up with your phone number in seconds",
  },
  {
    title: "Post Your Item",
    description: "Add photos and details about what you're selling",
  },
  {
    title: "Connect & Sell",
    description: "Chat with buyers and close the deal",
  },
];
