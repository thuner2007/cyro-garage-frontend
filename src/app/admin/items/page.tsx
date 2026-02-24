"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CustomizationOption {
  id?: number;
  label: string;
  type: "TEXT_INPUT" | "DROPDOWN" | "NUMBER_INPUT" | "COLOR_PICKER";
  required: boolean;
  dropdownValues?: string[];
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
}

interface Item {
  id: number;
  name: string;
  description: string;
  type: string;
  widthToHeightRatio?: number;
  maxWidth?: number;
  maxHeight?: number;
  price: number;
  pricePerCmSquared?: number;
  images: string[];
  videos: string[];
  customizationOptions: CustomizationOption[];
  createdAt: string;
  updatedAt: string;
}

export default function ItemsPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "WINDSHIELD_BANNER",
    price: "",
    pricePerCmSquared: "",
    widthToHeightRatio: "",
    maxWidth: "",
    maxHeight: "",
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [customizationOptions, setCustomizationOptions] = useState<
    CustomizationOption[]
  >([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
    }
  }, [isAuthenticated]);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get("/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("price", formData.price);

    if (formData.pricePerCmSquared)
      formDataToSend.append("pricePerCmSquared", formData.pricePerCmSquared);
    if (formData.widthToHeightRatio)
      formDataToSend.append("widthToHeightRatio", formData.widthToHeightRatio);
    if (formData.maxWidth) formDataToSend.append("maxWidth", formData.maxWidth);
    if (formData.maxHeight)
      formDataToSend.append("maxHeight", formData.maxHeight);

    // Clean and format customization options
    if (customizationOptions.length > 0) {
      const cleanedOptions = customizationOptions.map((option) => {
        const cleaned: any = {
          label: option.label || "",
          type: option.type,
          required: Boolean(option.required),
          dropdownValues: [], // Always include as empty array by default
        };

        // Handle dropdown values for DROPDOWN type
        if (
          option.type === "DROPDOWN" &&
          Array.isArray(option.dropdownValues)
        ) {
          cleaned.dropdownValues = option.dropdownValues
            .filter((v) => v && typeof v === "string" && v.trim() !== "")
            .map((v) => String(v).trim());
        }

        // Add TEXT_INPUT specific fields
        if (option.type === "TEXT_INPUT") {
          if (
            option.minLength !== undefined &&
            option.minLength !== null &&
            !isNaN(Number(option.minLength))
          ) {
            cleaned.minLength = Number(option.minLength);
          }
          if (
            option.maxLength !== undefined &&
            option.maxLength !== null &&
            !isNaN(Number(option.maxLength))
          ) {
            cleaned.maxLength = Number(option.maxLength);
          }
        }

        // Add placeholder if present
        if (
          option.placeholder &&
          typeof option.placeholder === "string" &&
          option.placeholder.trim()
        ) {
          cleaned.placeholder = String(option.placeholder).trim();
        }

        return cleaned;
      });

      formDataToSend.append(
        "customizationOptions",
        JSON.stringify(cleanedOptions),
      );
    }

    // Add image files
    imageFiles.forEach((file) => {
      formDataToSend.append("images", file);
    });

    // Add video files
    videoFiles.forEach((file) => {
      formDataToSend.append("videos", file);
    });

    try {
      if (editingItem) {
        await axiosInstance.patch(`/items/${editingItem.id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/items", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      fetchItems();
      setShowForm(false);
    } catch (error: any) {
      console.error("Error saving item:", error);
      alert(error.response?.data?.message || "Failed to save item");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await axiosInstance.delete(`/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    }
  };

  const handleEdit = (item: Item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      type: item.type,
      price: item.price.toString(),
      pricePerCmSquared: item.pricePerCmSquared?.toString() || "",
      widthToHeightRatio: item.widthToHeightRatio?.toString() || "",
      maxWidth: item.maxWidth?.toString() || "",
      maxHeight: item.maxHeight?.toString() || "",
    });
    setCustomizationOptions(item.customizationOptions || []);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: "WINDSHIELD_BANNER",
      price: "",
      pricePerCmSquared: "",
      widthToHeightRatio: "",
      maxWidth: "",
      maxHeight: "",
    });
    setImageFiles([]);
    setVideoFiles([]);
    setCustomizationOptions([]);
    setEditingItem(null);
  };

  const addCustomizationOption = () => {
    setCustomizationOptions([
      ...customizationOptions,
      {
        label: "",
        type: "TEXT_INPUT",
        required: false,
        dropdownValues: [],
      },
    ]);
  };

  const updateCustomizationOption = (
    index: number,
    field: string,
    value: any,
  ) => {
    const updated = [...customizationOptions];
    updated[index] = { ...updated[index], [field]: value };
    setCustomizationOptions(updated);
  };

  const removeCustomizationOption = (index: number) => {
    setCustomizationOptions(customizationOptions.filter((_, i) => i !== index));
  };

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-lg text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/admin")}
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              ← Back
            </Button>
            <h1 className="text-2xl font-bold text-white">Manage Items</h1>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {showForm ? "Cancel" : "+ Add New Item"}
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showForm && (
          <Card className="mb-8 bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">
                {editingItem ? "Edit Item" : "Create New Item"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Fill in the details below to {editingItem ? "update" : "create"}{" "}
                an item
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-gray-300">
                      Type *
                    </Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      required
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
                    >
                      <option value="WINDSHIELD_BANNER">
                        Windshield Banner
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-gray-300">
                      Price *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="pricePerCmSquared"
                      className="text-gray-300"
                    >
                      Price per cm²
                    </Label>
                    <Input
                      id="pricePerCmSquared"
                      type="number"
                      step="0.01"
                      value={formData.pricePerCmSquared}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          pricePerCmSquared: e.target.value,
                        })
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="widthToHeightRatio"
                      className="text-gray-300"
                    >
                      Width/Height Ratio
                    </Label>
                    <Input
                      id="widthToHeightRatio"
                      type="number"
                      step="0.1"
                      value={formData.widthToHeightRatio}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          widthToHeightRatio: e.target.value,
                        })
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxWidth" className="text-gray-300">
                      Max Width (cm)
                    </Label>
                    <Input
                      id="maxWidth"
                      type="number"
                      value={formData.maxWidth}
                      onChange={(e) =>
                        setFormData({ ...formData, maxWidth: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxHeight" className="text-gray-300">
                      Max Height (cm)
                    </Label>
                    <Input
                      id="maxHeight"
                      type="number"
                      value={formData.maxHeight}
                      onChange={(e) =>
                        setFormData({ ...formData, maxHeight: e.target.value })
                      }
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-300">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={3}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images" className="text-gray-300">
                    Images (max 10)
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) =>
                      setImageFiles(Array.from(e.target.files || []))
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  {imageFiles.length > 0 && (
                    <p className="text-sm text-gray-400">
                      {imageFiles.length} file(s) selected
                    </p>
                  )}
                  {editingItem && editingItem.images.length > 0 && (
                    <p className="text-sm text-gray-400">
                      Current: {editingItem.images.length} image(s)
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videos" className="text-gray-300">
                    Videos (max 5)
                  </Label>
                  <Input
                    id="videos"
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(e) =>
                      setVideoFiles(Array.from(e.target.files || []))
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  {videoFiles.length > 0 && (
                    <p className="text-sm text-gray-400">
                      {videoFiles.length} file(s) selected
                    </p>
                  )}
                  {editingItem && editingItem.videos.length > 0 && (
                    <p className="text-sm text-gray-400">
                      Current: {editingItem.videos.length} video(s)
                    </p>
                  )}
                </div>

                {/* Customization Options */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label className="text-gray-300">
                      Customization Options
                    </Label>
                    <Button
                      type="button"
                      onClick={addCustomizationOption}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm"
                    >
                      + Add Option
                    </Button>
                  </div>

                  {customizationOptions.map((option, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-800 rounded-lg space-y-3 border border-gray-700"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-white font-medium">
                          Option {index + 1}
                        </h4>
                        <Button
                          type="button"
                          onClick={() => removeCustomizationOption(index)}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm"
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-gray-300">Label</Label>
                          <Input
                            value={option.label}
                            onChange={(e) =>
                              updateCustomizationOption(
                                index,
                                "label",
                                e.target.value,
                              )
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-300">Type</Label>
                          <select
                            value={option.type}
                            onChange={(e) =>
                              updateCustomizationOption(
                                index,
                                "type",
                                e.target.value,
                              )
                            }
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2"
                          >
                            <option value="TEXT_INPUT">Text Input</option>
                            <option value="DROPDOWN">Dropdown</option>
                            <option value="NUMBER_INPUT">Number Input</option>
                            <option value="COLOR_PICKER">Color Picker</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-300">Placeholder</Label>
                          <Input
                            value={option.placeholder || ""}
                            onChange={(e) =>
                              updateCustomizationOption(
                                index,
                                "placeholder",
                                e.target.value,
                              )
                            }
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>

                        <div className="flex items-center space-x-2 pt-7">
                          <input
                            type="checkbox"
                            id={`required-${index}`}
                            checked={option.required}
                            onChange={(e) =>
                              updateCustomizationOption(
                                index,
                                "required",
                                e.target.checked,
                              )
                            }
                            className="bg-gray-700 border-gray-600"
                          />
                          <Label
                            htmlFor={`required-${index}`}
                            className="text-gray-300"
                          >
                            Required
                          </Label>
                        </div>

                        {option.type === "TEXT_INPUT" && (
                          <>
                            <div className="space-y-2">
                              <Label className="text-gray-300">
                                Min Length
                              </Label>
                              <Input
                                type="number"
                                value={option.minLength || ""}
                                onChange={(e) =>
                                  updateCustomizationOption(
                                    index,
                                    "minLength",
                                    parseInt(e.target.value) || undefined,
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-gray-300">
                                Max Length
                              </Label>
                              <Input
                                type="number"
                                value={option.maxLength || ""}
                                onChange={(e) =>
                                  updateCustomizationOption(
                                    index,
                                    "maxLength",
                                    parseInt(e.target.value) || undefined,
                                  )
                                }
                                className="bg-gray-700 border-gray-600 text-white"
                              />
                            </div>
                          </>
                        )}

                        {option.type === "DROPDOWN" && (
                          <div className="space-y-2 col-span-2">
                            <Label className="text-gray-300">
                              Dropdown Values (comma separated)
                            </Label>
                            <Input
                              value={option.dropdownValues?.join(", ") || ""}
                              onChange={(e) =>
                                updateCustomizationOption(
                                  index,
                                  "dropdownValues",
                                  e.target.value
                                    .split(",")
                                    .map((v) => v.trim()),
                                )
                              }
                              placeholder="Option 1, Option 2, Option 3"
                              className="bg-gray-700 border-gray-600 text-white"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {editingItem ? "Update Item" : "Create Item"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowForm(false);
                    }}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Items List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            All Items ({items.length})
          </h2>

          {items.map((item) => (
            <Card key={item.id} className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white">{item.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {item.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Type:</span>
                    <p className="text-white">{item.type}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Price:</span>
                    <p className="text-white">${item.price}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Images:</span>
                    <p className="text-white">{item.images.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Videos:</span>
                    <p className="text-white">{item.videos.length}</p>
                  </div>
                  {item.widthToHeightRatio && (
                    <div>
                      <span className="text-gray-400">Ratio:</span>
                      <p className="text-white">{item.widthToHeightRatio}</p>
                    </div>
                  )}
                  {item.pricePerCmSquared && (
                    <div>
                      <span className="text-gray-400">Price/cm²:</span>
                      <p className="text-white">${item.pricePerCmSquared}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400">Customizations:</span>
                    <p className="text-white">
                      {item.customizationOptions.length}
                    </p>
                  </div>
                </div>

                {item.customizationOptions.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <h4 className="text-white font-medium mb-2">
                      Customization Options:
                    </h4>
                    <div className="space-y-2">
                      {item.customizationOptions.map((opt) => (
                        <div
                          key={opt.id}
                          className="text-sm text-gray-300 bg-gray-800 p-2 rounded"
                        >
                          <span className="font-medium">{opt.label}</span> (
                          {opt.type})
                          {opt.required && (
                            <span className="ml-2 text-red-400">*Required</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {item.images.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <h4 className="text-white font-medium mb-2">Images:</h4>
                    <div className="flex gap-2 flex-wrap">
                      {item.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`${item.name} ${idx + 1}`}
                          className="w-20 h-20 object-cover rounded border border-gray-700"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {items.length === 0 && (
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="text-center py-12">
                <p className="text-gray-400">
                  No items found. Create your first item!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
