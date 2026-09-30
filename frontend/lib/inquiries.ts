import { API_URL } from './constants';

export interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  dates?: string;
  guests?: string;
  origin?: string;
  interests?: string;
  message?: string;
  status: 'new' | 'contacted' | 'resolved' | 'archived';
  source?: string;
  notes?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}

export interface InquiryStats {
  total: number;
  newCount: number;
  contactedCount: number;
  resolvedCount: number;
}

function resolveInquiryUrl(path: string = ''): string | null {
  if (API_URL) return `${API_URL}/inquiries${path}`;
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  return `http://localhost:5000/api/inquiries${path}`;
}

/**
 * Submit an inquiry from any customer-facing form
 */
export async function submitInquiry(data: {
  name: string;
  phone?: string;
  email?: string;
  service?: string;
  dates?: string;
  guests?: string;
  origin?: string;
  interests?: string;
  message?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}): Promise<{ success: boolean; message?: string; inquiry?: Inquiry }> {
  const targetUrl = resolveInquiryUrl();
  if (!targetUrl) {
    console.warn('Inquiry API URL is not configured in production.');
    return { success: false, message: 'Inquiry service is currently offline. Please reach us directly via WhatsApp.' };
  }

  try {
    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      return { ...result, success: false, message: result.message || 'Unable to submit inquiry' };
    }
    return result;
  } catch (err) {
    console.error('Failed to submit inquiry:', err);
    return { success: false, message: 'Network error submitting inquiry' };
  }
}

/**
 * Fetch all inquiries for the admin dashboard
 */
export async function getInquiries(
  token: string,
  params?: { status?: string; search?: string }
): Promise<{ success: boolean; inquiries: Inquiry[]; stats: InquiryStats }> {
  const targetUrl = resolveInquiryUrl();
  if (!targetUrl) {
    return {
      success: false,
      inquiries: [],
      stats: { total: 0, newCount: 0, contactedCount: 0, resolvedCount: 0 },
    };
  }
  const url = new URL(targetUrl);
  if (params?.status && params.status !== 'all') {
    url.searchParams.set('status', params.status);
  }
  if (params?.search) {
    url.searchParams.set('search', params.search);
  }

  try {
    const res = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch inquiries:', err);
    return {
      success: false,
      inquiries: [],
      stats: { total: 0, newCount: 0, contactedCount: 0, resolvedCount: 0 },
    };
  }
}

/**
 * Update an inquiry's status or internal notes
 */
export async function updateInquiry(
  id: string,
  token: string,
  data: { status?: 'new' | 'contacted' | 'resolved' | 'archived'; notes?: string }
): Promise<{ success: boolean; message?: string; inquiry?: Inquiry }> {
  const targetUrl = resolveInquiryUrl(`/${id}`);
  if (!targetUrl) {
    return { success: false, message: 'Inquiry API is not configured.' };
  }

  try {
    const res = await fetch(targetUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to update inquiry:', err);
    return { success: false, message: 'Network error updating inquiry' };
  }
}

/**
 * Delete an inquiry
 */
export async function deleteInquiry(
  id: string,
  token: string
): Promise<{ success: boolean; message?: string }> {
  const targetUrl = resolveInquiryUrl(`/${id}`);
  if (!targetUrl) {
    return { success: false, message: 'Inquiry API is not configured.' };
  }

  try {
    const res = await fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to delete inquiry:', err);
    return { success: false, message: 'Network error deleting inquiry' };
  }
}
