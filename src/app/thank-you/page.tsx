import { CheckCircle } from 'lucide-react';
// --- 1. IMPORT OUR NEW CLIENT COMPONENT ---
import ContinueShoppingButton from '@/components/store/ContinueShoppingButton';

export default function ThankYouPage() {
  return (
    <div className="bg-gray-50 flex items-center justify-center py-20">
      <div className="text-center bg-white p-12 rounded-lg shadow-md">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900">Thank you for your order!</h1>
        <p className="mt-2 text-gray-600">Your order has been placed successfully and is now pending.</p>
        <div className="mt-6">
          {/* --- 2. USE THE NEW BUTTON COMPONENT --- */}
          <ContinueShoppingButton />
        </div>
      </div>
    </div>
  );
}