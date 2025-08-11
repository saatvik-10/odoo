'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DeliveryModal } from '@/components/modals/delivery-modal';
import { RejectionModal } from '@/components/modals/rejection-modal';
import {
  ChevronLeft,
  ChevronRight,
  Printer,
  Check,
  X,
  Truck,
  Calendar,
  MapPin,
  User,
  Phone,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sampleOrders, statusConfig } from '@/constant/orderDetail';
import { OrderStatus, RentalOrder } from '@/types/rentalOrder';

export default function RentalOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [orders, setOrders] = useState<RentalOrder[]>(sampleOrders);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [termsConditions, setTermsConditions] = useState('');
  const [internalNotes, setInternalNotes] = useState('');

  const currentOrder = orders[currentOrderIndex];
  const totalOrders = orders.length;

  const id = params.id;

  useEffect(() => {
    setTermsConditions(currentOrder.termsConditions);
  }, [currentOrder]);

  const handleStatusChange = (newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order, index) =>
        index === currentOrderIndex ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleAccept = () => {
    handleStatusChange('reserved');
  };

  const handleReject = (feedback: string) => {
    setOrders((prev) =>
      prev.map((order, index) =>
        index === currentOrderIndex
          ? { ...order, status: 'quotation', rejectionFeedback: feedback }
          : order
      )
    );
  };

  const handleDeliveryConfirm = (deliveryData: any) => {
    console.log('Delivery orders created:', deliveryData);
    handleStatusChange('pickedup');
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePrevious = () => {
    if (currentOrderIndex > 0) {
      setCurrentOrderIndex(currentOrderIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentOrderIndex < totalOrders - 1) {
      setCurrentOrderIndex(currentOrderIndex + 1);
    }
  };

  const canAcceptReject = currentOrder.status === 'quotation';
  const canCreateDelivery = currentOrder.status === 'reserved';
  const isViewOnly =
    currentOrder.status === 'pickedup' ||
    currentOrder.status === 'delivered' ||
    currentOrder.status === 'returned';

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto space-y-6'>
        {/* Header */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <h1 className='text-2xl font-bold text-gray-900'>Rental Orders</h1>
            <Badge variant='outline' className='text-sm'>
              {currentOrderIndex + 1}/{totalOrders}
            </Badge>
          </div>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              disabled={currentOrderIndex === 0}
              onClick={handlePrevious}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              disabled={currentOrderIndex === totalOrders - 1}
              onClick={handleNext}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-wrap items-center gap-3'>
          {canAcceptReject && (
            <>
              <Button
                onClick={handleAccept}
                className='bg-green-600 hover:bg-green-700 text-white'
              >
                <Check className='h-4 w-4 mr-2' />
                Accept
              </Button>
              <Button
                onClick={() => setShowRejectionModal(true)}
                variant='destructive'
                className='hover:bg-red-700'
              >
                <X className='h-4 w-4 mr-2' />
                Reject
              </Button>
            </>
          )}

          {canCreateDelivery && (
            <Button
              onClick={() => setShowDeliveryModal(true)}
              className='bg-orange-600 hover:bg-orange-700 text-white'
            >
              <Truck className='h-4 w-4 mr-2' />
              Delivery
            </Button>
          )}

          <div className='flex items-center gap-2'>
            <Button onClick={handlePrint} variant='outline'>
              <Printer className='h-4 w-4 mr-2' />
              Print
            </Button>
            <Badge
              className={cn(
                'text-sm px-3 py-1',
                statusConfig[currentOrder.status].color
              )}
            >
              {statusConfig[currentOrder.status].label}
            </Badge>
          </div>
        </div>

        {/* Rejection Feedback Display */}
        {currentOrder.rejectionFeedback && (
          <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
            <div className='flex items-center gap-2 mb-2'>
              <X className='h-4 w-4 text-red-600' />
              <span className='font-medium text-red-800'>Order Rejected</span>
            </div>
            <p className='text-sm text-red-700'>
              {currentOrder.rejectionFeedback}
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Order Details */}
          <div className='lg:col-span-2'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                  <CardTitle className='text-xl font-bold'>
                    {currentOrder.id}
                  </CardTitle>
                  <Badge className={statusConfig[currentOrder.status].color}>
                    {statusConfig[currentOrder.status].label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className='space-y-6'>
                {/* Customer Information */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-4'>
                    <div>
                      <Label className='text-sm font-medium text-gray-600'>
                        Customer
                      </Label>
                      <div className='flex items-center gap-2 mt-1'>
                        <User className='h-4 w-4 text-gray-400' />
                        <span className='font-medium'>
                          {currentOrder.customer}
                        </span>
                      </div>
                      <div className='flex items-center gap-2 mt-1'>
                        <Mail className='h-4 w-4 text-gray-400' />
                        <span className='text-sm text-gray-600'>
                          {currentOrder.customerEmail}
                        </span>
                      </div>
                      <div className='flex items-center gap-2 mt-1'>
                        <Phone className='h-4 w-4 text-gray-400' />
                        <span className='text-sm text-gray-600'>
                          {currentOrder.customerPhone}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className='text-sm font-medium text-gray-600'>
                        Invoice Address
                      </Label>
                      <div className='flex items-start gap-2 mt-1'>
                        <MapPin className='h-4 w-4 text-gray-400 mt-0.5' />
                        <span className='text-sm'>
                          {currentOrder.invoiceAddress}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className='text-sm font-medium text-gray-600'>
                        Delivery Address
                      </Label>
                      <div className='flex items-start gap-2 mt-1'>
                        <MapPin className='h-4 w-4 text-gray-400 mt-0.5' />
                        <span className='text-sm'>
                          {currentOrder.deliveryAddress}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className='text-sm font-medium text-gray-600'>
                        Rental Template
                      </Label>
                      <p className='text-sm mt-1'>
                        {currentOrder.rentalTemplate}
                      </p>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div>
                      <Label className='text-sm font-medium text-gray-600'>
                        Expiration
                      </Label>
                      <div className='flex items-center gap-2 mt-1'>
                        <Calendar className='h-4 w-4 text-gray-400' />
                        <span className='text-sm'>
                          {currentOrder.expiration.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className='text-sm font-medium text-gray-600'>
                        Rental Order Date
                      </Label>
                      <div className='flex items-center gap-2 mt-1'>
                        <Calendar className='h-4 w-4 text-gray-400' />
                        <span className='text-sm'>
                          {currentOrder.rentalOrderDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className='text-sm font-medium text-gray-600'>
                        Price List
                      </Label>
                      <p className='text-sm mt-1'>{currentOrder.priceList}</p>
                      {canAcceptReject && (
                        <Button
                          size='sm'
                          variant='outline'
                          className='mt-2 bg-transparent'
                        >
                          Update Prices
                        </Button>
                      )}
                    </div>

                    <div>
                      <Label className='text-sm font-medium text-gray-600'>
                        Rental Period
                      </Label>
                      <div className='flex items-center gap-2 mt-1'>
                        <Calendar className='h-4 w-4 text-gray-400' />
                        <span className='text-sm'>
                          {currentOrder.rentalPeriod.startDate.toLocaleDateString()}{' '}
                          -{' '}
                          {currentOrder.rentalPeriod.endDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className='text-sm font-medium text-gray-600'>
                        Rental Duration
                      </Label>
                      <p className='text-sm mt-1'>
                        {currentOrder.rentalDuration} days
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue='order-lines' className='w-full'>
                  <TabsList className='grid w-full grid-cols-3'>
                    <TabsTrigger value='order-lines'>Order Lines</TabsTrigger>
                    <TabsTrigger value='other-details'>
                      Other Details
                    </TabsTrigger>
                    <TabsTrigger value='rental-notes'>Rental Notes</TabsTrigger>
                  </TabsList>

                  <TabsContent value='order-lines' className='space-y-4'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className='text-center'>
                            Quantity
                          </TableHead>
                          <TableHead className='text-right'>
                            Unit Price
                          </TableHead>
                          <TableHead className='text-right'>Tax</TableHead>
                          <TableHead className='text-right'>
                            Sub Total
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentOrder.orderLines.map((line) => (
                          <TableRow key={line.id}>
                            <TableCell className='font-medium'>
                              {line.product}
                            </TableCell>
                            <TableCell className='text-center'>
                              {line.quantity}
                            </TableCell>
                            <TableCell className='text-right'>
                              ₹{line.unitPrice}
                            </TableCell>
                            <TableCell className='text-right'>
                              ₹{line.tax}
                            </TableCell>
                            <TableCell className='text-right'>
                              ₹{line.subTotal}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value='other-details'>
                    <div className='space-y-4'>
                      <div>
                        <Label className='text-sm font-medium text-gray-600'>
                          Additional Information
                        </Label>
                        <p className='text-sm mt-1 text-gray-500'>
                          Order Status:{' '}
                          {statusConfig[currentOrder.status].label}
                        </p>
                        <p className='text-sm mt-1 text-gray-500'>
                          Created:{' '}
                          {currentOrder.rentalOrderDate.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value='rental-notes'>
                    <div className='space-y-4'>
                      <div>
                        <Label className='text-sm font-medium text-gray-600'>
                          Internal Notes
                        </Label>
                        <Textarea
                          value={internalNotes}
                          onChange={(e) => setInternalNotes(e.target.value)}
                          placeholder='Add internal notes about this rental...'
                          className='mt-1'
                          rows={4}
                          readOnly={isViewOnly}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Terms & Conditions */}
                <div>
                  <Label className='text-sm font-medium text-gray-600'>
                    Terms & Conditions
                  </Label>
                  <Textarea
                    value={termsConditions}
                    onChange={(e) => setTermsConditions(e.target.value)}
                    className='mt-1'
                    rows={3}
                    readOnly={isViewOnly}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>
                      Untaxed Total:
                    </span>
                    <span className='font-medium'>
                      ₹{currentOrder.untaxedTotal}
                    </span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-sm text-gray-600'>Tax:</span>
                    <span className='font-medium'>
                      ₹{currentOrder.taxTotal}
                    </span>
                  </div>
                  <div className='border-t pt-2'>
                    <div className='flex justify-between'>
                      <span className='font-semibold'>Total:</span>
                      <span className='font-bold text-lg'>
                        ₹{currentOrder.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className='space-y-2 pt-4 border-t'>
                  <h4 className='font-medium text-sm text-gray-600'>
                    Quick Actions
                  </h4>
                  <div className='space-y-2'>
                    {canAcceptReject && (
                      <>
                        <Button
                          onClick={handleAccept}
                          className='w-full bg-green-600 hover:bg-green-700'
                          size='sm'
                        >
                          <Check className='h-4 w-4 mr-2' />
                          Accept Request
                        </Button>
                        <Button
                          onClick={() => setShowRejectionModal(true)}
                          className='w-full hover:bg-red-700'
                          variant='destructive'
                          size='sm'
                        >
                          <X className='h-4 w-4 mr-2' />
                          Reject Request
                        </Button>
                      </>
                    )}
                    {canCreateDelivery && (
                      <Button
                        onClick={() => setShowDeliveryModal(true)}
                        className='w-full bg-orange-600 hover:bg-orange-700'
                        size='sm'
                      >
                        <Truck className='h-4 w-4 mr-2' />
                        Create Delivery
                      </Button>
                    )}
                    <Button
                      onClick={handlePrint}
                      className='w-full bg-transparent'
                      variant='outline'
                      size='sm'
                    >
                      <Printer className='h-4 w-4 mr-2' />
                      Print Order
                    </Button>
                  </div>
                </div>

                {/* Status Information */}
                <div className='pt-4 border-t'>
                  <h4 className='font-medium text-sm text-gray-600 mb-2'>
                    Status Information
                  </h4>
                  <div className='text-sm text-gray-600'>
                    {currentOrder.status === 'quotation' &&
                      'Awaiting vendor approval'}
                    {currentOrder.status === 'reserved' &&
                      'Equipment reserved, ready for delivery'}
                    {currentOrder.status === 'pickedup' &&
                      'Equipment picked up by customer'}
                    {currentOrder.status === 'delivered' &&
                      'Equipment delivered to customer'}
                    {currentOrder.status === 'returned' &&
                      'Equipment returned and processed'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delivery Modal */}
      <DeliveryModal
        isOpen={showDeliveryModal}
        onClose={() => setShowDeliveryModal(false)}
        onConfirm={handleDeliveryConfirm}
        rentalPeriod={currentOrder.rentalPeriod}
        customerAddress={currentOrder.deliveryAddress}
      />

      {/* Rejection Modal */}
      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        onConfirm={handleReject}
        orderNumber={currentOrder.id}
      />
    </div>
  );
}
