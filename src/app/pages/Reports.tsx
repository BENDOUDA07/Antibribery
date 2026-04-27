import { useState } from 'react';
import { FileText, Download, Eye, Calendar, TrendingUp, Filter, BarChart3 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Input } from '../components/ui/input';

const reports = [
  {
    id: 'RPT-2026-001',
    title: 'Monthly Bribery Analysis - March 2026',
    type: 'Monthly Report',
    date: '2026-03-28',
    generatedBy: 'System',
    status: 'Published',
    downloads: 45,
  },
  {
    id: 'RPT-2026-002',
    title: 'Casablanca Region Risk Assessment',
    type: 'Regional Analysis',
    date: '2026-03-25',
    generatedBy: 'M. Benali',
    status: 'Published',
    downloads: 32,
  },
  {
    id: 'RPT-2026-003',
    title: 'Q1 2026 Quarterly Summary',
    type: 'Quarterly Report',
    date: '2026-03-20',
    generatedBy: 'System',
    status: 'Published',
    downloads: 78,
  },
  {
    id: 'RPT-2026-004',
    title: 'Public Sector Corruption Trends',
    type: 'Trend Analysis',
    date: '2026-03-15',
    generatedBy: 'S. El Fassi',
    status: 'Published',
    downloads: 56,
  },
  {
    id: 'RPT-2026-005',
    title: 'High-Risk Cases Review - March',
    type: 'Case Review',
    date: '2026-03-10',
    generatedBy: 'K. Amrani',
    status: 'Draft',
    downloads: 12,
  },
  {
    id: 'RPT-2026-006',
    title: 'February Impact Assessment',
    type: 'Monthly Report',
    date: '2026-02-28',
    generatedBy: 'System',
    status: 'Published',
    downloads: 62,
  },
  {
    id: 'RPT-2026-007',
    title: 'Rabat Region Investigative Report',
    type: 'Regional Analysis',
    date: '2026-02-20',
    generatedBy: 'A. Idrissi',
    status: 'Published',
    downloads: 41,
  },
  {
    id: 'RPT-2026-008',
    title: 'Private Sector Bribery Patterns',
    type: 'Trend Analysis',
    date: '2026-02-15',
    generatedBy: 'L. Tazi',
    status: 'Published',
    downloads: 38,
  },
];

const reportTypeColors = {
  'Monthly Report': 'bg-blue-100 text-blue-700 border-blue-200',
  'Quarterly Report': 'bg-purple-100 text-purple-700 border-purple-200',
  'Regional Analysis': 'bg-[#FEF3E2] text-[#EF9F27] border-[#EF9F27]/20',
  'Trend Analysis': 'bg-green-100 text-[#639922] border-green-200',
  'Case Review': 'bg-gray-100 text-gray-700 border-gray-200',
};

const statusColors = {
  Published: 'bg-green-100 text-[#639922] border-green-200',
  Draft: 'bg-gray-100 text-gray-700 border-gray-200',
  'Under Review': 'bg-[#FEF3E2] text-[#EF9F27] border-[#EF9F27]/20',
};

export function Reports() {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredReports = reports.filter((report) => {
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

    let matchesDate = true;
    if (dateFilter !== 'all') {
      const reportDate = new Date(report.date);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - reportDate.getTime()) / (1000 * 60 * 60 * 24));

      if (dateFilter === 'week') matchesDate = daysDiff <= 7;
      if (dateFilter === 'month') matchesDate = daysDiff <= 30;
      if (dateFilter === 'quarter') matchesDate = daysDiff <= 90;
    }

    return matchesType && matchesStatus && matchesDate;
  });

  const totalDownloads = reports.reduce((sum, report) => sum + report.downloads, 0);
  const publishedReports = reports.filter(r => r.status === 'Published').length;

  const handleViewReport = () => {
    navigate('/authority/report-results');
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/authority/generate-report')}
          className="p-4 bg-white border-2 border-[#1a3a5c] rounded-lg hover:bg-[#1a3a5c]/5 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a3a5c] rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>Generate Report</p>
              <p className="text-xs text-gray-600 mt-0.5">Create custom reports</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/authority/regional-reports')}
          className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-[#1a3a5c] hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#EF9F27]/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-[#EF9F27]" />
            </div>
            <div>
              <p className="font-semibold text-gray-900" style={{ fontWeight: 600 }}>Regional Reports</p>
              <p className="text-xs text-gray-600 mt-0.5">View regional analytics</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate('/authority/schedule-report')}
          className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-[#1a3a5c] hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900" style={{ fontWeight: 600 }}>Schedule Reports</p>
              <p className="text-xs text-gray-600 mt-0.5">Automate report generation</p>
            </div>
          </div>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Reports</p>
                <p className="text-2xl font-semibold text-[#1a3a5c] mt-1" style={{ fontWeight: 600 }}>
                  {reports.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-semibold text-[#639922] mt-1" style={{ fontWeight: 600 }}>
                  {publishedReports}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#639922]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-semibold text-[#1a3a5c] mt-1" style={{ fontWeight: 600 }}>
                  {totalDownloads}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Library */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1a3a5c]" />
            Reports Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Monthly Report">Monthly Report</SelectItem>
                <SelectItem value="Quarterly Report">Quarterly Report</SelectItem>
                <SelectItem value="Regional Analysis">Regional Analysis</SelectItem>
                <SelectItem value="Trend Analysis">Trend Analysis</SelectItem>
                <SelectItem value="Case Review">Case Review</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="quarter">Last Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reports Table */}
          <div className="rounded-lg border border-gray-200 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Report ID</TableHead>
                  <TableHead className="font-semibold">Title</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Type</TableHead>
                  <TableHead className="font-semibold hidden lg:table-cell">Date</TableHead>
                  <TableHead className="font-semibold hidden xl:table-cell">Generated By</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold hidden sm:table-cell">Downloads</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No reports found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium text-[#1a3a5c]">
                        {report.id}
                      </TableCell>
                      <TableCell className="max-w-[250px]">
                        <p className="font-medium truncate">{report.title}</p>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className={`${reportTypeColors[report.type as keyof typeof reportTypeColors]} border text-xs`}>
                          {report.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 hidden lg:table-cell">
                        {new Date(report.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 hidden xl:table-cell">
                        {report.generatedBy}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusColors[report.status as keyof typeof statusColors]} border`}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 hidden sm:table-cell">
                        {report.downloads}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="text-[#1a3a5c]">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-[#1a3a5c]">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Generate New Report */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Report Type
                </label>
                <Select defaultValue="monthly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly Report</SelectItem>
                    <SelectItem value="quarterly">Quarterly Report</SelectItem>
                    <SelectItem value="regional">Regional Analysis</SelectItem>
                    <SelectItem value="trend">Trend Analysis</SelectItem>
                    <SelectItem value="custom">Custom Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Date Range
                </label>
                <Select defaultValue="current-month">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-month">Current Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="current-quarter">Current Quarter</SelectItem>
                    <SelectItem value="last-quarter">Last Quarter</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Region (Optional)
                </label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    <SelectItem value="casablanca">Casablanca-Settat</SelectItem>
                    <SelectItem value="rabat">Rabat-Salé-Kénitra</SelectItem>
                    <SelectItem value="fes">Fès-Meknès</SelectItem>
                    <SelectItem value="marrakech">Marrakech-Safi</SelectItem>
                    <SelectItem value="tanger">Tanger-Tétouan-Al Hoceïma</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Report Title
                </label>
                <Input placeholder="Enter custom report title (optional)" />
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button className="bg-[#1a3a5c] hover:bg-[#1a3a5c]/90">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button variant="outline">
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}