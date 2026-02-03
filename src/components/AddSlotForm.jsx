import { useState } from 'react';

const AddSlotForm = ({ onAddSlot }) => {
  const [slotNo, setSlotNo] = useState('');
  const [isCovered, setIsCovered] = useState(false);
  const [isEVCharging, setIsEVCharging] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSlot({
      slotNo: parseInt(slotNo, 10),
      isCovered,
      isEVCharging
    });
    setSlotNo('');
    setIsCovered(false);
    setIsEVCharging(false);
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-indigo-50 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 tracking-tight">Add Parking Slot</h2>
          <p className="text-xs text-slate-500">Create a new parking space</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5 uppercase tracking-wide">
            Slot Number
          </label>
          <input
            type="number"
            value={slotNo}
            onChange={(e) => setSlotNo(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all duration-200 text-slate-900 placeholder-slate-400 text-sm"
            placeholder="Enter slot number"
            required
            min="1"
          />
        </div>
        
        <div className="space-y-2.5 pt-1">
          <label className="flex items-center justify-between cursor-pointer group py-1">
            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Covered Slot</span>
            <input
              type="checkbox"
              checked={isCovered}
              onChange={(e) => setIsCovered(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-all duration-300 flex items-center px-0.5 ${isCovered ? 'bg-amber-400' : 'bg-slate-200'}`}>
              <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-sm transform transition-all duration-300 ${isCovered ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </label>
          
          <label className="flex items-center justify-between cursor-pointer group py-1">
            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">EV Charging</span>
            <input
              type="checkbox"
              checked={isEVCharging}
              onChange={(e) => setIsEVCharging(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-all duration-300 flex items-center px-0.5 ${isEVCharging ? 'bg-sky-400' : 'bg-slate-200'}`}>
              <div className={`w-4.5 h-4.5 bg-white rounded-full shadow-sm transform transition-all duration-300 ${isEVCharging ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-0.5"
        >
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddSlotForm;
