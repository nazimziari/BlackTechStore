import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import ContactForm from '@/components/store/ContactForm';

// This is a Server Component that handles the page layout.
export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[292px] flex items-center justify-center text-center">
        <Image src="/logos/pc-hero2.svg" alt="Contact us background" layout="fill" objectFit="cover" className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20">
          {/* Responsive Typography */}
          <h1 className="text-white font-bold text-5xl md:text-6xl leading-tight">Contact Us</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-white py-16 md:py-20">
        {/* Responsive Padding */}
        <div className="container max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <p className="mt-2 text-gray-600">For more information, please send us a message.</p>
          </div>
          {/* Responsive grid: stacks on mobile, side-by-side on desktop */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* The ContactForm client component */}
            <ContactForm />

            {/* Right Column: Contact Info */}
            <div className="space-y-8 mt-4 md:mt-0">
              <div className="flex items-start gap-4">
                <Mail size={24} className="text-black mt-1 flex-shrink-0"/>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">Our inbox is always open.</p>
                  <a href="mailto:email@example.com" className="text-black font-medium hover:underline">email@example.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={24} className="text-black mt-1 flex-shrink-0"/>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">Give us a call during business hours.</p>
                  <a href="tel:+15550000000" className="text-black font-medium hover:underline">+1 (555) 000-0000</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-black mt-1 flex-shrink-0"/>
                <div>
                  <h3 className="font-semibold text-lg">Office</h3>
                  <p className="text-gray-600">123 Sample St, Sydney NSW 2000 AU</p>
                  <a href="#" className="text-black font-medium flex items-center gap-1 hover:underline">
                    Get Directions <ArrowRight size={16}/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}