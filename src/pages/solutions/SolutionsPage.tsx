import { solutions, products } from '@/data/mock';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SolutionsPage() {
  return (
    <div className="container py-8">
      <div className="animate-slide-up max-w-2xl">
        <h1 className="font-display text-3xl font-bold mb-2">Giải pháp nông nghiệp</h1>
        <p className="text-muted-foreground mb-4">Các giải pháp trọn gói cho nông nghiệp công nghệ cao, thiết kế bởi đội ngũ kỹ sư Nhà Bè Agri</p>
        <Button asChild variant="outline" className="mb-8">
          <Link to="/giai-phap-tuoi">🌾 Xem giải pháp tưới theo cây trồng & tỉnh thành <ArrowRight className="ml-1 w-4 h-4" /></Link>
        </Button>
      </div>

      <div className="space-y-8">
        {solutions.map((sol, i) => (
          <Card key={sol.id} className="overflow-hidden animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="aspect-[16/9] md:aspect-auto md:min-h-[250px] bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center">
                  <span className="text-5xl md:text-6xl opacity-20">🌱</span>
                </div>
                <div className="p-5 md:p-8">
                  <h2 className="font-display text-2xl font-bold mb-3">{sol.title}</h2>
                  <p className="text-muted-foreground mb-6">{sol.description}</p>

                  <div className="space-y-2 mb-6">
                    {sol.benefits.map(b => (
                      <div key={b} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                        {b}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {sol.products.map(pid => {
                      const p = products.find(pr => pr.id === pid);
                      return p ? (
                        <Badge key={pid} variant="secondary" className="text-xs">{p.name.length > 30 ? p.name.slice(0, 30) + '...' : p.name}</Badge>
                      ) : null;
                    })}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" asChild className="w-full sm:w-auto">
                      <Link to="/lien-he">Tư vấn miễn phí <ArrowRight className="ml-2 w-4 h-4" /></Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                      <Link to="/products">Xem sản phẩm</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
