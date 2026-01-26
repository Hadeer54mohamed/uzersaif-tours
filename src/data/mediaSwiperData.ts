type MediaItem = {
  type: "video" | "image";
  video?: string;
  image?: string;
  poster?: string;
};

type MediaGallery = {
  media: MediaItem[];
};

export const afterHeroVideo: MediaGallery = {
  media: [
    {
      type: "video",
      video: "/real.mp4",
    },
  ],
};

export const hotelGallery: MediaGallery = {
  media: [
    {
      type: "image",
      image: "/hotel1.jpg",
    },
    {
      type: "image",
      image: "/hotel2.jpg",
    },
    {
      type: "image",
      image: "/hotel3.jpg",
    },
    {
      type: "image",
      image: "/hotel.GIF",
    },
  ],
};

export const DesertComparison: MediaGallery = {
  media: [
    {
      type: "image",
      image: "/DesertComparison/6.jpg",
    },
    {
      type: "image",
      image: "/DesertComparison/1.jpg",
    },
    {
      type: "image",
      image: "/DesertComparison/2.jpg",
    },
    {
      type: "image",
      image: "/DesertComparison/3.jpg",
    },
    {
      type: "image",
      image: "/DesertComparison/4.jpg",
    },
    {
      type: "image",
      image: "/DesertComparison/5.jpg",
    },
  ],
};

export const DesertFeeling: MediaGallery = {
  media: [
    {
      type: "image",
      image: "/DesertFeeling/7.jpg",
    },
    {
      type: "image",
      image: "/DesertFeeling/8.jpg",
    },
    {
      type: "image",
      image: "/DesertFeeling/9.jpg",
    },
    {
      type: "image",
      image: "/DesertFeeling/10.jpg",
    },
  ],
};

export const WhyChooseUs: MediaGallery = {
  media: [
    {
      type: "image",
      image: "/WhyChooseUs/11.jpg",
    },
    {
      type: "image",
      image: "/WhyChooseUs/12.jpg",
    },
    {
      type: "image",
      image: "/WhyChooseUs/13.jpg",
    },
    {
      type: "image",
      image: "/WhyChooseUs/14.jpg",
    },
  ],
};

export const Experiences: MediaGallery = {
  media: [
    {
      type: "image",
      image: "/Experiences/15.jpg",
    },
    {
      type: "image",
      image: "/Experiences/16.jpg",
    },
    {
      type: "image",
      image: "/Experiences/17.jpg",
    },
    {
      type: "image",
      image: "/Experiences/18.jpg",
    },
  ],
};

export const AboutBedouin: MediaGallery = {
  media: [
    {
      type: "image",
      image: "/AboutBedouin/19.jpg",
    },
    {
      type: "image",
      image: "/AboutBedouin/20.jpg",
    },
    {
      type: "image",
      image: "/AboutBedouin/21.jpg",
    },
    {
      type: "image",
      image: "/AboutBedouin/22.jpg",
    },
  ],
};
