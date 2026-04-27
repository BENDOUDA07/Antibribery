import { TrendingUp, AlertTriangle, FileText, MapPin, Filter, FilePlus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import moroccoMapImg from 'figma:asset/2a383796fc6d6c45f79cdf6be15eb05b70861d3b.png';

const mockMetrics = {
  totalReports: 248,
  underInvestigation: 34,
  flaggedHighRisk: 12,
};

const regionData = [
  { name: 'Casablanca-Settat', reports: 58, risk: 'high' },
  { name: 'Rabat-Salé-Kénitra', reports: 42, risk: 'high' },
  { name: 'Fès-Meknès', reports: 35, risk: 'medium' },
  { name: 'Marrakech-Safi', reports: 38, risk: 'medium' },
  { name: 'Tanger-Tétouan-Al Hoceïma', reports: 31, risk: 'medium' },
  { name: "L'Oriental", reports: 18, risk: 'low' },
  { name: 'Souss-Massa', reports: 26, risk: 'low' },
];

const mockCases = [
  {
    refId: 'REC-2026-042',
    category: 'Bribery - Public Official',
    region: 'Casablanca-Settat',
    riskLevel: 'high',
    status: 'Under Investigation',
    officer: 'M. Benali',
  },
  {
    refId: 'REC-2026-041',
    category: 'Extortion',
    region: 'Rabat-Salé-Kénitra',
    riskLevel: 'high',
    status: 'Under Investigation',
    officer: 'S. El Fassi',
  },
  {
    refId: 'REC-2026-040',
    category: 'Fraud',
    region: 'Marrakech-Safi',
    riskLevel: 'medium',
    status: 'Evidence Review',
    officer: 'K. Amrani',
  },
  {
    refId: 'REC-2026-039',
    category: 'Nepotism',
    region: 'Fès-Meknès',
    riskLevel: 'low',
    status: 'Closed',
    officer: 'A. Idrissi',
  },
  {
    refId: 'REC-2026-038',
    category: 'Bribery - Private Sector',
    region: 'Tanger-Tétouan-Al Hoceïma',
    riskLevel: 'medium',
    status: 'Under Investigation',
    officer: 'L. Tazi',
  },
  {
    refId: 'REC-2026-037',
    category: 'Embezzlement',
    region: 'Casablanca-Settat',
    riskLevel: 'high',
    status: 'Under Investigation',
    officer: 'M. Benali',
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

export function AuthorityDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
            Overview
          </h2>
          <p className="text-sm text-gray-600 mt-1">Key metrics and recent activity</p>
        </div>
        <Button
          onClick={() => navigate('/authority/generate-report')}
          className="bg-[#1a3a5c] hover:bg-[#1a3a5c]/90 text-white gap-2"
        >
          <FilePlus className="w-4 h-4" />
          Generate Report
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Reports</p>
                <p className="text-3xl font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
                  {mockMetrics.totalReports}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+12% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Under Investigation</p>
                <p className="text-3xl font-semibold text-[#EF9F27]" style={{ fontWeight: 600 }}>
                  {mockMetrics.underInvestigation}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm text-gray-600">Active cases</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#FEF3E2] rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#EF9F27]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-red-700 mb-1">Flagged / High Risk</p>
                <p className="text-3xl font-semibold text-[#E24B4A]" style={{ fontWeight: 600 }}>
                  {mockMetrics.flaggedHighRisk}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <AlertTriangle className="w-4 h-4 text-[#E24B4A]" />
                  <span className="text-sm text-red-700">Requires immediate attention</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[#E24B4A]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Morocco Map */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#1a3a5c]" />
            Reports by Region
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Map Visualization */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-4">
                <div className="relative">
                  {/* Base Map Image */}
                  <img
                    src={moroccoMapImg}
                    alt="Morocco Regional Map"
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: regionColors.low }}></div>
                    <span className="text-xs text-gray-600">Low Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: regionColors.medium }}></div>
                    <span className="text-xs text-gray-600">Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: regionColors.high }}></div>
                    <span className="text-xs text-gray-600">High Risk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Region Statistics */}
            <div className="space-y-3">
              <h4 className="font-medium text-[#1a3a5c] mb-4" style={{ fontWeight: 600 }}>
                Regional Breakdown
              </h4>
              {regionData.map((region) => (
                <div
                  key={region.name}
                  className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{region.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{region.reports} reports</p>
                  </div>
                  <Badge className={`${riskColors[region.risk as keyof typeof riskColors]} border capitalize`}>
                    {region.risk}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Cases Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Cases</CardTitle>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-200 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Ref ID</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Region</TableHead>
                  <TableHead className="font-semibold">Risk Level</TableHead>
                  <TableHead className="font-semibold hidden lg:table-cell">Status</TableHead>
                  <TableHead className="font-semibold hidden xl:table-cell">Assigned Officer</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCases.map((caseItem) => (
                  <TableRow key={caseItem.refId} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-[#1a3a5c]">
                      {caseItem.refId}
                    </TableCell>
                    <TableCell>{caseItem.category}</TableCell>
                    <TableCell className="text-gray-600 hidden md:table-cell">{caseItem.region}</TableCell>
                    <TableCell>
                      <Badge
                        className={`${riskColors[caseItem.riskLevel as keyof typeof riskColors]} border capitalize`}
                      >
                        {caseItem.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 hidden lg:table-cell">{caseItem.status}</TableCell>
                    <TableCell className="text-gray-600 hidden xl:table-cell">{caseItem.officer}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-[#1a3a5c]">
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}