'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star, MessageCircle, Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import NavBar from "@/components/NavBar";

// Mock data for the trade
const tradeData = {
  offeredItems: "5 bags of maize",
  receivedItems: "10 bags of fertilizer",
  partnerName: "John Doe",
  partnerTrustScore: 4.5,
  partnerLocation: "Lagos, Nigeria",
  deliveryWindow: "June 15-20, 2023",
  pickupLocation: "Central Market, Lagos"
}

export default function TradeConfirmationFlow() {
  const [step, setStep] = useState(1)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState('')

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <Card className="w-full max-w-xl mx-auto mb-40">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800">Review Trade Agreement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-green-700">Trade Summary:</h3>
                <p>{tradeData.offeredItems} for {tradeData.receivedItems}</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-700">Trading Partner:</h3>
                <p>{tradeData.partnerName} (Trust Score: {tradeData.partnerTrustScore})</p>
                <p>Location: {tradeData.partnerLocation}</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-700">Delivery Details:</h3>
                <p>Window: {tradeData.deliveryWindow}</p>
                <p>Pickup: {tradeData.pickupLocation}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={nextStep} className="w-full bg-green-600 hover:bg-green-700">
                Accept Trade & Confirm Delivery Process
              </Button>
            </CardFooter>
          </Card>
        )
      case 2:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800">Confirm Trade Acceptance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center mb-4">Are you sure you want to accept this trade?</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={prevStep} variant="outline">Cancel</Button>
              <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">Yes, Accept Trade</Button>
            </CardFooter>
          </Card>
        )
      case 3:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800">Delivery in Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-100 p-4 rounded-md">
                <h3 className="font-semibold text-yellow-800">Status: Pending Delivery</h3>
                <p>Estimated delivery: {tradeData.deliveryWindow}</p>
              </div>
              <p className="text-sm text-gray-600">
                Please ensure you have received the goods before confirming delivery.
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={nextStep} className="w-full bg-green-600 hover:bg-green-700">
                Confirm Delivery Received
              </Button>
            </CardFooter>
          </Card>
        )
      case 4:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800">Confirm Goods Delivered</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Have you received the items as agreed?</p>
              <RadioGroup defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes, {"I'"} ve received everything</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">{"There's"} a problem with the delivery</Label>
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={prevStep} variant="outline">Back</Button>
              <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700">Confirm</Button>
            </CardFooter>
          </Card>
        )
      case 5:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800">Leave Feedback for the Trade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rating">Trust Rating (1-5 stars)</Label>
                <div className="flex space-x-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="sm"
                      onClick={() => setRating(star)}
                    >
                      <Star className={`w-6 h-6 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="feedback">Comments (optional)</Label>
                <Textarea
                  id="feedback"
                  placeholder="Share your experience with this trade..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
              <p className="text-sm text-gray-600">
                Your feedback will be visible to other potential traders.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={nextStep} className="w-full bg-green-600 hover:bg-green-700">Submit Feedback</Button>
            </CardFooter>
          </Card>
        )
      case 6:
        return (
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-green-800">Thank you for your feedback!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-100 p-4 rounded-md">
                <Check className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-green-800">Your feedback has been submitted successfully.</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-700">Trade Summary:</h3>
                <p>{tradeData.offeredItems} for {tradeData.receivedItems}</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-700">Your Rating:</h3>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-5 h-5 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                The trust score for {tradeData.partnerName} has been updated based on your feedback.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={'/'} className='px-4 py-2 border hover:border-green-300 hover:text-green-700 rounded-[7px]' >Return to Dashboard</Link>
              <Link href={'/trades'} className="px-4 py-2 rounded-[7px] text-white bg-green-600 hover:bg-green-700">View Other Trades</Link>
            </CardFooter>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <>
    <NavBar />
    <div className=" min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-4 md:p-6 pb-24 flex flex-col items-center justify-center">
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={step === 1}
            className="text-green-700"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <span className="text-sm text-green-700 font-medium">Step {step} of 6</span>
          <Button
            variant="ghost"
            onClick={nextStep}
            disabled={step === 6}
            className="text-green-700"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        <div className="bg-green-200 h-2 rounded-full">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(step / 6) * 100}%` }}
          ></div>
        </div>
      </div>
      {renderStep()}
    </div>
    </>
  )
}