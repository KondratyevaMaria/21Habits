import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { DayCard } from "./components/DayCard";
import { HabitModal } from "./components/HabitModal";
import { habits } from "./data/habits";
import type { Habit } from "./data/habits";

export default function App() {
  const [openedDays, setOpenedDays] = useState<Set<number>>(new Set());
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Загружаем прогресс из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("habitCalendar");
    if (saved) {
      setOpenedDays(new Set(JSON.parse(saved)));
    }
  }, []);

  // Сохраняем прогресс в localStorage
  const handleDayClick = (habit: Habit) => {
    const newOpenedDays = new Set(openedDays);
    newOpenedDays.add(habit.day);
    setOpenedDays(newOpenedDays);
    localStorage.setItem("habitCalendar", JSON.stringify([...newOpenedDays]));
    
    setSelectedHabit(habit);
    setIsModalOpen(true);
  };

  const progress = (openedDays.size / habits.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 space-y-4"
        >
          <h1 className="text-gray-800">
            21 День Полезных Привычек ✨
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Открывай по одной привычке каждый день. Маленькие шаги к большим переменам в питании, движении и заботе о себе.
          </p>
          
          {/* Прогресс */}
          <div className="max-w-md mx-auto mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Твой прогресс</span>
              <span className="text-sm text-purple-600">
                {openedDays.size} из {habits.length}
              </span>
            </div>
            <div className="h-3 bg-white/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Сетка календаря */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 md:gap-4"
        >
          {habits.map((habit, index) => (
            <motion.div
              key={habit.day}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
            >
              <DayCard
                day={habit.day}
                icon={habit.icon}
                isOpened={openedDays.has(habit.day)}
                onClick={() => handleDayClick(habit)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Поздравление при завершении */}
        {openedDays.size === habits.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 text-center p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-gray-800 mb-2">Поздравляем!</h2>
            <p className="text-gray-600">
              Ты прошла все 21 день! Это начало твоего нового здорового образа жизни. Продолжай в том же духе! 💜
            </p>
          </motion.div>
        )}
      </div>

      {/* Модальное окно */}
      <HabitModal
        habit={selectedHabit}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
