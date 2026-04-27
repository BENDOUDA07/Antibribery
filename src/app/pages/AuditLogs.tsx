import { useState } from 'react';
import { ScrollText, User, Activity, AlertCircle, CheckCircle, XCircle, Edit, Eye, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
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

const auditLogs = [
  {
    id: 'AUD-00145',
    timestamp: '2026-03-28 14:32:15',
    user: 'M. Benali',
    action: 'Case Status Updated',
    details: 'Changed REC-2026-042 status from "Pending" to "Under Investigation"',
    category: 'Case Management',
    ipAddress: '192.168.1.45',
    severity: 'info',
  },
  {
    id: 'AUD-00144',
    timestamp: '2026-03-28 13:18:42',
    user: 'S. El Fassi',
    action: 'Report Downloaded',
    details: 'Downloaded report RPT-2026-003 (Q1 2026 Quarterly Summary)',
    category: 'Report Access',
    ipAddress: '192.168.1.52',
    severity: 'info',
  },
  {
    id: 'AUD-00143',
    timestamp: '2026-03-28 12:05:33',
    user: 'K. Amrani',
    action: 'Evidence Uploaded',
    details: 'Added 3 files to case REC-2026-040',
    category: 'Evidence Management',
    ipAddress: '192.168.1.67',
    severity: 'info',
  },
  {
    id: 'AUD-00142',
    timestamp: '2026-03-28 11:42:18',
    user: 'System',
    action: 'Failed Login Attempt',
    details: 'Multiple failed login attempts from unauthorized user',
    category: 'Security',
    ipAddress: '45.123.67.89',
    severity: 'warning',
  },
  {
    id: 'AUD-00141',
    timestamp: '2026-03-28 10:15:07',
    user: 'A. Idrissi',
    action: 'Case Closed',
    details: 'Closed case REC-2026-039 with resolution "Unsubstantiated"',
    category: 'Case Management',
    ipAddress: '192.168.1.34',
    severity: 'success',
  },
  {
    id: 'AUD-00140',
    timestamp: '2026-03-28 09:33:52',
    user: 'L. Tazi',
    action: 'User Settings Modified',
    details: 'Changed notification preferences',
    category: 'User Management',
    ipAddress: '192.168.1.78',
    severity: 'info',
  },
  {
    id: 'AUD-00139',
    timestamp: '2026-03-27 17:45:29',
    user: 'M. Benali',
    action: 'Evidence Deleted',
    details: 'Removed duplicate file from case REC-2026-037',
    category: 'Evidence Management',
    ipAddress: '192.168.1.45',
    severity: 'warning',
  },
  {
    id: 'AUD-00138',
    timestamp: '2026-03-27 16:22:11',
    user: 'System',
    action: 'Automated Report Generated',
    details: 'Generated monthly report RPT-2026-001',
    category: 'System',
    ipAddress: '127.0.0.1',
    severity: 'success',
  },
  {
    id: 'AUD-00137',
    timestamp: '2026-03-27 15:18:44',
    user: 'S. El Fassi',
    action: 'Case Reassigned',
    details: 'Reassigned case REC-2026-041 from R. Alami to current officer',
    category: 'Case Management',
    ipAddress: '192.168.1.52',
    severity: 'info',
  },
  {
    id: 'AUD-00136',
    timestamp: '2026-03-27 14:07:35',
    user: 'System',
    action: 'Unauthorized Access Blocked',
    details: 'Blocked access attempt to restricted case files',
    category: 'Security',
    ipAddress: '203.45.12.78',
    severity: 'critical',
  },
  {
    id: 'AUD-00135',
    timestamp: '2026-03-27 13:45:22',
    user: 'K. Amrani',
    action: 'Report Generated',
    details: 'Created custom report for Marrakech region',
    category: 'Report Access',
    ipAddress: '192.168.1.67',
    severity: 'info',
  },
  {
    id: 'AUD-00134',
    timestamp: '2026-03-27 12:30:18',
    user: 'R. Alami',
    action: 'Login',
    details: 'Successful login to authority portal',
    category: 'Authentication',
    ipAddress: '192.168.1.91',
    severity: 'success',
  },
];

const severityColors = {
  info: 'bg-blue-100 text-blue-700 border-blue-200',
  success: 'bg-green-100 text-[#639922] border-green-200',
  warning: 'bg-[#FEF3E2] text-[#EF9F27] border-[#EF9F27]/20',
  critical: 'bg-red-100 text-[#E24B4A] border-red-200',
};

const severityIcons = {
  info: Activity,
  success: CheckCircle,
  warning: AlertCircle,
  critical: XCircle,
};

const categoryColors = {
  'Case Management': 'bg-purple-100 text-purple-700 border-purple-200',
  'Report Access': 'bg-blue-100 text-blue-700 border-blue-200',
  'Evidence Management': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Security': 'bg-red-100 text-red-700 border-red-200',
  'User Management': 'bg-green-100 text-green-700 border-green-200',
  'System': 'bg-gray-100 text-gray-700 border-gray-200',
  'Authentication': 'bg-[#FEF3E2] text-[#EF9F27] border-[#EF9F27]/20',
};

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;

    let matchesDate = true;
    if (dateFilter !== 'all') {
      const logDate = new Date(log.timestamp);
      const now = new Date();
      const hoursDiff = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60));

      if (dateFilter === 'today') matchesDate = hoursDiff <= 24;
      if (dateFilter === 'week') matchesDate = hoursDiff <= 168;
      if (dateFilter === 'month') matchesDate = hoursDiff <= 720;
    }

    return matchesSearch && matchesCategory && matchesSeverity && matchesDate;
  });

  const stats = {
    total: auditLogs.length,
    critical: auditLogs.filter(l => l.severity === 'critical').length,
    warnings: auditLogs.filter(l => l.severity === 'warning').length,
    today: auditLogs.filter(l => {
      const logDate = new Date(l.timestamp);
      const now = new Date();
      return logDate.toDateString() === now.toDateString();
    }).length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Logs</p>
                <p className="text-2xl font-semibold text-[#1a3a5c] mt-1" style={{ fontWeight: 600 }}>
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <ScrollText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today</p>
                <p className="text-2xl font-semibold text-[#1a3a5c] mt-1" style={{ fontWeight: 600 }}>
                  {stats.today}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Warnings</p>
                <p className="text-2xl font-semibold text-[#EF9F27] mt-1" style={{ fontWeight: 600 }}>
                  {stats.warnings}
                </p>
              </div>
              <div className="w-10 h-10 bg-[#FEF3E2] rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#EF9F27]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl font-semibold text-[#E24B4A] mt-1" style={{ fontWeight: 600 }}>
                  {stats.critical}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-[#E24B4A]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs Table */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="w-5 h-5 text-[#1a3a5c]" />
            Audit Trail
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Input
                placeholder="Search by action, user, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Case Management">Case Management</SelectItem>
                  <SelectItem value="Report Access">Report Access</SelectItem>
                  <SelectItem value="Evidence Management">Evidence Management</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                  <SelectItem value="User Management">User Management</SelectItem>
                  <SelectItem value="System">System</SelectItem>
                  <SelectItem value="Authentication">Authentication</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Export Logs
              </Button>
            </div>
          </div>

          {/* Logs Table */}
          <div className="rounded-lg border border-gray-200 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Timestamp</TableHead>
                  <TableHead className="font-semibold">User</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                  <TableHead className="font-semibold hidden lg:table-cell">Details</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Category</TableHead>
                  <TableHead className="font-semibold hidden xl:table-cell">IP Address</TableHead>
                  <TableHead className="font-semibold">Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                      No audit logs found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => {
                    const SeverityIcon = severityIcons[log.severity as keyof typeof severityIcons];
                    return (
                      <TableRow key={log.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-sm whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{log.user}</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-[#1a3a5c] max-w-[200px]">
                          {log.action}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 max-w-[300px] truncate hidden lg:table-cell">
                          {log.details}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge className={`${categoryColors[log.category as keyof typeof categoryColors]} border text-xs`}>
                            {log.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 font-mono hidden xl:table-cell">
                          {log.ipAddress}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <SeverityIcon className="w-4 h-4" />
                            <Badge className={`${severityColors[log.severity as keyof typeof severityColors]} border capitalize`}>
                              {log.severity}
                            </Badge>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination info */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <p>Showing {filteredLogs.length} of {auditLogs.length} logs</p>
            <p>Last updated: Just now</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
