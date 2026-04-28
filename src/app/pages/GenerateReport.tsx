import { useState } from 'react';
import { FileText, Calendar, MapPin, Clock, Download, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';

interface GenerateReportProps {
  userType?: 'citizen' | 'authority';
}

const reportTypes = {
  citizen: [
    { value: 'status', label: 'Status Report - My Reclamations' },
    { value: 'summary', label: 'Summary Report - All Activities' },
    { value: 'timeline', label: 'Timeline Report - Case History' },
  ],
  authority: [
    { value: 'monthly', label: 'Monthly Report - All Cases' },
    { value: 'regional', label: 'Regional Analysis Report' },
    { value: 'risk', label: 'Risk Assessment Report' },
    { value: 'statistical', label: 'Statistical Summary Report' },
    { value: 'investigation', label: 'Investigation Progress Report' },
    { value: 'compliance', label: 'Compliance & Audit Report' },
  ],
};

const dateRanges = [
  { value: 'current_month', label: 'Current Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'current_year', label: 'Current Year' },
  { value: 'last_year', label: 'Last Year' },
  { value: 'custom', label: 'Custom Date Range' },
];

const regions = [
  { value: 'all', label: 'All Regions' },
  { value: 'casablanca-settat', label: 'Casablanca-Settat' },
  { value: 'rabat-sale-kenitra', label: 'Rabat-Salé-Kénitra' },
  { value: 'fes-meknes', label: 'Fès-Meknès' },
  { value: 'marrakech-safi', label: 'Marrakech-Safi' },
  { value: 'tanger-tetouan', label: 'Tanger-Tétouan-Al Hoceïma' },
  { value: 'oriental', label: "L'Oriental" },
  { value: 'souss-massa', label: 'Souss-Massa' },
  { value: 'draa-tafilalet', label: 'Drâa-Tafilalet' },
  { value: 'beni-mellal', label: 'Béni Mellal-Khénifra' },
];

export function GenerateReport({ userType = 'authority' }: GenerateReportProps) {
  const [reportType, setReportType] = useState('');
  const [dateRange, setDateRange] = useState('current_month');
  const [region, setRegion] = useState('all');
  const [reportTitle, setReportTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);

  const availableReportTypes = userType === 'citizen' ? reportTypes.citizen : reportTypes.authority;

  const handleGenerateReport = async () => {
    if (!reportType) {
      toast.error('Please select a report type');
      return;
    }

    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      const selectedReport = availableReportTypes.find(r => r.value === reportType);
      toast.success(
        `Report Generated Successfully`,
        {
          description: `${selectedReport?.label} is ready for download.`,
        }
      );
    }, 2000);
  };

  const handleScheduleReport = async () => {
    if (!reportType) {
      toast.error('Please select a report type');
      return;
    }

    setIsScheduling(true);

    // Simulate scheduling
    setTimeout(() => {
      setIsScheduling(false);
      const selectedReport = availableReportTypes.find(r => r.value === reportType);
      toast.success(
        `Report Scheduled Successfully`,
        {
          description: `${selectedReport?.label} has been scheduled for automatic generation.`,
        }
      );
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-12 h-12 bg-[#1a3a5c] rounded-lg">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
            Generate New Report
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Create custom reports or schedule automated report generation
          </p>
        </div>
      </div>

      {/* Report Generation Form */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-[#1a3a5c]" />
            Report Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Report Type */}
              <div className="space-y-2">
                <Label htmlFor="report-type" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  Report Type *
                </Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger 
                    id="report-type"
                    className="bg-white border-gray-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]"
                  >
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableReportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <Label htmlFor="date-range" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  Date Range
                </Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger 
                    id="date-range"
                    className="bg-white border-gray-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dateRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Region */}
              {userType === 'authority' && (
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    Region (Optional)
                  </Label>
                  <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger 
                      id="region"
                      className="bg-white border-gray-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((reg) => (
                        <SelectItem key={reg.value} value={reg.value}>
                          {reg.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Report Title */}
              <div className="space-y-2">
                <Label htmlFor="report-title" className="text-sm font-medium text-gray-700">
                  Report Title (Optional)
                </Label>
                <Input
                  id="report-title"
                  type="text"
                  placeholder="Enter custom report title (optional)"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  className="bg-white border-gray-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating || isScheduling}
              className="flex-1 bg-[#1a3a5c] hover:bg-[#1a3a5c]/90 text-white gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Generate Report
                </>
              )}
            </Button>
            <Button
              onClick={handleScheduleReport}
              disabled={isGenerating || isScheduling}
              variant="outline"
              className="flex-1 border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c]/5 gap-2"
            >
              {isScheduling ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#1a3a5c]/30 border-t-[#1a3a5c] rounded-full animate-spin" />
                  Scheduling...
                </>
              ) : (
                <>
                  <Clock className="w-4 h-4" />
                  Schedule Report
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports Section */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="w-5 h-5 text-[#1a3a5c]" />
            Scheduled Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {/* Example Scheduled Reports */}
            {[
              {
                title: 'Monthly Report - All Cases',
                frequency: 'Monthly on the 1st',
                nextRun: 'April 1, 2026',
                status: 'active',
              },
              {
                title: 'Regional Analysis Report',
                frequency: 'Weekly on Mondays',
                nextRun: 'March 31, 2026',
                status: 'active',
              },
            ].map((scheduled, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{scheduled.title}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {scheduled.frequency}
                    </p>
                    <p className="text-sm text-gray-600">
                      Next: {scheduled.nextRun}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-[#639922] border border-green-200">
                    Active
                  </span>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    Edit
                  </Button>
                </div>
              </div>
            ))}

            {userType === 'citizen' && (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-600">No scheduled reports yet</p>
                <p className="text-xs text-gray-500 mt-1">
                  Schedule a report to receive it automatically
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-[#1a3a5c]" />
            Recent Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {[
              {
                title: 'Monthly Report - March 2026',
                date: 'March 28, 2026',
                size: '2.4 MB',
                type: 'PDF',
              },
              {
                title: 'Regional Analysis - Casablanca',
                date: 'March 25, 2026',
                size: '1.8 MB',
                type: 'PDF',
              },
              {
                title: 'Risk Assessment Report',
                date: 'March 20, 2026',
                size: '3.1 MB',
                type: 'PDF',
              },
            ].map((report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-[#1a3a5c] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg">
                    <FileText className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.title}</p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {report.date} • {report.size} • {report.type}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[#1a3a5c] gap-2">
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
