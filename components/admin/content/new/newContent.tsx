"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Eye, Plus, Upload, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

interface ContentFormData {
  type: string
  title: string
  subtitle?: string
  description?: string
  primaryButton?: string
  secondaryButton?: string
  buttonText?: string
  websiteUrl?: string
  page: string
  position: string
  status: string
  isActive: boolean
  primaryButtonUrl?: string
  primaryButtonBg?: string
  primaryButtonText?: string
  primaryButtonSize?: number
  primaryButtonWeight?: string
  primaryButtonMarginX?: number
  primaryButtonMarginY?: number
  primaryButtonPaddingX?: number
  primaryButtonPaddingY?: number
  secondaryButtonUrl?: string
  secondaryButtonBg?: string
  secondaryButtonText?: string
  secondaryButtonSize?: number
  secondaryButtonWeight?: string
  secondaryButtonMarginX?: number
  secondaryButtonMarginY?: number
  secondaryButtonPaddingX?: number
  secondaryButtonPaddingY?: number
  buttonUrl?: string
  featureButtonBg?: string
  featureButtonText?: string
  featureButtonSize?: number
  featureButtonWeight?: string
  featureButtonMarginX?: number
  featureButtonMarginY?: number
  featureButtonPaddingX?: number
  featureButtonPaddingY?: number
  primaryButtonRadius?: number
  secondaryButtonRadius?: number
  featureButtonRadius?: number
}

