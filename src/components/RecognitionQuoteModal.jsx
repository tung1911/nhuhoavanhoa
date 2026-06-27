import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const recognitionQuotes = [
  "Khi bạn ghi nhận sự cống hiến của một người, bạn đang tiếp thêm động lực để họ tiếp tục làm điều tốt đẹp.",
  "Một lời ghi nhận đúng lúc có thể biến sự cố gắng thầm lặng thành niềm tự hào lớn.",
  "Ghi nhận không chỉ là lời khen, đó là cách chúng ta nói rằng: nỗ lực của bạn thật sự có ý nghĩa.",
  "Khi sự cống hiến được nhìn thấy, con người sẽ có thêm lý do để tận tâm hơn mỗi ngày.",
  "Một tập thể biết ghi nhận nhau là một tập thể biết cùng nhau phát triển.",
  "Lời ghi nhận hôm nay có thể trở thành nguồn năng lượng cho rất nhiều nỗ lực ngày mai.",
  "Khi bạn trân trọng đóng góp của người khác, bạn đang xây nên một môi trường làm việc tử tế hơn.",
  "Sự ghi nhận giúp mỗi người cảm thấy mình không chỉ đang làm việc, mà đang tạo ra giá trị.",
  "Một câu cảm ơn chân thành có thể khiến hành trình cố gắng của ai đó trở nên đáng giá hơn.",
  "Ghi nhận sự cống hiến là cách đơn giản nhưng mạnh mẽ để nuôi dưỡng văn hóa yêu thương trong công ty.",
  "Người được ghi nhận sẽ có thêm niềm tin rằng những điều tốt đẹp họ làm luôn được nhìn thấy.",
  "Khi lời khen được gửi đi, năng lượng tích cực sẽ được lan tỏa trong cả đội nhóm."
];

const RecognitionQuoteModal = ({ isOpen, quote, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md relative z-10 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-primary/5 p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Heart className="w-8 h-8 text-primary fill-current" />
          </div>
          
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Một lời ghi nhận có thể tạo nên rất nhiều điều tốt đẹp
          </h3>
          
          <p className="text-slate-600 italic leading-relaxed mb-8 px-2 text-sm">
            "{quote}"
          </p>

          <Button 
            onClick={onClose}
            className="w-full h-12 rounded-xl text-base shadow-md hover:shadow-lg transition-all"
          >
            Tiếp tục ghi nhận
          </Button>
        </div>
      </div>
    </div>
  );
};

export { RecognitionQuoteModal, recognitionQuotes };
