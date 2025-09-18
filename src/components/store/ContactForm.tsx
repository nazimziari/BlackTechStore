'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm, FormState } from '@/lib/actions';

// This helper component shows a "pending" state while the form is submitting.
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-black text-white font-semibold py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-400"
    >
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}

export default function ContactForm() {
  const initialState: FormState = { success: false, message: '' };
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          required 
          minLength={2} 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-black focus:border-black" 
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-black focus:border-black" 
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input 
          type="tel" 
          id="phone" 
          name="phone" 
          required 
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-black focus:border-black" 
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
        <textarea 
          id="message" 
          name="message" 
          rows={5} 
          required 
          maxLength={500} // Increased maxLength for better usability
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-black focus:border-black"
          placeholder="How can we help you?"
        ></textarea>
      </div>
      <div>
        <SubmitButton />
      </div>
      {state.message && (
        <p className={`text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}