import { useQuery } from "@tanstack/react-query";
import { CATEGORIES, ITEMS, REVIEWS } from "@/data/menu";

export type { MenuCategory, MenuItem, Review } from "@/data/menu";

export function useMenu() {
  return useQuery({
    queryKey: ["menu"],
    queryFn: async () => ({ categories: CATEGORIES, items: ITEMS }),
  });
}

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: async () => REVIEWS,
  });
}
