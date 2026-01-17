"use client";

import { motion } from "framer-motion";

export const SectionDivider = ({ className = "" }) => {
  return (
    <div className={`relative py-4 overflow-hidden ${className}`}>
      {/* خط التوهج المركزي */}
      <motion.div
        className="relative mx-auto w-full max-w-4xl h-px"
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* الخط الأساسي */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        
        {/* توهج إضافي */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/20 to-transparent blur-sm" />
      </motion.div>

      {/* نجمة مركزية */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="w-2 h-2 rounded-full bg-amber-400/60 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
      </motion.div>
    </div>
  );
};

export default SectionDivider;
