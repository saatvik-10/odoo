import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';

export type RentalStatus = 'quotation' | 'pickup' | 'returned' | 'reserved';

export interface RentalOrder {
  id: string;
  orderReference: string;
  customer: string;
  createdBy: string;
  rentalStatus: RentalStatus;
  amount: number;
  pickupDate?: string;
  returnDate?: string;
}


export const kpiData = [
  {
    title: 'Quotations',
    value: '10',
    change: '+2.5%',
    trend: 'up',
    icon: Package,
    description: 'Active quotes',
  },
  {
    title: 'Rentals',
    value: '26',
    change: '+12.3%',
    trend: 'up',
    icon: ShoppingCart,
    description: 'Current rentals',
  },
  {
    title: 'Revenue',
    value: '$10,599',
    change: '+8.1%',
    trend: 'up',
    icon: DollarSign,
    description: 'This month',
  },
  {
    title: 'Total Orders',
    value: '45',
    change: '-2.1%',
    trend: 'down',
    icon: Users,
    description: 'All time',
  },
];

export const topCategories = [
  { category: 'Rental - Service', ordered: 25, revenue: 2940 },
  { category: 'Medical Equipment', ordered: 18, revenue: 2150 },
  { category: 'Mobility Aids', ordered: 15, revenue: 1890 },
  { category: 'Furniture', ordered: 12, revenue: 1420 },
];

export const topProducts = [
  {
    product: 'Wheelchairs',
    ordered: 10,
    revenue: 3032,
  },
  { product: 'Tables', ordered: 5, revenue: 1008 },
  { product: 'Chairs', ordered: 4, revenue: 3008 },
  {
    product: 'Hospital Beds',
    ordered: 8,
    revenue: 2400,
  },
  { product: 'Walking Aids', ordered: 6, revenue: 1200 },
];

export const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Customer1',
    items: 3,
    amount: 450,
    status: 'Delivered',
  },
  {
    id: 'ORD-002',
    customer: 'Customer2',
    items: 2,
    amount: 320,
    status: 'Quotation',
  },
  {
    id: 'ORD-003',
    customer: 'Customer3',
    items: 5,
    amount: 680,
    status: 'Returned',
  },
  {
    id: 'ORD-004',
    customer: 'Customer4',
    items: 1,
    amount: 150,
    status: 'Picked Up',
  },
  {
    id: 'ORD-005',
    customer: 'Customer5',
    items: 1,
    amount: 160,
    status: 'Reserved',
  },
];

export const topCustomers = [
  { customer: 'Customer1', ordered: 10, revenue: 3032, totalOrders: 15 },
  { customer: 'Customer2', ordered: 5, revenue: 1008, totalOrders: 8 },
  { customer: 'Customer3', ordered: 4, revenue: 3008, totalOrders: 12 },
  { customer: 'Healthcare Plus', ordered: 8, revenue: 2400, totalOrders: 20 },
  { customer: 'MedSupply Co', ordered: 6, revenue: 1800, totalOrders: 14 },
];

export const mockOrders: RentalOrder[] = [
  {
    id: '1',
    orderReference: 'R0001',
    customer: 'Customer 1',
    createdBy: 'Adam',
    rentalStatus: 'quotation',
    amount: 2000,
  },
  {
    id: '2',
    orderReference: 'R0002',
    customer: 'Customer 2',
    createdBy: 'Adam',
    rentalStatus: 'pickup',
    amount: 1000,
    pickupDate: '09/03/2025 00:30:36',
  },
  {
    id: '3',
    orderReference: 'R0003',
    customer: 'Customer 3',
    createdBy: 'Adam',
    rentalStatus: 'returned',
    amount: 2000,
  },
  {
    id: '4',
    orderReference: 'R0004',
    customer: 'Customer 4',
    createdBy: 'Adam',
    rentalStatus: 'reserved',
    amount: 2000,
  },
  {
    id: '5',
    orderReference: 'R0005',
    customer: 'Customer 5',
    createdBy: 'Adam',
    rentalStatus: 'quotation',
    amount: 2000,
  },
  {
    id: '6',
    orderReference: 'R0006',
    customer: 'Customer 6',
    createdBy: 'Adam',
    rentalStatus: 'reserved',
    amount: 2000,
  },
  {
    id: '7',
    orderReference: 'R0007',
    customer: 'Customer 7',
    createdBy: 'Adam',
    rentalStatus: 'reserved',
    amount: 1400,
  },
  {
    id: '8',
    orderReference: 'R0008',
    customer: 'Customer 8',
    createdBy: 'Adam',
    rentalStatus: 'returned',
    amount: 3000,
  },
  {
    id: '9',
    orderReference: 'R0009',
    customer: 'Customer 9',
    createdBy: 'Adam',
    rentalStatus: 'quotation',
    amount: 1500,
  },
  {
    id: '10',
    orderReference: 'R0010',
    customer: 'Customer 10',
    createdBy: 'Adam',
    rentalStatus: 'pickup',
    amount: 2500,
  },
  {
    id: '11',
    orderReference: 'R0011',
    customer: 'Customer 11',
    createdBy: 'Adam',
    rentalStatus: 'reserved',
    amount: 1800,
  },
  {
    id: '12',
    orderReference: 'R0012',
    customer: 'Customer 12',
    createdBy: 'Adam',
    rentalStatus: 'quotation',
    amount: 3200,
  },
  {
    id: '13',
    orderReference: 'R0013',
    customer: 'Customer 13',
    createdBy: 'Adam',
    rentalStatus: 'returned',
    amount: 2200,
  },
  {
    id: '14',
    orderReference: 'R0014',
    customer: 'Customer 14',
    createdBy: 'Adam',
    rentalStatus: 'pickup',
    amount: 1900,
  },
  {
    id: '15',
    orderReference: 'R0015',
    customer: 'Customer 15',
    createdBy: 'Adam',
    rentalStatus: 'reserved',
    amount: 2800,
  },
];
