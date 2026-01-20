"use client";

import { useState, useEffect } from "react";

// ✨ مكون النجمة - معطل
export const StarParticle = ({ star }) => null;

// ☄️ مكون الشهاب - معطل
export const ShootingStar = ({ meteor }) => null;

// 🌟 دالة إنشاء بيانات النجوم - ترجع مصفوفة فارغة
export const generateStars = (count = 70) => [];

// ☄️ دالة إنشاء بيانات الشهب - ترجع مصفوفة فارغة
export const generateMeteors = (count = 4, options = {}) => [];

// 🌌 مكون طبقة النجوم - معطل
export const StarsLayer = ({ count = 70, className = "" }) => null;

// مكون طبقة الشهب - معطل
export const MeteorsLayer = ({ count = 4, options = {}, className = "" }) => null;

// خلفية الفضاء - معطلة (ترجع div فارغ)
export const SpaceBackground = ({
  starsCount = 70,
  meteorsCount = 4,
  meteorsOptions = {},
  showGlows = true,
  glowPositions = "default",
  className = "",
}) => null;

// Hook مخصص - يرجع مصفوفات فارغة
export const useSpaceElements = (starsCount = 70, meteorsCount = 4, meteorsOptions = {}) => {
  return { stars: [], meteors: [] };
};

export default SpaceBackground;
