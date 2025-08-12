'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { ProductCard } from '@/components/products/product-card';
import { ProductListItem } from '@/components/products/product-list-items';
import { Pagination } from '@/components/products/pagination';
import { Product } from '@/validators/product.validator';
import api from '@/lib/api';
import { usePathname, useRouter } from "next/navigation"

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'price-low' | 'price-high' | 'category';

export default function HomePage() {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const router = useRouter()
  const pathname = usePathname()

  const handleRoute = (id: string) => {
    console.log('Navigating to product ID:', id);
    router.push(`${pathname}/${id}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await api.product.getProduct();   
        console.log(result)     
        setProductsData(result);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    getData();
  }, []);

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = Array.from(new Set(productsData.map((p) => p.category)));
    console.log(cats)
    return cats.sort();
  }, [productsData]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    const filtered = productsData.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      // Price filter (using daily price)
      const matchesPrice =
        product.price.daily >= priceRange[0] &&
        product.price.daily <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice && product.public;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price.daily - b.price.daily;
        case 'price-high':
          return b.price.daily - a.price.daily;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [productsData, searchQuery, selectedCategories, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      
      {/* Category Filters */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
          <div className='flex flex-wrap gap-2'>
            {categories.slice(0, 5).map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategories.includes(category) ? 'default' : 'outline'
                }
                size='sm'
                onClick={() =>
                  handleCategoryChange(
                    category,
                    !selectedCategories.includes(category)
                  )
                }
                className={
                  selectedCategories.includes(category)
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'hover:bg-orange-50 hover:border-orange-300'
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-6'>
        <div className='flex flex-col lg:flex-row gap-6'>
          {/* Sidebar Filters */}
          <div className='w-full lg:w-64 space-y-6'>
            <Card>
              <CardContent className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-semibold text-gray-900'>
                    Product Attributes
                  </h3>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={clearFilters}
                    className='text-orange-600 hover:text-orange-700'
                  >
                    Clear All
                  </Button>
                </div>

                {/* Categories */}
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-3'>
                      Categories
                    </h4>
                    <div className='space-y-2'>
                      {categories.map((category) => (
                        <div
                          key={category}
                          className='flex items-center space-x-2'
                        >
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) =>
                              handleCategoryChange(category, checked as boolean)
                            }
                          />
                          <label
                            htmlFor={category}
                            className='text-sm text-gray-700 cursor-pointer'
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className='font-medium text-gray-900 mb-3'>
                      Price Range (Daily)
                    </h4>
                    <div className='space-y-3'>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={1000}
                        min={0}
                        step={10}
                        className='w-full'
                      />
                      <div className='flex items-center justify-between text-sm text-gray-600'>
                        <span>₹{priceRange[0]}</span>
                        <span>₹{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className='flex-1'>
            {/* Search and Controls */}
            <div className='flex flex-col sm:flex-row gap-4 mb-6'>
              <div className='flex-1 relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                <Input
                  placeholder='Search products...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10'
                />
              </div>

              <div className='flex items-center gap-2'>
                <Select
                  value={sortBy}
                  onValueChange={(value: SortOption) => setSortBy(value)}
                >
                  <SelectTrigger className='w-40'>
                    <SelectValue placeholder='Sort by' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='name'>Name</SelectItem>
                    <SelectItem value='price-low'>
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value='price-high'>
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value='category'>Category</SelectItem>
                  </SelectContent>
                </Select>

                <div className='flex border rounded-md'>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('grid')}
                    className={
                      viewMode === 'grid'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'hover:bg-orange-50'
                    }
                  >
                    <Grid className='h-4 w-4' />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => setViewMode('list')}
                    className={
                      viewMode === 'list'
                        ? 'bg-orange-600 hover:bg-orange-700'
                        : 'hover:bg-orange-50'
                    }
                  >
                    <List className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategories.length > 0 || searchQuery) && (
              <div className='flex flex-wrap gap-2 mb-4'>
                {searchQuery && (
                  <Badge
                    variant='secondary'
                    className='bg-orange-100 text-orange-800'
                  >
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery('')}
                      className='ml-1 hover:text-orange-900'
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategories.map((category) => (
                  <Badge
                    key={category}
                    variant='secondary'
                    className='bg-orange-100 text-orange-800'
                  >
                    {category}
                    <button
                      onClick={() => handleCategoryChange(category, false)}
                      className='ml-1 hover:text-orange-900'
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Results Count */}
            <div className='mb-4'>
              <p className='text-sm text-gray-600'>
                Showing {paginatedProducts.length} of {filteredProducts.length}{' '}
                products
              </p>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className='grid grid-cols-3 gap-6 mb-8'>
                {paginatedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} handleRoute={handleRoute}/>
                ))}
              </div>
            ) : (
              <div className='space-y-4 mb-8'>
                {paginatedProducts.map((product) => (
                  <ProductListItem key={product._id} product={product} handleRoute={handleRoute} />
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className='text-center py-12'>
                <div className='text-gray-400 mb-4'>
                  <Filter className='h-12 w-12 mx-auto' />
                </div>
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  No products found
                </h3>
                <p className='text-gray-600 mb-4'>
                  Try adjusting your filters or search terms
                </p>
                <Button
                  onClick={clearFilters}
                  className='bg-orange-600 hover:bg-orange-700'
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
