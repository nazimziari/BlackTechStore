import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
// --- 1. IMPORT OUR NEW CLIENT COMPONENT ---
import ContactForm from '@/components/store/ContactForm';

// This is now a Server Component (no 'use client')
export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[292px] flex items-center justify-center text-center">
        <Image src="/logos/pc-hero2.svg" alt="Contact us background" layout="fill" objectFit="cover" className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20">
          <h1 className="text-white font-bold text-6xl leading-[60px]">Contact Us</h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-white py-20">
        <div className="container max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Contact us</h2>
            <p className="mt-2 text-gray-600">For More Informations Please Send Us A Message</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            
            {/* --- 2. RENDER THE CLIENT COMPONENT HERE --- */}
            <ContactForm />

            {/* Right Column: Contact Info */}
            <div className="space-y-8 mt-4 md:mt-0">
              <div className="flex items-start gap-4">
                <Mail size={24} className="text-black mt-1"/>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet.</p>
                  <a href="mailto:email@example.com" className="text-black font-medium">email@example.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone size={24} className="text-black mt-1"/>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet.</p>
                  <a href="tel:+15550000000" className="text-black font-medium">+1 (555) 000-0000</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin size={24} className="text-black mt-1"/>
                <div>
                  <h3 className="font-semibold text-lg">Office</h3>
                  <p className="text-gray-600">123 Sample St, Sydney NSW 2000 AU</p>
                  <a href="#" className="text-black font-medium flex items-center gap-1">Get Directions <ArrowRight size={16}/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}