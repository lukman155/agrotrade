'use client'

import React, { useState } from 'react'
import { ComposableMap, Geographies, Geography, Annotation } from 'react-simple-maps'
import { scaleQuantile } from 'd3-scale'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wheat, Coffee, Leaf } from 'lucide-react'
import ngGeoJson from './ng.json'
import NavBar from "@/components/NavBar";

type PriceDataEntry = { state: string; price: number; coordinates: [number, number] };

const priceData: Record<'rice' | 'cocoa' | 'cassava', PriceDataEntry[]> = {
  rice: [
    { state: "Lagos", price: 650, coordinates: [3.4, 6.45] },
    { state: "Kano", price: 600, coordinates: [8.5, 12] },
    { state: "Ebonyi", price: 580, coordinates: [8.1, 6.2] },
    { state: "Kebbi", price: 620, coordinates: [4.2, 12.45] },
    { state: "Benue", price: 590, coordinates: [8.8, 7.7] },
    { state: "Niger", price: 610, coordinates: [6.2, 9.6] },
    { state: "Federal Capital Territory", price: 630, coordinates: [7.5, 9] },
  ],
  cocoa: [
    { state: "Ondo", price: 1200, coordinates: [4.8, 7.1] },
    { state: "Ogun", price: 1180, coordinates: [3.35, 7] },
    { state: "Osun", price: 1220, coordinates: [4.5, 7.5] },
    { state: "Cross River", price: 1190, coordinates: [8.3, 5.8] },
    { state: "Edo", price: 1210, coordinates: [5.6, 6.3] },
    { state: "Niger", price: 1150, coordinates: [6.2, 9.6] },
    { state: "Federal Capital Territory", price: 1170, coordinates: [7.5, 9] },
  ],
  cassava: [
    { state: "Benue", price: 180, coordinates: [8.8, 7.7] },
    { state: "Kogi", price: 170, coordinates: [6.7, 7.8] },
    { state: "Oyo", price: 190, coordinates: [3.9, 8.1] },
    { state: "Anambra", price: 175, coordinates: [7, 6.2] },
    { state: "Delta", price: 185, coordinates: [5.7, 5.9] },
    { state: "Niger", price: 178, coordinates: [6.2, 9.6] },
    { state: "Federal Capital Territory", price: 182, coordinates: [7.5, 9] },
  ]
}

const products = [
  { value: "rice", label: "Rice", icon: Wheat },
  { value: "cocoa", label: "Cocoa", icon: Coffee },
  { value: "cassava", label: "Cassava", icon: Leaf },
]

const colorScale = [
  "#e6f598",
  "#d9ef8b",
  "#ffffbf",
  "#fee08b",
  "#fdae61",
  "#f46d43",
  "#d53e4f"
]

export default function PriceMap() {
  const [selectedProduct, setSelectedProduct] = useState<keyof typeof priceData>("rice")

  const data = priceData[selectedProduct]
  const colorScaleFunc = scaleQuantile<string>()
    .domain(data.map(d => d.price))
    .range(colorScale)

  return (
    <>
    <NavBar />
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 p-4 md:p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Nigeria Price Map</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-green-700">Select Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedProduct} onValueChange={(value) => setSelectedProduct(value as keyof typeof priceData)}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select a product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.value} value={product.value}>
                  <div className="flex items-center">
                    <product.icon className="mr-2 h-4 w-4" />
                    {product.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 2500,
              center: [8, 9]
            }}
            className="w-full h-[400px] md:h-[600px]"
          >
            <Geographies geography={ngGeoJson}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateData = data.find(d => d.state === geo.properties.name)
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={stateData ? colorScaleFunc(stateData.price) : "#EEE"}
                      stroke="#FFF"
                      strokeWidth={0.5}
                    />
                  )
                })
              }
            </Geographies>
            {data.map((d) => (
              <Annotation
                key={d.state}
                subject={d.coordinates}
                dx={0}
                dy={0}
                connectorProps={{}}
              >
                <text
                  x={4}
                  y={4}
                  fontSize={14}
                  alignmentBaseline="middle"
                  fill="#000"
                >
                  {d.state}
                </text>
                <text
                  x={4}
                  y={18}
                  fontSize={13}
                  fontWeight="bold"
                  alignmentBaseline="middle"
                  fill="#000"
                >
                  ₦{d.price}
                </text>
              </Annotation>
            ))}
          </ComposableMap>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-green-700">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Lower Price</span>
            <div className="flex">
              {colorScale.map((color, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: color }}
                  className="w-8 h-4"
                ></div>
              ))}
            </div>
            <span className="text-sm text-gray-600">Higher Price</span>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 mb-20">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-green-700">Price Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-2">
            Prices are in Nigerian Naira (₦) per tier for rice and cassava, and per kilogram for cocoa.
          </p>
          <p className="text-sm text-gray-600">
            These prices are estimates and may vary based on quality, quantity, and specific location within each state.
          </p>
        </CardContent>
      </Card>
    </div>
    </>
  )
}