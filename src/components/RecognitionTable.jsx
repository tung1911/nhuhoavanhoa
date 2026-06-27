import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight, Eye, Clock } from 'lucide-react';
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

const RecognitionTable = ({ data, onSelectRow, selectedId }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-card border rounded-xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">Chưa có ghi nhận nào</h3>
        <p className="text-muted-foreground">Hãy là người đầu tiên gửi lời ghi nhận yêu thương!</p>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b text-sm text-muted-foreground">
              <th className="font-semibold p-4 w-[40%]">Người gửi & Nhận</th>
              <th className="font-semibold p-4 w-[20%]">Giá trị cốt lõi</th>
              <th className="font-semibold p-4 w-[25%]">Thời gian</th>
              <th className="font-semibold p-4 w-[15%] text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item) => (
              <tr 
                key={item.id} 
                className={cn(
                  "hover:bg-muted/50 transition-colors cursor-pointer group",
                  selectedId === item.id ? "bg-primary/5 border-l-4 border-l-primary" : "border-l-4 border-l-transparent"
                )}
                onClick={() => onSelectRow(item)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{item.recognizer}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold text-primary">{item.receiver}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={cn(
                    "inline-block px-3 py-1 rounded-full text-xs font-semibold border",
                    valueColors[item.coreValue] || "bg-muted text-muted-foreground border-border"
                  )}>
                    {item.coreValue}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDateOnly(item.date)}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 focus:opacity-100 h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRow(item);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1.5" />
                    Xem
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecognitionTable;
