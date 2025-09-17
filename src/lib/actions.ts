'use server';

import { redirect } from 'next/navigation';
import dbConnect from './dbConnect';
import Message from './models/Message';
import Order from './models/Order'; // --- 1. IMPORT THE ORDER MODEL ---
import { CartItem } from '@/stores/cartStore'; // --- 2. IMPORT THE CARTITEM TYPE ---

// This type is shared by both of our form actions
export type FormState = {
  success: boolean;
  message: string;
};

// --- Contact Form Action (unchanged) ---
export async function submitContactForm(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;
  
  if (!name || !email || !phone || !message) {
    return { success: false, message: 'Please fill out all fields.' };
  }

  try {
    await dbConnect();
    await Message.create({ name, email, phone, message });
    return { success: true, message: 'Your message has been sent successfully!' };
  } catch (error) {
    console.error('Error saving message:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}


// --- 3. THE NEW CREATE ORDER ACTION ---
export async function createOrder(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const city = formData.get('city') as string; 
  const address = formData.get('address') as string;
  const cartItemsString = formData.get('cartItems') as string;

  if (!name || !email || !phone || !city || !address || !cartItemsString) {
    return { success: false, message: 'Please fill out all required fields.' };
  }

  let cartItems: CartItem[] = [];
  try {
    cartItems = JSON.parse(cartItemsString);
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return { success: false, message: 'Your cart is empty.' };
    }
  } catch (error) {
    return { success: false, message: 'There was an error processing your cart.' };
  }

  try {
    await dbConnect();

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const productsForOrder = cartItems.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    await Order.create({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerCity: city,
      customerAddress: address,
      products: productsForOrder,
      totalAmount: totalAmount,
      status: 'Pending',
    });
    
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, message: 'Database error: Could not save your order.' };
  }

  redirect('/thank-you');
}