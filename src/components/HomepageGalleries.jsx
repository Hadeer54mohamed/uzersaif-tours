"use client";

import MediaSwiper from "./MediaSwiper";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * مكون يعرض معارض الصور والفيديوهات في الصفحة الرئيسية
 * يستخدم بيانات استاتيكية (customGalleries prop)
 */
const HomepageGalleries = ({ 
  className = "",
  spacing = "space-y-12",
  showTitles = true,
  height = "h-[500px]",
  customGalleries = [] // مصفوفة من الـ galleries
}) => {
  // لا يعرض شيء لو مفيش galleries
  if (!customGalleries || customGalleries.length === 0) {
    return null;
  }

  return (
    <div className={`${spacing} ${className}`}>
      {customGalleries.map((gallery, index) => (
        <motion.div
          key={gallery.id || index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="container mx-auto px-4"
        >
          {/* عنوان المعرض (اختياري) */}
          {showTitles && gallery.title && (
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-6 text-[#F5F7FA] flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center
                             bg-gradient-to-br from-[#F47A1F]/20 to-[#FFB85C]/10
                             border border-[#F47A1F]/30">
                <Sparkles className="w-5 h-5 text-[#F47A1F]" />
              </div>
              {gallery.title}
            </motion.h2>
          )}
          
          <MediaSwiper
            customMedia={gallery.media}
            height={height}
            autoPlayDefault={gallery.autoPlay !== false}
            intervalDefault={gallery.autoPlayInterval || 5}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default HomepageGalleries;
