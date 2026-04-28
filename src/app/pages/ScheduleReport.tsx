import { useState } from 'react';
import { Calendar, Clock, Mail, FileText, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router';
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

const reportTypes = [
  { value: 'monthly', label: 'Monthly Report - All Cases' },
  { value: 'regional', label: 'Regional Analysis Report' },
  { value: 'risk', label: 'Risk Assessment Report' },
  { value: 'statistical', label: 'Statistical Summary Report' },
  { value: 'investigation', label: 'Investigation Progress Report' },
  { value: 'compliance', label: 'Compliance & Audit Report' },
];

const frequencies = [
  { value: 'daily', label: 'Daily - Every day at specified time' },
  { value: 'weekly', label: 'Weekly - Every Monday' },
  { value: 'biweekly', label: 'Bi-weekly - Every other Monday' },
  { value: 'monthly', label: 'Monthly - First day of month' },
  { value: 'quarterly', label: 'Quarterly - First day of quarter' },
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

export function ScheduleReport() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [region, setRegion] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [email, setEmail] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSchedule = async () => {
    // Validation
    if (!reportType) {
      toast.error('Please select a report type');
      return;
    }
    if (!frequency) {
      toast.error('Please select a frequency');
      return;
    }
    if (!startDate) {
      toast.error('Please select a start date');
      return;
    }
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsScheduling(true);

    // Simulate scheduling
    setTimeout(() => {
      setIsScheduling(false);
      const selectedReport = reportTypes.find(r => r.value === reportType);
      const selectedFrequency = frequencies.find(f => f.value === frequency);
      
      toast.success(
        'Report Scheduled Successfully',
        {
          description: `${selectedReport?.label} will be sent ${selectedFrequency?.label.toLowerCase()} to ${email}`,
        }
      );
      
      // Navigate back after success
      setTimeout(() => {
        navigate('/authority/generate-report');
      }, 1500);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-[#1a3a5c] rounded-lg">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
              Schedule Automated Report
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Set up recurring reports to be automatically generated and sent
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="text-gray-600 hover:text-gray-900"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Scheduling Form */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5 text-[#1a3a5c]" />
            Report Schedule Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
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
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Choose the type of report you want to schedule
              </p>
            </div>

            {/* Frequency */}
            <div className="space-y-2">
              <Label htmlFor="frequency" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                Frequency *
              </Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger 
                  id="frequency"
                  className="bg-white border-gray-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]"
                >
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {frequencies.map((freq) => (
                    <SelectItem key={freq.value} value={freq.value}>
                      {freq.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                How often should this report be generated?
              </p>
            </div>

            {/* Region */}
            <div className="space-y-2">
              <Label htmlFor="region" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                Region
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
              <p className="text-xs text-gray-500">
                Filter reports by specific region (optional)
              </p>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="start-date" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                Start Date *
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-white border-gray-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]"
              />
              <p className="text-xs text-gray-500">
                When should the scheduled reports begin?
              </p>
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="officer@anticorruption.gov.ma"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-gray-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]"
              />
              <p className="text-xs text-gray-500">
                Reports will be automatically sent to this email address
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSchedule}
              disabled={isScheduling}
              className="flex-1 bg-[#1a3a5c] hover:bg-[#1a3a5c]/90 text-white gap-2"
            >
              {isScheduling ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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

      {/* Info Card */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 mb-1">About Scheduled Reports</p>
              <p className="text-xs text-blue-800">
                Scheduled reports are automatically generated and delivered to your email at the specified frequency. 
                You can view, edit, or cancel scheduled reports at any time from the Generate Report page. 
                Reports include all data available at the time of generation and are formatted in PDF for easy sharing and archiving.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
