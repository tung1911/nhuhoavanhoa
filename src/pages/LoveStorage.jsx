import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';
import RecognitionTable from '../components/RecognitionTable';
import RecognitionDetail from '../components/RecognitionDetail';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const API_URL = 'https://script.google.com/macros/s/AKfycbzBj8vndOE_5R4CVEnDXNXsmR3YiybJDa6MEBNgMOMFoY6zAJs4sVYJqC9YOIQO0hD8gg/exec';

const LoveStorage = () => {
  const [recognitions, setRecognitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [searchReceiver, setSearchReceiver] = useState('');
  const [filterCoreValue, setFilterCoreValue] = useState('Tất cả');
  
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchRecognitions();
  }, []);

  const fetchRecognitions = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setRecognitions(data || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Không thể tải dữ liệu. Vui lòng kiểm tra kết nối.');
    } finally {
      setLoading(false);
    }
  };

  const filteredData = recognitions.filter(item => {
    const matchReceiver = item.receiver.toLowerCase().includes(searchReceiver.toLowerCase());
    const matchValue = filterCoreValue === 'Tất cả' || item.coreValue === filterCoreValue;
    return matchReceiver && matchValue;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Kho yêu thương</h2>
        <p className="text-muted-foreground">
          Nơi lưu giữ những lời ghi nhận tích cực trong công ty.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-xl shadow-sm border mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
            <Search className="w-4 h-4" />
          </div>
          <Input
            type="text"
            value={searchReceiver}
            onChange={(e) => setSearchReceiver(e.target.value)}
            placeholder="Tìm theo tên người nhận..."
            className="pl-9"
          />
        </div>
        
        <div className="w-full md:w-64">
          <Select value={filterCoreValue} onValueChange={setFilterCoreValue}>
            <SelectTrigger>
              <SelectValue placeholder="Lọc theo giá trị" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tất cả">Tất cả giá trị cốt lõi</SelectItem>
              <SelectItem value="Nói được làm được">Nói được làm được</SelectItem>
              <SelectItem value="Chân thật">Chân thật</SelectItem>
              <SelectItem value="Tâm huyết">Tâm huyết</SelectItem>
              <SelectItem value="Khách hàng là số 1">Khách hàng là số 1</SelectItem>
              <SelectItem value="Đổi mới sáng tạo">Đổi mới sáng tạo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p>Đang tải dữ liệu...</p>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 text-destructive p-4 rounded-xl text-center border border-destructive/20">
              {error}
              <button 
                onClick={fetchRecognitions}
                className="block mx-auto mt-2 text-sm underline hover:text-destructive/80"
              >
                Thử lại
              </button>
            </div>
          ) : (
            <RecognitionTable 
              data={filteredData} 
              onSelectRow={(record) => setSelectedRecord(record)}
              selectedId={selectedRecord?.id}
            />
          )}
        </div>
        
        <div className="w-full lg:w-[400px] h-[400px] lg:h-auto flex-shrink-0">
          <RecognitionDetail 
            data={selectedRecord} 
            onClose={() => setSelectedRecord(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default LoveStorage;
