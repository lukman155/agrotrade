'use client'

import React, { useState } from 'react'
import { DollarSign, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SubmitPriceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [product, setProduct] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('')
  const [location, setLocation] = useState('')
  const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    try {
      // Simulating an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulating a successful response
      setAlert({ type: 'success', message: 'Price submitted successfully! Thank you for contributing.' })
      
      // Reset form after successful submission
      setProduct('')
      setPrice('')
      setUnit('')
      setLocation('')
      
      // Close the popup after a delay
      setTimeout(() => {
        onClose()
        setAlert(null)
      }, 2000)
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to submit price. Please try again.' })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-green-50 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-green-800">Submit Price Data</DialogTitle>
        </DialogHeader>
        {alert && (
          <Alert variant={alert.type === 'success' ? 'default' : 'destructive'} className="mb-4">
            {alert.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>{alert.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product" className="text-green-700">Product</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger className="bg-white text-green-800">
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="soybeans">Soybeans</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="potatoes">Potatoes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-green-700">Price</Label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-green-600" />
              <Input 
                id="price" 
                type="number"
                step="0.01"
                placeholder="Enter price" 
                className="pl-8 bg-white text-green-800 placeholder-green-400" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit" className="text-green-700">Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="bg-white text-green-800">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                <SelectItem value="bushel">Bushels</SelectItem>
                <SelectItem value="ton">Tons</SelectItem>
                <SelectItem value="pound">Pounds (lb)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-green-700 flex items-center">
              Location
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 ml-2 text-green-600 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Enter your general location (e.g., county or region)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Input 
              id="location" 
              placeholder="Enter your location" 
              className="bg-white text-green-800 placeholder-green-400" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              <DollarSign className="mr-2 h-4 w-4" />
              Submit Price
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}