import { motion } from "motion/react";

interface DayCardProps {
  day: number;
  icon: string;
  isOpened: boolean;
  onClick: () => void;
}

export function DayCard({ day, icon, isOpened, onClick }: DayCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative aspect-square rounded-2xl p-4 
        flex flex-col items-center justify-center
        transition-all duration-300
        ${isOpened 
          ? 'bg-gradient-to-br from-purple-200 to-purple-100 shadow-lg' 
          : 'bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-md'
        }
      `}
    >
      <div className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white/60 flex items-center justify-center">
        <span className="text-xs text-purple-600">{day}</span>
      </div>
      
      {isOpened ? (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
        >
          <span className="text-4xl">{icon}</span>
        </motion.div>
      ) : (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl opacity-30"
        >
          🎁
        </motion.div>
      )}
      
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-2 text-xs text-purple-600 opacity-70"
        >
          открыто
        </motion.div>
      )}
    </motion.button>
  );
}
