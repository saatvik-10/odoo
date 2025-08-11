"use client";

import { useState } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  User,
  LayoutGrid,
  List,
  MoreVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockOrders } from "@/constant";

type ViewMode = "card" | "list";

type RentalStatus = "quotation" | "pickup" | "returned" | "reserved";

interface RentalOrder {
  id: string;
  orderReference: string;
  customer: string;
  createdBy: string;
  rentalStatus: RentalStatus;
  amount: number;
  pickupDate?: string;
  returnDate?: string;
}

export default function RentalDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter and search logic
  const filteredOrders = mockOrders.filter((order) => {
    const matchesStatus =
      activeStatusFilter === "ALL" ||
      (activeStatusFilter === "Quotation" &&
        order.rentalStatus === "quotation") ||
      (activeStatusFilter === "Reserved" &&
        order.rentalStatus === "reserved") ||
      (activeStatusFilter === "Pickup" && order.rentalStatus === "pickup") ||
      (activeStatusFilter === "Returned" && order.rentalStatus === "returned");
    // (activeStatusFilter === 'Quotation sent' &&
    //   order.rentalStatus === 'quotation-sent');

    const matchesSearch =
      searchQuery === "" ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.createdBy.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Status counts
  const getStatusCount = (status: string) => {
    if (status === "ALL") return mockOrders.length;
    return mockOrders.filter((order) => {
      switch (status) {
        case "Quotation":
          return order.rentalStatus === "quotation";
        case "Reserved":
          return order.rentalStatus === "reserved";
        case "Pickup":
          return order.rentalStatus === "pickup";
        case "Returned":
          return order.rentalStatus === "returned";
        // case 'Quotation sent':
        //   return order.rentalStatus === 'quotation-sent';
        default:
          return false;
      }
    }).length;
  };

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    const currentOrderIds = currentOrders.map((order) => order.id);
    const allCurrentSelected = currentOrderIds.every((id) =>
      selectedOrders.includes(id)
    );

    if (allCurrentSelected) {
      setSelectedOrders((prev) =>
        prev.filter((id) => !currentOrderIds.includes(id))
      );
    } else {
      setSelectedOrders((prev) => [...new Set([...prev, ...currentOrderIds])]);
    }
  };

  const handleStatusFilter = (status: string) => {
    setActiveStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getStatusBadge = (status: RentalStatus) => {
    const statusConfig = {
      quotation: {
        label: "Quotation",
        variant: "secondary" as const,
        className: "bg-blue-100 text-blue-800",
      },
      pickup: {
        label: "Pickup",
        variant: "secondary" as const,
        className: "bg-yellow-100 text-yellow-800",
      },
      returned: {
        label: "Returned",
        variant: "destructive" as const,
        className: "bg-red-100 text-red-800",
      },
      reserved: {
        label: "Reserved",
        variant: "secondary" as const,
        className: "bg-green-100 text-green-800",
      },
      // 'quotation-sent': {
      //   label: 'Quotation sent',
      //   variant: 'secondary' as const,
      //   className: 'bg-purple-100 text-purple-800',
      // },
    };

    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={`${config.className} text-xs`}>
        {config.label}
      </Badge>
    );
  };

  const SidebarContent = ({
    collapsed = false,
    setSidebarCollapsed,
  }: {
    collapsed?: boolean;
    setSidebarCollapsed: any;
  }) => (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`font-semibold text-gray-900 text-sm transition-all ${collapsed ? "hidden" : "block"}`}
          >
            RENTAL STATUS
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!collapsed)}
            className="hidden lg:flex h-6 w-6 p-0"
          >
            {collapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div
          className={`space-y-1 transition-all ${collapsed ? "hidden" : "block"}`}
        >
          {["ALL", "Quotation", "Reserved", "Pickup", "Returned"].map(
            (status) => (
              <div
                key={status}
                className={`flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm cursor-pointer transition-colors ${
                  activeStatusFilter === status
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : ""
                }`}
                onClick={() => handleStatusFilter(status)}
              >
                <span>{status}</span>
                <span className="text-gray-500">{getStatusCount(status)}</span>
              </div>
            )
          )}
        </div>
      </div>

      <div className={collapsed ? "hidden" : "block"}>
        <h3 className="font-semibold text-gray-900 mb-4 text-sm">
          INVOICE STATUS
        </h3>
        <div className="space-y-1">
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm">
            <span>Fully Invoiced</span>
            <span className="text-gray-500">5</span>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm">
            <span>Nothing to invoice</span>
            <span className="text-gray-500">5</span>
          </div>
          <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm">
            <span>To invoice</span>
            <span className="text-gray-500">5</span>
          </div>
        </div>
      </div>
    </div>
  );

  const StatusModal = ({
    statusModalOpen,
    setStatusModalOpen,
  }: {
    statusModalOpen: boolean;
    setStatusModalOpen: any;
  }) => (
    <Dialog open={statusModalOpen} onOpenChange={setStatusModalOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">
              RENTAL STATUS
            </h3>
            <div className="space-y-1">
              {["ALL", "Quotation", "Reserved", "Pickup", "Returned"].map(
                (status) => (
                  <div
                    key={status}
                    className={`flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm cursor-pointer transition-colors ${
                      activeStatusFilter === status
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : ""
                    }`}
                    onClick={() => {
                      handleStatusFilter(status);
                      setStatusModalOpen(false);
                    }}
                  >
                    <span>{status}</span>
                    <span className="text-gray-500">
                      {getStatusCount(status)}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm">
              INVOICE STATUS
            </h3>
            <div className="space-y-1">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm">
                <span>Fully Invoiced</span>
                <span className="text-gray-500">5</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm">
                <span>Nothing to invoice</span>
                <span className="text-gray-500">5</span>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded text-sm">
                <span>To invoice</span>
                <span className="text-gray-500">5</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className='bg-white border-b'>
        <div className='flex items-center justify-between px-4 lg:px-6 py-4'>
          <div className='flex items-center space-x-4'>
            Mobile menu button
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant='ghost' size='sm' className='lg:hidden'>
                  <Menu className='h-4 w-4' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-80 p-6'>
                <div className='space-y-4'>
                  <h2 className='text-lg font-semibold'>Navigation</h2>
                  <nav className='flex flex-col space-y-2'>
                    {[
                      'Dashboard',
                      'Rental',
                      'Order',
                      'Products',
                      'Reporting',
                      'Setting',
                    ].map((item, index) => (
                      <Button
                        key={item}
                        variant={index === 1 ? 'default' : 'ghost'}
                        size='sm'
                        className={`${index === 1 ? 'bg-gray-900 text-white' : ''} justify-start`}
                      >
                        {item}
                      </Button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <nav className="flex space-x-1 overflow-x-auto">
              {["Dashboard", "Rental", "Order", "Products", "Reporting", "Setting"].map((item, index) => (
                <Button
                  key={item}
                  variant={index === 1 ? "default" : "ghost"}
                  size="sm"
                  className={`${index === 1 ? "bg-gray-900 text-white" : ""} whitespace-nowrap text-xs sm:text-sm`}
                >
                  <span className="hidden sm:inline">{item}</span>
                  <span className="sm:hidden">{item.slice(0, 3)}</span>
                </Button>
              ))}
            </nav>
          </div>
          <div className='flex items-center space-x-2 sm:space-x-4'>
            <Avatar className='h-6 w-6 sm:h-8 sm:w-8'>
              <AvatarFallback>
                <User className='h-3 w-3 sm:h-4 sm:w-4' />
              </AvatarFallback>
            </Avatar>
            <span className='text-xs sm:text-sm font-medium hidden sm:inline'>
              Adam
            </span>
          </div>
        </div>
      </div> */}

      {/* Mobile Status Filter - positioned below navbar */}
      <div className="lg:hidden bg-white border-b px-4 py-2">
        <div className="flex justify-end">
          <StatusModal
            statusModalOpen={statusModalOpen}
            setStatusModalOpen={setStatusModalOpen}
          />
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div
          className={`hidden lg:block bg-white border-r min-h-screen p-6 transition-all duration-300 ${
            sidebarCollapsed ? "w-16" : "w-80"
          }`}
        >
          <SidebarContent
            collapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6">
          <div className="bg-white rounded-lg border">
            {/* Content Header */}
            <div className="p-4 sm:p-6 border-b">
              <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="flex items-center space-x-4">
                  {/* <Button className='bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm'>
                    Create
                  </Button> */}
                  <h2 className="text-base sm:text-lg font-semibold">
                    Rental Orders
                  </h2>
                </div>

                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 w-full sm:w-64 text-sm"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>

                  {/* Pagination and View Toggle */}
                  <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm text-gray-600">
                        {filteredOrders.length > 0
                          ? `${startIndex + 1}-${Math.min(endIndex, filteredOrders.length)}/${filteredOrders.length}`
                          : "0-0/0"}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrevPage}
                        disabled={currentPage <= 1}
                      >
                        <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={currentPage >= totalPages}
                      >
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>

                    {/* View Toggle */}
                    <div className="flex border rounded-md">
                      <Button
                        variant={viewMode === "card" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("card")}
                        className="rounded-r-none text-xs sm:text-sm px-2 sm:px-3"
                      >
                        <LayoutGrid className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                        <span className="hidden sm:inline">Card</span>
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none border-l text-xs sm:text-sm px-2 sm:px-3"
                      >
                        <List className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-1" />
                        <span className="hidden sm:inline">List</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-3 sm:p-4 lg:p-6">
              {viewMode === "list" ? (
                // Table View
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 sm:p-3">
                          <Checkbox
                            checked={
                              currentOrders.length > 0 &&
                              currentOrders.every((order) =>
                                selectedOrders.includes(order.id)
                              )
                            }
                            onCheckedChange={handleSelectAll}
                          />
                        </th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-medium text-gray-600">
                          Order Ref
                        </th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-medium text-gray-600">
                          Customer
                        </th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-medium text-gray-600 hidden md:table-cell">
                          Created by
                        </th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-medium text-gray-600">
                          Status
                        </th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-medium text-gray-600 hidden sm:table-cell">
                          Tax
                        </th>
                        <th className="text-left p-2 sm:p-3 text-xs sm:text-sm font-medium text-gray-600">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="p-2 sm:p-3">
                            <Checkbox
                              checked={selectedOrders.includes(order.id)}
                              onCheckedChange={() =>
                                handleSelectOrder(order.id)
                              }
                            />
                          </td>
                          <td className="p-2 sm:p-3 text-xs sm:text-sm font-mono">
                            {order.orderReference}
                          </td>
                          <td className="p-2 sm:p-3 text-xs sm:text-sm">
                            {order.customer}
                          </td>
                          <td className="p-2 sm:p-3 hidden md:table-cell">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-5 w-5 sm:h-6 sm:w-6">
                                {/* {user.firstName.toUpperCase()} */}
                                <AvatarFallback className="text-xs">
                                  A
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs sm:text-sm">
                                {order.createdBy}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 sm:p-3">
                            {getStatusBadge(order.rentalStatus)}
                          </td>
                          <td className="p-2 sm:p-3 text-xs sm:text-sm hidden sm:table-cell"></td>
                          <td className="p-2 sm:p-3 text-xs sm:text-sm font-medium">
                            ₹ {order.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                // Card View
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {currentOrders.map((order) => (
                    <Card
                      key={order.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-xs sm:text-sm truncate pr-2">
                            {order.customer}
                          </h3>
                          <span className="text-sm sm:text-lg font-bold whitespace-nowrap">
                            ₹ {order.amount}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs text-gray-600 font-mono">
                            {order.orderReference}
                          </div>
                          {order.pickupDate && (
                            <div className="text-xs text-gray-500 truncate">
                              Pickup: {order.pickupDate}
                            </div>
                          )}
                          <div className="flex items-center justify-between">
                            {getStatusBadge(order.rentalStatus)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
