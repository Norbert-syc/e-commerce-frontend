export interface product {
    
  id: number;   
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  rating: number;
  inStock: boolean;
}