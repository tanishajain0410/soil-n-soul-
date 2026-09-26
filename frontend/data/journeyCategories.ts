export interface JourneyHighlight {
  iconName: string;
  label: string;
}

export interface JourneyStat {
  value: string;
  label: string;
}

export interface JourneyExperience {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  tag?: string;
}

export interface JourneyItinerary {
  duration: string;
  title: string;
  description: string;
  image: string;
  highlights?: string[];
}

export interface JourneyTestimonial {
  quote: string;
  author: string;
  location: string;
  avatar: string;
}

export interface JourneyCategoryData {
  slug: "dharm" | "arth" | "kaam" | "moksh";
  categoryName: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  heroImage: string;
  heroCtaText: string;
  heroHighlights: JourneyHighlight[];
  heroStats: JourneyStat[];
  
  introEyebrow: string;
  introHeading: string;
  introDescription1: string;
  introDescription2?: string;
  introQuote: string;
  introImage: string;
  introCtaText: string;
  
  experiencesEyebrow: string;
  experiencesHeading: string;
  experiences: JourneyExperience[];
  
  storyHeading: string;
  storyContent: string[];
  storyTags: string[];
  
  itinerariesEyebrow: string;
  itinerariesHeading: string;
  itineraries: JourneyItinerary[];
  
  testimonial: JourneyTestimonial;
  
  ctaEyebrow: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  ctaBackgroundImage: string;
}

