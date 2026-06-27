import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const RecognitionSendAnimation = ({ isPlaying, targetRef, onComplete }) => {
  const [animationState, setAnimationState] = useState('hidden'); // hidden -> show-card -> heart -> fly -> hidden
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isPlaying) {
      const targets = document.querySelectorAll('.target-love-storage-icon');
      let visibleTarget = null;
      for (const target of targets) {
        const rect = target.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          visibleTarget = target;
          break;
        }
      }

      if (visibleTarget) {
        const rect = visibleTarget.getBoundingClientRect();
        const targetX = rect.left + rect.width / 2 - window.innerWidth / 2;
        const targetY = rect.top + rect.height / 2 - window.innerHeight / 2;
        setTargetPos({ x: targetX, y: targetY });
      } else {
        setTargetPos({ x: 0, y: 0 }); // Fallback
      }

      // Bắt đầu sequence
      setAnimationState('show-card');
      
      const timer1 = setTimeout(() => {
        setAnimationState('heart');
      }, 800); // Sau 0.8s, biến thành tim

      const timer2 = setTimeout(() => {
        setAnimationState('fly');
      }, 1400); // Đợi tim nhịp đập chút rồi bay đi

      const timer3 = setTimeout(() => {
        setAnimationState('hidden');
        onComplete();
      }, 2200); // 1.4s bay + 0.8s duration

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else if (!isPlaying) {
      setAnimationState('hidden');
    }
  }, [isPlaying, targetRef, onComplete]);

  if (animationState === 'hidden') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      {/* Overlay mờ nhẹ */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"
      />

      <AnimatePresence>
        {animationState === 'show-card' && (
          <motion.div
            key="card"
            initial={{ scale: 0, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 200 }}
            className="w-64 h-40 bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col items-center justify-center relative z-10 p-4"
          >
            <div className="flex space-x-2 mb-4">
              <div className="w-10 h-2 bg-slate-100 rounded-full"></div>
              <div className="w-20 h-2 bg-slate-100 rounded-full"></div>
            </div>
            <div className="w-full space-y-2">
              <div className="w-full h-2 bg-slate-50 rounded-full"></div>
              <div className="w-3/4 h-2 bg-slate-50 rounded-full"></div>
            </div>
          </motion.div>
        )}

        {(animationState === 'heart' || animationState === 'fly') && (
          <motion.div
            key="heart"
            initial={animationState === 'heart' ? { scale: 0, opacity: 0 } : false}
            animate={animationState === 'fly' ? { 
              x: targetPos.x, 
              y: targetPos.y, 
              scale: 0.1, 
              opacity: 0 
            } : { 
              scale: [0, 1.5, 1], 
              opacity: 1 
            }}
            transition={animationState === 'fly' ? { 
              duration: 0.8, 
              ease: "easeInOut" 
            } : { 
              duration: 0.5 
            }}
            className="absolute z-10 flex items-center justify-center text-primary"
          >
            <Heart className="w-24 h-24 fill-current drop-shadow-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecognitionSendAnimation;
