'use client';

import {
  Search,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  ShoppingCart,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { kpiData, recentOrders, topCategories, topCustomers, topProducts } from '@/constant/dashboard';

export default function VendorDashboard() {

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='mx-auto max-w-7xl p-6 space-y-6'>
        {/* Search and Filter Bar */}
        <div className='flex flex-col sm:flex-row gap-4 items-center justify-between'>
          <div className='relative flex-1 max-w-md'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
            <Input
              placeholder='Search products, customers, orders...'
              className='pl-10 bg-white'
            />
          </div>
          <div className='flex gap-2'>
            <Select defaultValue='30days'>
              <SelectTrigger className='w-40 bg-white'>
                <Calendar className='h-4 w-4 mr-2' />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='7days'>Last 7 days</SelectItem>
                <SelectItem value='30days'>Last 30 days</SelectItem>
                <SelectItem value='90days'>Last 90 days</SelectItem>
                <SelectItem value='1year'>Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <Card
                key={index}
                className='bg-white shadow-sm hover:shadow-md transition-shadow'
              >
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium text-gray-600'>
                    {kpi.title}
                  </CardTitle>
                  <Icon className='h-4 w-4 text-gray-400' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold text-gray-900'>
                    {kpi.value}
                  </div>
                  <div className='flex items-center text-xs text-gray-500 mt-1'>
                    {kpi.trend === 'up' ? (
                      <TrendingUp className='h-3 w-3 text-green-500 mr-1' />
                    ) : (
                      <TrendingDown className='h-3 w-3 text-red-500 mr-1' />
                    )}
                    <span
                      className={
                        kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }
                    >
                      {kpi.change}
                    </span>
                    <span className='ml-1'>{kpi.description}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Dashboard Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Top Product Categories */}
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                Top Product Categories
              </CardTitle>
              <CardDescription>
                Performance by category this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className='text-right'>Ordered</TableHead>
                    <TableHead className='text-right'>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>
                        {category.category}
                      </TableCell>
                      <TableCell className='text-right'>
                        {category.ordered}
                      </TableCell>
                      <TableCell className='text-right'>
                        ${category.revenue.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                Top Products
              </CardTitle>
              <CardDescription>Best performing products</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className='text-right'>Ordered</TableHead>
                    <TableHead className='text-right'>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>
                        {product.product}
                      </TableCell>
                      <TableCell className='text-right'>
                        {product.ordered}
                      </TableCell>
                      <TableCell className='text-right'>
                        ${product.revenue.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                Recent Orders
              </CardTitle>
              <CardDescription>Latest order activity</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className='text-right'>Items</TableHead>
                    <TableHead className='text-right'>Amount</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell className='text-right'>
                        {order.items}
                      </TableCell>
                      <TableCell className='text-right'>
                        ${order.amount}
                      </TableCell>
                      <TableCell className='text-right'>
                        <Badge
                          className={
                            order.status === 'Delivered'
                              ? 'bg-orange-100 text-orange-600'
                              : order.status === 'Quotation'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'Returned'
                                  ? 'bg-red-100 text-red-800'
                                  : order.status == 'Picked Up'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top Customers */}
          <Card className='bg-white shadow-sm'>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                Top Customers
              </CardTitle>
              <CardDescription>Most valuable customers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead className='text-right'>Recent Orders</TableHead>
                    <TableHead className='text-right'>Revenue</TableHead>
                    <TableHead className='text-right'>Total Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomers.map((customer, index) => (
                    <TableRow key={index}>
                      <TableCell className='font-medium'>
                        {customer.customer}
                      </TableCell>
                      <TableCell className='text-right'>
                        {customer.ordered}
                      </TableCell>
                      <TableCell className='text-right'>
                        ${customer.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell className='text-right'>
                        <Badge variant='outline' className='text-xs'>
                          {customer.totalOrders}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