export const journeyCategories: Record<string, JourneyCategoryData> = {
  dharm: {
    slug: "dharm",
    categoryName: "DHARM",
    title: "Spiritual Journeys",
    subtitle: "A Journey Into Faith, Ritual & Devotion",
    heroDescription:
      "Experience the spiritual soul of Kashi through its ancient temples, sacred ghats, timeless rituals and a living tradition that continues to inspire the world.",
    heroImage: "/SnS/sacred-kashi.webp",
    heroCtaText: "Plan Your Dharm Journey →",
    heroHighlights: [
      { iconName: "Flame", label: "Temples & Rituals" },
      { iconName: "Sparkles", label: "Ganga Aarti" },
      { iconName: "Footprints", label: "Spiritual Walks" },
      { iconName: "HeartHandshake", label: "Meditation & Wellness" },
      { iconName: "Landmark", label: "Sarnath" },
      { iconName: "Compass", label: "Personalized Itineraries" },
    ],
    heroStats: [
      { value: "3000+", label: "Years of Spiritual Heritage" },
      { value: "100+", label: "Temples to Explore" },
      { value: "Sacred", label: "Ganga Aarti Experiences" },
      { value: "Bespoke", label: "Spiritual Itineraries" },
    ],
    introEyebrow: "THE ESSENCE OF DHARM",
    introHeading: "A Spiritual Soul That Lives in Every Corner",
    introDescription1:
      "Varanasi is not just a destination, it is a living spiritual experience. From the resonance of morning Vedic chants across misty ghats to the mesmerizing Ganga Aarti at dusk, every breath in this sacred city connects you to a timeless continuum.",
    introDescription2:
      "Here, faith is not confined to sanctums—it flows in the river, breathes through ancient alleys, and reflects in the eyes of pilgrims who have sought grace here for thousands of years.",
    introQuote:
      "In Varanasi, spirituality is not a ritual, it is a way of life.",
    introImage: "/images/journeys/dharm-intro.jpg",
    introCtaText: "Explore the Essence →",
    experiencesEyebrow: "TOP SPIRITUAL EXPERIENCES",
    experiencesHeading: "Sacred Experiences in Varanasi",
    experiences: [
      {
        title: "Kashi Vishwanath Temple Visit",
        description: "Seek blessings at one of the most sacred temples in India with seamless VIP facilitation and personal pandit guidance.",
        image: "/SnS/kashi-vishwanath.webp",
        tag: "Sacred Sanctum",
      },
      {
        title: "Ganga Aarti Experience",
        description: "Witness the divine ritual of fire, conch shells, and devotion from the most exclusive vantage point on a private bajra boat.",
        image: "/images/journal-ref/featured_ganga_aarti_clean.jpg",
        tag: "Evening Aarti",
      },
      {
        title: "Morning Ganga Boat Ride",
        description: "Experience the profound serenity of the sacred ghats at dawn as the first golden rays illuminate centuries of holy rituals.",
        image: "/SnS/ganga-boat.webp",
        tag: "Dawn Immersion",
      },
      {
        title: "Sarnath Spiritual Trail",
        description: "Walk through the sacred deer park where Gautama Buddha delivered his first sermon and established the Buddhist Sangha.",
        image: "/SnS/varanasi-sarnath.webp",
        tag: "Buddhist Heritage",
      },
      {
        title: "Pujas & Rituals",
        description: "Participate in personalized Vedic rituals, Rudrabhishek ceremonies, and holy sankalpa performed by venerable local scholars.",
        image: "/images/about-way-diya.jpg",
        tag: "Private Ceremony",
      },
      {
        title: "Temple Trails",
        description: "Explore hidden sanctums, ancestral shrines, and monastic traditions nestled within the ancient sacred lanes of Kashi.",
        image: "/SnS/hidden-temple-kashi.webp",
        tag: "Sacred Geometry",
      },
    ],
    storyHeading: "Temples, Ghats and Timeless Traditions",
    storyContent: [
      "For millennia, seekers, sages, and travelers have walked the sacred labyrinth of Kashi in search of deeper meaning. Built on the trident of Lord Shiva, Varanasi remains one of the world's oldest continually inhabited cities, where life and eternity intertwine seamlessly.",
      "Along the crescent curve of the holy Ganga, eighty-four ghats bear witness to an unbroken rhythm of devotion. Soil & Soul curates dignified, unhurried journeys into this spiritual realm—providing privileged access, scholar storytellers, and private sanctuaries that let you experience the sacred without distraction.",
    ],
    storyTags: [
      "Ancient Temples",
      "Sacred Rituals",
      "Holy Ghats",
      "Spiritual Retreats",
      "Guided Experiences",
    ],
    itinerariesEyebrow: "SUGGESTED ITINERARIES",
    itinerariesHeading: "Curated Spiritual Journeys",
    itineraries: [
      {
        duration: "1 Day",
        title: "Spiritual Varanasi Essentials",
        description:
          "Dawn boat cruise along heritage ghats, facilitated morning darshan at Shri Kashi Vishwanath, and a private evening Ganga Aarti on the river.",
        image: "/SnS/dashashwamedh-ghat.jpg",
        highlights: ["Subah-e-Banaras", "Vishwanath Corridor", "VIP Aarti Boat"],
      },
      {
        duration: "2 Days",
        title: "Kashi & Sarnath Journey",
        description:
          "Two transformative days bridging the Vedic sanctums of Varanasi with the serene Buddhist stupas and monastic ruins of holy Sarnath.",
        image: "/SnS/varanasi-sarnath.webp",
        highlights: ["Ancient Ghat Circuit", "Dhamek Stupa", "Monastic Meditation"],
      },
      {
        duration: "3 Days",
        title: "Temple Trail & Ganga Aarti",
        description:
          "A comprehensive private pilgrimage encompassing private Vedic ceremonies, the 12 sacred Jyotirlinga shrines of Kashi, and scholar discourses.",
        image: "/SnS/sacred-kashi.webp",
        highlights: ["Private Rudrabhishek", "Heritage Shrines", "Culinary Prashad Trail"],
      },
    ],
    testimonial: {
      quote:
        "Visiting Varanasi with Soil & Soul was a spiritual experience. Every detail felt thoughtfully curated and deeply meaningful.",
      author: "Radhika Mehta",
      location: "Traveler, Mumbai",
      avatar: "/images/journeys/traveler-radhika.jpg",
    },
    ctaEyebrow: "READY FOR A SPIRITUAL JOURNEY?",
    ctaHeading: "Plan Your Dharm Journey",
    ctaDescription:
      "Let our experts design a personalized spiritual experience in Varanasi for you.",
    ctaPrimaryText: "Plan Your Journey →",
    ctaSecondaryText: "Speak to Our Team",
    ctaBackgroundImage: "/images/varanasi-cta-sunset.png",
  },

  arth: {
    slug: "arth",
    categoryName: "ARTH",
    title: "Heritage & Markets",
    subtitle: "A Journey Through Craft, Culture & Enduring Legacy",
    heroDescription:
      "Discover the artistic heart of Varanasi through its ancient markets, master artisans, Banarasi silk, architecture and living traditions.",
    heroImage: "/images/journeys/arth-hero.jpg",
    heroCtaText: "Plan Your Arth Journey →",
    heroHighlights: [
      { iconName: "Shirt", label: "Handlooms & Textiles" },
      { iconName: "ShoppingBag", label: "Local Markets" },
      { iconName: "MapPin", label: "Heritage Walks" },
      { iconName: "Scissors", label: "Artisan Experiences" },
      { iconName: "Utensils", label: "Local Cuisine" },
      { iconName: "Compass", label: "Curated Itineraries" },
    ],
    heroStats: [
      { value: "Centuries", label: "Of Craftsmanship" },
      { value: "Authentic", label: "Banarasi Silk Weavers" },
      { value: "Historic", label: "Markets & Ancient Lanes" },
      { value: "Exclusive", label: "Artisan Workshops" },
    ],
    introEyebrow: "THE ESSENCE OF ARTH",
    introHeading: "A City of Craft, Culture and Enduring Legacy",
    introDescription1:
      "Varanasi's heritage lives not only in its temples, but also in its craftsmen, weavers, markets, music, architecture and traditions passed with reverence from one generation to another.",
    introDescription2:
      "For centuries, Banaras has stood as India's preeminent center of arts, literature, and commerce. Soil & Soul unlocks the doors of heritage havelis, century-old weaver workshops, and forgotten bazaar quarters rarely seen by the casual traveler.",
    introQuote:
      "Where master weavers weave dreams into gold threads, Varanasi's heritage breathes through every warp and weft.",
    introImage: "/images/journeys/arth-intro.jpg",
    introCtaText: "Explore the Essence →",
    experiencesEyebrow: "TOP HERITAGE EXPERIENCES",
    experiencesHeading: "Heritage Experiences in Varanasi",
    experiences: [
      {
        title: "Banarasi Silk Weaving",
        description: "Step into ancestral handloom quarters and witness master karigars weave pure silk with intricate silver and gold zari.",
        image: "/SnS/banarasi-silk-detail.webp",
        tag: "Handloom Heritage",
      },
      {
        title: "Vishwanath Gali Walk",
        description: "Explore the vibrant, historic galis of old Varanasi, discovering ancient perfumeries, spice merchants, and hidden shrines.",
        image: "/images/journal-ref/intro_alley_hd.jpg",
        tag: "Living History",
      },
      {
        title: "Local Markets Tour",
        description: "Discover handicrafts, copper repoussé, wooden lacquerware, and authentic treasures with an expert local cultural host.",
        image: "/images/journeys/arth-hero.jpg",
        tag: "Curated Shopping",
      },
      {
        title: "Artisan Workshops",
        description: "Learn hands-on from master craftsmen in private studios and understand the meticulous craft behind Banaras' UNESCO heritage.",
        image: "/SnS/the-hands-of-banaras.webp",
        tag: "Masterclass",
      },
      {
        title: "Heritage Architecture",
        description: "Explore ancient havelis, Maratha courtyards, stone carvings, and riverside palaces narrating centuries of royal patronages.",
        image: "/SnS/varanasi-heritage.webp",
        tag: "Architectural Trail",
      },
      {
        title: "Local Food Trail",
        description: "Taste authentic Banarasi culinary treasures—from piping hot kachoris and tamatar chaat to delicate winter malaiyo.",
        image: "/SnS/taste-of-kashi.webp",
        tag: "Gourmet Walk",
      },
    ],
    storyHeading: "Where Tradition Becomes Art",
    storyContent: [
      "Beyond the sacred riverfront lies the intoxicating rhythm of old Varanasi—a city that has nurtured classical maestros, Nobel scholars, and generations of world-renowned handloom weavers. Here, every lane preserves an oral tradition, and every workshop is an atelier of living history.",
      "Through narrow alleys shaded by historic arches and scented with cardamom and sandalwood, Soil & Soul connects you directly with the custodians of this heritage. You meet the weavers in their ancestral loom houses, converse with classical musicians in traditional baithaks, and savor recipes perfected across centuries.",
    ],
    storyTags: [
      "Banarasi Silk",
      "Handloom Weaving",
      "Local Craftsmanship",
      "Old City Architecture",
      "Traditional Markets",
      "Heritage Streets",
    ],
    itinerariesEyebrow: "SUGGESTED ITINERARIES",
    itinerariesHeading: "Curated Heritage Journeys",
    itineraries: [
      {
        duration: "1 Day",
        title: "Markets & Crafts",
        description:
          "A day immersed in old city bazaars, meeting master brass artisans, silk weavers, and tasting legendary heritage street foods.",
        image: "/SnS/brass-craftsman.webp",
        highlights: ["Artisan Loom Visit", "Gali Exploration", "Local Street Treats"],
      },
      {
        duration: "2 Days",
        title: "Heritage & Handloom",
        description:
          "Private access to royal havelis, master silk designers, hand-block printing ateliers, and evening classical music baithaks.",
        image: "/images/journeys/arth-intro.jpg",
        highlights: ["Zari Weaving Masterclass", "Haveli Architecture", "Chowk Food Walk"],
      },
      {
        duration: "3 Days",
        title: "Culture, Crafts & Cuisine",
        description:
          "The consummate cultural immersion across Ramnagar Fort royal museum, generational perfume houses, and exclusive artisan homes.",
        image: "/SnS/taste-of-kashi.webp",
        highlights: ["Ramnagar Crafts", "Private Silk Buying", "Gourmet Banarasi Feast"],
      },
    ],
    testimonial: {
      quote:
        "The heritage walk was a highlight of our trip. Soil & Soul gave us access to experiences we could never have found on our own.",
      author: "Arjun Verma",
      location: "Traveler, Bangalore",
      avatar: "/images/journeys/traveler-arjun.jpg",
    },
    ctaEyebrow: "READY FOR A HERITAGE JOURNEY?",
    ctaHeading: "Plan Your Arth Journey",
    ctaDescription:
      "Let us create a personalized heritage experience around the crafts, culture and stories of Varanasi.",
    ctaPrimaryText: "Plan Your Journey →",
    ctaSecondaryText: "Speak to Our Team",
    ctaBackgroundImage: "/images/varanasi-cta-sunset.png",
  },

  kaam: {
    slug: "kaam",
    categoryName: "KAAM",
    title: "Love & Leisure",
    subtitle: "A Journey of Beauty, Connection & the Joy of Living",
    heroDescription:
      "Experience the romantic, vibrant and soulful side of Kashi — from golden sunsets and serene boat rides to food, music and timeless moments together.",
    heroImage: "/images/purushartha-kaam.jpg",
    heroCtaText: "Plan Your Kaam Journey →",
    heroHighlights: [
      { iconName: "Heart", label: "Couple Experiences" },
      { iconName: "Sailboat", label: "Private Boat Rides" },
      { iconName: "UtensilsCrossed", label: "Food & Dining" },
      { iconName: "Music", label: "Music & Culture" },
      { iconName: "Camera", label: "Photography" },
      { iconName: "PartyPopper", label: "Celebrations" },
    ],
    heroStats: [
      { value: "Private", label: "Boat Experiences" },
      { value: "Romantic", label: "Sunset Moments on River" },
      { value: "Curated", label: "Riverside Dining" },
      { value: "Bespoke", label: "Personalized Celebrations" },
    ],
    introEyebrow: "THE ESSENCE OF KAAM",
    introHeading: "Find Joy in the Beauty of Varanasi",
    introDescription1:
      "Slow down, experience the city together and discover the beauty of Varanasi through intimate experiences designed for couples, connoisseurs, and leisure travelers.",
    introDescription2:
      "Far from hurried tourist paths, discover Varanasi through the lens of aesthetic wonder—a candlelit wooden bajra drifting under starlit skies, fragrant marigolds, soft flute melodies, and private rooftop suppers facing the illuminated ghats.",
    introQuote:
      "Moments by the twilight river, gentle acoustic melodies, and the timeless magic of being present together.",
    introImage: "/images/journeys/kaam-intro.jpg",
    introCtaText: "Explore the Essence →",
    experiencesEyebrow: "TOP COUPLE & LEISURE EXPERIENCES",
    experiencesHeading: "Love & Leisure Experiences",
    experiences: [
      {
        title: "Private Sunset Boat Ride",
        description: "A magical evening on the Ganga aboard a luxury wooden bajra boat adorned with fresh flowers and glowing lanterns.",
        image: "/images/purushartha-kaam.jpg",
        tag: "Sunset River Cruise",
      },
      {
        title: "Romantic Dining",
        description: "Private table curated by the riverside or atop a private heritage terrace overlooking the shimmering river reflections.",
        image: "/SnS/the-banarasi-table.webp",
        tag: "Riverside Suppers",
      },
      {
        title: "Ghats Walks at Golden Hour",
        description: "Experience the city's most romantic and photogenic moments as the golden twilight paints the ancient stone facades.",
        image: "/images/journal-ref/newsletter_ghats_hd.jpg",
        tag: "Golden Hour",
      },
      {
        title: "Music & Cultural Evenings",
        description: "Intimate private recitals of classical sitar, sarod, and vocal ragas performed by masters in private heritage courtyards.",
        image: "/SnS/private-cultural-performance.webp",
        tag: "Private Concerts",
      },
      {
        title: "Photography Experiences",
        description: "Capture timeless memories through an editorial photography session conducted by an expert Varanasi visual artist.",
        image: "/SnS/kashi-through-your-lens.webp",
        tag: "Editorial Portraits",
      },
      {
        title: "Private Celebrations",
        description: "Celebrate milestones, anniversaries, and renewals of love with bespoke flower decor, live music, and private Ganga pujas.",
        image: "/SnS/celebrations.jpg",
        tag: "Curated Celebrations",
      },
    ],
    storyHeading: "Moments Made for Two",
    storyContent: [
      "Varanasi in the soft light of dusk is an enchanting sensory sanctuary. Gliding across the sacred river on a private decorated boat with marigold garlands, sipping hand-blended teas as flute melodies echo across the water, the city offers couples an unforgettable blend of intimacy, tranquility, and cultural grandeur.",
      "Soil & Soul designs these moments with utmost discretion and sensitivity. Whether it's an anniversary toast on a private ghat terrace, an unhurried morning stroll through quiet morning riverbanks, or an intimate dinner under the stars, every touchpoint is crafted to let you connect deeply.",
    ],
    storyTags: [
      "Private Boat Rides",
      "Sunset Experiences",
      "Romantic Dining",
      "Photography",
      "Music",
      "Cultural Evenings",
      "Celebrations",
    ],
    itinerariesEyebrow: "SUGGESTED ITINERARIES",
    itinerariesHeading: "Curated Couple Journeys",
    itineraries: [
      {
        duration: "1 Day",
        title: "Couple Getaway",
        description:
          "Serene morning boat cruise, afternoon leisure in a private haveli, and a private candlelight supper overlooking the golden river.",
        image: "/images/purushartha-kaam.jpg",
        highlights: ["Sunrise Bajra", "Private Rooftop Dinner", "Couples Portrait"],
      },
      {
        duration: "2 Days",
        title: "Romance in Varanasi",
        description:
          "Golden hour river voyages, private heritage dining, an intimate Hindustani classical recital, and a bespoke couple portrait session.",
        image: "/images/journeys/kaam-intro.jpg",
        highlights: ["Evening Ganga Cruise", "Classical Baithak", "Artisan Shopping"],
      },
      {
        duration: "3 Days",
        title: "Leisure & Cultural Escape",
        description:
          "Unhurried mornings, private spa rituals, curated culinary trails, sunset celebrations, and private boat retreats to secluded ghats.",
        image: "/SnS/celebrations.jpg",
        highlights: ["Private Celebration", "Gourmet Tasting Menu", "Exclusive Riverfront Stay"],
      },
    ],
    testimonial: {
      quote:
        "Our sunset boat ride with Soil & Soul was unforgettable. The entire experience felt so personal and beautifully curated.",
      author: "Neha & Karan",
      location: "Travelers, Delhi",
      avatar: "/images/journeys/traveler-couple.jpg",
    },
    ctaEyebrow: "READY FOR A LEISURE JOURNEY?",
    ctaHeading: "Plan Your Kaam Journey",
    ctaDescription:
      "Let us create a personalized journey for you and your loved one.",
    ctaPrimaryText: "Plan Your Journey →",
    ctaSecondaryText: "Speak to Our Team",
    ctaBackgroundImage: "/images/varanasi-cta-sunset.png",
  },

  moksh: {
    slug: "moksh",
    categoryName: "MOKSH",
    title: "Wellness & Retreats",
    subtitle: "A Journey Towards Stillness, Inner Peace & a Higher Purpose",
    heroDescription:
      "Find stillness in the sacred energy of Varanasi through meditation, yoga, spiritual retreats and experiences that bring you closer to yourself.",
    heroImage: "/images/journeys/moksh-hero.jpg",
    heroCtaText: "Plan Your Moksh Journey →",
    heroHighlights: [
      { iconName: "Smile", label: "Yoga & Meditation" },
      { iconName: "Moon", label: "Spiritual Retreats" },
      { iconName: "Footprints", label: "Silent Walks" },
      { iconName: "Sun", label: "Sarnath Experiences" },
      { iconName: "Home", label: "Wellness Stays" },
      { iconName: "Compass", label: "Personalized Itineraries" },
    ],
    heroStats: [
      { value: "Daily", label: "Yoga by the Holy Ganga" },
      { value: "Guided", label: "Meditation & Mindfulness" },
      { value: "Sacred", label: "Sarnath Peace Retreats" },
      { value: "Holistic", label: "Ayurvedic Rejuvenation" },
    ],
    introEyebrow: "THE ESSENCE OF MOKSH",
    introHeading: "A Journey Towards Inner Peace",
    introDescription1:
      "Find stillness in the sacred energy of Varanasi through meditation, yoga, spiritual retreats and experiences designed to reconnect you with yourself.",
    introDescription2:
      "In the city where life, death, and liberation merge into oneness, Soil & Soul curates silent sanctuaries of rejuvenation. Experience dawn yoga by the calm riverbank, guided mindfulness among Buddhist stupas, and restorative Ayurvedic therapies.",
    introQuote:
      "In the quiet spaces between temple bells and river tides, find the silence your soul has been longing for.",
    introImage: "/images/journeys/moksh-intro.jpg",
    introCtaText: "Explore the Essence →",
    experiencesEyebrow: "TOP WELLNESS EXPERIENCES",
    experiencesHeading: "Top Wellness Experiences",
    experiences: [
      {
        title: "Yoga by the Ganga",
        description: "Start your morning with rejuvenating classical hatha yoga led by an experienced yogic master on a tranquil riverside terrace.",
        image: "/images/journeys/moksh-intro.jpg",
        tag: "Morning Asanas",
      },
      {
        title: "Meditation Sessions",
        description: "Cultivate profound inner peace through guided sound healing, Vedic breathwork, and tranquil dhyana at dawn.",
        image: "/images/journeys/moksh-hero.jpg",
        tag: "Mindfulness",
      },
      {
        title: "Sarnath Experience",
        description: "Visit the sacred deer park of Gautama Buddha and practice walking mindfulness around the ancient Dhamek Stupa.",
        image: "/SnS/varanasi-sarnath.webp",
        tag: "Buddhist Meditation",
      },
      {
        title: "Wellness Retreats",
        description: "Curated holistic retreats combining daily yoga, sattvic nutrition, and contemplative quiet in heritage boutique settings.",
        image: "/images/journal-ref/card4_solowoman_hd.jpg",
        tag: "Inner Renewal",
      },
      {
        title: "Spiritual Walks",
        description: "Explore peaceful northern ghats, contemplative ashrams, and silent dawn walkways undisturbed by modern crowds.",
        image: "/SnS/kashi-at-dawn.webp",
        tag: "Contemplative Trail",
      },
      {
        title: "Ayurvedic Experiences",
        description: "Traditional therapies, personalized dosha assessments, and herbal rejuvenation treatments for holistic well-being.",
        image: "/SnS/a-deeper-connection.webp",
        tag: "Ancient Healing",
      },
    ],
    storyHeading: "Stillness by the Sacred Ganga",
    storyContent: [
      "Kashi has been recognized for over three millennia as the supreme threshold between the finite and the eternal. In its early dawn mist, as the sacred river flows silently southward, the noise of modern life falls away, leaving room for profound reflection and renewal.",
      "Soil & Soul curates restorative retreats that combine classical hatha yoga, Buddhist mindfulness at Sarnath, and personalized Ayurvedic consultations to guide you into profound inner stillness. Let the ancient energy of the river soothe your mind, body, and soul.",
    ],
    storyTags: [
      "Yoga",
      "Meditation",
      "Spiritual Walks",
      "Sarnath",
      "Wellness Retreats",
      "Ayurvedic Experiences",
    ],
    itinerariesEyebrow: "SUGGESTED ITINERARIES",
    itinerariesHeading: "Curated Wellness Journeys",
    itineraries: [
      {
        duration: "1 Day",
        title: "Wellness Escape",
        description:
          "Dawn yoga on the riverbank, sound healing, guided meditation, and a restorative herbal ayurvedic consultation.",
        image: "/images/journeys/moksh-intro.jpg",
        highlights: ["Riverside Yoga", "Pranayama Session", "Sattvic Lunch"],
      },
      {
        duration: "2 Days",
        title: "Yoga & Spiritual Trail",
        description:
          "Mindful mornings by the Ganga, silent walking meditation along ancient ghats, and a day of mindfulness at Sarnath.",
        image: "/images/journal-ref/card4_solowoman_hd.jpg",
        highlights: ["Silent Ghat Walk", "Sarnath Mindfulness", "Ayurvedic Abhyanga"],
      },
      {
        duration: "3 Days",
        title: "Inner Peace Retreat",
        description:
          "A transformative 3-day immersive retreat featuring daily personalized yoga, guided vipassana meditation, organic sattvic dining, and private spiritual mentors.",
        image: "/images/journeys/moksh-hero.jpg",
        highlights: ["Full Wellness Immersion", "Private Spiritual Mentor", "Herbal Sound Bath"],
      },
    ],
    testimonial: {
      quote:
        "The wellness retreat with Soil & Soul helped me slow down and reconnect with myself. It was truly transformative.",
      author: "Priya Shah",
      location: "Traveler, Pune",
      avatar: "/images/journeys/traveler-priya.jpg",
    },
    ctaEyebrow: "READY FOR A WELLNESS JOURNEY?",
    ctaHeading: "Plan Your Moksh Journey",
    ctaDescription:
      "Let us design a peaceful and restorative experience around your pace, interests and journey.",
    ctaPrimaryText: "Plan Your Journey →",
    ctaSecondaryText: "Speak to Our Team",
    ctaBackgroundImage: "/images/varanasi-cta-sunset.png",
  },
};
