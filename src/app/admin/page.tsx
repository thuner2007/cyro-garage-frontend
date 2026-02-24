"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-lg text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-300">
              Welcome,{" "}
              <span className="font-semibold text-white">{user.username}</span>
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                {user.role}
              </span>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Items</CardTitle>
              <CardDescription className="text-gray-400">
                Manage items and customization options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => router.push("/admin/items")}
              >
                Manage Items
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Orders</CardTitle>
              <CardDescription className="text-gray-400">
                View and manage customer orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                View Orders
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Customers</CardTitle>
              <CardDescription className="text-gray-400">
                Manage customer information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                View Customers
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Services</CardTitle>
              <CardDescription className="text-gray-400">
                Manage service offerings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                View Services
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Gallery</CardTitle>
              <CardDescription className="text-gray-400">
                Manage images and portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                View Gallery
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Configure site settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                View Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* User Info Section */}
        <Card className="mt-8 bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Session Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">User ID:</span>
                <span className="text-gray-100">{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Username:</span>
                <span className="text-gray-100">{user.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Role:</span>
                <span className="text-gray-100">{user.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-300">Token Status:</span>
                <span className="text-green-400">Active (7 days validity)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
