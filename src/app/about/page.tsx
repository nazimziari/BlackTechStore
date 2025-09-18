import Image from 'next/image';
import Link from 'next/link';
import { Phone, CheckCircle, Smile, ExternalLink, MapPin } from 'lucide-react';
import TikTokVideoEmbed from '@/components/store/TikTokVideoEmbed';

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8.5c-2.761 0-5 2.239-5 5v5.5c0 2.485 2.015 4.5 4.5 4.5S20 21.485 20 19v-5.5c0-2.761-2.239-5-5-5z"></path>
    <path d="M8.5 4c-2.485 0-4.5 2.015-4.5 4.5V14"></path>
    <path d="M8 14a6 6 0 1 0-6-6"></path>
  </svg>
);

const InfoTag = ({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) => (
    <div className="bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-4 flex items-center gap-4">
      <div className="text-gray-800">{icon}</div>
      <div>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        <div className="font-semibold text-gray-900 whitespace-nowrap">
          {title}
        </div>
      </div>
    </div>
  );

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[292px] flex items-center justify-center text-center">
        <Image src="/logos/pc-hero2.svg" alt="About us background" layout="fill" objectFit="cover" className="absolute inset-0 z-0" priority />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20">
          <h1 className="text-white font-bold text-5xl md:text-6xl leading-tight">
            About Us
          </h1>
        </div>
      </section>

      {/* "About BLACKTECH" Section */}
      <section className="bg-white py-16 md:py-20">
        <div className="relative container max-w-[1330px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-14">
            <div className="w-full lg:w-[544px] flex-shrink-0 z-10 text-center lg:text-left">
              <h2 
                className="font-bold text-3xl md:text-[32px] leading-tight capitalize text-black"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                About BLACKTECH
              </h2>
              <p className="mt-6 text-base text-[#737373] leading-relaxed">
                BlackTech is an electronics store specializing in the sale of high-quality laptops, equipment, and accessories imported directly from the United Arab Emirates. We carefully select each product to ensure performance, reliability, and longevity. Every purchase includes a warranty and ongoing support, so you can count on us long after your order.
              </p>
            </div>
            <div className="w-full max-w-[523px] h-auto lg:h-[558px] mt-10 lg:mt-0 z-10">
              <Image
                src="/logos/pcc.svg"
                alt="About BlackTech"
                width={523}
                height={558}
                className="rounded-lg"
              />
            </div>
          </div>
          {/* Floating Info Tags: hidden on screens smaller than lg */}
          <div className="absolute hidden lg:block z-20" style={{ top: '404px', left: '558px' }}>
            <InfoTag 
              icon={<Phone size={24} />} 
              title="24/7 Customer Support" 
            />
          </div>
          <div className="absolute hidden lg:block z-20" style={{ top: '0px', left: '1156px' }}>
             <InfoTag 
              icon={<Smile size={24} />} 
              title="Affordable Prices"
              subtitle="Secure Shopping"
            />
          </div>
          <div className="absolute hidden lg:block z-20" style={{ top: '537px', left: '1013px' }}>
            <InfoTag 
              icon={<CheckCircle size={24} />} 
              title="Guaranteed Performance" 
            />
          </div>
        </div>
      </section>

      {/* "Join our TikTok Community" Section */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="container max-w-[1440px] mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="w-full lg:w-[794px]">
              <div className="max-w-[794px] text-center lg:text-left">
                <h2 className="font-bold text-3xl md:text-4xl leading-10 text-[#0D0D0D]">
                  Join our community on TikTok
                </h2>
                <p className="mt-4 text-lg text-[#737373]">
                  Discover our latest products, live demos, and exclusive offers on our official TikTok. Join our tech community!
                </p>
              </div>
              <div className="mt-8 flex justify-center lg:justify-start">
                <Link 
                  href="https://www.tiktok.com/@black.tech.fzc.ll"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white h-[43px] px-6 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  <ExternalLink size={16} />
                  <span>Visit our TikTok</span>
                </Link>
              </div>
              <TikTokVideoEmbed />
            </div>
            <div className="flex-1 w-full mt-10 lg:mt-0">
              <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178653922659!2d55.2707823!3d25.2048493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0x43234479c02875b!2sBurj%20Khalifa!5e0!3m2!1sen!2sae!4v1628509000000!5m2!1sen!2sae" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-black p-2 rounded-full"><Phone size={16} className="text-white"/></div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone Number</p>
                    <p className="text-sm text-gray-500">123 34 56 78 89</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-black p-2 rounded-full"><MapPin size={16} className="text-white"/></div>
                  <div>
                    <p className="font-semibold text-gray-900">Store Address</p>
                    <p className="text-sm text-gray-500">123 Fashion Street, Dubai, UAE</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-black p-2 rounded-full"><TikTokIcon /></div>
                  <div>
                    <p className="font-semibold text-gray-900">TikTok</p>
                    <p className="text-sm text-gray-500">@blacktech</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-black text-white p-6 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Store Hours</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Monday - Thursday</span>
                    <span>10:00 AM - 9:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Friday</span>
                    <span>2:00 PM - 10:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span>10:00 AM - 10:00 PM</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}