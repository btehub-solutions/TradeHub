/**
 * Analytics Tracking Utility for TradeHub
 * Tracks key user events and interactions
 */

import { track as vercelTrack } from '@vercel/analytics';

export type AnalyticsEvent =
  | 'listing_view'
  | 'listing_created'
  | 'contact_seller_click'
  | 'search_query'
  | 'filter_applied'
  | 'image_upload'
  | 'profile_updated'
  | 'listing_edited'
  | 'listing_deleted'
  | 'category_click'
  | 'load_more_click'
  | 'share_listing'
  | 'favorite_listing'
  | 'report_listing'
  | 'page_view'
  | 'error_occurred';

export type AnalyticsProperties = {
  listing_id?: string;
  listing_title?: string;
  category?: string;
  price?: number;
  location?: string;
  search_query?: string;
  filter_type?: string;
  filter_value?: string;
  user_id?: string;
  error_message?: string;
  error_code?: string;
  page_path?: string;
  [key: string]: string | number | boolean | undefined;
};

/**
 * Track an analytics event
 */
export function trackEvent(
  event: AnalyticsEvent,
  properties?: AnalyticsProperties
): void {
  try {
    // Track with Vercel Analytics
    if (typeof window !== 'undefined') {
      vercelTrack(event, properties);
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event, properties);
    }

    // You can add additional analytics providers here
    // Example: Google Analytics, Mixpanel, etc.
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

/**
 * Track listing view
 */
export function trackListingView(
  listingId: string,
  listingTitle: string,
  category?: string,
  price?: number
): void {
  trackEvent('listing_view', {
    listing_id: listingId,
    listing_title: listingTitle,
    category,
    price,
  });
}

/**
 * Track listing creation
 */
export function trackListingCreated(
  listingId: string,
  category: string,
  price: number,
  location: string
): void {
  trackEvent('listing_created', {
    listing_id: listingId,
    category,
    price,
    location,
  });
}

/**
 * Track contact seller click
 */
export function trackContactSellerClick(
  listingId: string,
  listingTitle: string,
  sellerId: string
): void {
  trackEvent('contact_seller_click', {
    listing_id: listingId,
    listing_title: listingTitle,
    seller_id: sellerId,
  });
}

/**
 * Track search query
 */
export function trackSearchQuery(
  query: string,
  resultsCount: number,
  filters?: Record<string, any>
): void {
  trackEvent('search_query', {
    search_query: query,
    results_count: resultsCount,
    has_filters: filters ? Object.keys(filters).length > 0 : false,
    ...filters,
  });
}

/**
 * Track filter application
 */
export function trackFilterApplied(
  filterType: string,
  filterValue: string | number,
  resultsCount: number
): void {
  trackEvent('filter_applied', {
    filter_type: filterType,
    filter_value: String(filterValue),
    results_count: resultsCount,
  });
}

/**
 * Track image upload
 */
export function trackImageUpload(
  imageCount: number,
  totalSize: number,
  uploadDuration: number
): void {
  trackEvent('image_upload', {
    image_count: imageCount,
    total_size_mb: Math.round((totalSize / 1024 / 1024) * 100) / 100,
    upload_duration_ms: uploadDuration,
  });
}

/**
 * Track profile update
 */
export function trackProfileUpdated(userId: string, fieldsUpdated: string[]): void {
  trackEvent('profile_updated', {
    user_id: userId,
    fields_updated: fieldsUpdated.join(','),
    fields_count: fieldsUpdated.length,
  });
}

/**
 * Track page view
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}

/**
 * Track error
 */
export function trackError(
  errorMessage: string,
  errorCode?: string,
  context?: Record<string, any>
): void {
  trackEvent('error_occurred', {
    error_message: errorMessage,
    error_code: errorCode,
    ...context,
  });
}

/**
 * Track category click
 */
export function trackCategoryClick(
  categoryId: string,
  categoryName: string,
  source: 'homepage' | 'filter' | 'navigation'
): void {
  trackEvent('category_click', {
    category_id: categoryId,
    category_name: categoryName,
    source,
  });
}

/**
 * Track load more click
 */
export function trackLoadMoreClick(
  currentCount: number,
  totalCount: number,
  page: number
): void {
  trackEvent('load_more_click', {
    current_count: currentCount,
    total_count: totalCount,
    page,
  });
}

/**
 * Performance monitoring
 */
export function trackPerformance(
  metric: 'FCP' | 'LCP' | 'FID' | 'CLS' | 'TTFB',
  value: number,
  rating: 'good' | 'needs-improvement' | 'poor'
): void {
  trackEvent('page_view', {
    metric,
    value: Math.round(value),
    rating,
  });
}

/**
 * Track user engagement time
 */
export function trackEngagementTime(
  pagePath: string,
  timeSpentSeconds: number
): void {
  trackEvent('page_view', {
    page_path: pagePath,
    engagement_time_seconds: timeSpentSeconds,
  });
}

/**
 * Initialize analytics tracking
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  // Track initial page view
  trackPageView(window.location.pathname, document.title);

  // Track page visibility changes
  let visibilityStartTime = Date.now();
  
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      const timeSpent = Math.round((Date.now() - visibilityStartTime) / 1000);
      if (timeSpent > 5) {
        // Only track if user spent more than 5 seconds
        trackEngagementTime(window.location.pathname, timeSpent);
      }
    } else {
      visibilityStartTime = Date.now();
    }
  });

  // Track errors
  window.addEventListener('error', (event) => {
    trackError(event.message, 'runtime_error', {
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackError(
      event.reason?.message || 'Unhandled promise rejection',
      'promise_rejection'
    );
  });
}

/**
 * Batch tracking for multiple events
 */
export class AnalyticsBatcher {
  private queue: Array<{ event: AnalyticsEvent; properties?: AnalyticsProperties }> = [];
  private flushInterval: number = 5000; // 5 seconds
  private timer: NodeJS.Timeout | null = null;

  constructor(flushInterval?: number) {
    if (flushInterval) {
      this.flushInterval = flushInterval;
    }
    this.startTimer();
  }

  track(event: AnalyticsEvent, properties?: AnalyticsProperties): void {
    this.queue.push({ event, properties });
    
    if (this.queue.length >= 10) {
      this.flush();
    }
  }

  private startTimer(): void {
    if (typeof window === 'undefined') return;
    
    this.timer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  flush(): void {
    if (this.queue.length === 0) return;

    const events = [...this.queue];
    this.queue = [];

    events.forEach(({ event, properties }) => {
      trackEvent(event, properties);
    });
  }

  destroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.flush();
  }
}
