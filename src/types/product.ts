export interface Product {
  _id?: string;
  id?: number;
  name: string;
  slug?: string;
  price: number;
  discountPrice?: number;
  description?: string;
  image?: string;
  images?: string[];
  category?: string;
  categoryId?: string;
  rating?: number;
  quantity?: number;
  inStock?: boolean;
}

// Legacy type alias for compatibility
export type product = Product;
