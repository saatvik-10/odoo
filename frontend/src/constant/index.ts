import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';

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
