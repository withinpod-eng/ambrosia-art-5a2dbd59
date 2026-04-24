import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export function useMenu() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const [cats, items] = await Promise.all([
        supabase.from("menu_categories").select("*").order("sort_order"),
        supabase.from("menu_items").select("*").order("sort_order"),
      ]);
      if (cats.error) throw cats.error;
      if (items.error) throw items.error;
      return {
        categories: (cats.data ?? []) as MenuCategory[],
        items: (items.data ?? []) as MenuItem[],
      };
    },
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}