export default function NewContentPage() {
  const [contentType, setContentType] = useState("hero")
  const [contentImage, setContentImage] = useState<string>("")
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ContentFormData>({
    defaultValues: {
      type: "hero",
      status: "active",
      isActive: true,
    },
  })

  const watchedPage = watch("page")

  const onSubmit = (data: ContentFormData) => {
    console.log("Content data:", { ...data, image: contentImage })
    
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setContentImage(imageUrl)
    }
  }

  const removeImage = () => {
    setContentImage("")
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center space-x-4">
          <Link href="/content">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Content
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Create New Content</h2>
            <p className="text-muted-foreground">Add a new banner, hero section, or feature card</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Content Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Type</CardTitle>
                  <CardDescription>Choose the type of content you want to create</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs
                    value={contentType}
                    onValueChange={(value) => {
                      setContentType(value)
                      setValue("type", value)
                    }}
                  >
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="hero">Hero Section</TabsTrigger>
                      <TabsTrigger value="banner">Banner</TabsTrigger>
                      <TabsTrigger value="feature">Feature Card</TabsTrigger>
                    </TabsList>

                    {/* Hero Section Form */}
                    <TabsContent value="hero" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Main Title *</Label>
                        <Input
                          id="title"
                          {...register("title", { required: "Title is required" })}
                          placeholder="Enter hero title"
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subtitle">Subtitle</Label>
                        <Input id="subtitle" {...register("subtitle")} placeholder="Enter hero subtitle" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          {...register("description")}
                          placeholder="Enter hero description"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-6">
                        {/* Primary Button Section */}
                        <div className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">Primary Button</h4>
                            {/* Primary Button Preview */}
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">Preview:</span>
                              <button
                                type="button"
                                className="rounded-md text-sm transition-colors"
                                style={{
                                  backgroundColor: watch("primaryButtonBg") || "#8B5CF6",
                                  color: watch("primaryButtonText") || "#FFFFFF",
                                  fontSize: watch("primaryButtonSize") ? `${watch("primaryButtonSize")}px` : "16px",
                                  fontWeight: watch("primaryButtonWeight") || "500",
                                  marginLeft: watch("primaryButtonMarginX")
                                    ? `${watch("primaryButtonMarginX")}px`
                                    : "0px",
                                  marginRight: watch("primaryButtonMarginX")
                                    ? `${watch("primaryButtonMarginX")}px`
                                    : "0px",
                                  marginTop: watch("primaryButtonMarginY")
                                    ? `${watch("primaryButtonMarginY")}px`
                                    : "0px",
                                  marginBottom: watch("primaryButtonMarginY")
                                    ? `${watch("primaryButtonMarginY")}px`
                                    : "0px",
                                  paddingLeft: watch("primaryButtonPaddingX")
                                    ? `${watch("primaryButtonPaddingX")}px`
                                    : "16px",
                                  paddingRight: watch("primaryButtonPaddingX")
                                    ? `${watch("primaryButtonPaddingX")}px`
                                    : "16px",
                                  paddingTop: watch("primaryButtonPaddingY")
                                    ? `${watch("primaryButtonPaddingY")}px`
                                    : "8px",
                                  paddingBottom: watch("primaryButtonPaddingY")
                                    ? `${watch("primaryButtonPaddingY")}px`
                                    : "8px",
                                  borderRadius: watch("primaryButtonRadius")
                                    ? `${watch("primaryButtonRadius")}px`
                                    : "6px",
                                }}
                              >
                                {watch("primaryButton") || "Shop Now"}
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="primaryButton">Button Text</Label>
                              <Input id="primaryButton" {...register("primaryButton")} placeholder="e.g., Shop Now" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="primaryButtonUrl">Button URL</Label>
                              <Input
                                id="primaryButtonUrl"
                                {...register("primaryButtonUrl")}
                                placeholder="e.g., /shop"
                              />
                            </div>
                          </div>

                          {/* Primary Button Styling */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="primaryButtonBg">Background Color</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="primaryButtonBg"
                                  {...register("primaryButtonBg")}
                                  placeholder="#8B5CF6"
                                  className="flex-1"
                                />
                                <input
                                  type="color"
                                  {...register("primaryButtonBg")}
                                  className="w-12 h-10 rounded border cursor-pointer"
                                  defaultValue="#8B5CF6"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="primaryButtonText">Text Color</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="primaryButtonText"
                                  {...register("primaryButtonText")}
                                  placeholder="#FFFFFF"
                                  className="flex-1"
                                />
                                <input
                                  type="color"
                                  {...register("primaryButtonText")}
                                  className="w-12 h-10 rounded border cursor-pointer"
                                  defaultValue="#FFFFFF"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="primaryButtonSize">Font Size (px)</Label>
                              <Input
                                id="primaryButtonSize"
                                type="number"
                                {...register("primaryButtonSize")}
                                placeholder="16"
                                min="12"
                                max="24"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="primaryButtonWeight">Font Weight</Label>
                              <Select onValueChange={(value) => setValue("primaryButtonWeight", value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select weight" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="300">Light (300)</SelectItem>
                                  <SelectItem value="400">Normal (400)</SelectItem>
                                  <SelectItem value="500">Medium (500)</SelectItem>
                                  <SelectItem value="600">Semibold (600)</SelectItem>
                                  <SelectItem value="700">Bold (700)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="primaryButtonMarginX">Margin X (px)</Label>
                              <Input
                                id="primaryButtonMarginX"
                                type="number"
                                {...register("primaryButtonMarginX")}
                                placeholder="0"
                                min="0"
                                max="50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="primaryButtonMarginY">Margin Y (px)</Label>
                              <Input
                                id="primaryButtonMarginY"
                                type="number"
                                {...register("primaryButtonMarginY")}
                                placeholder="0"
                                min="0"
                                max="50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="primaryButtonPaddingX">Padding X (px)</Label>
                              <Input
                                id="primaryButtonPaddingX"
                                type="number"
                                {...register("primaryButtonPaddingX")}
                                placeholder="16"
                                min="8"
                                max="32"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="primaryButtonPaddingY">Padding Y (px)</Label>
                              <Input
                                id="primaryButtonPaddingY"
                                type="number"
                                {...register("primaryButtonPaddingY")}
                                placeholder="8"
                                min="4"
                                max="20"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="primaryButtonRadius">Border Radius (px)</Label>
                              <Input
                                id="primaryButtonRadius"
                                type="number"
                                {...register("primaryButtonRadius")}
                                placeholder="6"
                                min="0"
                                max="50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-muted-foreground text-sm">Preview Updates Live</Label>
                              <div className="text-xs text-muted-foreground">0px = Square, 50px = Fully Rounded</div>
                            </div>
                          </div>
                        </div>

                        {/* Secondary Button Section */}
                        <div className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">Secondary Button</h4>
                            {/* Secondary Button Preview */}
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">Preview:</span>
                              <button
                                type="button"
                                className="rounded-md text-sm border transition-colors"
                                style={{
                                  backgroundColor: watch("secondaryButtonBg") || "transparent",
                                  color: watch("secondaryButtonText") || "#000000",
                                  fontSize: watch("secondaryButtonSize") ? `${watch("secondaryButtonSize")}px` : "16px",
                                  fontWeight: watch("secondaryButtonWeight") || "500",
                                  borderColor: watch("secondaryButtonText") || "#000000",
                                  marginLeft: watch("secondaryButtonMarginX")
                                    ? `${watch("secondaryButtonMarginX")}px`
                                    : "0px",
                                  marginRight: watch("secondaryButtonMarginX")
                                    ? `${watch("secondaryButtonMarginX")}px`
                                    : "0px",
                                  marginTop: watch("secondaryButtonMarginY")
                                    ? `${watch("secondaryButtonMarginY")}px`
                                    : "0px",
                                  marginBottom: watch("secondaryButtonMarginY")
                                    ? `${watch("secondaryButtonMarginY")}px`
                                    : "0px",
                                  paddingLeft: watch("secondaryButtonPaddingX")
                                    ? `${watch("secondaryButtonPaddingX")}px`
                                    : "16px",
                                  paddingRight: watch("secondaryButtonPaddingX")
                                    ? `${watch("secondaryButtonPaddingX")}px`
                                    : "16px",
                                  paddingTop: watch("secondaryButtonPaddingY")
                                    ? `${watch("secondaryButtonPaddingY")}px`
                                    : "8px",
                                  paddingBottom: watch("secondaryButtonPaddingY")
                                    ? `${watch("secondaryButtonPaddingY")}px`
                                    : "8px",
                                  borderRadius: watch("secondaryButtonRadius")
                                    ? `${watch("secondaryButtonRadius")}px`
                                    : "6px",
                                }}
                              >
                                {watch("secondaryButton") || "View Categories"}
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButton">Button Text</Label>
                              <Input
                                id="secondaryButton"
                                {...register("secondaryButton")}
                                placeholder="e.g., View Categories"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButtonUrl">Button URL</Label>
                              <Input
                                id="secondaryButtonUrl"
                                {...register("secondaryButtonUrl")}
                                placeholder="e.g., /categories"
                              />
                            </div>
                          </div>

                          {/* Secondary Button Styling */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButtonBg">Background Color</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="secondaryButtonBg"
                                  {...register("secondaryButtonBg")}
                                  placeholder="transparent"
                                  className="flex-1"
                                />
                                <input
                                  type="color"
                                  {...register("secondaryButtonBg")}
                                  className="w-12 h-10 rounded border cursor-pointer"
                                  defaultValue="#FFFFFF"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButtonText">Text Color</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="secondaryButtonText"
                                  {...register("secondaryButtonText")}
                                  placeholder="#000000"
                                  className="flex-1"
                                />
                                <input
                                  type="color"
                                  {...register("secondaryButtonText")}
                                  className="w-12 h-10 rounded border cursor-pointer"
                                  defaultValue="#000000"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButtonSize">Font Size (px)</Label>
                              <Input
                                id="secondaryButtonSize"
                                type="number"
                                {...register("secondaryButtonSize")}
                                placeholder="16"
                                min="12"
                                max="24"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButtonWeight">Font Weight</Label>
                              <Select onValueChange={(value) => setValue("secondaryButtonWeight", value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select weight" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="300">Light (300)</SelectItem>
                                  <SelectItem value="400">Normal (400)</SelectItem>
                                  <SelectItem value="500">Medium (500)</SelectItem>
                                  <SelectItem value="600">Semibold (600)</SelectItem>
                                  <SelectItem value="700">Bold (700)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButtonMarginX">Margin X (px)</Label>
                              <Input
                                id="secondaryButtonMarginX"
                                type="number"
                                {...register("secondaryButtonMarginX")}
                                placeholder="0"
                                min="0"
                                max="50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButtonMarginY">Margin Y (px)</Label>
                              <Input
                                id="secondaryButtonMarginY"
                                type="number"
                                {...register("secondaryButtonMarginY")}
                                placeholder="0"
                                min="0"
                                max="50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButtonPaddingX">Padding X (px)</Label>
                              <Input
                                id="secondaryButtonPaddingX"
                                type="number"
                                {...register("secondaryButtonPaddingX")}
                                placeholder="16"
                                min="8"
                                max="32"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButtonPaddingY">Padding Y (px)</Label>
                              <Input
                                id="secondaryButtonPaddingY"
                                type="number"
                                {...register("secondaryButtonPaddingY")}
                                placeholder="8"
                                min="4"
                                max="20"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="secondaryButtonRadius">Border Radius (px)</Label>
                              <Input
                                id="secondaryButtonRadius"
                                type="number"
                                {...register("secondaryButtonRadius")}
                                placeholder="6"
                                min="0"
                                max="50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-muted-foreground text-sm">Preview Updates Live</Label>
                              <div className="text-xs text-muted-foreground">0px = Square, 50px = Fully Rounded</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Banner Form */}
                    <TabsContent value="banner" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Banner Title *</Label>
                        <Input
                          id="title"
                          {...register("title", { required: "Title is required" })}
                          placeholder="Enter banner title"
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Banner Description</Label>
                        <Textarea
                          id="description"
                          {...register("description")}
                          placeholder="Enter banner description"
                          rows={3}
                        />
                      </div>
                    </TabsContent>

                    {/* Feature Card Form */}
                    <TabsContent value="feature" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Feature Title *</Label>
                        <Input
                          id="title"
                          {...register("title", { required: "Title is required" })}
                          placeholder="Enter feature title"
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subtitle">Feature Subtitle</Label>
                        <Input id="subtitle" {...register("subtitle")} placeholder="Enter feature subtitle" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Feature Description</Label>
                        <Textarea
                          id="description"
                          {...register("description")}
                          placeholder="Enter feature description"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="buttonText">Button Text</Label>
                            <Input id="buttonText" {...register("buttonText")} placeholder="e.g., JOIN NOW" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="buttonUrl">Button URL</Label>
                            <Input id="buttonUrl" {...register("buttonUrl")} placeholder="e.g., /join" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="websiteUrl">Website URL (Display)</Label>
                          <Input id="websiteUrl" {...register("websiteUrl")} placeholder="e.g., www.example.com" />
                        </div>

                        {/* Feature Button Styling */}
                        <div className="border rounded-lg p-4 space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">Button Styling</h4>
                            {/* Feature Button Preview */}
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">Preview:</span>
                              <button
                                type="button"
                                className="rounded-md text-sm transition-colors"
                                style={{
                                  backgroundColor: watch("featureButtonBg") || "#F97316",
                                  color: watch("featureButtonText") || "#FFFFFF",
                                  fontSize: watch("featureButtonSize") ? `${watch("featureButtonSize")}px` : "14px",
                                  fontWeight: watch("featureButtonWeight") || "600",
                                  marginLeft: watch("featureButtonMarginX")
                                    ? `${watch("featureButtonMarginX")}px`
                                    : "0px",
                                  marginRight: watch("featureButtonMarginX")
                                    ? `${watch("featureButtonMarginX")}px`
                                    : "0px",
                                  marginTop: watch("featureButtonMarginY")
                                    ? `${watch("featureButtonMarginY")}px`
                                    : "0px",
                                  marginBottom: watch("featureButtonMarginY")
                                    ? `${watch("featureButtonMarginY")}px`
                                    : "0px",
                                  paddingLeft: watch("featureButtonPaddingX")
                                    ? `${watch("featureButtonPaddingX")}px`
                                    : "16px",
                                  paddingRight: watch("featureButtonPaddingX")
                                    ? `${watch("featureButtonPaddingX")}px`
                                    : "16px",
                                  paddingTop: watch("featureButtonPaddingY")
                                    ? `${watch("featureButtonPaddingY")}px`
                                    : "6px",
                                  paddingBottom: watch("featureButtonPaddingY")
                                    ? `${watch("featureButtonPaddingY")}px`
                                    : "6px",
                                  borderRadius: watch("featureButtonRadius")
                                    ? `${watch("featureButtonRadius")}px`
                                    : "6px",
                                }}
                              >
                                {watch("buttonText") || "JOIN NOW"}
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="featureButtonBg">Background Color</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="featureButtonBg"
                                  {...register("featureButtonBg")}
                                  placeholder="#F97316"
                                  className="flex-1"
                                />
                                <input
                                  type="color"
                                  {...register("featureButtonBg")}
                                  className="w-12 h-10 rounded border cursor-pointer"
                                  defaultValue="#F97316"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="featureButtonText">Text Color</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="featureButtonText"
                                  {...register("featureButtonText")}
                                  placeholder="#FFFFFF"
                                  className="flex-1"
                                />
                                <input
                                  type="color"
                                  {...register("featureButtonText")}
                                  className="w-12 h-10 rounded border cursor-pointer"
                                  defaultValue="#FFFFFF"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="featureButtonSize">Font Size (px)</Label>
                              <Input
                                id="featureButtonSize"
                                type="number"
                                {...register("featureButtonSize")}
                                placeholder="14"
                                min="12"
                                max="20"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="featureButtonWeight">Font Weight</Label>
                              <Select onValueChange={(value) => setValue("featureButtonWeight", value)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select weight" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="400">Normal (400)</SelectItem>
                                  <SelectItem value="500">Medium (500)</SelectItem>
                                  <SelectItem value="600">Semibold (600)</SelectItem>
                                  <SelectItem value="700">Bold (700)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="featureButtonMarginX">Margin X (px)</Label>
                              <Input
                                id="featureButtonMarginX"
                                type="number"
                                {...register("featureButtonMarginX")}
                                placeholder="0"
                                min="0"
                                max="50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="featureButtonMarginY">Margin Y (px)</Label>
                              <Input
                                id="featureButtonMarginY"
                                type="number"
                                {...register("featureButtonMarginY")}
                                placeholder="0"
                                min="0"
                                max="50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="featureButtonPaddingX">Padding X (px)</Label>
                              <Input
                                id="featureButtonPaddingX"
                                type="number"
                                {...register("featureButtonPaddingX")}
                                placeholder="16"
                                min="8"
                                max="32"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="featureButtonPaddingY">Padding Y (px)</Label>
                              <Input
                                id="featureButtonPaddingY"
                                type="number"
                                {...register("featureButtonPaddingY")}
                                placeholder="6"
                                min="4"
                                max="16"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="featureButtonRadius">Border Radius (px)</Label>
                              <Input
                                id="featureButtonRadius"
                                type="number"
                                {...register("featureButtonRadius")}
                                placeholder="6"
                                min="0"
                                max="50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-muted-foreground text-sm">Preview Updates Live</Label>
                              <div className="text-xs text-muted-foreground">0px = Square, 50px = Fully Rounded</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Content Image</CardTitle>
                  <CardDescription>Upload an image for this content section</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contentImage ? (
                    <div className="relative inline-block">
                      <Image
                        src={contentImage || "/placeholder.svg"}
                        alt="Content"
                        width={400}
                        height={250}
                        className="w-full max-w-md h-64 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium">Upload Content Image</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </label>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Settings */}
            <div className="space-y-6">
              {/* Page & Position Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Placement Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Target Page *</Label>
                    <Select onValueChange={(value) => setValue("page", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="home">Home Page</SelectItem>
                        <SelectItem value="about">About Page</SelectItem>
                        <SelectItem value="products">Products Page</SelectItem>
                        <SelectItem value="resellers">Resellers Page</SelectItem>
                        <SelectItem value="contact">Contact Page</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.page && <p className="text-sm text-red-500">{errors.page.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label>Position *</Label>
                    <Select onValueChange={(value) => setValue("position", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentType === "hero" && (
                          <>
                            <SelectItem value="hero">Hero Section</SelectItem>
                            <SelectItem value="secondary-hero">Secondary Hero</SelectItem>
                          </>
                        )}
                        {contentType === "banner" && (
                          <>
                            <SelectItem value="top">Top Banner</SelectItem>
                            <SelectItem value="header">Header Banner</SelectItem>
                            <SelectItem value="middle">Middle Banner</SelectItem>
                            <SelectItem value="footer">Footer Banner</SelectItem>
                          </>
                        )}
                        {contentType === "feature" && (
                          <>
                            <SelectItem value="features">Features Section</SelectItem>
                            <SelectItem value="highlights">Highlights Section</SelectItem>
                            <SelectItem value="services">Services Section</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    {errors.position && <p className="text-sm text-red-500">{errors.position.message}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Status Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Status Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select onValueChange={(value) => setValue("status", value)} defaultValue="active">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      {...register("isActive")}
                      onCheckedChange={(checked) => setValue("isActive", checked)}
                      defaultChecked
                    />
                    <Label htmlFor="isActive">Publish Immediately</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg p-4 bg-muted/50">
                    {contentImage && (
                      <Image
                        src={contentImage || "/placeholder.svg"}
                        alt="Preview"
                        width={200}
                        height={120}
                        className="w-full h-24 object-cover rounded mb-3"
                      />
                    )}
                    <h3 className="font-semibold text-sm">{watch("title") || "Content Title"}</h3>
                    {watch("subtitle") && <p className="text-xs text-muted-foreground mt-1">{watch("subtitle")}</p>}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {watchedPage || "Page"} • {watch("position") || "Position"}
                      </span>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link href="/content">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Create Content
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
