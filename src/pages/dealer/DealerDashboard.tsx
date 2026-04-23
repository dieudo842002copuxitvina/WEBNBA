import StatCard from '@/components/StatCard';
import InsightCard from '@/components/InsightCard';
import { orders, dealerProducts, dealerInsights, products, dailyRevenue } from '@/data/mock';
import { formatVND } from '@/components/ProductCard';
import { Package, ShoppingCart, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const statusColors: Record<string, string> = {
  pending: 'bg-warning/10 text-warning',
  confirmed: 'bg-info/10 text-info',
  processing: 'bg-primary/10 text-primary',
  shipping: 'bg-accent/10 text-accent',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
};

const statusLabels: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  delivered: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

export { statusColors, statusLabels };

export default function DealerDashboard() {
  const dealerId = 'd-1';
  const dealerOrders = orders.filter(o => o.dealerId === dealerId);
  const myProducts = dealerProducts.filter(dp => dp.dealerId === dealerId);
  const totalRevenue = dealerOrders.reduce((s, o) => s + o.total, 0);
  const lowStock = myProducts.filter(dp => dp.stock < 20);
  const pendingOrders = dealerOrders.filter(o => o.status === 'pending').length;

  // Top products by quantity sold
  const productSales = dealerOrders.flatMap(o => o.items).reduce((acc, item) => {
    acc[item.productName] = (acc[item.productName] || 0) + item.quantity;
    return acc;
  }, {} as Record<string, number>);
  const topProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, qty]) => ({ name: name.length > 25 ? name.slice(0, 25) + '...' : name, quantity: qty }));

  return (
    <div className="container py-8">
      <h1 className="font-display text-3xl font-bold mb-2">Dashboard Đại lý</h1>
      <p className="text-muted-foreground mb-6">Đại lý Nông Phát – Đồng Nai</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Đơn hàng" value={dealerOrders.length.toString()} change={12} icon={ShoppingCart} />
        <StatCard title="Doanh thu" value={formatVND(totalRevenue)} change={18} icon={TrendingUp} />
        <StatCard title="Sản phẩm" value={myProducts.length.toString()} icon={Package} />
        <StatCard title="Tồn kho thấp" value={lowStock.length.toString()} change={lowStock.length > 0 ? -15 : 0} icon={AlertTriangle} iconColor="text-warning" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Doanh thu 7 ngày gần nhất (triệu VND)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dailyRevenue}>
                <XAxis dataKey="day" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Bar dataKey="revenue" fill="hsl(145,63%,32%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Top sản phẩm bán chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topProducts} layout="vertical">
                <XAxis type="number" fontSize={11} />
                <YAxis dataKey="name" type="category" fontSize={10} width={130} />
                <Tooltip />
                <Bar dataKey="quantity" fill="hsl(35,80%,55%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Đơn hàng gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dealerOrders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-semibold text-sm">{formatVND(order.total)}</p>
                    <Badge className={`${statusColors[order.status]} text-[10px] border-0`}>
                      {statusLabels[order.status]}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Tồn kho sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myProducts.map(dp => {
                const prod = products.find(p => p.id === dp.productId);
                const isLow = dp.stock < 20;
                return (
                  <div key={dp.productId} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{prod?.name}</p>
                      <p className="text-xs text-muted-foreground">{formatVND(dp.price)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${isLow ? 'text-destructive' : 'text-success'}`}>
                        {dp.stock}
                      </span>
                      {isLow && <Badge variant="destructive" className="text-[10px]">⚠ Thấp</Badge>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="font-display text-xl font-bold mb-4">Gợi ý thông minh</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {dealerInsights.map((insight, i) => <InsightCard key={i} insight={insight} />)}
        </div>
      </div>
    </div>
  );
}
