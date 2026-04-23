import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, PhoneCall, ChevronUp, Store, Building2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dealersData, Dealer } from '@/data/dealersData';

// Fix Leaflet's default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function DealerDirectoryPage() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeDealerId, setActiveDealerId] = useState<string | null>(null);

  // Focus coordinate (center of Vietnam roughly)
  const mapCenter: [number, number] = [11.8, 107.5];

  return (
    <div className="relative w-full h-[calc(100vh-var(--topnav-h,64px))] flex flex-col md:flex-row overflow-hidden bg-background">
      
      {/* MAP LAYER (Mobile: Fullscreen z-0, Desktop: Left 60%) */}
      <div className="absolute inset-0 md:relative md:w-[60%] lg:w-[60%] h-full min-h-[500px] z-0">
        <MapContainer 
          center={mapCenter} 
          zoom={6} 
          scrollWheelZoom={true} 
          className="w-full h-full min-h-[500px] z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {dealersData.map(dealer => (
            <Marker 
              key={dealer.id} 
              position={[dealer.lat, dealer.lng]}
              eventHandlers={{
                click: () => setActiveDealerId(dealer.id),
              }}
            >
              <Popup>
                <div className="font-sans min-w-[150px]">
                  <strong className="block text-sm text-primary mb-1">{dealer.name}</strong>
                  <span className="text-xs text-muted-foreground block mb-2">{dealer.address}</span>
                  <a href={`tel:${dealer.phone}`} className="text-xs font-bold text-[#F57C00] flex items-center gap-1">
                    <PhoneCall className="w-3 h-3" /> Gọi: {dealer.phone}
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* DESKTOP LIST (Right 40%) */}
      <div className="hidden md:flex md:w-[40%] lg:w-[40%] h-full flex-col bg-card border-l z-10 shadow-xl">
        <div className="p-5 border-b bg-background">
          <h1 className="text-2xl font-display font-bold">Điểm phân phối</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {dealersData.length} điểm bán trên toàn quốc
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {dealersData.map(d => (
            <DealerCard 
              key={d.id} 
              dealer={d} 
              isActive={activeDealerId === d.id} 
              onClick={() => setActiveDealerId(d.id)}
            />
          ))}
        </div>
      </div>

      {/* MOBILE BOTTOM SHEET (z-40) */}
      <motion.div 
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.y < -50) setSheetOpen(true);
          if (info.offset.y > 50) setSheetOpen(false);
        }}
        animate={{ y: sheetOpen ? 0 : 'calc(100% - 140px)' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="md:hidden absolute bottom-0 left-0 w-full h-[75vh] bg-background z-40 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col"
      >
        {/* Handle */}
        <div 
          className="w-full pt-3 pb-2 flex justify-center cursor-grab active:cursor-grabbing touch-none"
          onClick={() => setSheetOpen(!sheetOpen)}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>
        
        <div className="px-5 pb-3 border-b flex justify-between items-center bg-background" onClick={() => setSheetOpen(!sheetOpen)}>
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Store className="w-5 h-5 text-primary" /> Danh sách Đại lý
            </h2>
            <p className="text-xs text-muted-foreground">{dealersData.length} kết quả gần bạn</p>
          </div>
          {!sheetOpen && <ChevronUp className="w-5 h-5 text-muted-foreground animate-bounce" />}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 pb-safe-offset-20">
          {dealersData.map(d => (
            <DealerCard 
              key={d.id} 
              dealer={d} 
              isActive={activeDealerId === d.id} 
              onClick={() => setActiveDealerId(d.id)}
            />
          ))}
        </div>
      </motion.div>

    </div>
  );
}

// ─── DEALER CARD COMPONENT ──────────────────────────────────────────────────

function DealerCard({ dealer, isActive, onClick }: { dealer: Dealer; isActive: boolean; onClick: () => void }) {
  const isHQ = dealer.type === 'head-office';

  return (
    <div 
      className={`bg-white rounded-2xl p-4 shadow-sm border transition-all cursor-pointer ${isActive ? 'border-primary ring-1 ring-primary/20' : 'border-border hover:border-primary/40'}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-base text-gray-900 flex items-center gap-1.5 leading-tight pr-2">
          {isHQ ? <Building2 className="w-4 h-4 text-primary shrink-0" /> : <Store className="w-4 h-4 text-secondary shrink-0" />}
          {dealer.name}
        </h3>
        <Badge variant={isHQ ? 'default' : 'outline'} className={isHQ ? 'bg-primary text-primary-foreground shrink-0' : 'text-xs shrink-0 text-muted-foreground'}>
          {isHQ ? 'Tổng kho' : dealer.type === 'branch' ? 'VPĐD' : 'Đại lý'}
        </Badge>
      </div>
      
      <p className="text-[13px] text-muted-foreground flex items-start gap-1.5 mb-3">
        <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-muted-foreground/70" /> 
        <span className="line-clamp-2">{dealer.address}</span>
      </p>

      {/* Dịch vụ đặc thù */}
      {!isHQ && dealer.services && dealer.services.length > 0 && (
        <div className="mb-4">
          <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-500 mb-2">Dịch vụ đặc thù</p>
          <div className="flex flex-wrap gap-1.5">
            {dealer.services.map((svc, idx) => (
              <span 
                key={idx} 
                className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-medium border border-primary/10"
              >
                {svc}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button 
          className="w-full rounded-xl h-11 bg-[#F57C00] text-white hover:bg-[#E65100] font-bold shadow-md shadow-[#F57C00]/20 transition-transform active:scale-95"
          asChild
        >
          <a href={`tel:${dealer.phone}`} onClick={(e) => e.stopPropagation()}>
            <PhoneCall className="w-4 h-4 mr-2" /> Gọi ngay
          </a>
        </Button>
      </div>
    </div>
  );
}
