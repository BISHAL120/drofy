import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Product = {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    category: 'men' | 'women' | 'shoes' | 'accessories';
    status: 'normal' | 'sale' | 'hot' | 'comingSoon';
};

type WishlistStore = {
    items: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: number) => void;
    toggleWishlist: (product: Product) => void;
    isInWishlist: (productId: number) => boolean;
};

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addToWishlist: (product) =>
                set((state) => ({
                    items: [...state.items, product],
                })),
            removeFromWishlist: (productId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                })),
            toggleWishlist: (product) => {
                const isInWishlist = get().isInWishlist(product.id);
                if (isInWishlist) {
                    get().removeFromWishlist(product.id);
                } else {
                    get().addToWishlist(product);
                }
            },
            isInWishlist: (productId) =>
                get().items.some((item) => item.id === productId),
        }),
        {
            name: 'wishlist-storage',
        }
    )
);