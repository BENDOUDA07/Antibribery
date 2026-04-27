import { useState } from 'react';
import { MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import moroccoMapImg from 'figma:asset/2a383796fc6d6c45f79cdf6be15eb05b70861d3b.png';

const regionData = [
  {
    name: 'Casablanca-Settat',
    reports: 58,
    risk: 'high',
    trend: '+15%',
    cities: ['Casablanca', 'Settat', 'Mohammedia', 'El Jadida'],
    coordinates: { lat: 33.5731, lng: -7.5898 }, // Casablanca
  },
  {
    name: 'Rabat-Salé-Kénitra',
    reports: 42,
    risk: 'high',
    trend: '+8%',
    cities: ['Rabat', 'Salé', 'Kénitra', 'Témara'],
    coordinates: { lat: 34.0209, lng: -6.8416 }, // Rabat
  },
  {
    name: 'Fès-Meknès',
    reports: 35,
    risk: 'medium',
    trend: '+5%',
    cities: ['Fès', 'Meknès', 'Taza', 'Ifrane'],
    coordinates: { lat: 34.0181, lng: -5.0078 }, // Fès
  },
  {
    name: 'Marrakech-Safi',
    reports: 38,
    risk: 'medium',
    trend: '+12%',
    cities: ['Marrakech', 'Safi', 'Essaouira', 'El Kelaa'],
    coordinates: { lat: 31.6295, lng: -7.9811 }, // Marrakech
  },
  {
    name: 'Tanger-Tétouan-Al Hoceïma',
    reports: 31,
    risk: 'medium',
    trend: '+3%',
    cities: ['Tanger', 'Tétouan', 'Al Hoceïma', 'Larache'],
    coordinates: { lat: 35.7595, lng: -5.8340 }, // Tanger
  },
  {
    name: "L'Oriental",
    reports: 18,
    risk: 'low',
    trend: '-2%',
    cities: ['Oujda', 'Nador', 'Berkane', 'Taourirt'],
    coordinates: { lat: 34.6814, lng: -1.9086 }, // Oujda
  },
  {
    name: 'Souss-Massa',
    reports: 26,
    risk: 'low',
    trend: '+1%',
    cities: ['Agadir', 'Inezgane', 'Taroudant', 'Tiznit'],
    coordinates: { lat: 30.4278, lng: -9.5981 }, // Agadir
  },
  {
    name: 'Drâa-Tafilalet',
    reports: 12,
    risk: 'low',
    trend: '-5%',
    cities: ['Errachidia', 'Ouarzazate', 'Zagora', 'Tinghir'],
    coordinates: { lat: 31.9314, lng: -4.4316 }, // Errachidia
  },
  {
    name: 'Béni Mellal-Khénifra',
    reports: 22,
    risk: 'low',
    trend: '+4%',
    cities: ['Béni Mellal', 'Khénifra', 'Khouribga', 'Azilal'],
    coordinates: { lat: 32.3373, lng: -6.3498 }, // Béni Mellal
  },
];

const riskColors = {
  high: 'bg-red-100 text-[#E24B4A] border-red-200',
  medium: 'bg-[#FEF3E2] text-[#EF9F27] border-[#EF9F27]/20',
  low: 'bg-green-100 text-[#639922] border-green-200',
};

const regionColors = {
  high: '#E24B4A',
  medium: '#EF9F27',
  low: '#639922',
};

export function MapView() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<typeof regionData[0] | null>(null);

  const handleRegionClick = (region: typeof regionData[0]) => {
    setSelectedRegion(region);
  };

  const totalReports = regionData.reduce((sum, region) => sum + region.reports, 0);
  const highRiskRegions = regionData.filter(r => r.risk === 'high').length;
  const avgReports = Math.round(totalReports / regionData.length);

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-semibold text-[#1a3a5c] mt-1" style={{ fontWeight: 600 }}>
                  {totalReports}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk Regions</p>
                <p className="text-2xl font-semibold text-[#E24B4A] mt-1" style={{ fontWeight: 600 }}>
                  {highRiskRegions}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#E24B4A]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg per Region</p>
                <p className="text-2xl font-semibold text-[#1a3a5c] mt-1" style={{ fontWeight: 600 }}>
                  {avgReports}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1a3a5c]" />
              Morocco - Regional Risk Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="relative">
                {/* Base Map Image */}
                <img
                  src={moroccoMapImg}
                  alt="Morocco Regional Map"
                  className="w-full h-auto rounded-lg"
                />

                {/* Interactive SVG Overlay */}
                <svg
                  viewBox="0 0 1000 720"
                  className="absolute inset-0 w-full h-full"
                  style={{ pointerEvents: 'all' }}
                >
                  {/* Tanger-Tétouan-Al Hoceïma - Northern region (orange in image) */}
                  <path
                    d="M 420 35 L 520 40 L 600 55 L 660 75 L 680 95 L 660 115 L 620 125 L 560 130 L 500 125 L 440 110 L 400 90 L 390 65 Z"
                    fill={hoveredRegion === 'Tanger-Tétouan-Al Hoceïma' ? 'rgba(239, 159, 39, 0.4)' : 'transparent'}
                    stroke={hoveredRegion === 'Tanger-Tétouan-Al Hoceïma' ? '#EF9F27' : 'transparent'}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegion('Tanger-Tétouan-Al Hoceïma')}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionData[4])}
                  >
                    <title>Tanger-Tétouan-Al Hoceïma: 31 reports (Medium Risk)</title>
                  </path>

                  {/* L'Oriental - Eastern region (green in image) */}
                  <path
                    d="M 680 95 L 820 115 L 870 145 L 890 190 L 885 250 L 860 300 L 820 330 L 760 345 L 700 335 L 660 305 L 640 260 L 635 210 L 640 160 L 660 115 Z"
                    fill={hoveredRegion === "L'Oriental" ? 'rgba(99, 153, 34, 0.4)' : 'transparent'}
                    stroke={hoveredRegion === "L'Oriental" ? '#639922' : 'transparent'}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegion("L'Oriental")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionData[5])}
                  >
                    <title>L'Oriental: 18 reports (Low Risk)</title>
                  </path>

                  {/* Rabat-Salé-Kénitra - Northern coastal (red in image) */}
                  <path
                    d="M 390 90 L 440 110 L 500 125 L 540 145 L 560 175 L 550 210 L 520 235 L 470 245 L 410 240 L 360 220 L 330 190 L 320 150 L 340 115 Z"
                    fill={hoveredRegion === 'Rabat-Salé-Kénitra' ? 'rgba(226, 75, 74, 0.4)' : 'transparent'}
                    stroke={hoveredRegion === 'Rabat-Salé-Kénitra' ? '#E24B4A' : 'transparent'}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegion('Rabat-Salé-Kénitra')}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionData[1])}
                  >
                    <title>Rabat-Salé-Kénitra: 42 reports (High Risk)</title>
                  </path>

                  {/* Fès-Meknès - Center-north (orange in image) */}
                  <path
                    d="M 540 145 L 620 145 L 660 160 L 680 195 L 685 240 L 675 280 L 640 305 L 590 315 L 540 310 L 510 285 L 500 250 L 510 210 L 530 175 Z"
                    fill={hoveredRegion === 'Fès-Meknès' ? 'rgba(239, 159, 39, 0.4)' : 'transparent'}
                    stroke={hoveredRegion === 'Fès-Meknès' ? '#EF9F27' : 'transparent'}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegion('Fès-Meknès')}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionData[2])}
                  >
                    <title>Fès-Meknès: 35 reports (Medium Risk)</title>
                  </path>

                  {/* Casablanca-Settat - Western coastal (red in image) */}
                  <path
                    d="M 320 220 L 360 220 L 410 240 L 450 265 L 460 305 L 445 345 L 410 375 L 360 390 L 310 385 L 270 365 L 240 335 L 230 290 L 245 250 Z"
                    fill={hoveredRegion === 'Casablanca-Settat' ? 'rgba(226, 75, 74, 0.4)' : 'transparent'}
                    stroke={hoveredRegion === 'Casablanca-Settat' ? '#E24B4A' : 'transparent'}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegion('Casablanca-Settat')}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionData[0])}
                  >
                    <title>Casablanca-Settat: 58 reports (High Risk)</title>
                  </path>

                  {/* Béni Mellal-Khénifra - Central (light yellow in image) */}
                  <path
                    d="M 460 310 L 540 310 L 590 315 L 620 340 L 640 380 L 640 420 L 620 455 L 580 475 L 530 485 L 480 480 L 445 455 L 425 415 L 425 370 L 445 335 Z"
                    fill={hoveredRegion === 'Béni Mellal-Khénifra' ? 'rgba(99, 153, 34, 0.4)' : 'transparent'}
                    stroke={hoveredRegion === 'Béni Mellal-Khénifra' ? '#639922' : 'transparent'}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegion('Béni Mellal-Khénifra')}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionData[8])}
                  >
                    <title>Béni Mellal-Khénifra: 22 reports (Low Risk)</title>
                  </path>

                  {/* Marrakech-Safi - Central-west (orange in image) */}
                  <path
                    d="M 240 365 L 310 385 L 360 390 L 410 375 L 445 390 L 470 425 L 470 465 L 450 505 L 410 535 L 360 550 L 310 545 L 270 525 L 235 495 L 215 455 L 210 410 Z"
                    fill={hoveredRegion === 'Marrakech-Safi' ? 'rgba(239, 159, 39, 0.4)' : 'transparent'}
                    stroke={hoveredRegion === 'Marrakech-Safi' ? '#EF9F27' : 'transparent'}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegion('Marrakech-Safi')}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionData[3])}
                  >
                    <title>Marrakech-Safi: 38 reports (Medium Risk)</title>
                  </path>

                  {/* Drâa-Tafilalet - Southeast (light blue/green in image) */}
                  <path
                    d="M 480 480 L 580 475 L 640 485 L 700 510 L 750 550 L 780 600 L 785 660 L 760 700 L 710 720 L 640 715 L 570 690 L 510 650 L 470 600 L 450 545 L 450 500 Z"
                    fill={hoveredRegion === 'Drâa-Tafilalet' ? 'rgba(99, 153, 34, 0.4)' : 'transparent'}
                    stroke={hoveredRegion === 'Drâa-Tafilalet' ? '#639922' : 'transparent'}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegion('Drâa-Tafilalet')}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionData[7])}
                  >
                    <title>Drâa-Tafilalet: 12 reports (Low Risk)</title>
                  </path>

                  {/* Souss-Massa - Southwest (green in image) */}
                  <path
                    d="M 235 525 L 310 545 L 360 550 L 410 535 L 450 545 L 470 580 L 470 620 L 450 660 L 410 690 L 360 705 L 310 700 L 270 680 L 235 650 L 210 610 L 200 565 Z"
                    fill={hoveredRegion === 'Souss-Massa' ? 'rgba(99, 153, 34, 0.4)' : 'transparent'}
                    stroke={hoveredRegion === 'Souss-Massa' ? '#639922' : 'transparent'}
                    strokeWidth="3"
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegion('Souss-Massa')}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(regionData[6])}
                  >
                    <title>Souss-Massa: 26 reports (Low Risk)</title>
                  </path>
                </svg>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: regionColors.low }}></div>
                  <span className="text-sm text-gray-600">Low Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: regionColors.medium }}></div>
                  <span className="text-sm text-gray-600">Medium Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: regionColors.high }}></div>
                  <span className="text-sm text-gray-600">High Risk</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-600 mt-4">
                {hoveredRegion ? `Hovering: ${hoveredRegion}` : 'Hover over or click on a region to view detailed information'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Region Details */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle>
              {selectedRegion ? 'Region Details' : 'Regional Statistics'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedRegion ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#1a3a5c] mb-2" style={{ fontWeight: 600 }}>
                    {selectedRegion.name}
                  </h3>
                  <Badge className={`${riskColors[selectedRegion.risk as keyof typeof riskColors]} border capitalize`}>
                    {selectedRegion.risk} Risk
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Total Reports</span>
                    <span className="font-semibold text-[#1a3a5c]">{selectedRegion.reports}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Trend</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-600">{selectedRegion.trend}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">Coordinates</span>
                    <span className="text-xs text-gray-500">
                      {selectedRegion.coordinates.lat.toFixed(4)}, {selectedRegion.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Major Cities</p>
                  <div className="space-y-2">
                    {selectedRegion.cities.map((city) => (
                      <div key={city} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{city}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {regionData.map((region) => (
                  <button
                    key={region.name}
                    onClick={() => handleRegionClick(region)}
                    className="w-full text-left flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-[#1a3a5c] transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{region.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{region.reports} reports</p>
                    </div>
                    <Badge className={`${riskColors[region.risk as keyof typeof riskColors]} border capitalize`}>
                      {region.risk}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}