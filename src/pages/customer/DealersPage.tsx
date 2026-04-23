import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, ArrowRight, CheckCircle2, ShieldCheck, Building2, Store, Clock } from 'lucide-react';
import { dealersData, Dealer } from '@/data/dealersData';
import { useFarmerProfile } from '@/hooks/useFarmerProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function DealerCard({ dealer, distance }: { dealer: Dealer; distance: number }) {
  // Config Badge based on type
  const typeConfig = {
    'head-office': { color: 'text-amber-600 bg-amber-50 border-amber-200', icon: ShieldCheck, label: 'Tổng Kho Trung Tâm', border: 'border-amber-400' },
    'branch': { color: 'text-blue-600 bg-blue-50 border-blue-200', icon: Building2, label: 'Văn Phòng Đại Diện', border: 'border-blue-300' },
    'dealer': { color: 'text-[#2D5A27] bg-[#2D5A27]/5 border-[#2D5A27]/20', icon: Store, label: 'Đại Lý Ủy Quyền', border: 'border-slate-200' },
  };
  
  const config = typeConfig[dealer.type] || typeConfig['dealer'];
  const Icon = config.icon;

  return (
    <Card className={`mb-4 overflow-hidden border-2 transition-all hover:shadow-lg ${config.border} bg-white`}>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <Badge variant="outline" className={`font-semibold flex items-center gap-1 ${config.color}`}>
                <Icon className="w-3 h-3" /> {config.label}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-[#2D5A27] font-medium bg-[#2D5A27]/10 px-2 py-0.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2D5A27] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                </span>
                Sẵn sàng phục vụ
              </div>
            </div>
            <h3 className="font-bold text-lg text-slate-800 leading-tight">{dealer.name}</h3>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-slate-600 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>{dealer.address}, {dealer.district}, {dealer.province}</span>
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Cách bạn: ~{distance} km</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {dealer.hours || 'Mở cửa: 8h00 - 17h00'}</span>
          </div>
        </div>

        {/* Services Chips */}
        {dealer.services && dealer.services.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {dealer.services.map((service, idx) => (
              <span key={idx} className="flex items-center gap-1 bg-[#2D5A27]/5 text-[#2D5A27] text-xs px-2 py-1 rounded-md border border-[#2D5A27]/10 font-medium">
                <CheckCircle2 className="w-3 h-3" /> {service}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-4">
          <Button variant="outline" className="flex-1 border-[#2D5A27] text-[#2D5A27] hover:bg-[#2D5A27]/5 rounded-xl h-11 font-semibold">
            <Phone className="w-4 h-4 mr-2" /> Gọi ngay
          </Button>
          <Button className="flex-1 bg-[#F57C00] hover:bg-[#E65100] text-white rounded-xl h-11 shadow-md shadow-orange-500/20 font-semibold border-0">
            Chuyển Dự Toán <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DealersPage() {
  const { profile, isLoaded } = useFarmerProfile();
  
  // Logic Auto-Routing
  const sortedDealers = useMemo(() => {
    const userProvince = profile.provinceName || 'Đồng Nai'; // Fallback for test if empty
    
    // Calculate mock distance: 
    // Same district = 5-15km, same province = 20-50km, else 100+km
    let dealersWithDistance = dealersData.map(d => {
      let dist = 150 + Math.floor(Math.random() * 200);
      let matchScore = 0;
      if (d.province === userProvince) {
        dist = 20 + Math.floor(Math.random() * 30);
        matchScore = 2;
        if (d.district === profile.districtName) {
          dist = 2 + Math.floor(Math.random() * 10);
          matchScore = 3;
        }
      }
      if (d.isHeadOffice) matchScore = 1; // HQ fallback
      return { dealer: d, distance: dist, score: matchScore };
    });

    // Check if we have any dealer in the same province
    const hasLocalDealer = dealersWithDistance.some(d => d.dealer.province === userProvince && !d.dealer.isHeadOffice);

    if (!hasLocalDealer) {
      // Force Head Office to top
      dealersWithDistance.forEach(d => {
        if (d.dealer.isHeadOffice) d.score = 999;
      });
    }

    // Sort by score desc, then distance asc
    return dealersWithDistance.sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;
      return a.distance - b.distance;
    });
  }, [profile.provinceName, profile.districtName]);

  if (!isLoaded) return null;

  const hasLocalDealer = sortedDealers.some(d => d.dealer.province === profile.provinceName && !d.dealer.isHeadOffice);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row overflow-hidden bg-slate-50">
      
      {/* MAP LAYER (Background on mobile, Left pane on desktop) */}
      <div className="absolute inset-0 z-0 md:relative md:w-[60%] md:h-full bg-[#E8F0F2]">
        {/* Mock Map Image */}
        <div className="w-full h-full bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=10.82,106.63&zoom=10&size=800x800&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x333333&style=feature:landscape|color:0xf5f5f5&style=feature:water|color:0xcbe6a3')] bg-cover bg-center opacity-70">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
          {/* Mock markers */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10" />
          <div className="absolute top-[40%] left-[60%] w-6 h-6 bg-[#10B981] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <Store className="w-3 h-3 text-white" />
          </div>
        </div>
        
        {/* Header Glassmorphism */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20 pointer-events-none">
          <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-2xl p-4 pointer-events-auto">
            <h1 className="text-xl font-bold text-slate-800 font-display">Trạm Điều Phối Đại Lý</h1>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> Vị trí của bạn: {profile.provinceName || 'Chưa xác định'}
            </p>
          </div>
        </div>
      </div>

      {/* LIST LAYER (BottomSheet on mobile, Right pane on desktop) */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 z-40 h-[50vh] bg-slate-50 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:relative md:w-[40%] md:h-full md:rounded-none md:shadow-[-10px_0_40px_rgba(0,0,0,0.05)] flex flex-col"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Mobile Handle */}
        <div className="w-full flex justify-center py-3 md:hidden shrink-0 cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full"></div>
        </div>

        <div className="px-5 pb-3 shrink-0">
          <h2 className="font-bold text-lg text-slate-800">Đại lý gần bạn nhất ({sortedDealers.length})</h2>
          {!hasLocalDealer && profile.provinceName && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex gap-3 shadow-sm">
              <ShieldCheck className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
              <p>Khu vực <strong>{profile.provinceName}</strong> hiện chưa có đại lý ủy quyền. <strong>Tổng kho Hồ Chí Minh</strong> sẽ trực tiếp xử lý và giao hàng tận rẫy cho bạn!</p>
            </div>
          )}
        </div>

        {/* Scrollable List */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 custom-scrollbar">
          {sortedDealers.map(({ dealer, distance }) => (
            <DealerCard key={dealer.id} dealer={dealer} distance={distance} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
