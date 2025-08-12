'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Package, Calendar, Clock } from 'lucide-react';
import api from '@/lib/api';
import { CreateRental } from '@/validators/rental.validator';
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  fromDate: string;
  toDate: string;
  duration: number;
  durationUnit: string;
  priceType: string;
  unitPrice: number;
  totalCost: number;
  timestamp: string;
}

interface Address {
  addressLine1: string;
  street: string;
  pincode: string;
  city: string;
  state: string;
}

type Stage = 'review' | 'delivery' | 'payment';

async function createNewRental(rentalData: CreateRental) {
  try {
    const response = await api.rental.createRental(rentalData);
    console.log('Rental created successfully:', response);
    return response;
  } catch (error) {
    console.error('Error creating rental:', error);
    throw error;
  }
}

export default function CartPage() {
  const [currentStage, setCurrentStage] = useState<Stage>('review');
  const [cartItem, setCartItem] = useState<CartItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState<Address>({
    addressLine1: '',
    street: '',
    pincode: '',
    city: '',
    state: '',
  });
  const [invoiceAddress, setInvoiceAddress] = useState<Address>({
    addressLine1: '',
    street: '',
    pincode: '',
    city: '',
    state: '',
  });
  const [sameAsDelivery, setSameAsDelivery] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState('');

  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      setCartItem(parsedCart);
      setQuantity(parsedCart.quantity);
    }
  }, []);

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1 || !cartItem) return;

    const updatedCart = {
      ...cartItem,
      quantity: newQuantity,
      totalCost: cartItem.unitPrice * cartItem.duration * newQuantity,
    };

    setCartItem(updatedCart);
    setQuantity(newQuantity);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = () => {
    localStorage.removeItem('cart');
    setCartItem(null);
  };

  const applyCoupon = () => {
    // Placeholder for coupon logic
    alert('Coupon functionality to be implemented');
  };

  // Razorpay payment handler
  const handleRazorpayPayment = async () => {
    if (!isRazorpayLoaded) {
      alert('Payment system is loading. Please try again.');
      return;
    }

    setPaymentLoading(true);

    try {
      // Create order on backend (you'll need to implement this API endpoint)
      const orderData = {
        amount: total * 100, // Razorpay expects amount in paise
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          productId: cartItem?.productId,
          quantity: quantity,
          duration: cartItem?.duration,
        },
      };

      // You'll need to create this API endpoint to create Razorpay order
      // const orderResponse = await api.payment.createOrder(orderData);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your Razorpay key ID
        amount: total * 100, // Amount in paise
        currency: 'INR',
        name: 'Rentals',
        description: `Rental for ${cartItem?.productName}`,
        image: '/logo.png', // Your company logo
        // order_id: orderResponse.id, // Uncomment when you have the backend endpoint
        handler: async function (response: any) {
          try {
            // Verify payment on backend (you'll need to implement this)
            // const verificationResponse = await api.payment.verifyPayment({
            //   razorpay_order_id: response.razorpay_order_id,
            //   razorpay_payment_id: response.razorpay_payment_id,
            //   razorpay_signature: response.razorpay_signature,
            // });

            // For now, we'll just show success
            alert('Payment successful! Order placed successfully!');
            localStorage.removeItem('cart');
            setCartItem(null);
            // You might want to redirect to a success page
            // router.push('/order-success');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: '', // You can prefill customer details
          email: '',
          contact: '',
        },
        notes: {
          address: `${deliveryAddress.addressLine1}, ${deliveryAddress.street}, ${deliveryAddress.city}`,
        },
        theme: {
          color: '#ea580c', // Orange color matching your theme
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        setPaymentLoading(false);
      });

      rzp.open();
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
      setPaymentLoading(false);
    }
  };

  const deliveryCharge = 0;
  const taxRate = 0.18;
  const subtotal = cartItem?.totalCost || 0;
  const taxes = Math.round(subtotal * taxRate);
  const total = subtotal + deliveryCharge + taxes;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleNextStage = async () => {
    if (currentStage === 'review') {
      setCurrentStage('delivery');
    } else if (currentStage === 'delivery') {
      // Validate all address fields are filled
      const isDeliveryValid = Object.values(deliveryAddress).every(
        (field) => field.trim() !== ''
      );
      const isInvoiceValid =
        sameAsDelivery ||
        Object.values(invoiceAddress).every((field) => field.trim() !== '');

      if (!isDeliveryValid || !isInvoiceValid || !deliveryMethod) {
        alert('Please fill in all delivery details');
        return;
      }

      try {
        await createNewRental({
          rentalID: 0, // or generate a temporary ID if needed
          product: cartItem!.productId,
          startDate: new Date(cartItem!.fromDate),
          endDate: new Date(cartItem!.toDate),
          duration: {
            durationType: cartItem!.durationUnit === 'day' ? 'daily' : 'hourly',
            durationValue: cartItem!.duration,
          },
          invoiceAddress: sameAsDelivery ? deliveryAddress : invoiceAddress,
          deliveryAddress: deliveryAddress,
          status: 'Quotation',
          products: [
            {
              product: cartItem!.productId,
              quantity: quantity,
              price: cartItem!.unitPrice,
            },
          ],
          couponCode: couponCode || undefined,
          couponDiscount: couponCode ? 10 : 0, // Default discount, can be calculated based on coupon
        });
        setCurrentStage('payment');
      } catch (error) {
        alert('Failed to process rental. Please try again.');
        return;
      }
    } else if (currentStage === 'payment') {
      // Use Razorpay for payment instead of manual form validation
      await handleRazorpayPayment();
    }
  };

  const handlePrevStage = () => {
    if (currentStage === 'payment') {
      setCurrentStage('delivery');
    } else if (currentStage === 'delivery') {
      setCurrentStage('review');
    }
  };

  if (!cartItem) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <Card className='w-full max-w-md'>
          <CardContent className='text-center py-8'>
            <Package className='mx-auto h-12 w-12 text-gray-400 mb-4' />
            <h2 className='text-xl font-semibold text-gray-900 mb-2'>
              Your cart is empty
            </h2>
            <p className='text-gray-600 mb-4'>Add some items to get started</p>
            <Button onClick={() => window.history.back()}>
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-6xl mx-auto px-4'>
        {/* Progress Steps */}
        <div className='mb-8'>
          <div className='flex items-center justify-center space-x-8'>
            <div className='flex items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStage === 'review'
                    ? 'bg-orange-600 text-white'
                    : currentStage === 'delivery' || currentStage === 'payment'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                }`}
              >
                1
              </div>
              <span className='ml-2 text-sm font-medium text-gray-900'>
                Review Order
              </span>
            </div>
            <ArrowRight className='h-4 w-4 text-gray-400' />
            <div className='flex items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStage === 'delivery'
                    ? 'bg-orange-600 text-white'
                    : currentStage === 'payment'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                }`}
              >
                2
              </div>
              <span className='ml-2 text-sm font-medium text-gray-900'>
                Delivery
              </span>
            </div>
            <ArrowRight className='h-4 w-4 text-gray-400' />
            <div className='flex items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStage === 'payment'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                3
              </div>
              <span className='ml-2 text-sm font-medium text-gray-900'>
                Payment
              </span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle className='text-red-500'>
                  {currentStage === 'review' && 'Order Overview'}
                  {currentStage === 'delivery' && 'Delivery Address'}
                  {currentStage === 'payment' && 'Confirm Order'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Review Order Stage */}
                {currentStage === 'review' && (
                  <div className='space-y-6'>
                    <div className='flex items-start space-x-4 p-4 border rounded-lg'>
                      <div className='w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center'>
                        <Package className='h-8 w-8 text-gray-400' />
                      </div>
                      <div className='flex-1'>
                        <h3 className='font-semibold text-lg'>
                          {cartItem.productName}
                        </h3>
                        <p className='text-gray-600'>
                          ₹{cartItem.unitPrice.toLocaleString()} per{' '}
                          {cartItem.durationUnit.slice(0, -1)}
                        </p>
                        <div className='flex items-center space-x-4 mt-2'>
                          <div className='flex items-center space-x-2'>
                            <Calendar className='h-4 w-4 text-gray-400' />
                            <span className='text-sm text-gray-600'>
                              {formatDate(cartItem.fromDate)} -{' '}
                              {formatDate(cartItem.toDate)}
                            </span>
                          </div>
                          <div className='flex items-center space-x-2'>
                            <Clock className='h-4 w-4 text-gray-400' />
                            <span className='text-sm text-gray-600'>
                              {cartItem.duration} {cartItem.durationUnit}
                            </span>
                          </div>
                        </div>
                        <div className='flex items-center space-x-4 mt-4'>
                          <Label>Qty</Label>
                          <div className='flex items-center space-x-2'>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => updateQuantity(quantity - 1)}
                              disabled={quantity <= 1}
                            >
                              -
                            </Button>
                            <span className='w-8 text-center'>{quantity}</span>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => updateQuantity(quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Button
                            variant='outline'
                            size='sm'
                            onClick={removeFromCart}
                            className='ml-auto text-red-500 hover:text-red-700 bg-transparent'
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delivery Stage */}
                {currentStage === 'delivery' && (
                  <div className='space-y-6'>
                    <div>
                      <Label className='text-red-500 font-medium'>
                        Delivery Address
                      </Label>
                      <div className='space-y-4 mt-3'>
                        <div>
                          <Label htmlFor='delivery-address-line1'>
                            Address Line 1
                          </Label>
                          <Input
                            id='delivery-address-line1'
                            value={deliveryAddress.addressLine1}
                            onChange={(e) =>
                              setDeliveryAddress({
                                ...deliveryAddress,
                                addressLine1: e.target.value,
                              })
                            }
                            placeholder='Enter address line 1'
                          />
                        </div>
                        <div>
                          <Label htmlFor='delivery-street'>Street</Label>
                          <Input
                            id='delivery-street'
                            value={deliveryAddress.street}
                            onChange={(e) =>
                              setDeliveryAddress({
                                ...deliveryAddress,
                                street: e.target.value,
                              })
                            }
                            placeholder='Enter street'
                          />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                          <div>
                            <Label htmlFor='delivery-pincode'>Pincode</Label>
                            <Input
                              id='delivery-pincode'
                              value={deliveryAddress.pincode}
                              onChange={(e) =>
                                setDeliveryAddress({
                                  ...deliveryAddress,
                                  pincode: e.target.value,
                                })
                              }
                              placeholder='Enter pincode'
                            />
                          </div>
                          <div>
                            <Label htmlFor='delivery-city'>City</Label>
                            <Input
                              id='delivery-city'
                              value={deliveryAddress.city}
                              onChange={(e) =>
                                setDeliveryAddress({
                                  ...deliveryAddress,
                                  city: e.target.value,
                                })
                              }
                              placeholder='Enter city'
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor='delivery-state'>State</Label>
                          <Input
                            id='delivery-state'
                            value={deliveryAddress.state}
                            onChange={(e) =>
                              setDeliveryAddress({
                                ...deliveryAddress,
                                state: e.target.value,
                              })
                            }
                            placeholder='Enter state'
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className='text-red-500 font-medium'>
                        Invoice Address
                      </Label>
                      <div className='flex items-center space-x-2 mt-2 mb-2'>
                        <input
                          type='checkbox'
                          id='same-address'
                          checked={sameAsDelivery}
                          onChange={(e) => {
                            setSameAsDelivery(e.target.checked);
                            if (e.target.checked) {
                              setInvoiceAddress(deliveryAddress);
                            }
                          }}
                          className='rounded'
                        />
                        <Label
                          htmlFor='same-address'
                          className='text-sm text-teal-600'
                        >
                          Billing address same as delivery address
                        </Label>
                      </div>
                      <div className='space-y-4'>
                        <div>
                          <Label htmlFor='invoice-address-line1'>
                            Address Line 1
                          </Label>
                          <Input
                            id='invoice-address-line1'
                            value={
                              sameAsDelivery
                                ? deliveryAddress.addressLine1
                                : invoiceAddress.addressLine1
                            }
                            onChange={(e) =>
                              setInvoiceAddress({
                                ...invoiceAddress,
                                addressLine1: e.target.value,
                              })
                            }
                            disabled={sameAsDelivery}
                            placeholder='Enter address line 1'
                          />
                        </div>
                        <div>
                          <Label htmlFor='invoice-street'>Street</Label>
                          <Input
                            id='invoice-street'
                            value={
                              sameAsDelivery
                                ? deliveryAddress.street
                                : invoiceAddress.street
                            }
                            onChange={(e) =>
                              setInvoiceAddress({
                                ...invoiceAddress,
                                street: e.target.value,
                              })
                            }
                            disabled={sameAsDelivery}
                            placeholder='Enter street'
                          />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                          <div>
                            <Label htmlFor='invoice-pincode'>Pincode</Label>
                            <Input
                              id='invoice-pincode'
                              value={
                                sameAsDelivery
                                  ? deliveryAddress.pincode
                                  : invoiceAddress.pincode
                              }
                              onChange={(e) =>
                                setInvoiceAddress({
                                  ...invoiceAddress,
                                  pincode: e.target.value,
                                })
                              }
                              disabled={sameAsDelivery}
                              placeholder='Enter pincode'
                            />
                          </div>
                          <div>
                            <Label htmlFor='invoice-city'>City</Label>
                            <Input
                              id='invoice-city'
                              value={
                                sameAsDelivery
                                  ? deliveryAddress.city
                                  : invoiceAddress.city
                              }
                              onChange={(e) =>
                                setInvoiceAddress({
                                  ...invoiceAddress,
                                  city: e.target.value,
                                })
                              }
                              disabled={sameAsDelivery}
                              placeholder='Enter city'
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor='invoice-state'>State</Label>
                          <Input
                            id='invoice-state'
                            value={
                              sameAsDelivery
                                ? deliveryAddress.state
                                : invoiceAddress.state
                            }
                            onChange={(e) =>
                              setInvoiceAddress({
                                ...invoiceAddress,
                                state: e.target.value,
                              })
                            }
                            disabled={sameAsDelivery}
                            placeholder='Enter state'
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className='text-gray-700 font-medium'>
                        Choose Delivery Method
                      </Label>
                      <select
                        className='w-full mt-2 p-3 border rounded-lg'
                        value={deliveryMethod}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                      >
                        <option value=''>Please Pick Something</option>
                        <option value='standard'>
                          Standard Delivery (3-5 days)
                        </option>
                        <option value='express'>
                          Express Delivery (1-2 days)
                        </option>
                        <option value='same-day'>Same Day Delivery</option>
                      </select>
                      {deliveryMethod && (
                        <p className='text-sm text-gray-600 mt-1'>
                          ₹0 - Delivery charges
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Payment Stage */}
                {currentStage === 'payment' && (
                  <div className='space-y-6'>
                    <div className='bg-orange-50 p-6 rounded-lg border border-orange-200'>
                      <h3 className='text-lg font-semibold text-orange-800 mb-4'>
                        Payment Summary
                      </h3>
                      <div className='space-y-3'>
                        <div className='flex justify-between'>
                          <span>Product:</span>
                          <span className='font-medium'>
                            {cartItem?.productName}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Quantity:</span>
                          <span className='font-medium'>{quantity}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Duration:</span>
                          <span className='font-medium'>
                            {cartItem?.duration} {cartItem?.durationUnit}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span>Delivery Address:</span>
                          <span className='font-medium text-right'>
                            {deliveryAddress.addressLine1},{' '}
                            {deliveryAddress.street}
                            <br />
                            {deliveryAddress.city}, {deliveryAddress.state} -{' '}
                            {deliveryAddress.pincode}
                          </span>
                        </div>
                        <Separator />
                        <div className='flex justify-between text-lg font-semibold text-orange-800'>
                          <span>Total Amount:</span>
                          <span>₹{total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className='text-center'>
                      <p className='text-gray-600 mb-4'>
                        Click "Pay Now" to proceed with secure payment via
                        Razorpay
                      </p>
                      <div className='flex justify-center space-x-4'>
                        <img
                          src='/razorpay-logo.png'
                          alt='Razorpay'
                          className='h-8 opacity-70'
                        />
                        <img
                          src='/upi-logo.png'
                          alt='UPI'
                          className='h-8 opacity-70'
                        />
                        <img
                          src='/visa-logo.png'
                          alt='Visa'
                          className='h-8 opacity-70'
                        />
                        <img
                          src='/mastercard-logo.png'
                          alt='Mastercard'
                          className='h-8 opacity-70'
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className='flex justify-between pt-6'>
                  {currentStage !== 'review' && (
                    <Button variant='outline' onClick={handlePrevStage}>
                      <ArrowLeft className='h-4 w-4 mr-2' />
                      Back
                    </Button>
                  )}
                  {currentStage === 'review' && <div></div>}
                  <Button
                    onClick={handleNextStage}
                    className='bg-orange-600 hover:bg-orange-700'
                    disabled={paymentLoading}
                  >
                    {currentStage === 'review' && 'Proceed to Checkout'}
                    {currentStage === 'delivery' && 'Confirm'}
                    {currentStage === 'payment' &&
                      (paymentLoading ? 'Processing...' : 'Pay Now')}
                    {currentStage !== 'payment' && (
                      <ArrowRight className='h-4 w-4 ml-2' />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className='lg:col-span-1'>
            <Card className='sticky top-8'>
              <CardHeader>
                <CardTitle className='text-blue-600'>Order Summary</CardTitle>
                <p className='text-sm text-gray-600'>
                  1 Item - ₹{subtotal.toLocaleString()}
                </p>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <div className='flex justify-between text-red-500'>
                    <span>Delivery Charge</span>
                    <span>-</span>
                  </div>
                  <div className='flex justify-between text-red-500'>
                    <span>Sub Total</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between text-red-500'>
                    <span>Taxes</span>
                    <span>₹{taxes}</span>
                  </div>
                  <Separator />
                  <div className='flex justify-between font-semibold text-red-500'>
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label className='text-sm'>Apply Coupon</Label>
                  <div className='flex space-x-2'>
                    <Input
                      placeholder='Coupon Code'
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className='flex-1'
                    />
                    <Button
                      onClick={applyCoupon}
                      variant='outline'
                      className='bg-gray-900 text-white hover:bg-gray-800'
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {currentStage === 'delivery' && (
                  <Button
                    onClick={() => setCurrentStage('review')}
                    variant='outline'
                    className='w-full'
                  >
                    <ArrowLeft className='h-4 w-4 mr-2' />
                    Back to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Razorpay Script */}
      <Script
        src='https://checkout.razorpay.com/v1/checkout.js'
        onLoad={() => setIsRazorpayLoaded(true)}
        onError={() => {
          console.error('Failed to load Razorpay script');
          setIsRazorpayLoaded(false);
        }}
      />
    </div>
  );
}
