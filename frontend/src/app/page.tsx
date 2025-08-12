import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  CheckCircle,
  Truck,
  Shield,
  Clock,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-orange-50'>
      {/* Header */}
      <header className='border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>R</span>
              </div>
              <span className='text-xl font-bold text-gray-900'>RentFlow</span>
            </div>
            {/* <nav className='hidden md:flex items-center space-x-2'>
              <Button variant='outline' size='sm'>
                Sign In
              </Button>
              <Button size='sm' className='bg-orange-600 hover:bg-orange-700'>
                Get Started
              </Button>
            </nav> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto text-center'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
            Connect Vendors to Customers with
            <span className='text-orange-600 block'>Seamless Rentals</span>
          </h1>
          <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed'>
            Our optimized rental system offers multiple delivery options, vendor
            dashboards, and streamlined processes that make renting effortless
            for everyone.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            {/* <Button
              size='lg'
              className='text-lg px-8 py-3 border bg-orange-600 text-white cursor-pointer hover:bg-orange-700'
            >
              Browse Rentals
            </Button> */}
            <Link href='/vendor-sign-in'>
              <Button
                variant='outline'
                size='lg'
                className='text-lg px-8 py-3 bg-transparent border-orange-600 cursor-pointer text-orange-600 hover:bg-orange-100 hover:text-orange-600'
              >
                Start as Vendor
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </Link>
            <Link href='/customer-sign-in'>
              <Button
                variant='outline'
                size='lg'
                className='text-lg px-8 py-3 bg-transparent border-orange-600 cursor-pointer text-orange-600 hover:bg-orange-100 hover:text-orange-600'
              >
                Start as User
                <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              Everything You Need to Succeed
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Powerful features designed to streamline your rental business and
              delight your customers.
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader>
                <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4'>
                  <Truck className='h-6 w-6 text-orange-600' />
                </div>
                <CardTitle>Multiple Delivery Options</CardTitle>
                <CardDescription>
                  Flexible delivery methods including pickup, standard delivery,
                  and express shipping to meet every customer need.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader>
                <div className='w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mb-4'>
                  <BarChart3 className='h-6 w-6 text-orange-700' />
                </div>
                <CardTitle>Vendor Dashboard</CardTitle>
                <CardDescription>
                  Comprehensive analytics, inventory management, and order
                  tracking all in one powerful dashboard interface.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader>
                <div className='w-12 h-12 bg-orange-300 rounded-lg flex items-center justify-center mb-4'>
                  <Shield className='h-6 w-6 text-orange-800' />
                </div>
                <CardTitle>Secure Transactions</CardTitle>
                <CardDescription>
                  End-to-end encryption and secure payment processing ensure
                  safe transactions for all parties involved.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader>
                <div className='w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4'>
                  <Clock className='h-6 w-6 text-orange-600' />
                </div>
                <CardTitle>Real-time Tracking</CardTitle>
                <CardDescription>
                  Live updates on rental status, delivery progress, and return
                  schedules keep everyone informed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader>
                <div className='w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mb-4'>
                  <Users className='h-6 w-6 text-orange-700' />
                </div>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>
                  Built-in CRM tools to manage customer relationships,
                  preferences, and rental history effectively.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='border-0 shadow-lg hover:shadow-xl transition-shadow'>
              <CardHeader>
                <div className='w-12 h-12 bg-orange-300 rounded-lg flex items-center justify-center mb-4'>
                  <Settings className='h-6 w-6 text-orange-800' />
                </div>
                <CardTitle>Automated Workflows</CardTitle>
                <CardDescription>
                  Smart automation for booking confirmations, reminders, and
                  follow-ups to reduce manual work.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id='how-it-works'
        className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'
      >
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
              How RentFlow Works
            </h2>
            <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
              Simple steps to get your rental business up and running in
              minutes.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='text-center'>
              <div className='w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-white font-bold text-xl'>1</span>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Create Your Store
              </h3>
              <p className='text-gray-600'>
                Set up your vendor profile, add your rental inventory, and
                configure your delivery preferences in minutes.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-white font-bold text-xl'>2</span>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Connect with Customers
              </h3>
              <p className='text-gray-600'>
                Our platform matches you with customers looking for your
                products, handling inquiries and bookings automatically.
              </p>
            </div>

            <div className='text-center'>
              <div className='w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6'>
                <span className='text-white font-bold text-xl'>3</span>
              </div>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                Manage & Grow
              </h3>
              <p className='text-gray-600'>
                Use our dashboard to track performance, manage orders, and
                optimize your rental business for maximum growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      {/* <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col items-center just'>
            <div>
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                Why Choose RentFlow?
              </h2>
              <div className='space-y-4'>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='h-6 w-6 text-green-500 mt-0.5 flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-gray-900'>
                      Increased Revenue
                    </h3>
                    <p className='text-gray-600'>
                      Optimize pricing and availability to maximize your rental
                      income.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='h-6 w-6 text-green-500 mt-0.5 flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-gray-900'>
                      Reduced Overhead
                    </h3>
                    <p className='text-gray-600'>
                      Automate routine tasks and reduce manual administrative
                      work.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='h-6 w-6 text-green-500 mt-0.5 flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-gray-900'>
                      Better Customer Experience
                    </h3>
                    <p className='text-gray-600'>
                      Provide seamless booking and delivery experiences that
                      keep customers coming back.
                    </p>
                  </div>
                </div>
                <div className='flex items-start space-x-3'>
                  <CheckCircle className='h-6 w-6 text-green-500 mt-0.5 flex-shrink-0' />
                  <div>
                    <h3 className='font-semibold text-gray-900'>
                      Scalable Growth
                    </h3>
                    <p className='text-gray-600'>
                      Expand your business with tools that grow with you, from
                      startup to enterprise.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col items-center justify-between'>
            <div className='flex items-center space-x-2 mb-4'>
              <div className='w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-sm'>R</span>
              </div>
              <span className='text-xl font-bold'>RentFlow</span>
            </div>
            <p className='text-gray-400'>
              Connecting vendors to customers with seamless rental experiences.
            </p>
          </div>
          <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
            <p>
              &copy; {new Date().getFullYear()} RentFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
