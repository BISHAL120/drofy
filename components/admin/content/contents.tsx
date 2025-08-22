"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Eye, Home, ImageIcon, Info, Layout, Plus, Search, ShoppingBag, Star, Trash2, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Mock data for different content types
const contentSections = {
  hero: [
    {
      id: "HERO-001",
      title: "ড্রপশিপিং ও রিসেলিং সেবা, ব্যবসার সহজ সমাধান",
      subtitle: "রিস্টক বিডি বাংলাদেশের সর্ববৃহৎ একটি ড্রপশিপিং এবং রিসেলিং প্ল্যাটফর্ম।",
      description:
        "কোন প্রকার পুঁজি বা ইনভেস্টমেন্ট ছাড়াই ঘরে বসে অনলাইন ক্যাটেগরির প্রায় দশ হাজারেরও বেশি প্রোডাক্ট নিয়ে বিজনেস করতে পারবেন।",
      primaryButton: "Shop Now",
      secondaryButton: "View Categories",
      image: "/placeholder.svg?height=400&width=600",
      page: "home",
      position: "hero",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "HERO-002",
      title: "About Our Company",
      subtitle: "Leading E-commerce Platform in Bangladesh",
      description: "We provide comprehensive dropshipping and reselling solutions for entrepreneurs.",
      primaryButton: "Learn More",
      secondaryButton: "Contact Us",
      image: "/placeholder.svg?height=400&width=600",
      page: "about",
      position: "hero",
      status: "active",
      createdAt: "2024-01-14",
    },
  ],
  banners: [
    {
      id: "BANNER-001",
      title: "Special Offer",
      description: "Get 50% off on all electronics",
      image: "/placeholder.svg?height=200&width=800",
      page: "home",
      position: "top",
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: "BANNER-002",
      title: "New Arrivals",
      description: "Check out our latest products",
      image: "/placeholder.svg?height=200&width=800",
      page: "products",
      position: "header",
      status: "active",
      createdAt: "2024-01-14",
    },
  ],
  features: [
    {
      id: "FEATURE-001",
      title: "রিস্টক রিসেলার-প্রেস",
      subtitle: "৬৪ জেলার অনলাইন উদ্যোক্তার স্বপ্ন পূরণের পাশে আছে রিস্টক বিডি",
      buttonText: "JOIN NOW",
      websiteUrl: "www.restockbd.com",
      description: "কোন রকম পুঁজি বা ইনভেস্ট ছাড়াই বিজনেস করুন রিস্টক বিডি'র মাধ্যমে!",
      image: "/placeholder.svg?height=300&width=400",
      page: "home",
      position: "features",
      status: "active",
      createdAt: "2024-01-15",
    },
  ],
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-red-100 text-red-800"
    case "draft":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPageIcon = (page: string) => {
  switch (page) {
    case "home":
      return <Home className="h-4 w-4" />
    case "about":
      return <Info className="h-4 w-4" />
    case "products":
      return <ShoppingBag className="h-4 w-4" />
    case "resellers":
      return <Users className="h-4 w-4" />
    default:
      return <Layout className="h-4 w-4" />
  }
}

export default function ContentManagementPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPage, setSelectedPage] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Content Management</h2>
            <p className="text-muted-foreground">Manage banners, hero sections, and featured content</p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/content/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Content
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pages</SelectItem>
                  <SelectItem value="home">Home Page</SelectItem>
                  <SelectItem value="about">About Page</SelectItem>
                  <SelectItem value="products">Products Page</SelectItem>
                  <SelectItem value="resellers">Resellers Page</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hero">Hero Sections</TabsTrigger>
            <TabsTrigger value="banners">Banners</TabsTrigger>
            <TabsTrigger value="features">Feature Cards</TabsTrigger>
          </TabsList>

          {/* Hero Sections */}
          <TabsContent value="hero" className="space-y-4">
            <div className="grid gap-6">
              {contentSections.hero.map((hero) => (
                <Card key={hero.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getPageIcon(hero.page)}
                            <Badge variant="outline">{hero.page}</Badge>
                            <Badge className={getStatusColor(hero.status)}>{hero.status}</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Link href={`/content/edit/${hero.id}`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{hero.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{hero.subtitle}</p>
                          <p className="text-xs text-muted-foreground line-clamp-3">{hero.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge variant="secondary">{hero.primaryButton}</Badge>
                          <Badge variant="outline">{hero.secondaryButton}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Created: {hero.createdAt} • Position: {hero.position}
                        </div>
                      </div>
                      <div className="relative h-64 md:h-auto">
                        <Image src={hero.image || "/placeholder.svg"} alt={hero.title} fill className="object-cover" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Banners */}
          <TabsContent value="banners" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {contentSections.banners.map((banner) => (
                <Card key={banner.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src={banner.image || "/placeholder.svg"}
                        alt={banner.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-xl font-bold mb-2">{banner.title}</h3>
                          <p className="text-sm">{banner.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getPageIcon(banner.page)}
                          <Badge variant="outline">{banner.page}</Badge>
                          <Badge className={getStatusColor(banner.status)}>{banner.status}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Link href={`/content/edit/${banner.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Created: {banner.createdAt} • Position: {banner.position}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Feature Cards */}
          <TabsContent value="features" className="space-y-4">
            <div className="grid gap-6">
              {contentSections.features.map((feature) => (
                <Card key={feature.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {getPageIcon(feature.page)}
                            <Badge variant="outline">{feature.page}</Badge>
                            <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Link href={`/content/edit/${feature.id}`}>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-orange-600">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{feature.subtitle}</p>
                          <div className="space-y-2">
                            <Badge className="bg-orange-500 hover:bg-orange-600">{feature.buttonText}</Badge>
                            <p className="text-sm font-medium">{feature.websiteUrl}</p>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Created: {feature.createdAt} • Position: {feature.position}
                        </div>
                      </div>
                      <div className="relative h-64 md:h-auto">
                        <Image
                          src={feature.image || "/placeholder.svg"}
                          alt={feature.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Content</CardTitle>
              <Layout className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {contentSections.hero.length + contentSections.banners.length + contentSections.features.length}
              </div>
              <p className="text-xs text-muted-foreground">Across all pages</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hero Sections</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contentSections.hero.length}</div>
              <p className="text-xs text-muted-foreground">Active hero sections</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Banners</CardTitle>
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contentSections.banners.length}</div>
              <p className="text-xs text-muted-foreground">Promotional banners</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feature Cards</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{contentSections.features.length}</div>
              <p className="text-xs text-muted-foreground">Feature sections</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
