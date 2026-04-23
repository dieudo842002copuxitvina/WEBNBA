import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '@/lib/tracking';
import { toast } from 'sonner';

interface InquiryFormProps {
  productId?: string;
  productName?: string;
  dealerId?: string;
  dealerName?: string;
}

export default function InquiryForm({ productId, productName, dealerId, dealerName }: InquiryFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    trackEvent('inquiry_submit', { productId, productName, dealerId, dealerName });
    setSubmitted(true);
    toast.success('Yêu cầu tư vấn đã được gửi! Đại lý sẽ liên hệ bạn sớm.');
  };

  if (submitted) {
    return (
      <Card className="border-success/30 bg-success/5">
        <CardContent className="p-5 text-center">
          <CheckCircle2 className="w-10 h-10 text-success mx-auto mb-3" />
          <p className="font-semibold text-success">Đã gửi yêu cầu!</p>
          <p className="text-sm text-muted-foreground mt-1">Đại lý sẽ liên hệ bạn trong vòng 30 phút</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-5">
        <h4 className="font-semibold text-sm mb-3">📋 Yêu cầu tư vấn nhanh</h4>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Họ tên *"
            value={name}
            onChange={e => setName(e.target.value)}
            className="h-12"
          />
          <Input
            placeholder="Số điện thoại *"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="h-12"
          />
          {productName && (
            <p className="text-xs text-muted-foreground bg-muted px-3 py-2 rounded-md">
              Sản phẩm: <span className="font-medium text-foreground">{productName}</span>
            </p>
          )}
          <Button type="submit" className="w-full h-12 text-base font-semibold">
            <Send className="w-4 h-4 mr-2" /> Gửi yêu cầu
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
