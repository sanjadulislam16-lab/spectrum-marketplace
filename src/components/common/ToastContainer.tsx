import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCommerce();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
        };

        const bgBorders = {
          success: 'border-emerald-100 bg-white shadow-emerald-900/5',
          error: 'border-rose-100 bg-white shadow-rose-900/5',
          warning: 'border-amber-100 bg-white shadow-amber-900/5',
          info: 'border-blue-100 bg-white shadow-blue-900/5'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border shadow-lg transition-all transform animate-in slide-in-from-bottom-5 duration-200 ${
              bgBorders[toast.type]
            }`}
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-800 leading-tight">{toast.title}</div>
              {toast.description && (
                <div className="text-xs text-slate-500 mt-0.5 leading-normal">{toast.description}</div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-1 -mr-1 -mt-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
