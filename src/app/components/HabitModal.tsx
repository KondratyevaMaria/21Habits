import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Habit, HabitCategory } from "../data/habits";

interface HabitModalProps {
  habit: Habit | null;
  isOpen: boolean;
  onClose: () => void;
}

const categoryColors: Record<HabitCategory, string> = {
  food: "from-orange-100 to-yellow-50",
  breakfast: "from-amber-100 to-orange-50",
  workout: "from-pink-100 to-red-50",
  breathing: "from-blue-100 to-cyan-50",
  swelling: "from-purple-100 to-indigo-50"
};

const categoryLabels: Record<HabitCategory, string> = {
  food: "Питание",
  breakfast: "Завтрак",
  workout: "Тренировка",
  breathing: "Дыхание",
  swelling: "Отёки"
};

export function HabitModal({ habit, isOpen, onClose }: HabitModalProps) {
  if (!habit) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-lg"
              >
                <div className={`bg-gradient-to-br ${categoryColors[habit.category]} rounded-3xl shadow-2xl p-8 relative`}>
                  <Dialog.Close asChild>
                    <button
                      onClick={onClose}
                      className="absolute right-4 top-4 rounded-full p-2 bg-white/80 hover:bg-white transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </Dialog.Close>

                  <div className="flex flex-col items-center text-center space-y-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="text-7xl"
                    >
                      {habit.icon}
                    </motion.div>

                    <div className="space-y-2">
                      <div className="inline-block px-4 py-1 bg-white/60 rounded-full">
                        <span className="text-xs uppercase tracking-wider text-gray-600">
                          День {habit.day} • {categoryLabels[habit.category]}
                        </span>
                      </div>
                      <Dialog.Title asChild>
                        <h2 className="text-gray-800">{habit.title}</h2>
                      </Dialog.Title>
                    </div>

                    <Dialog.Description asChild>
                      <div className="space-y-4 text-gray-700">
                        <p className="leading-relaxed">
                          {habit.description}
                        </p>
                        
                        <div className="bg-white/50 rounded-2xl p-4 border-l-4 border-purple-300">
                          <p className="text-sm">
                            💡 <span className="font-medium">Совет:</span> {habit.tip}
                          </p>
                        </div>
                      </div>
                    </Dialog.Description>

                    <button
                      onClick={onClose}
                      className="mt-4 px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full transition-colors"
                    >
                      Принято! 💜
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
