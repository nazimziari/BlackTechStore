'use client';

import { useEffect, useState } from 'react';
import QuickViewModal from '@/components/store/QuickViewModal';

// --- THE FIX IS HERE ---
// Ensure this line is exactly "export default function ModalProvider"
export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  // This useEffect ensures that the modal is only rendered on the client side.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // On the server or during the initial client render, render nothing.
  if (!isMounted) {
    return null;
  }

  // Once the component has mounted on the client, safely render the modal.
  return (
    <>
      <QuickViewModal />
    </>
  );
}