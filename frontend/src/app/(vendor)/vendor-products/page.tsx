'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Plus } from 'lucide-react';
import { mockProducts } from '@/constant/products';
import { Product, RentalPricing, ReservationCharges } from '@/types/product';

export default function AdminProductPage() {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    const product = mockProducts.find(
      (p) => p.id === Number.parseInt(productId)
    );
    if (product) {
      setCurrentProduct(product);
      setEditedProduct({ ...product });
    }
  };

  const handleInputChange = (field: keyof Product, value: string | number) => {
    if (!editedProduct) return;

    setEditedProduct((prev: Product | null) =>
      prev
        ? {
            ...prev,
            [field]: value,
          }
        : null
    );
  };

  const handlePricingChange = (
    index: number,
    field: keyof RentalPricing,
    value: string | number
  ) => {
    if (!editedProduct) return;

    setEditedProduct((prev: Product | null) =>
      prev
        ? {
            ...prev,
            rentalPricing: prev.rentalPricing.map(
              (item: RentalPricing, i: number) =>
                i === index ? { ...item, [field]: value } : item
            ),
          }
        : null
    );
  };

  const handleReservationChargeChange = (
    field: keyof ReservationCharges,
    value: number
  ) => {
    if (!editedProduct) return;

    setEditedProduct((prev: Product | null) =>
      prev
        ? {
            ...prev,
            reservationCharges: {
              ...prev.reservationCharges,
              [field]: value,
            },
          }
        : null
    );
  };

  const handleUpdate = () => {
    if (!editedProduct) return;

    // Here you would typically make an API call to update the product
    console.log('Updating product:', editedProduct);

    // Update the mock data (in real app, this would be handled by your API)
    const productIndex = mockProducts.findIndex(
      (p) => p.id === editedProduct.id
    );
    if (productIndex !== -1) {
      mockProducts[productIndex] = { ...editedProduct };
    }

    setCurrentProduct({ ...editedProduct });

    // TODO: Add proper toast notification
    console.log(
      `Product Updated: ${editedProduct.name} has been successfully updated.`
    );
  };

  const handleUpdateStock = () => {
    if (!editedProduct) return;

    // TODO: Add proper toast notification
    console.log(
      `Stock Updated: Stock for ${editedProduct.name} updated to ${editedProduct.stock} units.`
    );
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='bg-white shadow-md transition-shadow p-6 mb-6 rounded-lg'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center gap-4'>
              <Button className='bg-purple-200 text-purple-800 hover:bg-purple-300'>
                Create
                <Plus className='w-4 h-4' />
              </Button>
              {/* <div className='flex items-center gap-2'>
              <span className='text-lg font-medium'>Product</span>
              <Settings className='w-5 h-5 text-gray-500' />
              </div> */}
            </div>
            <div className='text-sm text-gray-500'>
              {selectedProductId
                ? `Product ${selectedProductId} of ${mockProducts.length}`
                : `0 of ${mockProducts.length}`}
            </div>
          </div>

          {/* Update Stock Button */}
          <Button
            onClick={handleUpdateStock}
            disabled={!currentProduct}
            className=' bg-red-200 text-red-800 hover:bg-red-300'
          >
            Update stock
          </Button>
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* General Product Info */}
          <Card>
            <CardHeader>
              <CardTitle>General Product Info</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='product-select'>Product Name</Label>
                <Select
                  value={selectedProductId}
                  onValueChange={handleProductSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select a product' />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((product) => (
                      <SelectItem
                        key={product.id}
                        value={product.id.toString()}
                      >
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {editedProduct && (
                <>
                  <div className='space-y-2'>
                    <Label htmlFor='description'>Description</Label>
                    <Input
                      id='description'
                      value={editedProduct.description}
                      onChange={(e) =>
                        handleInputChange('description', e.target.value)
                      }
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='category'>Category</Label>
                    <Input
                      id='category'
                      value={editedProduct.category}
                      onChange={(e) =>
                        handleInputChange('category', e.target.value)
                      }
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='stock'>Stock Quantity</Label>
                    <Input
                      id='stock'
                      type='number'
                      value={editedProduct.stock}
                      onChange={(e) =>
                        handleInputChange(
                          'stock',
                          Number.parseInt(e.target.value)
                        )
                      }
                    />
                  </div>

                  <Button onClick={handleUpdate} className='w-full'>
                    Update Product
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Rental Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Rental Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              {editedProduct ? (
                <div className='space-y-6'>
                  {/* Pricing Table */}
                  <div>
                    <div className='grid grid-cols-3 gap-4 mb-4'>
                      <Label className='font-medium'>Rental Period</Label>
                      <Label className='font-medium'>Pricelist</Label>
                      <Label className='font-medium'>Price</Label>
                    </div>

                    {editedProduct.rentalPricing.map((pricing, index) => (
                      <div key={index} className='grid grid-cols-3 gap-4 mb-3'>
                        <Input
                          value={pricing.period}
                          onChange={(e) =>
                            handlePricingChange(index, 'period', e.target.value)
                          }
                        />
                        <Input
                          value={pricing.pricelist}
                          onChange={(e) =>
                            handlePricingChange(
                              index,
                              'pricelist',
                              e.target.value
                            )
                          }
                        />
                        <Input
                          type='number'
                          value={pricing.price}
                          onChange={(e) =>
                            handlePricingChange(
                              index,
                              'price',
                              Number.parseInt(e.target.value)
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {/* Rental Reservation Charges */}
                  <div>
                    <h3 className='font-medium mb-4'>
                      Rental Reservations charges
                    </h3>

                    <div className='space-y-3'>
                      <div className='flex items-center justify-between'>
                        <Label>Extra Hour :</Label>
                        <div className='flex items-center gap-2'>
                          <Input
                            type='number'
                            value={editedProduct.reservationCharges.extraHour}
                            onChange={(e) =>
                              handleReservationChargeChange(
                                'extraHour',
                                Number.parseInt(e.target.value)
                              )
                            }
                            className='w-32'
                          />
                          <span>Rs</span>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <Label>Extra Days :</Label>
                        <div className='flex items-center gap-2'>
                          <Input
                            type='number'
                            value={editedProduct.reservationCharges.extraDays}
                            onChange={(e) =>
                              handleReservationChargeChange(
                                'extraDays',
                                Number.parseInt(e.target.value)
                              )
                            }
                            className='w-32'
                          />
                          <span>Rs</span>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <Label>Extra Week :</Label>
                        <div className='flex items-center gap-2'>
                          <Input
                            type='number'
                            value={editedProduct.reservationCharges.extraWeek}
                            onChange={(e) =>
                              handleReservationChargeChange(
                                'extraWeek',
                                Number.parseInt(e.target.value)
                              )
                            }
                            className='w-32'
                          />
                          <span>Rs</span>
                        </div>
                      </div>

                      <div className='flex items-center justify-between'>
                        <Label>Late Return :</Label>
                        <div className='flex items-center gap-2'>
                          <Input
                            type='number'
                            value={editedProduct.reservationCharges.lateReturn}
                            onChange={(e) =>
                              handleReservationChargeChange(
                                'lateReturn',
                                Number.parseInt(e.target.value)
                              )
                            }
                            className='w-32'
                          />
                          <span>Rs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='text-center text-gray-500 py-8'>
                  Select a product to view and edit pricing information
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
