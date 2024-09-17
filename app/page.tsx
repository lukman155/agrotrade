'use client'

import React, { useState } from 'react'
import { Bell, Search, PlusCircle, Map, DollarSign, } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NewTradeModal from '@/components/NewTradeModal'
import SubmitPriceModal from '@/components/SubmitPriceModal'
import Link from 'next/link'

export default function Dashboard() {
  const [isNewTradeOpen, setIsNewTradeOpen] = useState(false);
  const [isSubmitPriceOpen, setIsSubmitPriceOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-4 md:p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-800">AgroTrade</h1>
        <Button variant="ghost" size="icon">
          <Bell className="h-6 w-6 text-green-700" />
        </Button>
      </header>

      <Card className="mb-6">

        <CardHeader>
          <CardTitle>Quick Trade Summary</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Active Trades</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Trade Tokens</p>
            <p className="text-2xl font-bold">250</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Completed Trades</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Latest Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span>Corn</span>
            <Badge variant="secondary">↑ $3.50/bushel</Badge>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span>Wheat</span>
            <Badge variant="secondary">↓ $5.20/bushel</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Soybeans</span>
            <Badge variant="secondary">→ $9.80/bushel</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        
        <Link href={'/trades'} className="rounded-[7px] h-24 flex flex-col items-center justify-center bg-green-600 hover:bg-green-700">
          <Search className="h-8 w-8 mb-2" />
          <span>Find Trades</span>
        </Link>

        <Button onClick={() => setIsNewTradeOpen(true)} className="h-24 flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700">
          <PlusCircle className="h-8 w-8 mb-2" />
          <span>New Trade</span>
        </Button>
        <NewTradeModal
        isOpen={isNewTradeOpen} 
        onClose={() => setIsNewTradeOpen(false)} 
      />
        <Button className="h-24 flex flex-col items-center justify-center bg-yellow-600 hover:bg-yellow-700">
          <Map className="h-8 w-8 mb-2" />
          <span>Price Map</span>
        </Button>

        <Button onClick={() => setIsSubmitPriceOpen(true)} className="h-24 flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700">
          <DollarSign className="h-8 w-8 mb-2" />
          <span>Submit Price</span>
        </Button>
        <SubmitPriceModal 
          isOpen={isSubmitPriceOpen} 
          onClose={() => setIsSubmitPriceOpen(false)} 
        />

      </div>

      <Card className="mb-20">
        <CardHeader>
          <CardTitle>Active Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Trade with John</p>
                <p className="text-sm text-muted-foreground">5 bushels of corn for 2 hours of tractor use</p>
              </div>
              <Badge>Pending</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Trade with Sarah</p>
                <p className="text-sm text-muted-foreground">10 kg of tomatoes for 5 kg of potatoes</p>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}