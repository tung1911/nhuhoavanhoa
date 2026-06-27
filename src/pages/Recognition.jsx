import React, { useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { User, Search, Send, Shield, Users, Lightbulb, Target, Check, ChevronsUpDown, Heart, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userNames } from '../data/users';
import CoreValueCard from '../components/CoreValueCard';
import RecognitionSendAnimation from '../components/RecognitionSendAnimation';
import { RecognitionQuoteModal, recognitionQuotes } from '../components/RecognitionQuoteModal';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const CORE_VALUES = [
  {
    id: 'Nói được làm được',
    title: 'Nói được làm được',
    description: 'Nói là làm, đã cam kết thì cố gắng làm đến nơi đến chốn.',
    colorClass: 'core1',
    icon: Target
  },
  {
    id: 'Chân thật',
    title: 'Chân thật',
    description: 'Thật thà với đồng nghiệp, chân thành với khách hàng.',
    colorClass: 'core2',
    icon: Shield
  },
  {
    id: 'Tâm huyết',
    title: 'Tâm huyết',
    description: 'Tận tâm với khách hàng, nhiệt huyết với công việc.',
    colorClass: 'core3',
    icon: Heart
  },
  {
    id: 'Khách hàng là số 1',
    title: 'Khách hàng là số 1',
    description: 'Tận tâm phục vụ, tận tình chăm sóc để khách hàng luôn cảm thấy được trân trọng.',
    colorClass: 'core4',
    icon: Star
  },
  {
    id: 'Đổi mới sáng tạo',
    title: 'Đổi mới sáng tạo',
    description: 'Liên tục học hỏi, đổi mới không ngừng để làm tốt hơn mỗi ngày.',
    colorClass: 'core5',
    icon: Lightbulb
  }
];

const API_URL = 'https://script.google.com/macros/s/AKfycbzBj8vndOE_5R4CVEnDXNXsmR3YiybJDa6MEBNgMOMFoY6zAJs4sVYJqC9YOIQO0hD8gg/exec';

const Recognition = () => {
  const { user } = useAuth();
  const { loveStorageMenuRef } = useOutletContext();
  const [receiver, setReceiver] = useState('');
  const [openCombobox, setOpenCombobox] = useState(false);
  const [content, setContent] = useState('');
  const [coreValue, setCoreValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [isSendAnimationPlaying, setIsSendAnimationPlaying] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("");

  const { toast } = useToast();

  const filteredUsers = userNames.filter(name => name !== user?.fullName);

  const handleReset = () => {
    setReceiver('');
    setContent('');
    setCoreValue('');
  };

  const handleSubmit = async () => {
    if (!receiver) {
      return toast({ variant: "destructive", title: "Lỗi", description: 'Vui lòng chọn người được ghi nhận' });
    }
    if (!content.trim()) {
      return toast({ variant: "destructive", title: "Lỗi", description: 'Vui lòng nhập nội dung ghi nhận' });
    }
    if (!coreValue) {
      return toast({ variant: "destructive", title: "Lỗi", description: 'Vui lòng chọn một giá trị cốt lõi' });
    }

    setIsSubmitting(true);
    try {
      const payload = {
        recognizer: user.fullName,
        receiver,
        content: content.trim(),
        coreValue
      };
      
      // Dùng fetch với mode: 'no-cors' để tránh lỗi CORS Preflight của Google Apps Script
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload)
      });
      
      setIsSendAnimationPlaying(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi kết nối (" + (error.message || "Unknown") + ")",
        description: 'Vui lòng nhấn phím Ctrl + F5 (hoặc xóa lịch sử web) để tải lại bản vá lỗi mới nhất rồi thử lại!',
      });
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const handleAnimationComplete = () => {
    setIsSendAnimationPlaying(false);
    
    const targets = document.querySelectorAll('.target-love-storage-icon');
    targets.forEach(target => {
      target.classList.add('love-storage-glow');
      setTimeout(() => {
        target.classList.remove('love-storage-glow');
      }, 600);
    });

    const randomQuote = recognitionQuotes[Math.floor(Math.random() * recognitionQuotes.length)];
    setCurrentQuote(randomQuote);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    handleReset();
    setIsSubmitting(false);
  };

  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-sm border p-6">
      <div className="mb-8 border-b pb-6">
        <h2 className="text-2xl font-bold mb-2">Ghi nhận yêu thương</h2>
        <p className="text-muted-foreground">
          Hành động nhỏ - Ý nghĩa lớn - Lan tỏa rộng
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Người ghi nhận</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                <User className="w-4 h-4" />
              </div>
              <Input
                type="text"
                readOnly
                value={user?.fullName || ''}
                className="pl-9 bg-muted cursor-not-allowed font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Người được ghi nhận <span className="text-destructive">*</span></Label>
            <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCombobox}
                  className="w-full justify-between"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    {receiver ? receiver : "Tìm theo tên đồng nghiệp..."}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Tìm đồng nghiệp..." />
                  <CommandList>
                    <CommandEmpty>Không tìm thấy đồng nghiệp phù hợp.</CommandEmpty>
                    <CommandGroup>
                      {filteredUsers.map((name) => (
                        <CommandItem
                          key={name}
                          value={name}
                          onSelect={(currentValue) => {
                            setReceiver(currentValue);
                            setOpenCombobox(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              receiver === name ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <Label>Nội dung ghi nhận <span className="text-destructive">*</span></Label>
              <span className="text-xs text-muted-foreground font-medium">
                {content.length}/500
              </span>
            </div>
            <Textarea
              value={content}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setContent(e.target.value);
                }
              }}
              rows={5}
              placeholder="Viết nội dung ghi nhận tại đây..."
              className="resize-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Giá trị cốt lõi <span className="text-destructive">*</span></Label>
          <RadioGroup value={coreValue} onValueChange={setCoreValue} className="gap-4">
            {CORE_VALUES.map(val => (
              <div key={val.id} className="relative">
                <RadioGroupItem value={val.id} id={val.id} className="peer sr-only" />
                <Label
                  htmlFor={val.id}
                  className={cn(
                    "relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-start gap-4 hover:border-primary/50 bg-background",
                    coreValue === val.id ? `border-${val.colorClass} bg-${val.colorClass}/5 shadow-md shadow-${val.colorClass}/10` : "border-border"
                  )}
                >
                  <div className={cn(
                    "p-2.5 rounded-full flex-shrink-0 transition-colors",
                    coreValue === val.id ? `bg-${val.colorClass} text-white` : "bg-muted text-muted-foreground"
                  )}>
                    <val.icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 mt-0.5">
                    <h3 className={cn(
                      "font-bold text-base mb-1 transition-colors",
                      coreValue === val.id ? `text-${val.colorClass}` : "text-foreground"
                    )}>
                      {val.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-normal leading-snug">
                      {val.description}
                    </p>
                  </div>

                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 transition-colors",
                    coreValue === val.id ? `border-${val.colorClass}` : "border-input"
                  )}>
                    {coreValue === val.id && <div className={`w-2.5 h-2.5 rounded-full bg-${val.colorClass}`} />}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t flex justify-end gap-4">
        <Button 
          variant="outline"
          onClick={handleReset}
          disabled={isSubmitting || isSendAnimationPlaying}
        >
          Hủy
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || isSendAnimationPlaying}
          className="bg-primary text-primary-foreground hover:bg-primaryHover"
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting || isSendAnimationPlaying ? 'Đang gửi yêu thương...' : 'Gửi ghi nhận'}
        </Button>
      </div>

      <RecognitionSendAnimation 
        isPlaying={isSendAnimationPlaying} 
        targetRef={loveStorageMenuRef} 
        onComplete={handleAnimationComplete} 
      />
      
      <RecognitionQuoteModal 
        isOpen={isQuoteModalOpen} 
        quote={currentQuote} 
        onClose={handleCloseQuoteModal} 
      />
    </div>
  );
};

export default Recognition;
