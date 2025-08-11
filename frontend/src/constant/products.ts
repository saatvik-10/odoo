import { Product } from '@/types/product';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Professional Camera Kit',
    description: 'High-end DSLR camera with multiple lenses',
    category: 'Photography',
    stock: 15,
    rentalPricing: [
      { period: '1 Hour', pricelist: 'Standard', price: 100 },
      { period: '1 Day', pricelist: 'Standard', price: 550 },
      { period: '1 Week', pricelist: 'Standard', price: 900 },
      { period: '1 Month', pricelist: 'Standard', price: 3200 },
    ],
    reservationCharges: {
      extraHour: 25,
      extraDays: 120,
      extraWeek: 500,
      lateReturn: 50,
    },
  },
  {
    id: 2,
    name: 'Drone with 4K Camera',
    description: 'Professional drone for aerial photography',
    category: 'Drones',
    stock: 8,
    rentalPricing: [
      { period: '1 Hour', pricelist: 'Premium', price: 150 },
      { period: '1 Day', pricelist: 'Premium', price: 500 },
      { period: '1 Week', pricelist: 'Premium', price: 1200 },
      { period: '1 Month', pricelist: 'Premium', price: 4500 },
    ],
    reservationCharges: {
      extraHour: 35,
      extraDays: 180,
      extraWeek: 500,
      lateReturn: 75,
    },
  },
  {
    id: 3,
    name: 'Audio Recording Setup',
    description: 'Complete audio recording equipment',
    category: 'Audio',
    stock: 12,
    rentalPricing: [
      { period: '1 Hour', pricelist: 'Standard', price: 80 },
      { period: '1 Day', pricelist: 'Standard', price: 150 },
      { period: '1 Week', pricelist: 'Standard', price: 650 },
      { period: '1 Month', pricelist: 'Standard', price: 2400 },
    ],
    reservationCharges: {
      extraHour: 20,
      extraDays: 90,

      extraWeek: 500,
      lateReturn: 40,
    },
  },
  {
    id: 4,
    name: 'Lighting Equipment Set',
    description: 'Professional studio lighting kit',
    category: 'Lighting',
    stock: 20,
    rentalPricing: [
      { period: '1 Hour', pricelist: 'Standard', price: 220 },
      { period: '1 Day', pricelist: 'Standard', price: 800 },
      { period: '1 Week', pricelist: 'Standard', price: 5000 },
      { period: '1 Month', pricelist: 'Standard', price: 18000 },
    ],
    reservationCharges: {
      extraHour: 15,
      extraDays: 70,

      extraWeek: 500,
      lateReturn: 30,
    },
  },
  {
    id: 5,
    name: 'Video Editing Workstation',
    description: 'High-performance computer for video editing',
    category: 'Computers',
    stock: 6,
    rentalPricing: [
      { period: '1 Hour', pricelist: 'Premium', price: 200 },
      { period: '1 Day', pricelist: 'Premium', price: 420 },
      { period: '1 Week', pricelist: 'Premium', price: 750 },
      { period: '1 Month', pricelist: 'Premium', price: 2800 },
    ],
    reservationCharges: {
      extraHour: 20,
      extraDays: 100,
      extraWeek: 500,
      lateReturn: 45,
    },
  },
];
