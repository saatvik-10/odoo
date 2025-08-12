'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Check,
  X,
  Printer,
  Truck,
} from 'lucide-react';
import type { Rental, RentalStatus } from '@/validators/rental.validator';
import { RejectionModal } from '@/components/modals/rejection-modal';
import { DeliveryModal } from '@/components/modals/delivery-modal';

interface RentalDetailsProps {
  rental: Rental;
  onStatusChange?: (newStatus: RentalStatus, data?: any) => void;
}

export function RentalDetails({ rental, onStatusChange }: RentalDetailsProps) {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString()}`;
  };

  const getStatusBadgeColor = (status: RentalStatus) => {
    switch (status) {
      case 'Quotation':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Reserved':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Picked Up':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Returned':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Received By Vendor':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusMessage = (status: RentalStatus) => {
    switch (status) {
      case 'Quotation':
        return 'Awaiting vendor approval';
      case 'Reserved':
        return 'Ready for delivery scheduling';
      case 'Picked Up':
        return 'Items picked up for delivery';
      case 'Delivered':
        return 'Items delivered to customer';
      case 'Returned':
        return 'Items returned by customer';
      case 'Received By Vendor':
        return 'Items received back by vendor';
      case 'Cancelled':
        return 'Rental request cancelled';
      default:
        return 'Status unknown';
    }
  };

  const handleAccept = () => {
    onStatusChange?.('Reserved');
  };

  const handleReject = (reason: string) => {
    onStatusChange?.('Cancelled', { reason });
  };

  const handleScheduleDelivery = (deliveryData: any) => {
    onStatusChange?.('Picked Up', { deliveryData });
  };

  const renderActionButtons = () => {
    switch (rental.status) {
      case 'Quotation':
        return (
          <>
            <Button
              className='w-full bg-green-600 hover:bg-green-700'
              onClick={handleAccept}
            >
              <Check className='h-4 w-4 mr-2' />
              Accept Request
            </Button>
            <Button
              variant='destructive'
              className='w-full'
              onClick={() => setShowRejectionModal(true)}
            >
              <X className='h-4 w-4 mr-2' />
              Reject Request
            </Button>
          </>
        );
      case 'Reserved':
        return (
          <Button
            className='w-full bg-blue-600 hover:bg-blue-700'
            onClick={() => setShowDeliveryModal(true)}
          >
            <Truck className='h-4 w-4 mr-2' />
            Schedule Delivery
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 p-6'>
        {/* Left Column - Main Details */}
        <div className='lg:col-span-2 space-y-6'>
          <Card>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <CardTitle className='text-xl font-bold'>
                  R{rental.rentalID.toString().padStart(4, '0')}
                </CardTitle>
                <Badge className={getStatusBadgeColor(rental.status)}>
                  {rental.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Customer Information */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-3'>Customer</h3>
                  <div className='space-y-2'>
                    <div className='flex items-center space-x-2'>
                      <User className='h-4 w-4 text-gray-500' />
                      <span className='text-sm'>{rental.user.name}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Mail className='h-4 w-4 text-gray-500' />
                      <span className='text-sm'>{rental.user.email}</span>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <Phone className='h-4 w-4 text-gray-500' />
                      <span className='text-sm'>
                        {rental.user.mobileNumber}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='font-semibold text-gray-900 mb-3'>
                    Expiration
                  </h3>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='h-4 w-4 text-gray-500' />
                    <span className='text-sm'>
                      {formatDate(rental.endDate)}
                    </span>
                  </div>

                  <h3 className='font-semibold text-gray-900 mb-3 mt-4'>
                    Rental Order Date
                  </h3>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='h-4 w-4 text-gray-500' />
                    <span className='text-sm'>
                      {formatDate(rental.startDate)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Addresses */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-3'>
                    Invoice Address
                  </h3>
                  <div className='flex items-start space-x-2'>
                    <MapPin className='h-4 w-4 text-gray-500 mt-0.5' />
                    <div className='text-sm'>
                      <div>{rental.invoiceAddress.addressLine1}</div>
                      <div>{rental.invoiceAddress.street}</div>
                      <div>
                        {rental.invoiceAddress.city}{' '}
                        {rental.invoiceAddress.pincode}
                      </div>
                      <div>{rental.invoiceAddress.state}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='font-semibold text-gray-900 mb-3'>
                    Delivery Address
                  </h3>
                  <div className='flex items-start space-x-2'>
                    <MapPin className='h-4 w-4 text-gray-500 mt-0.5' />
                    <div className='text-sm'>
                      <div>{rental.deliveryAddress.addressLine1}</div>
                      <div>{rental.deliveryAddress.street}</div>
                      <div>
                        {rental.deliveryAddress.city}{' '}
                        {rental.deliveryAddress.pincode}
                      </div>
                      <div>{rental.deliveryAddress.state}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rental Information */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <h3 className='font-semibold text-gray-900 mb-3'>
                    Rental Template
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Standard Medical Equipment Rental
                  </p>

                  <h3 className='font-semibold text-gray-900 mb-3 mt-4'>
                    Price List
                  </h3>
                  <p className='text-sm text-gray-600'>{rental.product}</p>
                  <Button
                    variant='outline'
                    size='sm'
                    className='mt-2 bg-transparent'
                  >
                    Update Prices
                  </Button>
                </div>

                <div>
                  <h3 className='font-semibold text-gray-900 mb-3'>
                    Rental Period
                  </h3>
                  <div className='flex items-center space-x-2'>
                    <Calendar className='h-4 w-4 text-gray-500' />
                    <span className='text-sm'>
                      {formatDate(rental.startDate)} -{' '}
                      {formatDate(rental.endDate)}
                    </span>
                  </div>

                  <h3 className='font-semibold text-gray-900 mb-3 mt-4'>
                    Rental Duration
                  </h3>
                  <div className='flex items-center space-x-2'>
                    <Clock className='h-4 w-4 text-gray-500' />
                    <span className='text-sm'>
                      {rental.duration.durationValue}{' '}
                      {rental.duration.durationType === 'daily'
                        ? 'days'
                        : rental.duration.durationType}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Lines */}
          <Card>
            <CardHeader>
              <CardTitle>Order Lines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b'>
                      <th className='text-left py-2 font-medium'>Product</th>
                      <th className='text-right py-2 font-medium'>Quantity</th>
                      <th className='text-right py-2 font-medium'>
                        Unit Price
                      </th>
                      <th className='text-right py-2 font-medium'>Tax</th>
                      <th className='text-right py-2 font-medium'>Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rental.products.map((item, index) => (
                      <tr key={index} className='border-b'>
                        <td className='py-3'>
                          <div className='font-medium'>{item.product.name}</div>
                          {item.product.description && (
                            <div className='text-sm text-gray-500'>
                              {item.product.description}
                            </div>
                          )}
                        </td>
                        <td className='text-right py-3'>{item.quantity}</td>
                        <td className='text-right py-3'>
                          {formatCurrency(item.price)}
                        </td>
                        <td className='text-right py-3'>{formatCurrency(0)}</td>
                        <td className='text-right py-3'>
                          {formatCurrency(item.quantity * item.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex justify-between'>
                <span>Untaxed Total:</span>
                <span className='font-medium'>
                  {formatCurrency(rental.amount)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span>Tax:</span>
                <span className='font-medium'>
                  {formatCurrency(rental.tax)}
                </span>
              </div>
              {rental.couponCode && (
                <div className='flex justify-between text-green-600'>
                  <span>Coupon ({rental.couponCode}):</span>
                  <span className='font-medium'>
                    -{formatCurrency(rental.couponDiscount)}
                  </span>
                </div>
              )}
              <div className='border-t pt-4'>
                <div className='flex justify-between text-lg font-bold'>
                  <span>Total:</span>
                  <span>{formatCurrency(rental.totalAmt)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              {renderActionButtons()}
              <Button variant='outline' className='w-full bg-transparent'>
                <Printer className='h-4 w-4 mr-2' />
                Print Order
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-600'>
                {getStatusMessage(rental.status)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onConfirm={handleReject}
        orderNumber={'123'}
        rentalId={`R${rental.rentalID.toString().padStart(4, '0')}`}
      />

      <DeliveryModal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        onConfirm={handleScheduleDelivery}
        rentalPeriod={{
          startDate: rental.startDate, // replace with actual date source
          endDate: rental.endDate, // replace with actual date source
        }}
        customerAddress={`${rental.deliveryAddress.addressLine1}, ${rental.deliveryAddress.street}, ${rental.deliveryAddress.city}, ${rental.deliveryAddress.state} - ${rental.deliveryAddress.pincode}`}
      />
    </>
  );
}
