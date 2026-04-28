import { Download, FileText, Share2, TrendingUp, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const summaryData = {
  totalReports: 282,
  highRiskAreas: 2,
  mediumRiskAreas: 3,
  lowRiskAreas: 4,
};

const regionChartData = [
  { region: 'Casablanca-Settat', reports: 58 },
  { region: 'Rabat-Salé-Kénitra', reports: 42 },
  { region: 'Marrakech-Safi', reports: 38 },
  { region: 'Fès-Meknès', reports: 35 },
  { region: 'Tanger-Tétouan', reports: 31 },
  { region: 'Souss-Massa', reports: 26 },
  { region: 'Béni Mellal', reports: 22 },
  { region: "L'Oriental", reports: 18 },
  { region: 'Drâa-Tafilalet', reports: 12 },
];

const timelineData = [
  { month: 'Oct', reports: 45 },
  { month: 'Nov', reports: 52 },
  { month: 'Dec', reports: 48 },
  { month: 'Jan', reports: 61 },
  { month: 'Feb', reports: 58 },
  { month: 'Mar', reports: 76 },
];

const regionTableData = [
  {
    region: 'Casablanca-Settat',
    reports: 58,
    risk: 'high',
    resolved: 32,
    pending: 18,
    investigating: 8,
    change: '+12%',
  },
  {
    region: 'Rabat-Salé-Kénitra',
    reports: 42,
    risk: 'high',
    resolved: 24,
    pending: 12,
    investigating: 6,
    change: '+8%',
  },
  {
    region: 'Marrakech-Safi',
    reports: 38,
    risk: 'medium',
    resolved: 28,
    pending: 7,
    investigating: 3,
    change: '-2%',
  },
  {
    region: 'Fès-Meknès',
    reports: 35,
    risk: 'medium',
    resolved: 22,
    pending: 9,
    investigating: 4,
    change: '+5%',
  },
  {
    region: 'Tanger-Tétouan-Al Hoceïma',
    reports: 31,
    risk: 'medium',
    resolved: 18,
    pending: 8,
    investigating: 5,
    change: '+15%',
  },
  {
    region: 'Souss-Massa',
    reports: 26,
    risk: 'low',
    resolved: 20,
    pending: 4,
    investigating: 2,
    change: '+3%',
  },
  {
    region: 'Béni Mellal-Khénifra',
    reports: 22,
    risk: 'low',
    resolved: 16,
    pending: 4,
    investigating: 2,
    change: '+7%',
  },
  {
    region: "L'Oriental",
    reports: 18,
    risk: 'low',
    resolved: 14,
    pending: 3,
    investigating: 1,
    change: '-5%',
  },
  {
    region: 'Drâa-Tafilalet',
    reports: 12,
    risk: 'low',
    resolved: 10,
    pending: 1,
    investigating: 1,
    change: '0%',
  },
];

const riskColors = {
  high: 'bg-red-100 text-[#E24B4A] border-red-200',
  medium: 'bg-[#FEF3E2] text-[#EF9F27] border-[#EF9F27]/20',
  low: 'bg-green-100 text-[#639922] border-green-200',
};

export function ReportResults() {
  const handleDownloadPDF = () => {
    // Simulate PDF download
    console.log('Downloading PDF report...');
  };

  const handleExportData = () => {
    // Simulate data export
    console.log('Exporting data...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 bg-[#1a3a5c] rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
                Monthly Report - Morocco
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Generated on March 28, 2026 • Reporting Period: March 1-28, 2026
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleExportData}
            variant="outline"
            className="border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c]/5 gap-2"
          >
            <Share2 className="w-4 h-4" />
            Export Data
          </Button>
          <Button
            onClick={handleDownloadPDF}
            className="bg-[#1a3a5c] hover:bg-[#1a3a5c]/90 text-white gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Reports</p>
                <p className="text-3xl font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
                  {summaryData.totalReports}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">+18% from last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 mb-1">High Risk Areas</p>
                <p className="text-3xl font-semibold text-[#E24B4A]" style={{ fontWeight: 600 }}>
                  {summaryData.highRiskAreas}
                </p>
                <p className="text-sm text-red-700 mt-2">Requires attention</p>
              </div>
              <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#E24B4A]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#EF9F27]/20 bg-[#FEF3E2]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#EF9F27] mb-1">Medium Risk Areas</p>
                <p className="text-3xl font-semibold text-[#EF9F27]" style={{ fontWeight: 600 }}>
                  {summaryData.mediumRiskAreas}
                </p>
                <p className="text-sm text-[#EF9F27] mt-2">Under monitoring</p>
              </div>
              <div className="w-12 h-12 bg-[#EF9F27]/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#EF9F27]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 mb-1">Low Risk Areas</p>
                <p className="text-3xl font-semibold text-[#639922]" style={{ fontWeight: 600 }}>
                  {summaryData.lowRiskAreas}
                </p>
                <p className="text-sm text-green-700 mt-2">Stable conditions</p>
              </div>
              <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-[#639922]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Reports by Region */}
        <Card className="border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-lg">Reports by Region</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={regionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="region" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="reports" fill="#1a3a5c" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart - Reports Over Time */}
        <Card className="border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-lg">Reports Over Time (6 Months)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month"
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '14px' }} />
                <Line 
                  type="monotone" 
                  dataKey="reports" 
                  stroke="#1a3a5c" 
                  strokeWidth={3}
                  dot={{ fill: '#1a3a5c', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Regional Data Table */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle>Detailed Regional Data</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Region</TableHead>
                  <TableHead className="font-semibold">Total Reports</TableHead>
                  <TableHead className="font-semibold">Risk Level</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Resolved</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Pending</TableHead>
                  <TableHead className="font-semibold hidden lg:table-cell">Investigating</TableHead>
                  <TableHead className="font-semibold">Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regionTableData.map((region) => (
                  <TableRow key={region.region} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">
                      {region.region}
                    </TableCell>
                    <TableCell className="font-semibold text-[#1a3a5c]">
                      {region.reports}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${riskColors[region.risk as keyof typeof riskColors]} border capitalize`}>
                        {region.risk}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 hidden md:table-cell">
                      {region.resolved}
                    </TableCell>
                    <TableCell className="text-gray-600 hidden md:table-cell">
                      {region.pending}
                    </TableCell>
                    <TableCell className="text-gray-600 hidden lg:table-cell">
                      {region.investigating}
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${
                        region.change.startsWith('+') ? 'text-green-600' : 
                        region.change.startsWith('-') ? 'text-red-600' : 
                        'text-gray-600'
                      }`}>
                        {region.change}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Insights */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle>Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-semibold text-[#E24B4A]">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Increased Activity in Casablanca-Settat</p>
                <p className="text-sm text-gray-600 mt-1">
                  This region shows a 12% increase in reports compared to last month. Recommend allocating additional investigative resources.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#FEF3E2] rounded-lg flex items-center justify-center">
                <span className="text-sm font-semibold text-[#EF9F27]">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Significant Spike in Tanger-Tétouan</p>
                <p className="text-sm text-gray-600 mt-1">
                  A 15% increase in reports suggests emerging patterns. Further analysis recommended to identify root causes.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-sm font-semibold text-[#639922]">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Positive Trend in L'Oriental</p>
                <p className="text-sm text-gray-600 mt-1">
                  Reports decreased by 5%, indicating effective prevention measures. Continue monitoring and share best practices with other regions.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
