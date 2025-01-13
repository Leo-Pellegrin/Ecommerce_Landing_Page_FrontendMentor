// stores/device.ts
import { defineStore } from 'pinia';

export const useDeviceStore = defineStore('device', {
  state: () => ({
    isMobile: window.innerWidth <= 400, // Initialisation
  }),
  actions: {
    updateDevice() {
      this.isMobile = window.innerWidth <= 400;
    },
  },
});