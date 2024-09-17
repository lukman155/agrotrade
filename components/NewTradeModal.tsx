'use client'

import React, { useState } from 'react'
import { ArrowLeftRight, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewTradeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [tradeType, setTradeType] = useState('offer')
  const [category, setCategory] = useState('')
  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState('')
  const [unit, setUnit] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    console.log({ tradeType, category, item, quantity, unit, description })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-green-50 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-green-800">New Trade</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <RadioGroup defaultValue="offer" onValueChange={setTradeType} className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="offer" id="offer" />
              <Label htmlFor="offer" className="text-green-700">{"I'm"} Offering</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="request" id="request" />
              <Label htmlFor="request" className="text-green-700">{"I'm"} Requesting</Label>
            </div>
          </RadioGroup>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-green-700">Category</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="bg-white text-green-800">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crops">Crops</SelectItem>
                <SelectItem value="livestock">Livestock</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="services">Services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="item" className="text-green-700">Item or Service</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-green-600" />
              <Input 
                id="item" 
                placeholder="Search for item or service" 
                className="pl-8 bg-white text-green-800 placeholder-green-400" 
                value={item} 
                onChange={(e) => setItem(e.target.value)} 
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="quantity" className="text-green-700">Quantity</Label>
              <Input 
                id="quantity" 
                type="number" 
                placeholder="Amount" 
                className="bg-white text-green-800 placeholder-green-400" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="unit" className="text-green-700">Unit</Label>
              <Select onValueChange={setUnit}>
                <SelectTrigger className="bg-white text-green-800">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="bushel">Bushels</SelectItem>
                  <SelectItem value="hour">Hours</SelectItem>
                  <SelectItem value="piece">Pieces</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-green-700">Description (Optional)</Label>
            <Input 
              id="description" 
              placeholder="Add more details about your trade" 
              className="bg-white text-green-800 placeholder-green-400" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
              <ArrowLeftRight className="mr-2 h-4 w-4" />
              Create Trade
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}