import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/validators/product.validator';

interface ProductListItemProps {
  product: Product;
  handleRoute: (_id: string) => void;
}

export function ProductListItem({
  product,
  handleRoute,
}: ProductListItemProps) {

  console.log('Rendering product list item:', product._id);

  return (
    <Card
      className='hover:shadow-md transition-shadow duration-200'
      onClick={() => handleRoute(product._id)}
    >
      <CardContent className='p-4'>
        <div className='flex gap-4'>
          <div className='relative flex-shrink-0'>
            <img
              src={
                product.images[0] ||
                '/placeholder.svg?height=100&width=100&query=rental product'
              }
              alt={product.name}
              className='w-20 h-20 object-cover rounded-lg'
            />
            {product.stock < 5 && product.stock > 0 && (
              <Badge className='absolute -top-1 -right-1 bg-orange-600 text-xs px-1'>
                Low
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge className='absolute -top-1 -right-1 bg-red-600 text-xs px-1'>
                Out
              </Badge>
            )}
          </div>

          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <div className='flex items-center gap-2 mb-1'>
                  <h3 className='font-semibold text-gray-900 truncate'>
                    {product.name}
                  </h3>
                  <Badge variant='outline' className='text-xs'>
                    {product.category}
                  </Badge>
                </div>

                <p className='text-sm text-gray-600 line-clamp-2 mb-2'>
                  {product.description}
                </p>

                <div className='flex items-center gap-4 text-sm'>
                  <span className='text-gray-600'>
                    Daily:{' '}
                    <span className='font-semibold text-gray-900'>
                      ₹{product.price.daily}
                    </span>
                  </span>
                  <span className='text-gray-600'>
                    Monthly:{' '}
                    <span className='font-semibold text-gray-900'>
                      ₹{product.price.monthly}
                    </span>
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-2 ml-4'>
                <Button size='sm' variant='ghost' className='h-8 w-8 p-0'>
                  <Heart className='h-4 w-4' />
                </Button>
                <Button
                  size='sm'
                  className='bg-orange-600 hover:bg-orange-700'
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className='h-4 w-4 mr-1' />
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
