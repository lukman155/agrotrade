'use client'

import React, { useState } from 'react'
import { Search, Plus, ArrowUpDown, Eye, Wheat, Tractor } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import TradeDetailsModal from './TradeDetailsModal'
import NewTradeModal from '@/components/NewTradeModal'
import NavBar from "@/components/NavBar";

type Trade = {
  id: number;
  type: string;
  product: string;
  quantity: string;
  unit: string;
  location: string;
  status: string;
  description: string;
  postedBy: string;
  postedDate: string;
};

// Mock data for trades
const mockTrades: Trade[] = [
  { id: 1, type: 'Offer', product: 'Maize', quantity: '500', unit: 'bags', location: 'Kano', status: 'Active', description: 'High-quality maize harvested this season. Suitable for food processing or animal feed.', postedBy: 'Bala Abdullahi', postedDate: '2023-06-15' },
  { id: 2, type: 'Request', product: 'Tractor', quantity: '1', unit: 'unit', location: 'Ogun', status: 'Pending', description: 'Looking for a used mid-size tractor in good condition. Preferably Massey Ferguson or similar.', postedBy: 'Funmi Adewale', postedDate: '2023-06-14' },
  { id: 3, type: 'Offer', product: 'Soybeans', quantity: '1000', unit: 'kg', location: 'Benue', status: 'Active', description: 'Organic soybeans available for immediate purchase. Non-GMO certified.', postedBy: 'Michael Ocheme', postedDate: '2023-06-13' },
  { id: 4, type: 'Request', product: 'Wheat', quantity: '200', unit: 'bags', location: 'Kaduna', status: 'Completed', description: 'Seeking high-protein wheat for bakery use. Must meet organic standards.', postedBy: 'Aisha Yusuf', postedDate: '2023-06-12' },
  { id: 5, type: 'Offer', product: 'Yam', quantity: '2000', unit: 'tubers', location: 'Enugu', status: 'Active', description: 'Fresh yam tubers, perfect for food markets or bulk buyers. Various sizes available.', postedBy: 'Ikenna Okafor', postedDate: '2023-06-11' },
];


export default function TradesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isNewTradeOpen, setIsNewTradeOpen] = useState(false)
  const [sortCriteria, setSortCriteria] = useState<{ field: keyof Trade; direction: 'asc' | 'desc' }>({ field: 'id', direction: 'asc' });
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  const filteredTrades = mockTrades.filter(trade => 
    (trade.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
     trade.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === 'all' || trade.type.toLowerCase() === filterType)
  );

  const sortedTrades = [...filteredTrades].sort((a, b) => {
    if (sortCriteria.field) {
      const field = sortCriteria.field;
      if (a[field] < b[field]) return sortCriteria.direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortCriteria.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (field: keyof Trade) => {
    setSortCriteria(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <>
    <NavBar />
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-4 md:p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Trades</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-green-600" />
          <Input 
            placeholder="Search trades..." 
            className="pl-8 bg-white text-green-800 placeholder-green-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4 w-full md:w-auto">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="bg-white text-green-800 w-full md:w-40">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="offer">Offers</SelectItem>
              <SelectItem value="request">Requests</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsNewTradeOpen(true)} className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Trade
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap justify-end space-x-2 gap-2">
        <Button variant="secondary" size="sm" onClick={() => handleSort('type')}>
          Sort by Type
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={() => handleSort('product')}>
          Sort by Product
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={() => handleSort('location')}>
          Sort by Location
          <ArrowUpDown className=" h-4 w-4" />
        </Button>
      </div>

      <div className="mb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTrades.map((trade) => (
          <Card key={trade.id} className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {trade.product}
              </CardTitle>
              <Badge variant={trade.type === 'Offer' ? 'default' : 'secondary'}>
                {trade.type}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                {trade.product.toLowerCase().includes('tractor') ? (
                  <Tractor className="h-4 w-4" />
                ) : (
                  <Wheat className="h-4 w-4" />
                )}
                <span>{trade.quantity} {trade.unit}</span>
              </div>
              <div className="text-sm text-muted-foreground mb-2">
                📍 {trade.location}
              </div>
              <Badge 
                variant={
                  trade.status === 'Active' ? 'default' :
                  trade.status === 'Pending' ? 'secondary' : 'outline'
                }
              >
                {trade.status}
              </Badge>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedTrade(trade)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <NewTradeModal 
        isOpen={isNewTradeOpen} 
        onClose={() => setIsNewTradeOpen(false)} 
      />

      <TradeDetailsModal
        isOpen={!!selectedTrade}
        onClose={() => setSelectedTrade(null)}
        trade={selectedTrade}
      />
    </div>
    </>
  )
}