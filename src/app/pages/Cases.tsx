import { useState } from 'react';
import { Search, Filter, Eye, Download, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

const allCases = [
  {
    refId: 'REC-2026-042',
    category: 'Bribery - Public Official',
    region: 'Casablanca-Settat',
    riskLevel: 'high',
    status: 'Under Investigation',
    officer: 'M. Benali',
    date: '2026-03-15',
    description: 'Report of bribery involving a public official in the transport department.',
    amount: '50,000 MAD',
  },
  {
    refId: 'REC-2026-041',
    category: 'Extortion',
    region: 'Rabat-Salé-Kénitra',
    riskLevel: 'high',
    status: 'Under Investigation',
    officer: 'S. El Fassi',
    date: '2026-03-14',
    description: 'Citizen reported extortion by law enforcement officer.',
    amount: '10,000 MAD',
  },
  {
    refId: 'REC-2026-040',
    category: 'Fraud',
    region: 'Marrakech-Safi',
    riskLevel: 'medium',
    status: 'Evidence Review',
    officer: 'K. Amrani',
    date: '2026-03-13',
    description: 'Fraudulent activities in public procurement process.',
    amount: '200,000 MAD',
  },
  {
    refId: 'REC-2026-039',
    category: 'Nepotism',
    region: 'Fès-Meknès',
    riskLevel: 'low',
    status: 'Closed',
    officer: 'A. Idrissi',
    date: '2026-03-10',
    description: 'Allegation of nepotism in hiring process - investigation concluded.',
    amount: 'N/A',
  },
  {
    refId: 'REC-2026-038',
    category: 'Bribery - Private Sector',
    region: 'Tanger-Tétouan-Al Hoceïma',
    riskLevel: 'medium',
    status: 'Under Investigation',
    officer: 'L. Tazi',
    date: '2026-03-12',
    description: 'Private sector bribery case in construction permits.',
    amount: '75,000 MAD',
  },
  {
    refId: 'REC-2026-037',
    category: 'Embezzlement',
    region: 'Casablanca-Settat',
    riskLevel: 'high',
    status: 'Under Investigation',
    officer: 'M. Benali',
    date: '2026-03-11',
    description: 'Embezzlement of public funds from municipality budget.',
    amount: '500,000 MAD',
  },
  {
    refId: 'REC-2026-036',
    category: 'Bribery - Public Official',
    region: 'Rabat-Salé-Kénitra',
    riskLevel: 'medium',
    status: 'Pending Review',
    officer: 'S. El Fassi',
    date: '2026-03-08',
    description: 'Bribery allegation in customs department.',
    amount: '25,000 MAD',
  },
  {
    refId: 'REC-2026-035',
    category: 'Fraud',
    region: "L'Oriental",
    riskLevel: 'low',
    status: 'Closed',
    officer: 'R. Alami',
    date: '2026-03-05',
    description: 'Minor fraud case - resolved.',
    amount: '5,000 MAD',
  },
];

const riskColors = {
  high: 'bg-red-100 text-[#E24B4A] border-red-200',
  medium: 'bg-[#FEF3E2] text-[#EF9F27] border-[#EF9F27]/20',
  low: 'bg-green-100 text-[#639922] border-green-200',
};

const statusColors = {
  'Under Investigation': 'bg-[#FEF3E2] text-[#EF9F27] border-[#EF9F27]/20',
  'Evidence Review': 'bg-blue-100 text-blue-700 border-blue-200',
  'Pending Review': 'bg-purple-100 text-purple-700 border-purple-200',
  'Closed': 'bg-green-100 text-[#639922] border-green-200',
  'Rejected': 'bg-gray-100 text-gray-700 border-gray-200',
};

const statusIcons = {
  'Under Investigation': Clock,
  'Evidence Review': AlertCircle,
  'Pending Review': Clock,
  'Closed': CheckCircle,
  'Rejected': XCircle,
};

export function Cases() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [selectedCase, setSelectedCase] = useState<typeof allCases[0] | null>(null);

  const filteredCases = allCases.filter((c) => {
    const matchesSearch =
      c.refId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.region.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || c.riskLevel === riskFilter;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  const stats = {
    total: allCases.length,
    underInvestigation: allCases.filter(c => c.status === 'Under Investigation').length,
    highRisk: allCases.filter(c => c.riskLevel === 'high').length,
    closed: allCases.filter(c => c.status === 'Closed').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cases</p>
                <p className="text-2xl font-semibold text-[#1a3a5c] mt-1" style={{ fontWeight: 600 }}>
                  {stats.total}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-semibold text-[#EF9F27] mt-1" style={{ fontWeight: 600 }}>
                  {stats.underInvestigation}
                </p>
              </div>
              <div className="w-10 h-10 bg-[#FEF3E2] rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#EF9F27]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk</p>
                <p className="text-2xl font-semibold text-[#E24B4A] mt-1" style={{ fontWeight: 600 }}>
                  {stats.highRisk}
                </p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-[#E24B4A]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-semibold text-[#639922] mt-1" style={{ fontWeight: 600 }}>
                  {stats.closed}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#639922]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle>Case Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by ID, category, or region..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                <SelectItem value="Evidence Review">Evidence Review</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Risk Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cases Table */}
          <div className="rounded-lg border border-gray-200 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Ref ID</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold hidden md:table-cell">Region</TableHead>
                  <TableHead className="font-semibold">Risk</TableHead>
                  <TableHead className="font-semibold hidden lg:table-cell">Status</TableHead>
                  <TableHead className="font-semibold hidden xl:table-cell">Officer</TableHead>
                  <TableHead className="font-semibold hidden sm:table-cell">Date</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCases.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No cases found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCases.map((caseItem) => {
                    const StatusIcon = statusIcons[caseItem.status as keyof typeof statusIcons];
                    return (
                      <TableRow key={caseItem.refId} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-[#1a3a5c]">
                          {caseItem.refId}
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">{caseItem.category}</TableCell>
                        <TableCell className="text-gray-600 hidden md:table-cell">{caseItem.region}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${riskColors[caseItem.riskLevel as keyof typeof riskColors]} border capitalize`}
                          >
                            {caseItem.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center gap-2">
                            <StatusIcon className="w-4 h-4" />
                            <span className="text-sm">{caseItem.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600 hidden xl:table-cell">{caseItem.officer}</TableCell>
                        <TableCell className="text-gray-600 text-sm hidden sm:table-cell">{caseItem.date}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCase(caseItem)}
                            className="text-[#1a3a5c]"
                          >
                            <Eye className="w-4 h-4 sm:mr-2" />
                            <span className="hidden sm:inline">View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Case Detail Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="text-[#1a3a5c]">Case Details: {selectedCase?.refId}</span>
              <Badge
                className={`${riskColors[selectedCase?.riskLevel as keyof typeof riskColors]} border capitalize`}
              >
                {selectedCase?.riskLevel} Risk
              </Badge>
            </DialogTitle>
            <DialogDescription>
              Filed on {selectedCase?.date}
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <p className="font-medium text-[#1a3a5c]">{selectedCase.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Region</p>
                  <p className="font-medium text-[#1a3a5c]">{selectedCase.region}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <Badge className={`${statusColors[selectedCase.status as keyof typeof statusColors]} border`}>
                    {selectedCase.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Assigned Officer</p>
                  <p className="font-medium text-[#1a3a5c]">{selectedCase.officer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Amount Involved</p>
                  <p className="font-medium text-[#1a3a5c]">{selectedCase.amount}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {selectedCase.description}
                </p>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-[#1a3a5c] hover:bg-[#1a3a5c]/90">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="flex-1">
                  Update Status
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
