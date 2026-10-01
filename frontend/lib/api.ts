import { API_URL } from './constants';

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  bannerImage: string;
  status?: 'draft' | 'published';
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  createdAt: string;
  updatedAt?: string;
}

export const EDITORIAL_POSTS: Record<string, BlogPost> = {
  'the-magic-of-ganga-aarti': {
    _id: 'featured-aarti',
    slug: 'the-magic-of-ganga-aarti',
    title: 'The Magic of Ganga Aarti: Faith, Fire, and the Sacred River',
    excerpt: 'Faith, fire, and an experience that stays with you forever as dusk falls over Dashashwamedh Ghat.',
    category: 'Spirituality',
    bannerImage: '/images/journal-ref/featured_ganga_aarti_clean.jpg',
    metaTitle: 'The Magic of Ganga Aarti in Varanasi | SoilNSoul Travels',
    metaDescription: 'Experience the mystical Ganga Aarti ceremony at Dashashwamedh Ghat in Varanasi. Ancient chants, brass lamps, and river reflections with SoilNSoul Travels.',
    keywords: 'Ganga Aarti Varanasi, Dashashwamedh Ghat Aarti, Varanasi spiritual ceremony, Ganga Aarti timing, Varanasi evening boat ride',
    createdAt: '2025-01-15T18:00:00.000Z',
    content: `
      <p class="lead">Every evening at twilight, as the sun dips beneath the eastern sands of the Ganges, the ancient steps of Dashashwamedh Ghat transform into a sacred theater of devotion that has continued uninterrupted for centuries.</p>
      
      <h2>The Geometry of Devotion</h2>
      <p>Young priests adorned in saffron dhotis ascend elevated wooden platforms. With synchronized grace, they lift towering multi-tiered brass lamps carrying burning camphor. The rhythmic resonance of bronze bells, conch shells, and Vedic chants fills the cool evening air, echoing across the gentle current of the river.</p>
      
      <blockquote>
        "The river does not simply reflect the light of the lamps; it absorbs the prayers of thousands who have gathered on wooden boats to witness the eternal rhythm of Kashi."
      </blockquote>

      <h2>Witnessing Aarti from the Water</h2>
      <p>While thousands gather on the steps, the most intimate and contemplative way to experience the Ganga Aarti is from a private wooden boat resting gently upon the current. As the lamps burn bright, the waters are covered in thousands of floating leaf boats carrying marigolds and flickers of flame, drifting into the velvet night.</p>

      <h2>Practical Guide for the Conscious Traveler</h2>
      <ul>
        <li><strong>Optimal Timing:</strong> Arrive by boat at least 35 minutes before sunset to secure a peaceful vantage point.</li>
        <li><strong>Summer vs. Winter:</strong> In winter, Aarti begins around 6:00 PM; during the long summer twilights, it shifts closer to 7:00 PM.</li>
        <li><strong>Cultural Etiquette:</strong> Maintain silence during the sacred aarti hymns, dress modestly covering shoulders and knees, and respectfully offer your diya with both hands to the river.</li>
      </ul>

      <p>At SoilNSoul Travels, our private twilight boat journeys include a dedicated local cultural guide who explains the esoteric meaning behind each step of the ceremony, from the peacock-feather fans to the sacred fire rituals honoring Mother Ganga.</p>
    `,
  },
  'a-perfect-day-in-varanasi': {
    _id: 'editorial-card-1',
    slug: 'a-perfect-day-in-varanasi',
    title: 'A Perfect Day in Varanasi: A Soulful Guide Beyond the Usual',
    excerpt: 'A soulful guide to experiencing Kashi beyond the usual, from silent sunrise oars to hidden haveli courtyards.',
    category: 'Travel Guide',
    bannerImage: '/images/journal-ref/card1_sunrise_hd.jpg',
    metaTitle: 'A Perfect Day in Varanasi | SoilNSoul Travels',
    metaDescription: 'How to spend a perfect day in Varanasi. An authentic 24-hour itinerary through sacred dawn boat rides, street food, ancient alleys, and silk quarters.',
    keywords: 'one day in Varanasi, Varanasi travel itinerary, best things to do in Varanasi, sunrise boat ride Varanasi, hidden Banaras',
    createdAt: '2025-01-20T06:00:00.000Z',
    content: `
      <p class="lead">Varanasi is not a city that yields its secrets to hurried checklists. To understand Kashi, one must surrender to its ancient rhythm—a slow waking at dawn, a sensory labyrinth of narrow galis at midday, and a quiet stillness beside the sacred river at night.</p>

      <h2>Dawn: The Awakening of the Ghats (5:30 AM – 8:00 AM)</h2>
      <p>Begin before sunrise at Assi Ghat. Step aboard a handcrafted wooden oar boat as the morning mist hovers over the holy Ganga. As the first amber rays touch the sandstone spires of the ancient ghats, witness pilgrims offering morning Surya Arghya. The silence is punctuated only by the rhythmic dip of wooden oars and morning temple bells.</p>

      <h2>Morning: The Alleys and Breakfast Traditions (8:30 AM – 11:00 AM)</h2>
      <p>Disembark near Manikarnika and enter the labyrinthine galis of the old city. Enjoy hot, crisp kachoris paired with spicy potato curry and freshly fried jalebis served on dried leaf plates, followed by rich Banarasi tea in a traditional terracotta kulhad.</p>

      <blockquote>
        "Walking the ancient alleys of Kashi is like traveling backward through five thousand years of continuous human faith and architectural heritage."
      </blockquote>

      <h2>Afternoon: Heritage, Silk Weavers & Sarnath (12:00 PM – 4:30 PM)</h2>
      <p>Escape the midday bustle by visiting the ancient Buddhist sanctuary of Sarnath, where Lord Buddha gave his first sermon. Return to Varanasi to explore the traditional Julaha weaver neighborhoods, witnessing the master craftsmen who spend weeks hand-weaving pure zari silk sarees on antique wooden jacquard looms.</p>

      <h2>Dusk: The Sacred Aarti and Night Contemplation (5:30 PM – 9:00 PM)</h2>
      <p>Conclude your day with a private boat charter for the Dashashwamedh Ghat Ganga Aarti, followed by dinner overlooking the illuminated river facade from a heritage terrace.</p>
    `,
  },
  'the-artisans-of-banaras': {
    _id: 'editorial-card-2',
    slug: 'the-artisans-of-banaras',
    title: 'The Artisans of Banaras: Stories of the Master Silk Weavers',
    excerpt: 'Stories of the weavers keeping centuries-old traditions alive through pure silk, intricate zari, and heritage pit looms.',
    category: 'Crafts & Culture',
    bannerImage: '/SnS/banarasi-silk-detail.webp',
    metaTitle: 'The Artisans of Banaras: Master Silk Weavers | SoilNSoul Travels',
    metaDescription: 'Meet the master Banarasi silk weavers of Varanasi. Learn about handloom traditions, pure zari craft, and the artisan families preserving century-old textiles.',
    keywords: 'Banarasi silk saree weavers, Varanasi handloom, Banaras craft heritage, traditional silk weaving Varanasi, authentic Banarasi saree',
    createdAt: '2025-01-25T11:00:00.000Z',
    content: `
      <p class="lead">Behind the bustling market stalls of Chowk and Vishwanath Gali lies the rhythmic cadence of the pit looms—a steady, hypnotic clack that has echoed through the Muslim and Hindu neighborhoods of Varanasi for more than five centuries.</p>

      <h2>The Heritage of the Julahas</h2>
      <p>In quarters like Madanpura, Peelo Kothi, and Lallapura, generations of families have dedicated their lives to Banarasi handloom weaving. Master craftsmen, known locally as <em>Karigars</em>, work in ground-floor workshops using wooden looms that sink directly into the earthen floor.</p>

      <h2>The Alchemy of Pure Zari and Silk</h2>
      <p>Authentic Banarasi silk is distinguished by its intricate brocade designs woven with gold and silver threads known as zari. A single bespoke bridal saree featuring classical motifs—such as the <em>shikargah</em> (hunting scene), <em>jangla</em> (floral scroll), or <em>boota</em>—can take up to three months of painstaking manual labor.</p>

      <blockquote>
        "Every thread is not just silk; it is an inheritance passed from grandfather to grandson, carrying the soul of Varanasi in every warp and weft."
      </blockquote>

      <h2>Supporting Living Heritage</h2>
      <p>With the rise of industrial powerlooms, genuine handloom weaving faces immense challenges. SoilNSoul Travels bridges the gap by bringing discerning travelers directly into the homes of master weaver families—allowing visitors to appreciate the craftsmanship, hear firsthand stories, and acquire authentic textiles directly from the makers without middlemen.</p>
    `,
  },
  'temples-that-tell-stories': {
    _id: 'editorial-card-3',
    slug: 'temples-that-tell-stories',
    title: 'Temples That Tell Stories: Sacred Architecture and Hidden Shrines',
    excerpt: 'Sacred spaces, deeper meanings, and timeless legends etched into stone along the ancient ghats of Varanasi.',
    category: 'Spirituality',
    bannerImage: '/images/journal-ref/card3_temples_hd.jpg',
    metaTitle: 'Temples That Tell Stories in Varanasi | SoilNSoul Travels',
    metaDescription: 'Discover the hidden temples and ancient architecture of Varanasi. From Kashi Vishwanath to Kedareswar and neighborhood shrines with SoilNSoul Travels.',
    keywords: 'Varanasi temples, Kashi Vishwanath, hidden shrines Varanasi, ancient Hindu architecture Kashi, spiritual trail Varanasi',
    createdAt: '2025-02-01T09:00:00.000Z',
    content: `
      <p class="lead">It is often said that every stone in Kashi holds a deity, and every turn in its ancient alleys leads to a sanctuary. Beyond the prominent spires lies a city where every corner, alley, and stone carries thousands of years of devotion.</p>

      <h2>Kashi Vishwanath: The Golden Axis</h2>
      <p>Dedicated to Lord Shiva as the Lord of the Universe (Vishwanath), this Jyotirlinga shrine is the spiritual epicenter of Hinduism. Rebuilt through periods of intense historical turmoil, its spire plated in genuine gold stands as an enduring symbol of resilience, faith, and cosmic light.</p>

      <h2>The Red Spires of Kedareswar</h2>
      <p>Perched high above Kedar Ghat, the Kedareswar Temple is older in legend than Vishwanath itself. Its distinctive red-and-white striped facade recalls traditional South Indian temple aesthetics, illustrating how Varanasi has gathered pilgrims from every corner of the subcontinent for thousands of years.</p>

      <blockquote>
        "In the quiet courtyards of Kashi's lesser-known temples, time slows down. The stone steps, worn smooth by centuries of bare feet, radiate a stillness found nowhere else."
      </blockquote>

      <h2>The Sunken Wonder of Ratneshwar Mahadev</h2>
      <p>Leaning precariously towards the river at Manikarnika Ghat, the 9-degree tilt of the Ratneshwar temple surpasses even the Leaning Tower of Pisa. Submerged in Ganga's waters for several months of the monsoon each year, its exquisite stone carvings emerge intact season after season.</p>

      <p>Our private Temple Circuit journeys are led by local scholars who reveal not only the architectural majesty of these sacred structures, but the living philosophical traditions practiced within them today.</p>
    `,
  },
  'a-womans-journey-through-kashi': {
    _id: 'editorial-card-4',
    slug: 'a-womans-journey-through-kashi',
    title: 'A Woman’s Journey Through Kashi: Safety, Stories, and Exploring Solo',
    excerpt: 'Safety, stories, and the joy of exploring solo in Varanasi with confidence, intuition, and trusted local guidance.',
    category: 'Solo Women Travel',
    bannerImage: '/images/journal-ref/card4_solowoman_hd.jpg',
    metaTitle: 'A Woman’s Journey Through Kashi | Solo Female Travel Varanasi',
    metaDescription: 'A practical, empowering guide for women traveling solo in Varanasi. Safety advice, cultural etiquette, boutique stays, and curated private concierge support.',
    keywords: 'solo female travel Varanasi, women traveling Varanasi, Varanasi safety tips, female travel guide Kashi, SoilNSoul Travels',
    createdAt: '2025-02-05T14:00:00.000Z',
    content: `
      <p class="lead">Varanasi often evokes images of intensity—crowds, sounds, and vibrant energy. Yet for female solo travelers seeking genuine depth, Kashi offers a remarkably nurturing, soulful, and spiritually transformative sanctuary when approached with the right awareness and local support.</p>

      <h2>Intuition, Respect, and Confidence</h2>
      <p>The spirit of Varanasi is deeply respectful of travelers who honor its sacred traditions. Walking the river ghats early in the morning is one of the most serene experiences imaginable—pilgrims are immersed in prayer, boatmen prepare their craft, and the morning sun bathes the ancient sandstone in warm gold.</p>

      <h2>Practical Tips for Solo Women Travelers</h2>
      <ul>
        <li><strong>Choosing Accommodations:</strong> Opt for verified heritage havelis or boutique riverside properties with 24/7 staff, gated entrances, and direct ghat access.</li>
        <li><strong>Cultural Dressing:</strong> Wearing loose, breathable linen kurtas or long dresses covering the shoulders and knees ensures complete ease of movement and deep respect in religious quarters.</li>
        <li><strong>Evening Movement:</strong> While main ghats like Assi and Dashashwamedh remain lively until late evening, navigating unlit back alleys after dark is best done with a trusted local escort.</li>
      </ul>

      <blockquote>
        "Varanasi taught me that stillness is not the absence of sound, but the presence of peace within oneself amidst the sacred river's current."
      </blockquote>

      <h2>The SoilNSoul Travels Local Concierge</h2>
      <p>To provide peace of mind, SoilNSoul Travels pairs solo women travelers with verified, culturally sensitive local concierges. Whether navigating crowded markets, coordinating private dawn boat rides, or arranging vetted airport transfers, we ensure your journey through Varanasi is safe, enriching, and unforgettable.</p>
    `,
  },
  'the-flavours-of-kashi': {
    _id: 'editorial-card-5',
    slug: 'the-flavours-of-kashi',
    title: 'The Flavours of Kashi: From Morning Kachoris to Royal Banarasi Paan',
    excerpt: 'A sensory culinary trail through ancient galis, legendary halwais, winter malaiyo, and sizzling tamatar chaat.',
    category: 'Food & Culinary',
    bannerImage: '/SnS/the-banarasi-table.webp',
    metaTitle: 'The Flavours of Kashi: Varanasi Food Guide | SoilNSoul Travels',
    metaDescription: 'Discover the authentic culinary traditions of Varanasi. From Kachori Gali breakfasts to street-side chaat, creamy malaiyo, and legendary Banarasi paan.',
    keywords: 'Varanasi street food, Banarasi kachori, Kashi food guide, best food in Varanasi, Banarasi paan',
    createdAt: '2025-02-10T08:00:00.000Z',
    content: `
      <p class="lead">In Varanasi, food is neither a casual indulgence nor a hurried necessity—it is an art form rooted in seasonal devotion, ancient ayurvedic balance, and centuries of halwai craftsmanship.</p>

      <h2>Dawn: The Fragrance of Kachori Gali</h2>
      <p>As morning mists rise from the river, the narrow lanes behind Dashashwamedh Ghat come alive with the sizzle of pure desi ghee. At Ram Bhandar and century-old halwais in Kachori Gali, crisp heeng-spiced kachoris are served on dried sal leaf plates alongside tangy, slow-simmered potato curry and fresh jalebis glowing golden in hot syrup.</p>

      <h2>Afternoon: The Tang of Banarasi Chaat</h2>
      <p>Unlike chaat anywhere else in Northern India, Kashi's chaat culture is defined by its warm, earthy complexity. In the bustling chowk near Godowlia, master chaat-makers prepare Tamatar Chaat—slow-cooked tomatoes spiced with garam masala, dried fruits, and a generous splash of hing water, served piping hot in earthen kulhads.</p>

      <blockquote>
        "Food in Kashi is intimately tied to the rhythm of the city. Every bite carries the memory of generations who perfected the balance of spice, sweetness, and soul."
      </blockquote>

      <h2>Winter Ambrosia: The Mystery of Malaiyo</h2>
      <p>During the crisp winter mornings between November and February, Chaukhamba lane fills with large brass platters holding Malaiyo—an ethereal, cloud-like foam prepared by churning milk and leaving it under the open night sky to absorb the holy dawn dew, scented with saffron, cardamom, and crushed pistachios.</p>

      <h2>The Royal Finale: Magahi Banarasi Paan</h2>
      <p>No culinary journey through Kashi is complete without Banarasi Paan. Folded with tender Magahi betel leaf, fragrant gulkand, kattha, and fine areca nut, it is not merely a palate cleanser—it is a regal ceremony of hospitality that lingers long after you leave the ancient city.</p>
    `,
  },
  'celebrating-dev-deepavali': {
    _id: 'editorial-card-6',
    slug: 'celebrating-dev-deepavali',
    title: 'Celebrating Dev Deepavali: When the Gods Descend Upon Kashi’s Ghats',
    excerpt: 'A million glowing earthen lamps along 84 ghats, sacred chants, and the divine radiance of Kartik Purnima.',
    category: 'Festivals & Events',
    bannerImage: '/SnS/celebrations.webp',
    metaTitle: 'Celebrating Dev Deepavali in Varanasi | SoilNSoul Travels',
    metaDescription: 'Experience Dev Deepavali in Varanasi. Over one million diyas lighting the ghats, sacred fireworks, and private boat journeys for Kartik Purnima with SoilNSoul Travels.',
    keywords: 'Dev Deepavali Varanasi, Kartik Purnima Kashi, festivals in Varanasi, Ganga Mahotsav, Varanasi festival guide',
    createdAt: '2025-02-15T18:00:00.000Z',
    content: `
      <p class="lead">Fifteen days after Diwali, on the full moon night of Kartik Purnima, Varanasi undergoes a transformation unlike any other place on Earth. It is believed that on this sacred night, all thirty-three crore deities descend from the heavens to bathe in the holy Ganges.</p>

      <h2>A River of Liquid Amber</h2>
      <p>As twilight settles, over one million handmade terracotta lamps (diyas) are lit simultaneously across the crescent-shaped arc of Varanasi’s 84 ghats. From Assi Ghat in the south to Rajghat in the north, stone balustrades, temple rooftops, and steep stairways illuminate in continuous ribbons of living golden fire.</p>

      <h2>The Grand Chants of Dashashwamedh and Rajghat</h2>
      <p>The ceremonies during Dev Deepavali reach a crescendo with monumental Maha Aartis. Choirs of Vedic scholars chant ancient hymns in resonance with conch shells and sacred drums. Pilgrims and visitors from across the globe gather on traditional wooden boats, drifting along the river as reflections of fire dance upon the dark surface of Mother Ganga.</p>

      <blockquote>
        "To see Varanasi during Dev Deepavali is to witness the boundary between earth and the cosmos gently dissolve into a sea of sacred light."
      </blockquote>

      <h2>Experiencing the Festival with SoilNSoul Travels</h2>
      <p>Navigating the extraordinary crowds of Dev Deepavali requires thoughtful planning. SoilNSoul Travels curates private wooden bajras equipped with heritage seating, traditional refreshments, and knowledgeable guides, giving travelers a peaceful, reverent vantage point right in the heart of the celestial celebration.</p>
    `,
  },
};

