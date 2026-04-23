import { motion } from 'framer-motion';

interface AIScanningAnimationProps {
  imageUrl?: string | null;
  isScanning: boolean;
}

export function AIScanningAnimation({ imageUrl, isScanning }: AIScanningAnimationProps) {
  if (!isScanning || !imageUrl) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Preview Image with Scanning Line */}
      <div className="relative w-full mx-auto overflow-hidden rounded-3xl shadow-2xl border border-white/20">
        <img
          src={imageUrl}
          alt="Scanning"
          className="w-full h-80 md:h-96 object-cover"
        />

        {/* Scanning Line */}
        <motion.div
          className="absolute inset-0 top-0 w-full h-2 bg-gradient-to-b from-[#2D5A27] via-[#2D5A27]/50 to-transparent shadow-[0_0_20px_4px_rgba(45,90,39,0.4)]"
          animate={{ top: ['0%', '100%'] }}
          transition={{
            duration: 2.5,
            ease: 'linear',
            repeat: Infinity,
          }}
        />

        {/* Scanning Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-[#2D5A27]/20 via-transparent to-transparent"
          animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }}
          transition={{
            duration: 2.5,
            ease: 'linear',
            repeat: Infinity,
          }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D5A27]/10 to-transparent pointer-events-none" />
      </div>

      {/* Scanning Status Text */}
      <div className="text-center space-y-3">
        <motion.div
          className="flex items-center justify-center gap-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex gap-1">
            <motion.div
              className="w-2 h-2 rounded-full bg-[#2D5A27]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#2D5A27]/60"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.15 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#2D5A27]/30"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
            />
          </div>
        </motion.div>

        <motion.p
          className="text-sm font-semibold text-[#2D5A27]"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🤖 Hệ thống đang phân tích tế bào và đối chiếu cơ sở dữ liệu bệnh học...
        </motion.p>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden mx-auto max-w-xs">
          <motion.div
            className="h-full bg-gradient-to-r from-[#2D5A27] to-[#2D5A27]/60"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
