import { useState } from 'react';

const ParkVehicle = ({ onParkVehicle, slots }) => {
  const [needsEV, setNeedsEV] = useState(false);
  const [needsCover, setNeedsCover] = useState(false);
  const availableSlots = slots.filter(s => !s.isOccupied);

  const handleSubmit = (e) => {
    e.preventDefault();
    onParkVehicle(needsEV, needsCover);
    setNeedsEV(false);
    setNeedsCover(false);
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">Park Vehicle</h2>
          <p className="text-xs text-slate-500">AI-optimized allocation</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-xs font-medium text-slate-600 mb-3 uppercase tracking-wide">Vehicle Requirements</p>
          <div className="space-y-2.5">
            <label className="flex items-center justify-between cursor-pointer group py-1">
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Needs EV Charging</span>
              <input
                type="checkbox"
                checked={needsEV}
                onChange={(e) => setNeedsEV(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-all duration-300 flex items-center px-0.5 ${needsEV ? 'bg-sky-400' : 'bg-slate-200'}`}>
                <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-sm transform transition-all duration-300 ${needsEV ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </label>
            
            <label className="flex items-center justify-between cursor-pointer group py-1">
              <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Needs Covered Slot</span>
              <input
                type="checkbox"
                checked={needsCover}
                onChange={(e) => setNeedsCover(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-all duration-300 flex items-center px-0.5 ${needsCover ? 'bg-amber-400' : 'bg-slate-200'}`}>
                <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-sm transform transition-all duration-300 ${needsCover ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={availableSlots.length === 0}
          className={`w-full text-sm font-medium py-2.5 px-4 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
            availableSlots.length === 0
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-emerald-500/20 hover:shadow-emerald-500/30'
          }`}
        >
          {availableSlots.length === 0 ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              No Slots Available
            </span>
          ) : (
            'Park Vehicle'
          )}
        </button>
        
        {availableSlots.length > 0 && (
          <p className="text-xs text-center text-slate-400">
            {availableSlots.length} slot{availableSlots.length !== 1 ? 's' : ''} available for allocation
          </p>
        )}
      </form>
    </div>
  );
};

export default ParkVehicle;
