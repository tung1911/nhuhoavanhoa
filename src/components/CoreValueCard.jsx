import React from 'react';
import clsx from 'clsx';

const CoreValueCard = ({ 
  value, 
  title, 
  description, 
  colorClass, 
  icon: Icon, 
  selected, 
  onSelect 
}) => {
  return (
    <div 
      onClick={() => onSelect(value)}
      className={clsx(
        "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-4",
        selected 
          ? `border-${colorClass} bg-${colorClass}/5 shadow-md shadow-${colorClass}/10` 
          : "border-slate-100 hover:border-slate-300 bg-white"
      )}
    >
      <div className={clsx(
        "p-2.5 rounded-full flex-shrink-0 transition-colors",
        selected ? `bg-${colorClass} text-white` : "bg-slate-100 text-slate-500"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      
      <div className="flex-1">
        <h3 className={clsx(
          "font-bold text-lg mb-1 transition-colors",
          selected ? `text-${colorClass}` : "text-slate-800"
        )}>
          {title}
        </h3>
        <p className="text-sm text-slate-500 leading-snug">
          {description}
        </p>
      </div>

      <div className={clsx(
        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors",
        selected ? `border-${colorClass}` : "border-slate-300"
      )}>
        {selected && <div className={`w-2.5 h-2.5 rounded-full bg-${colorClass}`} />}
      </div>
    </div>
  );
};

export default CoreValueCard;
