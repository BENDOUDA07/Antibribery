import { useState } from 'react';
import { MapPin, Filter, Download, FileText, Calendar, TrendingUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import moroccoMapImg from 'figma:asset/2a383796fc6d6c45f79cdf6be15eb05b70861d3b.png';

const regionData = [
  { name: 'Casablanca-Settat', reports: 58, risk: 'high', trend: '+12%' },
  { name: 'Rabat-Salé-Kénitra', reports: 42, risk: 'high', trend: '+8%' },
  { name: 'Fès-Meknès', reports: 35, risk: 'medium', trend: '+5%' },
  { name: 'Marrakech-Safi', reports: 38, risk: 'medium', trend: '-2%' },
  { name: 'Tanger-Tétouan-Al Hoceïma', reports: 31, risk: 'medium', trend: '+15%' },
  { name: "L'Oriental", reports: 18, risk: 'low', trend: '-5%' },
  { name: 'Souss-Massa', reports: 26, risk: 'low', trend: '+3%' },
  { name: 'Drâa-Tafilalet', reports: 12, risk: 'low', trend: '0%' },
  { name: 'Béni Mellal-Khénifra', reports: 22, risk: 'low', trend: '+7%' },
];

const riskColors = {
  high: 'bg-red-100 text-[#E24B4A] border-red-200',
  medium: 'bg-[#FEF3E2] text-[#EF9F27] border-[#EF9F27]/20',
  low: 'bg-green-100 text-[#639922] border-green-200',
};

export function RegionalReports() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [dateRange, setDateRange] = useState('current_month');
  const [selectedRegionDetails, setSelectedRegionDetails] = useState<typeof regionData[0] | null>(null);

  const totalReports = regionData.reduce((sum, region) => sum + region.reports, 0);
  const highRiskCount = regionData.filter(r => r.risk === 'high').length;
  const mediumRiskCount = regionData.filter(r => r.risk === 'medium').length;
  const lowRiskCount = regionData.filter(r => r.risk === 'low').length;

  const handleGenerateReport = () => {
    navigate('/authority/report-results');
  };

  const handleScheduleReport = () => {
    navigate('/authority/schedule-report');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
            Regional Reports Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Monitor and analyze reports across all regions of Morocco
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleScheduleReport}
            variant="outline"
            className="border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c]/5 gap-2"
          >
            <Calendar className="w-4 h-4" />
            Schedule
          </Button>
          <Button
            onClick={handleGenerateReport}
            className="bg-[#1a3a5c] hover:bg-[#1a3a5c]/90 text-white gap-2"
          >
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700">High Risk Areas</p>
                <p className="text-2xl font-semibold text-[#E24B4A] mt-1" style={{ fontWeight: 600 }}>
                  {highRiskCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-200 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#E24B4A]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#EF9F27]/20 bg-[#FEF3E2]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#EF9F27]">Medium Risk Areas</p>
                <p className="text-2xl font-semibold text-[#EF9F27] mt-1" style={{ fontWeight: 600 }}>
                  {mediumRiskCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-[#EF9F27]/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#EF9F27]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700">Low Risk Areas</p>
                <p className="text-2xl font-semibold text-[#639922] mt-1" style={{ fontWeight: 600 }}>
                  {lowRiskCount}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#639922]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Bar */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="flex-1">
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="All Regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regionData.map((region) => (
                      <SelectItem key={region.name} value={region.name}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current_month">Current Month</SelectItem>
                    <SelectItem value="last_month">Last Month</SelectItem>
                    <SelectItem value="last_3_months">Last 3 Months</SelectItem>
                    <SelectItem value="last_6_months">Last 6 Months</SelectItem>
                    <SelectItem value="current_year">Current Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 gap-2"
            >
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content: Map and Regional Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Morocco Map */}
        <Card className="lg:col-span-2 border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1a3a5c]" />
              Morocco - Regional Risk Visualization
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <img
                src={moroccoMapImg}
                alt="Morocco Regional Map"
                className="w-full h-auto"
              />
              
              {/* Legend */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center justify-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#639922' }}></div>
                    <span className="text-sm text-gray-600">Low Risk (1-20 reports)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#EF9F27' }}></div>
                    <span className="text-sm text-gray-600">Medium Risk (21-40 reports)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E24B4A' }}></div>
                    <span className="text-sm text-gray-600">High Risk (41+ reports)</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedRegionDetails && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-[#1a3a5c] mb-2" style={{ fontWeight: 600 }}>
                  {selectedRegionDetails.name}
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Reports</p>
                    <p className="text-lg font-semibold text-[#1a3a5c]">{selectedRegionDetails.reports}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Risk Level</p>
                    <Badge className={`${riskColors[selectedRegionDetails.risk as keyof typeof riskColors]} border capitalize mt-1`}>
                      {selectedRegionDetails.risk}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Trend</p>
                    <p className="text-lg font-semibold text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      {selectedRegionDetails.trend}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Regional Data List */}
        <Card className="border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-lg">Regional Data</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {regionData
                .sort((a, b) => b.reports - a.reports)
                .map((region) => (
                  <button
                    key={region.name}
                    onClick={() => setSelectedRegionDetails(region)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedRegionDetails?.name === region.name
                        ? 'border-[#1a3a5c] bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-[#1a3a5c] hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-900">{region.name}</p>
                      <Badge className={`${riskColors[region.risk as keyof typeof riskColors]} border capitalize`}>
                        {region.risk}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{region.reports} reports</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3 h-3 ${region.trend.startsWith('+') ? 'text-green-600' : 'text-gray-500'}`} />
                        <span className={`text-xs ${region.trend.startsWith('+') ? 'text-green-600' : 'text-gray-500'}`}>
                          {region.trend}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
