'use client';

import { useState } from 'react';
import ConsultationForm from './ConsultationForm';

export default function ConsultationBanner() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleBannerClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      {/* Floating Consultation Banner */}
      <div 
        className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 cursor-pointer group"
        onClick={handleBannerClick}
        role="button"
        tabIndex={0}
        aria-label="Book a FREE Consultation"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBannerClick();
          }
        }}
      >
        <div className="bg-gradient-to-b from-red-600 to-red-700 text-white rounded-l-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 group-hover:scale-105 group-hover:from-red-700 group-hover:to-red-800">
          <div className="flex flex-col items-center justify-center space-y-2 px-4 py-6 w-20 h-40">
            {/* Text Content */}
            <div className="text-center leading-tight">
              <div className="text-xs font-semibold text-white/90">Book a</div>
              <div className="text-base font-bold text-white">FREE</div>
              <div className="text-xs font-semibold text-white/90">Consultation</div>
            </div>
            
            {/* Phone Icon */}
            <div className="mt-2">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Form Modal */}
      {isFormOpen && (
        <ConsultationForm onClose={handleCloseForm} />
      )}
    </>
  );
}
