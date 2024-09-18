import React from 'react'
import { X, MessageSquare, ThumbsUp, MapPin, Calendar, Package } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

interface Trade {
  id: number
  type: string
  product: string
  quantity: string
  unit: string
  location: string
  status: string
  description: string
  postedBy: string
  postedDate: string
}

interface TradeDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  trade: Trade | null
}

export default function TradeDetailsModal({ isOpen, onClose, trade }: TradeDetailsModalProps) {
  if (!trade) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-green-50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-800 flex items-center justify-between">
            Trade Details
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-green-700">{trade.product}</h3>
            <Badge variant={trade.type === 'Offer' ? 'default' : 'secondary'}>
              {trade.type}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-green-600" />
              <span className='text-gray-800'>{trade.quantity} {trade.unit}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className='text-gray-800'>{trade.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className='text-gray-800'>{trade.postedDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={
                trade.status === 'Active' ? 'default' :
                trade.status === 'Pending' ? 'secondary' : 'outline'
              }>
                {trade.status}
              </Badge>
            </div>
          </div>
          <div className="bg-white p-4 rounded-md">
            <h4 className="font-semibold mb-2 text-green-700">Description</h4>
            <p className="text-sm text-gray-600">{trade.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${trade.postedBy}`} />
              <AvatarFallback>{trade.postedBy.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-gray-800 font-medium">{trade.postedBy}</p>
              <p className="text-xs text-gray-500">Trade Owner</p>
            </div>
          </div>
        </div>
        <DialogFooter className="sm:justify-start gap-2">
          <Button variant='outline' className="bg-white border border-green-500  text-green-400 hover:text-green-800 hover:border-green-800">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
          {trade.type === 'Offer' ? (
            <Link href='./confirmation' className="border inline-flex items-center py-2 justify-center px-4 rounded bg-green-600 border-green-600 text-white hover:bg-green-700">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Accept Offer
            </Link>
          ) : (
            <Link href='./confirmation' className="border inline-flex items-center py-2 justify-center px-4 rounded bg-green-600 border-green-600 text-white hover:bg-green-700">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Fulfill Request
            </Link>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}