import paneerTikka from "@/assets/menu/paneer-tikka.jpg";
import malaiKebab from "@/assets/menu/malai-kebab.jpg";
import lotusStem from "@/assets/menu/lotus-stem.jpg";
import butterChicken from "@/assets/menu/butter-chicken.jpg";
import dalMakhani from "@/assets/menu/dal-makhani.jpg";
import laalMaas from "@/assets/menu/laal-maas.jpg";
import palakPaneer from "@/assets/menu/palak-paneer.jpg";
import muttonBiryani from "@/assets/menu/mutton-biryani.jpg";
import chickenBiryani from "@/assets/menu/chicken-biryani.jpg";
import vegBiryani from "@/assets/menu/veg-biryani.jpg";
import garlicNaan from "@/assets/menu/garlic-naan.jpg";
import truffleKulcha from "@/assets/menu/truffle-kulcha.jpg";
import gulabJamun from "@/assets/menu/gulab-jamun.jpg";
import pistaKulfi from "@/assets/menu/pista-kulfi.jpg";
import mangoLassi from "@/assets/menu/mango-lassi.jpg";
import masalaChai from "@/assets/menu/masala-chai.jpg";

export type MenuCategory = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type MenuItem = {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price_inr: number;
  is_veg: boolean;
  spicy_level: number;
  calories: number | null;
  fiber_g: number | null;
  ingredients: string | null;
  badge: string | null;
  image_url: string | null;
  sort_order: number;
};

export type Review = {
  id: string;
  author_name: string;
  rating: number;
  body: string;
};

export const CATEGORIES: MenuCategory[] = [
  { id: "starters", slug: "starters", name: "Starters", description: "Smoky tandoor-fired beginnings to awaken the palate.", sort_order: 1 },
  { id: "mains", slug: "mains", name: "Signature Mains", description: "Chef-led classics, slow-cooked and richly spiced.", sort_order: 2 },
  { id: "biryani", slug: "biryani", name: "Biryani & Rice", description: "Aromatic dum-cooked rice layered with saffron.", sort_order: 3 },
  { id: "breads", slug: "breads", name: "Breads", description: "Hand-stretched, clay-oven baked daily.", sort_order: 4 },
  { id: "desserts", slug: "desserts", name: "Desserts", description: "Heritage sweets reimagined with modern finesse.", sort_order: 5 },
  { id: "drinks", slug: "drinks", name: "Drinks", description: "House-blended lassis, chai and cooling sherbets.", sort_order: 6 },
];

