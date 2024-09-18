import React from 'react'
import { ArrowLeft, Star, Award, Repeat, Settings, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

export default function ReputationProfile() {
  return (
    <div className="pb-10 min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-4 md:p-6">
      <header className="flex items-center mb-6">
        <Link href={'/'} className="mr-4 p-3 bg-green-200 hover:bg-white rounded-full">
          <ArrowLeft className="h-6 w-6 text-green-700" />
        </Link>
        <h1 className="text-2xl font-bold text-green-800">Reputation & Profile</h1>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-6 w-6 text-yellow-500 mr-2" />
            Trust Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-3xl font-bold">4.8</span>
            <Badge variant="secondary">Top 10%</Badge>
          </div>
          <Progress value={96} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">Based on 50 successful trades</p>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-6 w-6 text-green-600 mr-2" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Badge className="h-16 w-16 rounded-full flex items-center justify-center bg-yellow-100 text-yellow-700">
              <Star className="h-8 w-8" />
            </Badge>
            <Badge className="h-16 w-16 rounded-full flex items-center justify-center bg-green-100 text-green-700">
              <Repeat className="h-8 w-8" />
            </Badge>
            <Badge className="h-16 w-16 rounded-full flex items-center justify-center bg-blue-100 text-blue-700">
              <Award className="h-8 w-8" />
            </Badge>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Tap on a badge to see details
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { partner: "Funmi", item: "10 kg tomatoes", date: "2023-06-15" },
              { partner: "Bala", item: "Tractor rental", date: "2023-06-10" },
              { partner: "Aisha", item: "5 kg yam tubers", date: "2023-06-05" },
            ]
            .map((trade, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{trade.partner}</p>
                  <p className="text-sm text-muted-foreground">{trade.item}</p>
                </div>
                <span className="text-sm text-muted-foreground">{trade.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <Avatar className="h-20 w-20 mr-4">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback>BA</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-bold">Bala Ahmed</h2>
              <p className="text-sm text-muted-foreground">Maize & Yam Farmer</p>
            </div>
          </div>
          {[
            { label: "Location", value: "Kaduna, Nigeria" },
            { label: "Member Since", value: "March 2021" },
            { label: "Total Trades", value: "35" },
            { label: "Preferred Crops", value: "Maize, Yam" },
          ].map((item, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </CardContent>

      </Card>

      <Button variant="secondary" className="w-full mt-6 mb-16 flex justify-between items-center">
        <Settings className="h-5 w-5 mr-2" />
        <span>Account Settings</span>
        <ChevronRight className="h-5 w-5 ml-2" />
      </Button>
    </div>
  )
}