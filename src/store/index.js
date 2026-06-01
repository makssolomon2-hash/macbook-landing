import { create } from "zustand";

const useMacbookStore = create((set) => ({
    color: '#adb5bd',
    setColor: (color) => set({ color }),

    scale: 0.08,
    setScale: (scale) => set({ scale }),

    texture: '/videos/feature-1.mp4',
    setTexture: (texture) => set({texture}),

    reset: () => set({ color: '#adb5bd', scale: 0.08, texture: '/videos/feature-1.mp4'}),
}))

export default useMacbookStore;