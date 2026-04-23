export type LeadType = 'bom-tuoi' | 'cham-phan' | 'ai-diagnosis' | 'general';

export interface LeadData {
  customer_phone: string;
  province: string;
  district?: string;
  crop_type?: string;
  lead_type: LeadType;
  calculator_data: Record<string, any>;
  notes?: string;
  assigned_dealer_id?: string;
}

export interface SubmitLeadResponse {
  success: boolean;
  lead_id?: string;
  message: string;
  assigned_dealer?: {
    id: string;
    name: string;
    phone?: string;
  };
}
