import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/validators/product.validator';

interface ProductCardProps {
  product: Product;
  handleRoute: (id: string) => void;
}

export function ProductCard({ product, handleRoute }: ProductCardProps) {
  return (
    <Card
      className='group hover:shadow-lg transition-shadow duration-200 w-xs'
      onClick={() => handleRoute(product._id)}
    >
      <CardContent className='p-4'>
        <div className='relative '>
          <img
            src={
              product.images[0] ||
              '/placeholder.svg?height=200&width=300&query=rental product'
            }
            alt={product.name}
            className='w-full h-48 object-cover rounded-t-lg'
          />
          <Button
            size='sm'
            variant='ghost'
            className='absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white'
          >
            <Heart className='h-4 w-4' />
          </Button>
          {product.stock < 5 && product.stock > 0 && (
            <Badge className='absolute top-2 left-2 bg-orange-600'>
              Low Stock
            </Badge>
          )}
          {product.stock === 0 && (
            <Badge className='absolute top-2 left-2 bg-red-600'>
              Out of Stock
            </Badge>
          )}
        </div>

        <div className='p-4'>
          <div className='flex items-center justify-between'>
            <Badge variant='outline' className='text-xs'>
              {product.category}
            </Badge>
          </div>

          <h3 className='font-semibold text-gray-900 mb-1 line-clamp-2'>
            {product.name}
          </h3>

          <p className='text-sm text-gray-600 mb-3 line-clamp-2'>
            {product.description}
          </p>

          <div className='space-y-1 mb-4'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Daily:</span>
              <span className='font-semibold'>₹{product.price.daily}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Monthly:</span>
              <span className='font-semibold'>₹{product.price.monthly}</span>
            </div>
          </div>

          <Button
            className='w-full bg-orange-600 hover:bg-orange-700'
            disabled={product.stock === 0}
          >
            <ShoppingCart className='h-4 w-4 mr-2' />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
