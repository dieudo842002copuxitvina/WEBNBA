import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FertigationTimelineStepProps {
  stepNumber: number;
  icon: string;
  title: string;
  description: string;
  duration?: string;
  isLast?: boolean;
}

export function FertigationTimelineStep({
  stepNumber,
  icon,
  title,
  description,
  duration,
  isLast = false,
}: FertigationTimelineStepProps) {
  return (
    <div className="flex gap-6 relative pb-8">
      {/* Timeline Line - left side connector */}
      {!isLast && (
        <div className="absolute left-[1.65rem] top-12 h-8 w-0.5 bg-gradient-to-b from-[#2D5A27] to-[#2D5A27]/20" />
      )}

      {/* Step Circle */}
      <div className="relative shrink-0 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#2D5A27] to-[#1a3716] shadow-lg">
        <span className="text-lg">{icon}</span>
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#2D5A27]/10 text-[#2D5A27] text-xs font-bold">
                {stepNumber}
              </span>
              {title}
            </h4>
          </div>
          {duration && (
            <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[#2D5A27]/8 px-2.5 py-1 text-xs font-semibold text-[#2D5A27]">
              ⏱️ {duration}
            </span>
          )}
        </div>
        <p className="text-[13px] text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
