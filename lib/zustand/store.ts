import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { toast } from "sonner";

interface AddCartProps {
    id: string;
    name: string;
    image: string;
    subCategory: string;
    quantity: number;
    size: string;
    price: number;
}

interface CartStore {
    items: AddCartProps[];
    addToCart: ({ id, name, image, subCategory, quantity, size, price, }: AddCartProps) => void;
    removeItem: (id: string, size: string) => void;

    removeAll: () => void;
}

const useCart = create(
    persist<CartStore>(
        (set, get) => ({
            items: [],
            addToCart: ({ id, name, image, subCategory, quantity, size, price, }: AddCartProps) => {

                const existingItem = get().items.find(item => item.id === id && item.size === size);
                if (existingItem) {
                    set({
                        items: get().items.map(item =>
                            item.id === id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        )
                    });
                    toast.success("Item quantity updated in cart.");
                    return;
                }

                set({ items: [...get().items, { id, name, image, subCategory, quantity, size, price, }] });
                toast.success("Item added to cart.");
            },
            removeItem: (id: string, size: string) => {
                set({
                    items: get().items.filter((item) => !(item.id === id && item.size === size))
                });
                toast.success("Item removed from cart.");
            },
            removeAll: () => set({ items: [] }),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCart;