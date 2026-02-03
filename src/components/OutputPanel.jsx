import { useEffect, useState } from 'react';

const OutputPanel = ({ message, type }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible || !message) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-xl bg-white/95 ${
        type === 'success'
          ? 'border-emerald-200'
          : 'border-rose-200'
      }`}
      style={{
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div className="flex items-center gap-3">
        {type === 'success' ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Success</p>
              <p className="text-xs text-slate-500">{message}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-50 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Error</p>
              <p className="text-xs text-slate-500">{message}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setVisible(false)}
          className="ml-2 text-slate-400 hover:text-slate-600 transition-colors p-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default OutputPanel;
