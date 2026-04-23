import { supabase } from '@/integrations/supabase/client';

export interface LeadData {
  customer_phone: string;
  customer_name?: string;
  assigned_dealer_id?: string;
  lead_type?: string;
  province?: string;
  district?: string;
  calculator_data?: any;
  [key: string]: any;
}

// 1. Thêm biến môi trường cho Webhook
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL || '';

/**
 * Lưu thông tin Lead vào Supabase và kích hoạt Webhook ngầm (Silent execution)
 */
export async function submitLeadToSupabase(data: LeadData) {
  // Bước 1: Thực hiện lưu data vào bảng `leads` trên Supabase
  const { data: record, error } = await supabase
    .from('leads')
    .insert([{
      ...data,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) {
    console.error('Lỗi khi lưu Lead vào Supabase:', error);
    throw error;
  }

  // Bước 2: Bắn Webhook nếu có cấu hình URL
  if (WEBHOOK_URL && record) {
    const payload = {
      event: "new_lead",
      lead_id: record.id,
      customer_phone: record.customer_phone || data.customer_phone,
      dealer_assigned: record.assigned_dealer_id || data.assigned_dealer_id,
      lead_type: record.lead_type || data.lead_type,
      region: `${record.province || data.province || ''} - ${record.district || data.district || ''}`.replace(/^ - | - $/g, ''),
      details: record.calculator_data || data.calculator_data
    };

    // 3. Xử lý bất đồng bộ im lặng (Silent execution)
    // Dùng Promise.resolve() hoặc không await để fetch chạy ngầm, không block UI
    Promise.resolve().then(() => {
      fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      .then(res => {
        if (!res.ok) console.warn('Webhook responded with status:', res.status);
      })
      .catch((err) => {
        console.error('Lỗi khi bắn Webhook ngầm (Silent error):', err);
      });
    });
  }

  // Trả về record ngay lập tức cho UI hiển thị "Gửi thành công"
  return record;
}
