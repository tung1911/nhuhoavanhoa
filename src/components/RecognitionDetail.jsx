import React from 'react';
import { X, Heart, Clock, User, ArrowRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const formatDateOnly = (dateStr) => {
  if (!dateStr) return '';
  if (dateStr.includes('T') && dateStr.endsWith('Z')) return new Date(dateStr).toLocaleDateString('vi-VN');
  return dateStr.split(' ').find(p => p.includes('/')) || dateStr.split(' ')[0] || dateStr;
};

const valueColors = {
  'Nói được làm được': 'bg-core1/10 text-core1 border-core1/20',
  'Chân thật': 'bg-core2/10 text-core2 border-core2/20',
  'Tâm huyết': 'bg-core3/10 text-core3 border-core3/20',
  'Khách hàng là số 1': 'bg-core4/10 text-core4 border-core4/20',
  'Đổi mới sáng tạo': 'bg-core5/10 text-core5 border-core5/20',
  'Chính trực': 'bg-core1/10 text-core1 border-core1/20',
  'Tôn trọng': 'bg-core2/10 text-core2 border-core2/20',
  'Tận tâm': 'bg-core3/10 text-core3 border-core3/20',
  'Sáng tạo': 'bg-core5/10 text-core5 border-core5/20',
};

const RecognitionDetail = ({ data, onClose }) => {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-muted/30 border rounded-xl border-dashed">
        <Heart className="w-12 h-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-muted-foreground font-medium">Chọn một ghi nhận để xem chi tiết</h3>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl shadow-lg border flex flex-col h-full overflow-hidden relative">
      <div className="p-4 border-b flex items-center justify-between bg-muted/30">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <Heart className="w-5 h-5 text-destructive" />
          Chi tiết ghi nhận
        </h3>
        <Button 
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col gap-6">
          {/* Header Info */}
          <div className="bg-muted/30 p-4 rounded-xl border flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Người gửi</span>
              <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <User className="w-4 h-4 text-muted-foreground" />
                {data.recognizer}
              </span>
            </div>
            
            <div className="flex justify-center -my-2">
              <ArrowRight className="w-5 h-5 text-muted-foreground/50 transform rotate-90 lg:rotate-0" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Người nhận</span>
              <span className="text-sm font-bold text-primary flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary/50" />
                {data.receiver}
              </span>
            </div>
          </div>

          {/* Core Value & Time */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Giá trị cốt lõi</p>
              <span className={cn(
                "inline-block px-3 py-1 rounded-full text-xs font-bold border",
                valueColors[data.coreValue] || "bg-muted text-muted-foreground border-border"
              )}>
                {data.coreValue}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-muted-foreground mb-1.5">Thời gian gửi</p>
              <span className="text-sm text-foreground flex items-center gap-1.5 justify-end">
                <Clock className="w-4 h-4 text-muted-foreground" />
                {formatDateOnly(data.date)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">Nội dung ghi nhận</p>
            <div className="bg-primary/5 p-5 rounded-xl border border-primary/10 relative">
              <Quote className="absolute top-3 left-3 w-8 h-8 text-primary/10 rotate-180" />
              <p className="text-foreground leading-relaxed text-sm relative z-10 pl-6">
                {data.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecognitionDetail;
