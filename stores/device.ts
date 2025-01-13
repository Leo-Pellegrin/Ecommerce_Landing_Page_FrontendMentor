import { defineStore } from 'pinia';

export const useDeviceStore = defineStore('device', {
  state: () => ({
    isMobile: false, // Initialisation à `false`, car on ne sait pas encore si c'est mobile
  }),
  actions: {
    updateDevice() {
      if (typeof window !== 'undefined') {
        this.isMobile = window.innerWidth <= 400;
      }
    },
  },
});