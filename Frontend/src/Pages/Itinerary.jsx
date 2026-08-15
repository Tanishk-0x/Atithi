import React, { useContext, useState } from 'react';
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext';

const Itinerary = () => {

  const { serverUrl } = useContext(authDataContext) ; 

  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);
  const [error, setError] = useState('');

  const IconPin = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2C7.8 2 4.4 5.4 4.4 9.6c0 5.6 6.4 11.6 7.1 12.3.3.3.7.3 1 0 .7-.7 7.1-6.7 7.1-12.3C19.6 5.4 16.2 2 12 2z"
        fill="currentColor"
      />
      <circle cx="12" cy="9.6" r="2.6" fill="white" />
    </svg>
  );

  const IconCompass = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.2 8.8l-2 4.4-4.4 2 2-4.4 4.4-2z" fill="currentColor" />
    </svg>
  );

  const IconArrow = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const IconRoute = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 7c3 0 2 6 5 6s2-6 5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );

  const IconClock = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const IconTip = ({ className = '' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3a6 6 0 00-3.4 10.9c.6.4.9 1 .9 1.7v.4h5v-.4c0-.7.3-1.3.9-1.7A6 6 0 0012 3z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 19h4M10.5 21h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );

  const generateItinerary = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setLoading(true);
    setError('');
    setItineraryData(null);

    try {
      const { data: result } = await axios.post(serverUrl + '/itinerary/generate', {
        destination,
      });

      if (result.success) {
        setItineraryData(result.itenary);
      } else {
        setError(result.message || 'Failed to generate itinerary.');
      }
    } catch (err) {
      setError('Server connection failed. Please check your backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF8] text-[#241A18]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }

        @keyframes floatIn {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.9; }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }

        .hero-fade { animation: floatIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-fade-delay-1 { animation: floatIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.12s both; }
        .hero-fade-delay-2 { animation: floatIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both; }

        .card-in { animation: floatIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }

        .shimmer-bg {
          background: linear-gradient(90deg, #F3E7E3 0px, #FBEFEC 40px, #F3E7E3 80px);
          background-size: 800px 100%;
          animation: shimmer 1.6s linear infinite;
        }

        .ambient-glow { animation: glow 5s ease-in-out infinite; }

        .spin-slow { animation: spinSlow 12s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade, .hero-fade-delay-1, .hero-fade-delay-2, .card-in, .shimmer-bg, .ambient-glow, .spin-slow {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* ---------------------------------------------------------- */}
      {/* Hero                                                        */}
      {/* ---------------------------------------------------------- */}
      <div className="relative overflow-hidden pt-28 pb-16 px-6 flex flex-col items-center text-center">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] bg-[radial-gradient(circle,_rgba(226,55,68,0.16)_0%,_transparent_70%)] ambient-glow -z-10" />
        <div className="absolute top-10 right-10 spin-slow opacity-[0.06] -z-10 hidden md:block">
          <IconCompass className="w-40 h-40 text-[#E23744]" />
        </div>

        <span className="hero-fade inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#B91C28] bg-[#FDEEEC] border border-[#F3D3CE] px-4 py-1.5 rounded-full mb-6">
          <IconCompass className="w-3.5 h-3.5" />
          AI Itinerary Planner
        </span>

        <h1 className="hero-fade-delay-1 font-display text-5xl md:text-6xl leading-tight text-[#241A18] mb-4">
          Plan your next <span className="text-[#E23744] italic">escape</span>
        </h1>
        <p className="hero-fade-delay-1 text-[#8A7F7C] max-w-xl text-lg mb-10">
          Tell us where you're headed and we'll map out a day-by-day route worth waking up for.
        </p>

        <form onSubmit={generateItinerary} className="hero-fade-delay-2 w-full max-w-xl">
          <div className="flex items-center bg-white rounded-full p-2 pl-6 border-2 border-[#F0E4E0] shadow-[0_10px_40px_-12px_rgba(36,26,24,0.15)] focus-within:border-[#E23744] transition-colors duration-300">
            <IconPin className="w-4 h-4 text-[#D4A9A3] mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Banaras, Goa, Manali..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-[#241A18] placeholder-[#B8ABA7] text-lg"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="group bg-gradient-to-r from-[#E23744] to-[#FF6B4A] hover:brightness-110 text-white px-7 py-3.5 rounded-full font-semibold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-[0_10px_25px_-8px_rgba(226,55,68,0.55)] shrink-0"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Crafting
                </span>
              ) : (
                <>
                  Generate
                  <IconArrow className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ---------------------------------------------------------- */}
      {/* Error                                                       */}
      {/* ---------------------------------------------------------- */}
      {error && (
        <div className="max-w-2xl mx-auto px-6 mb-8 text-center hero-fade">
          <div className="bg-[#FDEEEC] border border-[#F3D3CE] text-[#B91C28] px-5 py-4 rounded-2xl text-sm font-medium">
            {error}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------- */}
      {/* Loading skeleton                                            */}
      {/* ---------------------------------------------------------- */}
      {loading && (
        <div className="max-w-4xl mx-auto px-6 pb-24">
          <div className="flex flex-col gap-8 mt-8">
            {[1, 2].map((i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-8 shimmer-bg rounded-full shrink-0" />
                <div className="w-full shimmer-bg rounded-[1.75rem] h-56 border border-[#F0E4E0]" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------- */}
      {/* Results                                                     */}
      {/* ---------------------------------------------------------- */}
      {itineraryData && !loading && (
        <div className="max-w-4xl mx-auto px-6 pb-28">
          <div className="text-center mb-16 hero-fade">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C97B72]">Your route</span>
            <h2 className="font-display text-4xl text-[#241A18] mt-2">{itineraryData.destination}</h2>
            <div className="h-[3px] w-16 bg-gradient-to-r from-[#E23744] to-[#FF6B4A] mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-16 relative md:pl-16">
            {/* Route line */}
            <div className="hidden md:block absolute left-[1.35rem] top-2 bottom-2 w-[3px] bg-gradient-to-b from-[#E23744]/40 via-[#F0D8D2] to-transparent rounded-full" />

            {itineraryData.itinerary.map((dayData, dayIdx) => (
              <div key={dayIdx} className="relative">
                {/* Pin marker on the route */}
                <div className="hidden md:flex absolute -left-[3.25rem] top-0 flex-col items-center z-10">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E23744] to-[#FF6B4A] flex items-center justify-center shadow-[0_8px_20px_-4px_rgba(226,55,68,0.55)] ring-4 ring-[#FFFBF8]">
                    <IconPin className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Day header */}
                <div className="flex items-center gap-4 mb-7">
                  <div className="md:hidden w-11 h-11 rounded-full bg-gradient-to-br from-[#E23744] to-[#FF6B4A] flex items-center justify-center shadow-lg shrink-0">
                    <IconPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C97B72]">
                      Day {String(dayData.day).padStart(2, '0')}
                    </span>
                    <h3 className="font-display text-2xl text-[#241A18]">{dayData.title || 'On the road'}</h3>
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#F0D8D2] to-transparent ml-2" />
                </div>

                {/* Places */}
                <div className="flex flex-col gap-6 pb-4">
                  {dayData.places.map((place, placeIdx) => (
                    <div
                      key={placeIdx}
                      className="card-in group flex flex-col sm:flex-row bg-white border border-[#F0E4E0] rounded-[1.75rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_45px_-15px_rgba(226,55,68,0.28)] hover:-translate-y-1 hover:border-[#E23744]/30"
                      style={{ animationDelay: `${placeIdx * 90}ms` }}
                    >
                      {/* Image */}
                      <div className="w-full sm:w-[38%] h-56 sm:h-auto relative overflow-hidden shrink-0">
                        <img
                          src={place.imageUrl}
                          alt={place.placeName}
                          loading="lazy"
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 sm:bg-gradient-to-r sm:from-black/10" />
                        <span className="absolute bottom-3 left-3 sm:hidden inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#B91C28] text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E23744]" />
                          {place.timeSlot}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-7 flex flex-col justify-center w-full">
                        <span className="hidden sm:inline-flex w-fit items-center gap-1.5 bg-[#FDEEEC] text-[#B91C28] text-[11px] font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border border-[#F3D3CE] mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E23744]" />
                          {place.timeSlot}
                        </span>
                        <h3 className="font-display text-2xl text-[#241A18] mb-2 group-hover:text-[#B91C28] transition-colors duration-300">
                          {place.placeName}
                        </h3>

                        {/* Distance / duration meta row */}
                        {(place.distanceFromCenter || place.recommendedDuration) && (
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3">
                            {place.distanceFromCenter && (
                              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#8A7F7C]">
                                <IconRoute className="w-3.5 h-3.5 text-[#E23744]" />
                                {place.distanceFromCenter}
                              </span>
                            )}
                            {place.recommendedDuration && (
                              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#8A7F7C]">
                                <IconClock className="w-3.5 h-3.5 text-[#E23744]" />
                                {place.recommendedDuration}
                              </span>
                            )}
                          </div>
                        )}

                        <p className="text-[#8A7F7C] text-[15px] leading-relaxed">{place.description}</p>

                        {/* Transport tip */}
                        {place.transportTip && (
                          <div className="mt-4 flex items-start gap-2.5 bg-[#FFF8F3] border border-[#F3E3D3] rounded-xl px-3.5 py-2.5">
                            <IconTip className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                            <p className="text-[13px] text-[#8A6D4F] leading-snug">
                              <span className="font-semibold text-[#B45309]">Getting there: </span>
                              {place.transportTip}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Itinerary;