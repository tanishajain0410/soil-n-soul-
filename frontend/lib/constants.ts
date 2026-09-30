export const WHATSAPP_NUMBER = '919580417547';
const defaultSiteUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://soilnsoul.com'
    : 'http://localhost:3000';
const rawSiteUrl =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SITE_URL?.includes('localhost')
    ? 'https://soilnsoul.com'
    : (process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl);
export const SITE_URL = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
const resolvedApiUrl = process.env.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL
  : process.env.NODE_ENV === 'production'
  ? ''
  : 'http://localhost:5000/api';

export const API_URL =
  process.env.NODE_ENV === 'production' && resolvedApiUrl.includes('localhost')
    ? ''
    : resolvedApiUrl;

export const IS_API_CONFIGURED = Boolean(API_URL && API_URL.trim() !== '');
