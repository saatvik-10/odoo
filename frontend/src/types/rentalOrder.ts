export type OrderStatus =
  | 'quotation'
  | 'reserved'
  | 'pickedup'
  | 'delivered'
  | 'returned';
 
export interface RentalOrder {
  id: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  invoiceAddress: string;
  deliveryAddress: string;
  rentalTemplate: string;
  expiration: Date;
  rentalOrderDate: Date;
  priceList: string;
  rentalPeriod: {
    startDate: Date;
    endDate: Date;
  };
  rentalDuration: number;
  status: OrderStatus;
  orderLines: Array<{
    id: string;
    product: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    subTotal: number;
  }>;
  termsConditions: string;
  untaxedTotal: number;
  taxTotal: number;
  total: number;
  rejectionFeedback?: string;
}