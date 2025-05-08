/**
 * Environment configuration to ensure consistency between development and production
 */

export type Environment = 'development' | 'production' | 'test';

interface EnvironmentConfig {
  isServer: boolean;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  baseUrl: string;
  environment: Environment;
  apiEndpoint: string;
  assetPrefix: string;
  imageOptimization: boolean;
}

// Determine current environment
const determineEnvironment = (): Environment => {
  if (process.env.NODE_ENV === 'test') return 'test';
  if (process.env.NODE_ENV === 'production') return 'production';
  return 'development';
};

const environment = determineEnvironment();

// Create configuration based on environment
const config: EnvironmentConfig = {
  isServer: typeof window === 'undefined',
  isDevelopment: environment === 'development',
  isProduction: environment === 'production',
  isTest: environment === 'test',
  environment,
  // Use relative URLs regardless of environment to avoid cross-origin issues
  baseUrl: '/',
  // Ensure API endpoint is consistent in all environments
  apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT || '/api',
  // Use absolute URLs for assets in production, relative in development
  assetPrefix: environment === 'production' 
    ? process.env.NEXT_PUBLIC_ASSET_PREFIX || '' 
    : '',
  // Enable image optimization in all environments
  imageOptimization: true,
};

/**
 * Get the current runtime environment configuration
 */
export function getEnvironment(): EnvironmentConfig {
  return config;
}

/**
 * Get absolute URL for assets considering the environment
 */
export function getAssetUrl(path: string): string {
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  
  const assetPath = path.startsWith('/') ? path : `/${path}`;
  return `${config.assetPrefix}${assetPath}`;
}

/**
 * Format image URLs to ensure they work consistently across environments
 */
export function getImageUrl(src: string): string {
  if (!src) return '';
  
  // If it's already an absolute URL, return as is
  if (src.startsWith('http') || src.startsWith('https')) {
    return src;
  }
  
  // Handle Unsplash images consistently
  if (src.includes('unsplash.com')) {
    // Ensure proper quality parameters
    if (!src.includes('q=')) {
      return `${src}${src.includes('?') ? '&' : '?'}q=80&auto=format`;
    }
    return src;
  }
  
  // Local images with asset prefix
  return getAssetUrl(src);
}

export default config;