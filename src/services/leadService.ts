import { supabase } from '@/lib/supabaseClient';
import { DEALERS_DATA } from '@/data/dealersData';
import { LeadData, SubmitLeadResponse } from '@/types/lead';

/**
 * Geo-Matching: Tìm đại lý cùng tỉnh, fallback sang Hồ Chí Minh
 */
export function matchDealerByProvince(province: string): string {
  const dealer = DEALERS_DATA.find((d) => d.province === province);
  return dealer?.id || 'hq-hcm'; // Default: Tổng kho Hồ Chí Minh
}

/**
 * Lấy thông tin đại lý theo ID
 */
export function getDealerInfo(dealerId: string) {
  return DEALERS_DATA.find((d) => d.id === dealerId) || DEALERS_DATA[0];
}

/**
 * Gửi lead lên Supabase
 */
export async function submitLeadToSupabase(leadData: LeadData): Promise<SubmitLeadResponse> {
  try {
    // Sử dụng geo-matching để gán đại lý
    const assignedDealerId = matchDealerByProvince(leadData.province);
    const dealerInfo = getDealerInfo(assignedDealerId);

    // Chuẩn bị data để gửi
    const supabaseData = {
      customer_phone: leadData.customer_phone,
      province: leadData.province,
      district: leadData.district || null,
      crop_type: leadData.crop_type || null,
      lead_type: leadData.lead_type,
      calculator_data: leadData.calculator_data,
      notes: leadData.notes || null,
      assigned_dealer_id: assignedDealerId,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    // Gửi lên Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([supabaseData])
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error(error.message);
    }

    return {
      success: true,
      lead_id: data?.id,
      message: 'Yêu cầu của bạn đã được gửi đi thành công!',
      assigned_dealer: {
        id: dealerInfo.id,
        name: dealerInfo.name,
        phone: dealerInfo.phone,
      },
    };
  } catch (error) {
    console.error('Lead submission error:', error);
    throw error;
  }
}

/**
 * Kiểm tra xem người dùng đã gửi lead hay chưa (sử dụng localStorage)
 */
export function getLeadSubmissionHistory(phone: string): {
  hasSubmitted: boolean;
  lastSubmittedAt: string | null;
  count: number;
} {
  const key = `lead_history_${phone}`;
  const stored = localStorage.getItem(key);

  if (!stored) {
    return {
      hasSubmitted: false,
      lastSubmittedAt: null,
      count: 0,
    };
  }

  const parsed = JSON.parse(stored);
  return {
    hasSubmitted: true,
    lastSubmittedAt: parsed.lastSubmittedAt,
    count: parsed.count || 1,
  };
}

/**
 * Lưu lịch sử gửi lead vào localStorage
 */
export function saveLeadSubmissionHistory(phone: string): void {
  const key = `lead_history_${phone}`;
  const history = getLeadSubmissionHistory(phone);

  const newData = {
    lastSubmittedAt: new Date().toISOString(),
    count: history.count + 1,
    submissionTimestamps: [
      ...(JSON.parse(localStorage.getItem(key) || '{}').submissionTimestamps || []),
      new Date().toISOString(),
    ],
  };

  localStorage.setItem(key, JSON.stringify(newData));
}

/**
 * Xóa lịch sử lead submission
 */
export function clearLeadSubmissionHistory(phone: string): void {
  const key = `lead_history_${phone}`;
  localStorage.removeItem(key);
}
