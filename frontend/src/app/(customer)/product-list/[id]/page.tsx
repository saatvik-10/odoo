'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Calendar,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import api from '@/lib/api';
import { Product } from '@/validators/product.validator';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [priceType, setPriceType] = useState<'hourly' | 'daily' | 'monthly'>(
    'daily'
  );
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log('Fetching product with ID:', id);
        const response = await api.product.getProductById(id);
        console.log('Product response:', response, 'id: ', id);
        setProduct(response);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    if (!fromDate || !toDate) {
      alert('Please select rental dates');
      return;
    }

    if (!product) return;

    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);

    if (endDate <= startDate) {
      alert('End date must be after start date');
      return;
    }

    // Calculate duration based on pricing type
    let duration = 0;
    let durationUnit = '';
    const timeDiff = endDate.getTime() - startDate.getTime();

    switch (priceType) {
      case 'hourly':
        duration = Math.ceil(timeDiff / (1000 * 60 * 60));
        durationUnit = 'hours';
        break;
      case 'daily':
        duration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        durationUnit = 'days';
        break;
      case 'monthly':
        duration = Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 30));
        durationUnit = 'months';
        break;
      default:
        duration = 0;
        durationUnit = '';
        break;
    }

    const unitPrice = product.price[priceType];
    const totalCost = unitPrice * duration * quantity;

    const cartDetails = {
      productId: product._id,
      productName: product.name,
      quantity,
      fromDate,
      toDate,
      duration,
      durationUnit,
      priceType,
      unitPrice,
      totalCost,
      timestamp: new Date().toISOString(),
    };

    // Check if there's already a cart item
    const existingCart = JSON.parse(localStorage.getItem('cart') || 'null');

    if (existingCart) {
      // If the existing item is different from current, confirm replacement
      if (existingCart.productId !== cartDetails.productId) {
        const confirmReplace = confirm(
          `Your cart already contains "${existingCart.productName}". Adding this will replace the current cart item. Continue?`
        );
        if (!confirmReplace) return; // user canceled
      }
    }

    // Save new/updated cart
    localStorage.setItem('cart', JSON.stringify(cartDetails));

    alert(
      `Added to cart!\nProduct: ${product.name}\nQuantity: ${quantity}\nDuration: ${duration} ${durationUnit}\nTotal Cost: ₹${totalCost}`
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: product?.name || 'Product',
      text: `Check out this rental product: ${product?.name}`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('Product link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Product link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
        alert('Unable to share. Please copy the URL manually.');
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const getCurrentPrice = () => {
    return product.price[priceType];
  };

  const getTotalPrice = () => {
    return getCurrentPrice() * quantity;
  };

  const shouldTruncateDescription = () => {
    return product?.description && product.description.length > 150;
  };

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
            Product not found
          </h2>
          <Button
            onClick={() => router.push('/')}
            className='bg-orange-600 hover:bg-orange-700'
          >
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb */}
        <div className='flex items-center space-x-2 text-sm text-gray-600 mb-6'>
          <button
            onClick={() => router.push('/')}
            className='hover:text-orange-600 transition-colors'
          >
            All Products
          </button>
          <span>/</span>
          <span className='text-gray-900'>{product.name}</span>
        </div>

        {/* Price List Dropdown */}
        <div className='flex justify-end mb-6'>
          <Select
            value={priceType}
            onValueChange={(value: any) => setPriceType(value)}
          >
            <SelectTrigger className='w-48'>
              <SelectValue placeholder='Price List' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='hourly'>Hourly Rate</SelectItem>
              <SelectItem value='daily'>Daily Rate</SelectItem>
              <SelectItem value='monthly'>Monthly Rate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Left Side - Product Image and Details */}
          <div className='space-y-6'>
            {/* Product Image */}
            <Card className='relative'>
              <CardContent className='p-6'>
                <div className='aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden'>
                  <img
                    src={
                      product.images[0] ||
                      '/placeholder.svg?height=400&width=400'
                    }
                    alt={product.name}
                    className='w-full h-full object-cover'
                  />
                  {/* <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className='absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow'
                  >
                    <Heart
                      className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                    />
                  </button> */}
                </div>
                <Button
                  variant='outline'
                  className='w-full mt-4 border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent'
                  onClick={() => setIsWishlisted(!isWishlisted)}
                >
                  {isWishlisted ? 'Remove from Wishlist' : 'Add to Wish List'}
                </Button>
              </CardContent>
            </Card>

            {/* Product Description */}
            <Card>
              <CardContent className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  Product Description
                </h3>
                <div className='text-gray-600 space-y-2'>
                  <p>
                    {shouldTruncateDescription() && !showFullDescription
                      ? `${product.description.slice(0, 150)}...`
                      : product.description}
                  </p>
                  {shouldTruncateDescription() && (
                    <button
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className='text-orange-600 hover:text-orange-700 font-medium flex items-center'
                    >
                      {showFullDescription ? 'Read Less' : 'Read More'}
                      <ChevronRight className='w-4 h-4 ml-1' />
                    </button>
                  )}
                </div>

                <div className='mt-4 pt-4 border-t border-gray-200'>
                  <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div>
                      <span className='text-gray-500'>Category:</span>
                      <span className='ml-2 font-medium'>
                        {product.category}
                      </span>
                    </div>
                    <div>
                      <span className='text-gray-500'>Stock:</span>
                      <span className='ml-2 font-medium'>
                        {product.stock > 0
                          ? `${product.stock} available`
                          : 'Out of stock'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Product Info and Actions */}
          <div className='space-y-6'>
            {/* Product Info */}
            <Card>
              <CardContent className='p-6'>
                <h1 className='text-2xl font-bold text-gray-900 mb-2'>
                  {product.name}
                </h1>
                <div className='flex items-center space-x-4 mb-6'>
                  <span className='text-3xl font-bold text-orange-600'>
                    ₹{getCurrentPrice()}
                  </span>
                </div>

                {/* Stock Status */}
                {product.stock <= 5 && product.stock > 0 && (
                  <Badge
                    variant='secondary'
                    className='mb-4 bg-yellow-100 text-yellow-800'
                  >
                    Only {product.stock} left in stock
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge variant='destructive' className='mb-4'>
                    Out of Stock
                  </Badge>
                )}

                <div className='grid grid-cols-2 gap-4 mb-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      From:
                    </label>
                    <div className='relative'>
                      <Input
                        type='date'
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className='pr-10'
                      />
                      <Calendar className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
                    </div>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      To:
                    </label>
                    <div className='relative'>
                      <Input
                        type='date'
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className='pr-10'
                      />
                      <Calendar className='absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none' />
                    </div>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className='flex items-center space-x-4 mb-6'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className='w-4 h-4' />
                  </Button>
                  <span className='text-lg font-medium w-8 text-center'>
                    {quantity}
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className='w-4 h-4' />
                  </Button>
                </div>

                {/* Total Price */}
                <div className='bg-gray-50 p-4 rounded-lg mb-6'>
                  <div className='flex justify-between items-center'>
                    <span className='text-lg font-medium'>Total:</span>
                    <span className='text-2xl font-bold text-orange-600'>
                      ₹{getTotalPrice()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={addToCart}
                  disabled={product.stock === 0}
                  className='w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-medium'
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <Card>
              <CardContent className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  Terms & Conditions
                </h3>
                <div className='text-sm text-gray-600 space-y-2'>
                  <p>• Rental period starts from the selected date and time</p>
                  <p>• Late returns may incur additional charges</p>
                  <p>• Damage to equipment will be charged separately</p>
                  <p>• Cancellation must be made 24 hours in advance</p>
                </div>
              </CardContent>
            </Card>

            {/* Share */}
            <Card>
              <CardContent className='p-6'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  Share
                </h3>
                <Button
                  variant='outline'
                  className='w-full bg-transparent'
                  onClick={handleShare}
                >
                  <Share2 className='w-4 h-4 mr-2' />
                  Share Product
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