export const ITEMS: MenuItem[] = [
  // Starters
  { id: "paneer-tikka", category_id: "starters", name: "Tandoori Paneer Tikka", description: "Cottage cheese cubes marinated in yogurt and Kashmiri chilli, charred in the tandoor.", price_inr: 320, is_veg: true, spicy_level: 2, calories: 380, fiber_g: 2.4, ingredients: "Paneer, yogurt, ginger, garlic, Kashmiri chilli, garam masala, bell pepper", badge: "chef_special", image_url: paneerTikka, sort_order: 1 },
  { id: "malai-kebab", category_id: "starters", name: "Murgh Malai Kebab", description: "Cream-marinated chicken skewers with cardamom, cheese and saffron.", price_inr: 420, is_veg: false, spicy_level: 1, calories: 460, fiber_g: 1.1, ingredients: "Chicken thigh, cream, cheese, saffron, white pepper, cardamom", badge: "bestseller", image_url: malaiKebab, sort_order: 2 },
  { id: "lotus-stem", category_id: "starters", name: "Crispy Lotus Stem Honey Chilli", description: "Crackling lotus stem tossed in chilli-honey glaze with sesame.", price_inr: 290, is_veg: true, spicy_level: 3, calories: 340, fiber_g: 3.2, ingredients: "Lotus stem, honey, soy, garlic, sesame, spring onion", badge: "fresh", image_url: lotusStem, sort_order: 3 },

  // Mains
  { id: "butter-chicken", category_id: "mains", name: "Butter Chicken", description: "Tandoor-roasted chicken in a velvety tomato-cashew gravy finished with cream.", price_inr: 480, is_veg: false, spicy_level: 2, calories: 620, fiber_g: 2.8, ingredients: "Chicken, tomato, cashew, cream, fenugreek, butter, ginger", badge: "bestseller", image_url: butterChicken, sort_order: 1 },
  { id: "dal-makhani", category_id: "mains", name: "Dal Makhani", description: "Black urad lentils slow-cooked overnight with butter and cream.", price_inr: 360, is_veg: true, spicy_level: 1, calories: 520, fiber_g: 9.6, ingredients: "Black urad, kidney beans, butter, cream, tomato, ginger", badge: "chef_special", image_url: dalMakhani, sort_order: 2 },
  { id: "laal-maas", category_id: "mains", name: "Laal Maas", description: "Fiery Rajasthani mutton curry with mathania chillies and smoked ghee.", price_inr: 620, is_veg: false, spicy_level: 4, calories: 740, fiber_g: 1.4, ingredients: "Mutton, mathania chilli, yogurt, ghee, garlic, smoke", badge: "limited", image_url: laalMaas, sort_order: 3 },
  { id: "palak-paneer", category_id: "mains", name: "Palak Paneer", description: "Silky spinach gravy with hand-cut paneer and a swirl of cream.", price_inr: 340, is_veg: true, spicy_level: 1, calories: 410, fiber_g: 5.2, ingredients: "Spinach, paneer, garlic, cumin, cream", badge: null, image_url: palakPaneer, sort_order: 4 },

  // Biryani
  { id: "mutton-biryani", category_id: "biryani", name: "Hyderabadi Mutton Biryani", description: "Long-grain basmati layered with mutton, saffron and fried onions, sealed and dum-cooked.", price_inr: 580, is_veg: false, spicy_level: 3, calories: 820, fiber_g: 3.4, ingredients: "Mutton, basmati, saffron, fried onions, mint, yogurt, whole spices", badge: "bestseller", image_url: muttonBiryani, sort_order: 1 },
  { id: "chicken-biryani", category_id: "biryani", name: "Awadhi Chicken Biryani", description: "Lucknowi-style fragrant biryani with rose water and kewra.", price_inr: 480, is_veg: false, spicy_level: 2, calories: 760, fiber_g: 3.1, ingredients: "Chicken, basmati, rose water, kewra, saffron, ghee", badge: "chef_special", image_url: chickenBiryani, sort_order: 2 },
  { id: "veg-biryani", category_id: "biryani", name: "Subz Dum Biryani", description: "Garden vegetables and paneer layered with saffron rice.", price_inr: 380, is_veg: true, spicy_level: 2, calories: 640, fiber_g: 5.8, ingredients: "Basmati, mixed vegetables, paneer, saffron, mint, ghee", badge: null, image_url: vegBiryani, sort_order: 3 },

  // Breads
  { id: "garlic-naan", category_id: "breads", name: "Garlic Butter Naan", description: "Hand-stretched naan with roasted garlic and butter.", price_inr: 90, is_veg: true, spicy_level: 0, calories: 220, fiber_g: 1.6, ingredients: "Refined flour, yogurt, garlic, butter", badge: null, image_url: garlicNaan, sort_order: 1 },
  { id: "truffle-kulcha", category_id: "breads", name: "Truffle Kulcha", description: "Stuffed kulcha with potato, cheese and a hint of truffle.", price_inr: 220, is_veg: true, spicy_level: 0, calories: 320, fiber_g: 2.0, ingredients: "Refined flour, potato, cheese, truffle oil", badge: "chef_special", image_url: truffleKulcha, sort_order: 2 },

  // Desserts
  { id: "gulab-jamun", category_id: "desserts", name: "Saffron Gulab Jamun", description: "Warm gulab jamun in rose-saffron syrup with pistachio and silver leaf.", price_inr: 210, is_veg: true, spicy_level: 0, calories: 380, fiber_g: 0.8, ingredients: "Khoya, sugar, rose water, saffron, pistachio", badge: "bestseller", image_url: gulabJamun, sort_order: 1 },
  { id: "pista-kulfi", category_id: "desserts", name: "Pista Kulfi", description: "Slow-churned pistachio kulfi on a bed of crushed nuts.", price_inr: 180, is_veg: true, spicy_level: 0, calories: 290, fiber_g: 1.2, ingredients: "Milk, pistachio, sugar, cardamom", badge: "fresh", image_url: pistaKulfi, sort_order: 2 },

  // Drinks
  { id: "mango-lassi", category_id: "drinks", name: "Mango Lassi", description: "Alphonso mango blended with hung yogurt and a hint of cardamom.", price_inr: 160, is_veg: true, spicy_level: 0, calories: 240, fiber_g: 0.9, ingredients: "Alphonso mango, yogurt, sugar, cardamom", badge: "bestseller", image_url: mangoLassi, sort_order: 1 },
  { id: "masala-chai", category_id: "drinks", name: "Masala Chai", description: "House-blended chai with cardamom, ginger and clove.", price_inr: 90, is_veg: true, spicy_level: 1, calories: 110, fiber_g: 0.2, ingredients: "Tea, milk, cardamom, ginger, clove", badge: null, image_url: masalaChai, sort_order: 2 },
];

export const REVIEWS: Review[] = [
  { id: "r1", author_name: "Aarav Mehta", rating: 5, body: "The Hyderabadi biryani is the best I've had outside of Charminar. Service felt curated, like a private chef experience." },
  { id: "r2", author_name: "Priya Iyer", rating: 5, body: "Stunning interiors, soulful food. The Laal Maas left me speechless. A clear top-three in the city." },
  { id: "r3", author_name: "Rohan Kapoor", rating: 5, body: "Date night winner. The truffle kulcha and butter chicken combo is unreal. Premium feel from booking to bill." },
  { id: "r4", author_name: "Sneha Bansal", rating: 4, body: "Beautiful presentation and warm hospitality. The gulab jamun with silver leaf is poetry on a plate." },
];
