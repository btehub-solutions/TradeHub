import { z } from 'zod';

/**
 * Validation schema for creating a new listing
 */
export const createListingSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),
  
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .trim(),
  
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive('Price must be greater than 0')
    .max(999999999, 'Price is too high'),
  
  category_id: z
    .string({
      required_error: 'Category is required',
    })
    .uuid('Invalid category'),
  
  condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor'], {
    required_error: 'Condition is required',
  }),
  
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must not exceed 100 characters')
    .trim(),
  
  state: z
    .string({
      required_error: 'State is required',
    })
    .min(2, 'State is required'),
  
  images: z
    .array(z.string().url('Invalid image URL'))
    .min(1, 'At least one image is required')
    .max(5, 'Maximum 5 images allowed'),
});

export type CreateListingInput = z.infer<typeof createListingSchema>;

/**
 * Validation schema for listing form (before image upload)
 */
export const listingFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters')
    .trim(),
  
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters')
    .trim(),
  
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Price must be a positive number',
    }),
  
  category_id: z
    .string({
      required_error: 'Category is required',
    })
    .min(1, 'Please select a category'),
  
  condition: z.enum(['new', 'like_new', 'good', 'fair', 'poor'], {
    required_error: 'Condition is required',
  }),
  
  location: z
    .string()
    .min(2, 'Location must be at least 2 characters')
    .max(100, 'Location must not exceed 100 characters')
    .trim(),
  
  state: z
    .string({
      required_error: 'State is required',
    })
    .min(1, 'Please select a state'),
});

export type ListingFormInput = z.infer<typeof listingFormSchema>;
