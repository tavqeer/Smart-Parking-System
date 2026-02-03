const SlotList = ({ slots }) => {
  const availableCount = slots.filter(s => !s.isOccupied).length;
  const occupiedCount = slots.filter(s => s.isOccupied).length;

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 bg-white/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 tracking-tight">Parking Slots</h2>
              <p className="text-xs text-slate-500">{slots.length} total slots</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-lg">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              {availableCount} Available
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-lg">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
              {occupiedCount} Occupied
            </span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      {slots.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-5">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-slate-900">No parking slots</h3>
          <p className="text-xs text-slate-500 mt-1 text-center">Add slots using the form to get started</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-slate-50/50">
            <div className="col-span-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Slot</div>
            <div className="col-span-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Type</div>
            <div className="col-span-3 text-xs font-medium text-slate-500 uppercase tracking-wide">Features</div>
            <div className="col-span-3 text-xs font-medium text-slate-500 uppercase tracking-wide text-right">Status</div>
          </div>
          
          {/* Slot Rows */}
          {slots
            .sort((a, b) => a.slotNo - b.slotNo)
            .map((slot) => (
              <div 
                key={slot.slotNo} 
                className="grid grid-cols-12 gap-4 px-5 py-3.5 items-center hover:bg-slate-50/80 transition-colors duration-150"
              >
                <div className="col-span-3">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold ${
                    slot.isOccupied 
                      ? 'bg-rose-50 text-rose-600' 
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    #{slot.slotNo}
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-2">
                    {slot.isCovered ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 text-xs font-medium rounded-md">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 3v4H3V3h2zm10 0h-2v4h2V3zM3 7v10h14V7H3zm2 2h10v6H5V9z" />
                        </svg>
                        Covered
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                        Open
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-span-3">
                  {slot.isEVCharging ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-sky-50 text-sky-700 text-xs font-medium rounded-md">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                      </svg>
                      EV
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">Standard</span>
                  )}
                </div>
                <div className="col-span-3 flex justify-end">
                  {slot.isOccupied ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-700 text-xs font-medium rounded-full">
                      Occupied
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      Available
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SlotList;
