"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Simple admin credentials - in a real app, use a proper auth system
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123"; // Change this in production!

interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  budget?: string;
  availability?: string;
  message: string;
  timestamp: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  
  // Authentication handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };
  
  // Check if user is already authenticated
  useEffect(() => {
    const isAuth = localStorage.getItem("admin_authenticated") === "true";
    if (isAuth) {
      setIsAuthenticated(true);
    }
  }, []);
  
  // Fetch submissions when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);
  
  // Fetch submissions from our API
  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/submissions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }
      
      const data = await response.json();
      setSubmissions(data.submissions || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      setError('Failed to load submissions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout handler
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-850 border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm text-gray-300">Username</label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-gray-300">Password</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Filtered submissions based on active tab
  const filteredSubmissions = submissions.filter(submission => {
    if (activeTab === "all") return true;
    
    const submissionDate = new Date(submission.timestamp);
    const today = new Date();
    
    if (activeTab === "today") {
      return submissionDate.toDateString() === today.toDateString();
    }
    
    if (activeTab === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(today.getDate() - 7);
      return submissionDate > weekAgo;
    }
    
    if (activeTab === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(today.getMonth() - 1);
      return submissionDate > monthAgo;
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Form Submissions</h1>
            <p className="text-gray-400 mt-1">View and manage website contact form submissions</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button 
              onClick={fetchSubmissions} 
              variant="outline"
              className="text-white border-gray-700 hover:bg-gray-800"
            >
              Refresh
            </Button>
            <Button 
              onClick={handleLogout}
              variant="destructive"
            >
              Logout
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="bg-gray-800 border border-gray-700">
            <TabsTrigger 
              value="all" 
              onClick={() => setActiveTab("all")}
              className={activeTab === "all" ? "bg-indigo-700" : ""}
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="today" 
              onClick={() => setActiveTab("today")}
              className={activeTab === "today" ? "bg-indigo-700" : ""}
            >
              Today
            </TabsTrigger>
            <TabsTrigger 
              value="week" 
              onClick={() => setActiveTab("week")}
              className={activeTab === "week" ? "bg-indigo-700" : ""}
            >
              This Week
            </TabsTrigger>
            <TabsTrigger 
              value="month" 
              onClick={() => setActiveTab("month")}
              className={activeTab === "month" ? "bg-indigo-700" : ""}
            >
              This Month
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-4">
            <Badge variant="outline" className="text-gray-300 border-gray-700">
              {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </Tabs>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : error ? (
          <Card className="bg-red-900/20 border-red-800 mb-4">
            <CardContent className="pt-6">
              <p className="text-red-300">{error}</p>
              <Button 
                onClick={fetchSubmissions} 
                variant="destructive" 
                className="mt-4"
              >
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : filteredSubmissions.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-12 w-12 text-gray-600 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="text-xl font-medium text-gray-300">No submissions found</h3>
              <p className="text-gray-500 mt-2 text-center max-w-md">
                There are no form submissions in this time period. Check back later or try a different filter.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
                <CardHeader className="bg-gray-800/70 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-white">{submission.name}</CardTitle>
                      <CardDescription className="text-indigo-400">
                        <a href={`mailto:${submission.email}`}>{submission.email}</a>
                        {submission.phone && (
                          <>
                            <span className="mx-2">•</span>
                            <a href={`tel:${submission.phone}`}>{submission.phone}</a>
                          </>
                        )}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600">
                      {formatDate(submission.timestamp)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {submission.budget && (
                      <div>
                        <h4 className="text-gray-400 text-sm font-medium mb-1">Budget</h4>
                        <p className="text-white">{submission.budget}</p>
                      </div>
                    )}
                    {submission.availability && (
                      <div>
                        <h4 className="text-gray-400 text-sm font-medium mb-1">Availability</h4>
                        <p className="text-white">{submission.availability}</p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-gray-400 text-sm font-medium mb-1">Message</h4>
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <p className="text-gray-300 whitespace-pre-line">{submission.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 