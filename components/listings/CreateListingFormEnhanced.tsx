'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, CheckCircle2, Share2, ArrowLeft } from 'lucide-react';
import { listingFormSchema, type ListingFormInput } from '@/lib/validations/listing';
import { Category, NIGERIAN_STATES, LISTING_CONDITIONS } from '@/types';
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
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

interface CreateListingFormEnhancedProps {
  categories: Category[];
}

type FormStep = 'details' | 'images' | 'review' | 'success';

export function CreateListingFormEnhanced({ categories }: CreateListingFormEnhancedProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<FormStep>('details');
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitError, setSubmitError] = useState('');
  const [createdListingId, setCreatedListingId] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    trigger,
  } = useForm<ListingFormInput>({
    resolver: zodResolver(listingFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category_id: '',
      condition: 'good',
      location: '',
      state: '',
    },
  });

  const formValues = watch();

  const handleNextStep = async () => {
    if (currentStep === 'details') {
      const isStepValid = await trigger();
      if (isStepValid) {
        setCurrentStep('images');
      }
    } else if (currentStep === 'images') {
      if (images.length === 0) {
        setSubmitError('Please upload at least one image');
        return;
      }
      setCurrentStep('review');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep === 'images') {
      setCurrentStep('details');
    } else if (currentStep === 'review') {
      setCurrentStep('images');
    }
  };

  const onSubmit = async (data: ListingFormInput) => {
    if (images.length === 0) {
      setSubmitError('Please upload at least one image');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    setUploadProgress(0);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('category_id', data.category_id);
      formData.append('condition', data.condition);
      formData.append('location', data.location);
      formData.append('state', data.state);

      // Append images
      images.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Submit to API
      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create listing');
      }

      const result = await response.json();
      setCreatedListingId(result.listing.id);
      setCurrentStep('success');
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(
        error instanceof Error ? error.message : 'Failed to create listing. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepProgress = () => {
    switch (currentStep) {
      case 'details':
        return 33;
      case 'images':
        return 66;
      case 'review':
        return 100;
      case 'success':
        return 100;
      default:
        return 0;
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/listings/${createdListingId}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: formValues.title,
          text: `Check out my listing: ${formValues.title}`,
          url,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  // Success Screen
  if (currentStep === 'success') {
    return (
      <div className="bg-white rounded-lg p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Posted Successfully!</h2>
        <p className="text-gray-600 mb-8">
          Your item is now live and visible to buyers on TradeHub.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push(`/listings/${createdListingId}`)}
            size="lg"
            className="flex-1 sm:flex-none"
          >
            View Listing
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            size="lg"
            className="flex-1 sm:flex-none"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Listing
          </Button>
        </div>

        <div className="mt-6">
          <Link
            href="/listings/new"
            className="text-primary hover:underline text-sm font-medium"
            onClick={() => window.location.reload()}
          >
            Post Another Listing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep === 'details' ? '1' : currentStep === 'images' ? '2' : '3'} of 3
          </span>
          <span className="text-sm text-gray-500">
            {currentStep === 'details'
              ? 'Item Details'
              : currentStep === 'images'
              ? 'Upload Images'
              : 'Review & Post'}
          </span>
        </div>
        <Progress value={getStepProgress()} className="h-2" />
      </div>

      {/* Error Message */}
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {submitError}
        </div>
      )}

      {/* Step 1: Details */}
      {currentStep === 'details' && (
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Item Details</h2>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="e.g., iPhone 13 Pro Max 256GB"
              maxLength={100}
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && (
              <p className="text-sm text-red-600">{errors.title.message}</p>
            )}
            <p className="text-xs text-gray-500">{formValues.title.length}/100 characters</p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your item in detail..."
              rows={5}
              maxLength={500}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            )}
            <p className="text-xs text-gray-500">
              {formValues.description.length}/500 characters
            </p>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">
              Price (₦) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              type="number"
              {...register('price')}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={errors.price ? 'border-red-500' : ''}
            />
            {errors.price && (
              <p className="text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formValues.category_id}
              onValueChange={(value) => setValue('category_id', value, { shouldValidate: true })}
            >
              <SelectTrigger className={errors.category_id ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select a category" />
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
              <p className="text-sm text-red-600">{errors.category_id.message}</p>
            )}
          </div>

          {/* Condition */}
          <div className="space-y-2">
            <Label htmlFor="condition">
              Condition <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formValues.condition}
              onValueChange={(value: any) => setValue('condition', value, { shouldValidate: true })}
            >
              <SelectTrigger className={errors.condition ? 'border-red-500' : ''}>
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
              <p className="text-sm text-red-600">{errors.condition.message}</p>
            )}
          </div>

          {/* State */}
          <div className="space-y-2">
            <Label htmlFor="state">
              State <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formValues.state}
              onValueChange={(value) => setValue('state', value, { shouldValidate: true })}
            >
              <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select your state" />
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
              <p className="text-sm text-red-600">{errors.state.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">
              Location (City/Area) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="location"
              {...register('location')}
              placeholder="e.g., Ikeja, Victoria Island"
              maxLength={100}
              className={errors.location ? 'border-red-500' : ''}
            />
            {errors.location && (
              <p className="text-sm text-red-600">{errors.location.message}</p>
            )}
          </div>

          <Button
            type="button"
            onClick={handleNextStep}
            className="w-full"
            size="lg"
            disabled={!isValid}
          >
            Continue to Images
          </Button>
        </div>
      )}

      {/* Step 2: Images */}
      {currentStep === 'images' && (
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Upload Images</h2>
            <p className="text-sm text-gray-600">
              Add clear photos of your item. The first image will be the main photo.
            </p>
          </div>

          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={5}
            maxSizeMB={5}
            error={submitError}
          />

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handlePreviousStep}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNextStep}
              className="flex-1"
              size="lg"
              disabled={images.length === 0}
            >
              Continue to Review
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {currentStep === 'review' && (
        <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Your Listing</h2>

          {/* Preview */}
          <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
            <div className="grid grid-cols-4 gap-2">
              {images.slice(0, 4).map((image, index) => (
                <div key={index} className="aspect-square rounded overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-900">{formValues.title}</h3>
              <p className="text-2xl font-bold text-primary mt-1">
                ₦{parseFloat(formValues.price).toLocaleString()}
              </p>
            </div>

            <p className="text-gray-700 text-sm">{formValues.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Category:</span>
                <span className="ml-2 font-medium">
                  {categories.find((c) => c.id === formValues.category_id)?.name}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Condition:</span>
                <span className="ml-2 font-medium">
                  {LISTING_CONDITIONS.find((c) => c.value === formValues.condition)?.label}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Location:</span>
                <span className="ml-2 font-medium">
                  {formValues.location}, {formValues.state}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Images:</span>
                <span className="ml-2 font-medium">{images.length} photo(s)</span>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {isSubmitting && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Uploading your listing...</span>
                <span className="font-medium">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handlePreviousStep}
              variant="outline"
              className="flex-1"
              size="lg"
              disabled={isSubmitting}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Listing'
              )}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}
