'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, X, Loader2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { compressImage, validateImageFile, formatFileSize } from '@/lib/utils/image-compression';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils/cn';

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  maxSizeMB?: number;
  error?: string;
}

interface ImagePreview {
  file: File;
  preview: string;
  compressed: boolean;
  originalSize: number;
  compressedSize: number;
}

export function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
  maxSizeMB = 5,
  error,
}: ImageUploadProps) {
  const [previews, setPreviews] = useState<ImagePreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      setUploadError('');

      // Check total count
      if (images.length + fileArray.length > maxImages) {
        setUploadError(`Maximum ${maxImages} images allowed`);
        return;
      }

      setIsCompressing(true);
      const newPreviews: ImagePreview[] = [];
      const compressedFiles: File[] = [];

      try {
        for (let i = 0; i < fileArray.length; i++) {
          const file = fileArray[i];
          
          // Validate file
          const validation = validateImageFile(file, maxSizeMB);
          if (!validation.valid) {
            setUploadError(validation.error || 'Invalid file');
            continue;
          }

          // Update progress
          setUploadProgress(((i + 1) / fileArray.length) * 100);

          // Compress image
          const originalSize = file.size;
          const compressedFile = await compressImage(file, {
            maxWidth: 1920,
            maxHeight: 1920,
            quality: 0.85,
            maxSizeMB,
          });

          // Create preview
          const preview = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(compressedFile);
          });

          newPreviews.push({
            file: compressedFile,
            preview,
            compressed: compressedFile.size < originalSize,
            originalSize,
            compressedSize: compressedFile.size,
          });

          compressedFiles.push(compressedFile);
        }

        // Update state
        setPreviews([...previews, ...newPreviews]);
        onImagesChange([...images, ...compressedFiles]);
      } catch (err) {
        setUploadError('Failed to process images. Please try again.');
        console.error('Image processing error:', err);
      } finally {
        setIsCompressing(false);
        setUploadProgress(0);
      }
    },
    [images, previews, maxImages, maxSizeMB, onImagesChange]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      processFiles(files);
    }
  };

  const removeImage = (index: number) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    const newImages = images.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onImagesChange(newImages);
    setUploadError('');
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= previews.length) return;

    const newPreviews = [...previews];
    const newImages = [...images];

    const [movedPreview] = newPreviews.splice(fromIndex, 1);
    const [movedImage] = newImages.splice(fromIndex, 1);

    newPreviews.splice(toIndex, 0, movedPreview);
    newImages.splice(toIndex, 0, movedImage);

    setPreviews(newPreviews);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-8 transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-gray-300 hover:border-primary/50',
          images.length >= maxImages && 'opacity-50 pointer-events-none'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={images.length >= maxImages}
        />

        <div className="flex flex-col items-center justify-center text-center">
          {isCompressing ? (
            <>
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-sm text-gray-600 mb-2">Compressing images...</p>
              <Progress value={uploadProgress} className="w-full max-w-xs" />
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Upload Images
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Drag and drop your images here, or click to browse
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                disabled={images.length >= maxImages}
              >
                Select Images
              </button>
              <p className="text-xs text-gray-500 mt-4">
                JPG, PNG, or WebP • Max {maxSizeMB}MB per image • Up to {maxImages} images
              </p>
              <p className="text-xs text-gray-500">
                {images.length} / {maxImages} images uploaded
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error Messages */}
      {(uploadError || error) && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>{uploadError || error}</p>
        </div>
      )}

      {/* Image Previews */}
      {previews.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">
              Uploaded Images ({previews.length})
            </h4>
            <p className="text-xs text-gray-500">Drag to reorder</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {previews.map((preview, index) => (
              <div
                key={index}
                className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary transition-colors cursor-move"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.effectAllowed = 'move';
                  e.dataTransfer.setData('text/plain', index.toString());
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.dropEffect = 'move';
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
                  moveImage(fromIndex, index);
                }}
              >
                {/* Image */}
                <img
                  src={preview.preview}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1 text-white text-xs">
                    <ImageIcon className="w-3 h-3" />
                    <span>{formatFileSize(preview.compressedSize)}</span>
                    {preview.compressed && (
                      <span className="text-green-300">
                        (saved {formatFileSize(preview.originalSize - preview.compressedSize)})
                      </span>
                    )}
                  </div>
                </div>

                {/* Position Badge */}
                {index === 0 && (
                  <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
