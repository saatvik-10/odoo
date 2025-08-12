"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ArrowRight, Package, Calendar, Clock } from "lucide-react"

interface CartItem {
  productId: string
  productName: string
  quantity: number
  fromDate: string
  toDate: string
  duration: number
  durationUnit: string
  priceType: string
  unitPrice: number
  totalCost: number
  timestamp: string
}

type Stage = "review" | "delivery" | "payment"

export default function CartPage() {
  const [currentStage, setCurrentStage] = useState<Stage>("review")
  const [cartItem, setCartItem] = useState<CartItem | null>(null)
  const [quantity, setQuantity] = useState(1)

  // Delivery form state
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [invoiceAddress, setInvoiceAddress] = useState("")
  const [sameAsDelivery, setSameAsDelivery] = useState(true)
  const [deliveryMethod, setDeliveryMethod] = useState("")

  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardName, setCardName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [securityCode, setSecurityCode] = useState("")
  const [saveCard, setSaveCard] = useState(false)

  // Coupon state
  const [couponCode, setCouponCode] = useState("")

  useEffect(() => {
    const cart = localStorage.getItem("cart")
    if (cart) {
      const parsedCart = JSON.parse(cart)
      setCartItem(parsedCart)
      setQuantity(parsedCart.quantity)
    }
  }, [])

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity < 1 || !cartItem) return

    const updatedCart = {
      ...cartItem,
      quantity: newQuantity,
      totalCost: cartItem.unitPrice * cartItem.duration * newQuantity,
    }

    setCartItem(updatedCart)
    setQuantity(newQuantity)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const removeFromCart = () => {
    localStorage.removeItem("cart")
    setCartItem(null)
  }

  const applyCoupon = () => {
    // Placeholder for coupon logic
    alert("Coupon functionality to be implemented")
  }

  const deliveryCharge = 0
  const taxRate = 0.18
  const subtotal = cartItem?.totalCost || 0
  const taxes = Math.round(subtotal * taxRate)
  const total = subtotal + deliveryCharge + taxes

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const handleNextStage = () => {
    if (currentStage === "review") {
      setCurrentStage("delivery")
    } else if (currentStage === "delivery") {
      if (!deliveryAddress || !deliveryMethod) {
        alert("Please fill in all delivery details")
        return
      }
      setCurrentStage("payment")
    } else if (currentStage === "payment") {
      if (paymentMethod === "credit-card" && (!cardName || !cardNumber || !expiryDate || !securityCode)) {
        alert("Please fill in all payment details")
        return
      }
      alert("Order placed successfully!")
      localStorage.removeItem("cart")
      setCartItem(null)
    }
  }

  const handlePrevStage = () => {
    if (currentStage === "payment") {
      setCurrentStage("delivery")
    } else if (currentStage === "delivery") {
      setCurrentStage("review")
    }
  }

  if (!cartItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4">Add some items to get started</p>
            <Button onClick={() => window.history.back()}>Continue Shopping</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStage === "review"
                    ? "bg-orange-600 text-white"
                    : currentStage === "delivery" || currentStage === "payment"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                }`}
              >
                1
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Review Order</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStage === "delivery"
                    ? "bg-orange-600 text-white"
                    : currentStage === "payment"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Delivery</span>
            </div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStage === "payment" ? "bg-orange-600 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-red-500">
                  {currentStage === "review" && "Order Overview"}
                  {currentStage === "delivery" && "Delivery Address"}
                  {currentStage === "payment" && "Confirm Order"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Review Order Stage */}
                {currentStage === "review" && (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{cartItem.productName}</h3>
                        <p className="text-gray-600">
                          ₹{cartItem.unitPrice.toLocaleString()} per {cartItem.durationUnit.slice(0, -1)}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {formatDate(cartItem.fromDate)} - {formatDate(cartItem.toDate)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {cartItem.duration} {cartItem.durationUnit}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-4">
                          <Label>Qty</Label>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(quantity - 1)}
                              disabled={quantity <= 1}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{quantity}</span>
                            <Button variant="outline" size="sm" onClick={() => updateQuantity(quantity + 1)}>
                              +
                            </Button>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={removeFromCart}
                            className="ml-auto text-red-500 hover:text-red-700 bg-transparent"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delivery Stage */}
                {currentStage === "delivery" && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="delivery-address" className="text-red-500 font-medium">
                        Delivery Address
                      </Label>
                      <textarea
                        id="delivery-address"
                        className="w-full mt-2 p-3 border rounded-lg resize-none"
                        rows={3}
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        placeholder="Enter your delivery address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="invoice-address" className="text-red-500 font-medium">
                        Invoice Address
                      </Label>
                      <div className="flex items-center space-x-2 mt-2 mb-2">
                        <input
                          type="checkbox"
                          id="same-address"
                          checked={sameAsDelivery}
                          onChange={(e) => {
                            setSameAsDelivery(e.target.checked)
                            if (e.target.checked) {
                              setInvoiceAddress(deliveryAddress)
                            }
                          }}
                          className="rounded"
                        />
                        <Label htmlFor="same-address" className="text-sm text-teal-600">
                          Billing address same as delivery address
                        </Label>
                      </div>
                      <textarea
                        id="invoice-address"
                        className="w-full p-3 border rounded-lg resize-none"
                        rows={3}
                        value={sameAsDelivery ? deliveryAddress : invoiceAddress}
                        onChange={(e) => setInvoiceAddress(e.target.value)}
                        disabled={sameAsDelivery}
                        placeholder="Enter your invoice address"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-700 font-medium">Choose Delivery Method</Label>
                      <select
                        className="w-full mt-2 p-3 border rounded-lg"
                        value={deliveryMethod}
                        onChange={(e) => setDeliveryMethod(e.target.value)}
                      >
                        <option value="">Please Pick Something</option>
                        <option value="standard">Standard Delivery (3-5 days)</option>
                        <option value="express">Express Delivery (1-2 days)</option>
                        <option value="same-day">Same Day Delivery</option>
                      </select>
                      {deliveryMethod && <p className="text-sm text-gray-600 mt-1">₹0 - Delivery charges</p>}
                    </div>
                  </div>
                )}

                {/* Payment Stage */}
                {currentStage === "payment" && (
                  <div className="space-y-6">
                    <div>
                      <Label className="font-medium">Choose a payment method</Label>
                      <div className="space-y-3 mt-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="credit-card"
                            name="payment"
                            value="credit-card"
                            checked={paymentMethod === "credit-card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <Label htmlFor="credit-card">Credit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="debit-card"
                            name="payment"
                            value="debit-card"
                            checked={paymentMethod === "debit-card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <Label htmlFor="debit-card">Debit Card</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="apple-pay"
                            name="payment"
                            value="apple-pay"
                            checked={paymentMethod === "apple-pay"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <Label htmlFor="apple-pay">Apple Pay</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="paypal"
                            name="payment"
                            value="paypal"
                            checked={paymentMethod === "paypal"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <Label htmlFor="paypal">Paypal</Label>
                        </div>
                      </div>
                    </div>

                    {(paymentMethod === "credit-card" || paymentMethod === "debit-card") && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input
                            id="card-name"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="Placeholder"
                          />
                        </div>
                        <div>
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiration Date</Label>
                            <Input
                              id="expiry"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <Label htmlFor="security">Security Code</Label>
                            <Input
                              id="security"
                              value={securityCode}
                              onChange={(e) => setSecurityCode(e.target.value)}
                              placeholder="CVV"
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="save-card"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                          />
                          <Label htmlFor="save-card" className="text-sm">
                            Save my card details
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  {currentStage !== "review" && (
                    <Button variant="outline" onClick={handlePrevStage}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  )}
                  {currentStage === "review" && <div></div>}
                  <Button onClick={handleNextStage} className="bg-orange-600 hover:bg-orange-700">
                    {currentStage === "review" && "Proceed to Checkout"}
                    {currentStage === "delivery" && "Confirm"}
                    {currentStage === "payment" && "Pay Now"}
                    {currentStage !== "payment" && <ArrowRight className="h-4 w-4 ml-2" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-blue-600">Order Summary</CardTitle>
                <p className="text-sm text-gray-600">1 Item - ₹{subtotal.toLocaleString()}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-red-500">
                    <span>Delivery Charge</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span>Sub Total</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span>Taxes</span>
                    <span>₹{taxes}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-red-500">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Apply Coupon</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={applyCoupon}
                      variant="outline"
                      className="bg-gray-900 text-white hover:bg-gray-800"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {currentStage === "delivery" && (
                  <Button onClick={() => setCurrentStage("review")} variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Cart
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
