import { CheckCircle } from 'lucide-react';
import ContinueShoppingButton from '@/components/store/ContinueShoppingButton';

export default function ThankYouPage() {
  return (
    // Responsive vertical padding
    <div className="bg-gray-50 flex items-center justify-center min-h-[60vh] px-4 py-16 sm:py-20">
      {/* Responsive padding */}
      <div className="text-center bg-white p-8 sm:p-12 rounded-lg shadow-md max-w-lg w-full">
        <CheckCircle className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
        {/* Responsive font size */}
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900">Thank you for your order!</h1>
        <p className="mt-2 text-base text-gray-600">
          Your order has been placed successfully and is now pending. We will contact you shortly for confirmation.
        </p>
        <div className="mt-8">
          <ContinueShoppingButton />
        </div>
      </div>
    </div>
  );
}