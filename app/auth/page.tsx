'use client'

import { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { auth } from '../firebaseConfig'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Loader2 } from 'lucide-react'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      
      await createUserWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (error) {
      setError((error as Error).message)
      console.error('Error registering:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/')
    } catch (error) {
      setError((error as Error).message)
      console.error('Error logging in:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url('./images/auth.jpg')"}}>
      <div className="w-full max-w-md px-4">
        <div className="flex justify-center mb-8">
        </div>
        <Card className="w-full backdrop-blur-sm bg-white/30 border-grey-100">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-green-800">AgroTrade</CardTitle>
            <CardDescription className="text-slate-600">
              Trading grains for the best gains
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-8">
               <TabsTrigger value="login" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">Login</TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800">Register</TabsTrigger></TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-green-800 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/80 border-green-300 focus:border-green-500 focus:ring-green-500"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-green-800 flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Password
                    </Label>
                    <Input 
                      id="login-password" 
                      type="password" 
                      required 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/80 border-green-300 focus:border-green-500 focus:ring-green-500"
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Logging in...
                      </>
                    ) : (
                      'Login to Your Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-green-800 flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Label>
                    <Input 
                      id="register-email" 
                      type="email" 
                      required 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/80 border-green-300 focus:border-green-500 focus:ring-green-500"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-green-800 flex items-center">
                      <Lock className="h-4 w-4 mr-2" />
                      Password
                    </Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      required 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/80 border-green-300 focus:border-green-500 focus:ring-green-500"
                      disabled={isLoading}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Your Account'
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        {error && (
          <p className="mt-4 text-center text-red-600 bg-red-100 border border-red-200 rounded-md p-2">
            {error}
          </p>
        )}
      </div>
    </section>
  )
}