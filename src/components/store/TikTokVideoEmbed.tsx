'use client';

import { useEffect } from 'react';

// This tells TypeScript that the 'tiktok' object might exist on the window
declare global {
  interface Window {
    tiktok: {
      widgets: {
        load: () => void;
      };
    };
  }
}

export default function TikTokVideoEmbed() {
  
  useEffect(() => {
    // This function will handle loading the script and then the widgets
    const loadTikTokScript = () => {
      // Check if the script is already on the page
      if (document.querySelector('script[src="https://www.tiktok.com/embed.js"]')) {
        // If it is, and window.tiktok is ready, load the widgets
        if (window.tiktok) {
          window.tiktok.widgets.load();
        }
        return;
      }

      // If the script is not on the page, create it
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      
      // THIS IS THE KEY: We add an 'onload' event listener.
      script.onload = () => {
        if (window.tiktok) {
          window.tiktok.widgets.load();
        }
      };

      // Add the script to the body of the page
      document.body.appendChild(script);

      // Cleanup function to remove the script if the component is unmounted
      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    };

    loadTikTokScript();
    
  }, []);

  return (
    // --- THE LAYOUT FIX IS HERE ---
    // 1. A container with the black background, padding, and rounded corners.
    <div className="mt-8 bg-black rounded-lg p-4">
      {/* 2. A 2-column grid. The placeholder has been removed. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Video 1 */}
        <blockquote 
          className="tiktok-embed" 
          cite="https://www.tiktok.com/@black.tech.fzc.ll/video/7540703252225068296" 
          data-video-id="7540703252225068296" 
          style={{ maxWidth: '605px', minWidth: '325px', borderRadius: '8px', overflow: 'hidden' }}
        >
          <section></section>
        </blockquote>

        {/* Video 2 */}
        <blockquote 
          className="tiktok-embed" 
          cite="https://www.tiktok.com/@black.tech.fzc.ll/video/7542941873988554002" 
          data-video-id="7542941873988554002" 
          style={{ maxWidth: '605px', minWidth: '325px', borderRadius: '8px', overflow: 'hidden' }}
        >
          <section></section>
        </blockquote>
      </div>
    </div>
  );
}