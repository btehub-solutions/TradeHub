'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowLeft, Trash2, X } from 'lucide-react';
import { listingFormSchema, type ListingFormInput } from '@/lib/validations/listing';
import { Category, NIGERIAN_STATES, LISTING_CONDITIONS, Listing } from '@/types';
import { ImageUpload } from './ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';

interface EditListingFormProps {
  listing: Listing;
  categories: Category[];
}

export function EditListingForm({ listing, categories }: EditListingFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(listing.images || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ListingFormInput>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      title: listing.title,
      description: listing.description,
      price: listing.price.toString(),
      category_id: listing.category_id,
      condition: listing.condition,
      location: listing.location,
      state: listing.state,
    },
  });

  const formValues = watch();

  const handleRemoveExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ListingFormInput) => {
    const totalImages = existingImages.length + newImages.length;
    
    if (totalImages === 0) {
      setSubmitError('Please keep at least one image');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // If there are new images to upload
      if (newImages.length > 0) {
        // Upload new images
        const formData = new FormData();
        newImages.forEach((image) => {
          formData.append('images', image);
        });

        const uploadResponse = await fetch('/api/listings/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload images');
        }

        const { imageUrls } = await uploadResponse.json();
        
        // Combine existing and new image URLs
        const allImages = [...existingImages, ...imageUrls];

        // Update listing with all data
        const updateResponse = await fetch(`/api/listings/${listing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            price: parseFloat(data.price),
            category_id: data.category_id,
            condition: data.condition,
            location: data.location,
            state: data.state,
            images: allImages,
          }),
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to update listing');
        }
      } else {
        // No new images, just update the listing data
        const updateResponse = await fetch(`/api/listings/${listing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: data.title,
            description: data.description,
            price: parseFloat(data.price),
            category_id: data.category_id,
            condition: data.condition,
            location: data.location,
            state: data.state,
            images: existingImages,
          }),
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to update listing');
        }
      }

      toast({
        title: 'Success',
        description: 'Listing updated successfully',
      });

      router.push('/profile');
      router.refresh();
    } catch (error: any) {
      console.error('Error updating listing:', error);
      setSubmitError(error.message || 'Failed to update listing');
      toast({
        title: 'Error',
        description: error.message || 'Failed to update listing',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Profile
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Listing</h1>
        <p className="text-gray-600 mt-2">Update your listing details</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6">
        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {submitError}
          </div>
        )}

        <div className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="e.g., iPhone 13 Pro Max 256GB"
              className="mt-2"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your item in detail..."
              rows={6}
              className="mt-2"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="price">Price (₦) *</Label>
              <Input
                id="price"
                type="number"
                {...register('price')}
                placeholder="50000"
                className="mt-2"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="category_id">Category *</Label>
              <Select
                value={formValues.category_id}
                onValueChange={(value) => setValue('category_id', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category_id && (
                <p className="mt-1 text-sm text-red-600">{errors.category_id.message}</p>
              )}
            </div>
          </div>

          {/* Condition */}
          <div>
            <Label htmlFor="condition">Condition *</Label>
            <Select
              value={formValues.condition}
              onValueChange={(value: any) => setValue('condition', value)}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {LISTING_CONDITIONS.map((condition) => (
                  <SelectItem key={condition.value} value={condition.value}>
                    {condition.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.condition && (
              <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="state">State *</Label>
              <Select
                value={formValues.state}
                onValueChange={(value) => setValue('state', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {NIGERIAN_STATES.map((state) => (
                    <SelectItem key={state.code} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="location">City/Area *</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="e.g., Ikeja, Lekki"
                className="mt-2"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
          </div>

          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div>
              <Label>Current Images</Label>
              <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImages.map((imageUrl, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={imageUrl}
                      alt={`Existing ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images Upload */}
          <div>
            <Label>Add New Images (Optional)</Label>
            <div className="mt-2">
              <ImageUpload
                images={newImages}
                onImagesChange={setNewImages}
                maxImages={5 - existingImages.length}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              You can add up to {5 - existingImages.length} more image(s)
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Listing'
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/profile')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
