import { useState } from 'react';
import AddSlotForm from './components/AddSlotForm';
import SlotList from './components/SlotList';
import ParkVehicle from './components/ParkVehicle';
import RemoveVehicle from './components/RemoveVehicle';
import OutputPanel from './components/OutputPanel';
import { parkVehicle, removeVehicle, validateSlotAddition } from './utils/parkingLogic';

function App() {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
  };

  const handleAddSlot = (slotData) => {
    const validation = validateSlotAddition(slots, slotData.slotNo);
    if (!validation.valid) {
      showMessage(validation.message, 'error');
      return;
    }
    setSlots([...slots, { ...slotData, isOccupied: false }]);
    showMessage(`Slot ${slotData.slotNo} added successfully`, 'success');
  };

  const handleParkVehicle = (needsEV, needsCover) => {
    if (slots.length === 0) {
      showMessage('No parking slots available', 'error');
      return;
    }
    const result = parkVehicle(slots, needsEV, needsCover);
    if (result.success) {
      setSlots(slots.map(slot => 
        slot.slotNo === result.slotNo ? { ...slot, isOccupied: true } : slot
      ));
    }
    showMessage(result.message, result.success ? 'success' : 'error');
  };

  const handleRemoveVehicle = (slotNo) => {
    const result = removeVehicle(slots, slotNo);
    if (result.success) {
      setSlots(slots.map(slot => 
        slot.slotNo === slotNo ? { ...slot, isOccupied: false } : slot
      ));
    }
    showMessage(result.message, result.success ? 'success' : 'error');
  };

  const totalSlots = slots.length;
  const availableSlots = slots.filter(s => !s.isOccupied).length;
  const occupiedSlots = totalSlots - availableSlots;
  const evSlots = slots.filter(s => s.isEVCharging).length;
  const coveredSlots = slots.filter(s => s.isCovered).length;

  return (
    <div 
      className="min-h-screen relative bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1920&q=80)'
      }}
    >
      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90" />
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <OutputPanel message={message} type={messageType} />
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900 tracking-tight">Smart Parking System</h1>
                <p className="text-xs text-slate-500">AI-Optimized Parking Allocation</p>
              </div>
            </div>
            
            {/* KPI Cards */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                    <svg className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-slate-900 leading-none">{totalSlots}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Total Slots</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-emerald-600 leading-none">{availableSlots}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Available</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-rose-50 rounded-lg flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                    <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-rose-600 leading-none">{occupiedSlots}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Occupied</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-sky-50 rounded-lg flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                    <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-sky-600 leading-none">{evSlots}</p>
                    <p className="text-xs text-slate-500 mt-0.5">EV Ready</p>
                  </div>
                </div>
              </div>
              
              <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-amber-600 leading-none">{coveredSlots}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Covered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column - Actions */}
          <div className="xl:col-span-4 space-y-5">
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <AddSlotForm onAddSlot={handleAddSlot} />
            </div>
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <ParkVehicle onParkVehicle={handleParkVehicle} slots={slots} />
            </div>
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
              <RemoveVehicle onRemoveVehicle={handleRemoveVehicle} slots={slots} />
            </div>
          </div>
          
          {/* Right Column - Slot Overview */}
          <div className="xl:col-span-8 transform transition-all duration-300 hover:scale-[1.005]">
            <SlotList slots={slots} />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm py-6 mt-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-slate-400">© 2024 Smart Parking System. Powered by AI-Optimized Allocation.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
