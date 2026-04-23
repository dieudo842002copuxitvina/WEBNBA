import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.');
    setName(''); setPhone(''); setMessage('');
  };

  return (
    <div className="container py-8">
      <div className="animate-slide-up max-w-2xl">
        <h1 className="font-display text-3xl font-bold mb-2">Liên hệ</h1>
        <p className="text-muted-foreground mb-8">Liên hệ với Nhà Bè Agri để được tư vấn giải pháp nông nghiệp phù hợp</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact info */}
        <div className="space-y-4">
          <Card className="animate-slide-up">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Hotline</h3>
                <a href="tel:1900636899" className="text-primary font-bold text-lg">1900 636 899</a>
                <p className="text-xs text-muted-foreground mt-1">Miễn phí cuộc gọi</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-info" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Email</h3>
                <p className="text-primary">info@nhabeagri.vn</p>
                <p className="text-xs text-muted-foreground mt-1">Phản hồi trong 24h</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Văn phòng</h3>
                <p className="text-sm">123 Nguyễn Văn Linh, Q.7, TP.HCM</p>
                <p className="text-xs text-muted-foreground mt-1">Thứ 2 – Thứ 7: 8:00 – 17:30</p>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-display font-semibold mb-1">Zalo OA</h3>
                <a href="https://zalo.me/nhabeagri" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold">@NhaBèAgri</a>
                <p className="text-xs text-muted-foreground mt-1">Chat trực tiếp, hỗ trợ nhanh</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact form */}
        <Card className="animate-slide-in-right">
          <CardContent className="p-8">
            <h2 className="font-display text-xl font-bold mb-6">Gửi yêu cầu tư vấn</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Họ tên</label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nguyễn Văn A" required className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Số điện thoại</label>
                <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="0901 234 567" required className="h-12" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Nội dung</label>
                <Textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Mô tả nhu cầu của bạn..." rows={5} required />
              </div>
              <Button type="submit" size="lg" className="w-full h-12 text-base">
                Gửi yêu cầu
              </Button>
              <p className="text-xs text-muted-foreground text-center">Chúng tôi sẽ liên hệ lại trong vòng 30 phút (giờ hành chính)</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
