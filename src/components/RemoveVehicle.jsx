import { useState } from 'react';

const RemoveVehicle = ({ onRemoveVehicle, slots }) => {
  const [slotNo, setSlotNo] = useState('');
  const occupiedSlots = slots.filter(s => s.isOccupied);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRemoveVehicle(parseInt(slotNo, 10));
    setSlotNo('');
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">Remove Vehicle</h2>
          <p className="text-xs text-slate-500">Free up a parking space</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5 uppercase tracking-wide">
            Select Occupied Slot
          </label>
          <div className="relative">
            <select
              value={slotNo}
              onChange={(e) => setSlotNo(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all duration-200 text-slate-900 appearance-none cursor-pointer text-sm"
              required
            >
              <option value="">Choose a slot</option>
              {occupiedSlots.map(slot => (
                <option key={slot.slotNo} value={slot.slotNo}>
                  Slot #{slot.slotNo}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!slotNo || occupiedSlots.length === 0}
          className={`w-full text-sm font-medium py-2.5 px-4 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
            !slotNo || occupiedSlots.length === 0
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-rose-500/20 hover:shadow-rose-500/30'
          }`}
        >
          {occupiedSlots.length === 0 ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No Vehicles Parked
            </span>
          ) : (
            'Remove Vehicle'
          )}
        </button>
        
        {occupiedSlots.length > 0 && (
          <p className="text-xs text-center text-slate-400">
            {occupiedSlots.length} vehicle{occupiedSlots.length !== 1 ? 's' : ''} currently parked
          </p>
        )}
      </form>
    </div>
  );
};

export default RemoveVehicle;