/** Fetch all blogs (server-side, cached with ISR, falling back to curated editorial posts) */
export async function fetchBlogs(): Promise<BlogPost[]> {
  const editorialList = Object.values(EDITORIAL_POSTS);
  if (!API_URL) return editorialList;

  try {
    const res = await fetch(`${API_URL}/blogs`, {
      next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600, tags: ['blogs'] },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return editorialList;
    const data = await res.json();
    if (data.success && Array.isArray(data.blogs) && data.blogs.length > 0) {
      // Merge db blogs with any missing editorial posts so all cards stay active
      const dbSlugs = new Set(data.blogs.map((b: BlogPost) => b.slug));
      const missingEditorial = editorialList.filter((e) => !dbSlugs.has(e.slug));
      return [...data.blogs, ...missingEditorial];
    }
    return editorialList;
  } catch {
    return editorialList;
  }
}

/** Fetch single blog by slug (server-side, cached with ISR, falling back to curated editorial posts) */
export async function fetchBlogBySlug(slug: string): Promise<BlogPost | null> {
  if (API_URL) {
    try {
      const res = await fetch(`${API_URL}/blogs/${slug}`, {
        next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600, tags: ['blogs', `blog:${slug}`] },
        signal: AbortSignal.timeout(4000),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.blog) return data.blog;
      }
    } catch {
      // Fall through to curated editorial fallback
    }
  }

  if (EDITORIAL_POSTS[slug]) {
    return EDITORIAL_POSTS[slug];
  }

  return null;
}

/** Fetch all blog slugs for static generation */
export async function fetchAllBlogSlugs(): Promise<string[]> {
  const editorialSlugs = Object.keys(EDITORIAL_POSTS);
  if (!API_URL) return editorialSlugs;

  try {
    const blogs = await fetchBlogs();
    const allSlugs = blogs.map((b) => b.slug).filter(Boolean);
    return Array.from(new Set([...editorialSlugs, ...allSlugs]));
  } catch {
    return editorialSlugs;
  }
}

/** Subscribe an email address to the automated newsletter updates */
export async function subscribeNewsletter(
  email: string,
  name?: string,
  source: string = 'blog_newsletter'
): Promise<{ success: boolean; message: string }> {
  const targetUrl = API_URL ? `${API_URL}/newsletter/subscribe` : 'http://localhost:5000/api/newsletter/subscribe';

  try {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, source }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: data.message || 'Unable to complete subscription. Please try again.',
      };
    }
    return {
      success: true,
      message: data.message || 'Subscribed successfully! A welcome email has been sent.',
    };
  } catch (err) {
    console.error('Newsletter subscribe network error:', err);
    return {
      success: false,
      message: 'Network error. Please check your connection or reach out on WhatsApp.',
    };
  }
}

