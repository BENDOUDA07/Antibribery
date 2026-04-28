import { useNavigate } from 'react-router';
import { Plus, ChevronRight, MapPin, Calendar, FileText, FilePlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';

const mockReclamations = [
  {
    id: 'REC-2026-001',
    category: 'Bribery - Public Official',
    location: 'Casablanca, Casablanca-Settat',
    date: '2026-03-15',
    status: 'resolved',
    statusLabel: 'Resolved',
  },
  {
    id: 'REC-2026-002',
    category: 'Extortion',
    location: 'Rabat, Rabat-Salé-Kénitra',
    date: '2026-03-20',
    status: 'under-review',
    statusLabel: 'Under Review',
  },
  {
    id: 'REC-2026-003',
    category: 'Fraud',
    location: 'Marrakech, Marrakech-Safi',
    date: '2026-03-22',
    status: 'submitted',
    statusLabel: 'Submitted',
  },
  {
    id: 'REC-2026-004',
    category: 'Bribery - Private Sector',
    location: 'Tangier, Tanger-Tétouan-Al Hoceïma',
    date: '2026-03-25',
    status: 'flagged',
    statusLabel: 'Flagged - Requires Attention',
  },
  {
    id: 'REC-2026-005',
    category: 'Nepotism',
    location: 'Fès, Fès-Meknès',
    date: '2026-03-26',
    status: 'submitted',
    statusLabel: 'Submitted',
  },
];

const statusConfig = {
  submitted: { color: 'bg-blue-100 text-blue-700 border-blue-200', count: 3 },
  'under-review': { color: 'bg-[#FEF3E2] text-[#EF9F27] border-[#EF9F27]/20', count: 1 },
  resolved: { color: 'bg-green-100 text-[#639922] border-green-200', count: 1 },
  flagged: { color: 'bg-red-100 text-[#E24B4A] border-red-200', count: 0 },
};

export function MyReclamations() {
  const navigate = useNavigate();

  const handleNewReport = () => {
    navigate('/citizen/submit');
  };

  const handleGenerateReport = () => {
    navigate('/citizen/generate-report');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#1a3a5c] mb-2" style={{ fontWeight: 600 }}>
              My Reclamations
            </h1>
            <p className="text-gray-600">Track the status of your submitted reports</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleGenerateReport}
              variant="outline"
              className="border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c]/5 gap-2"
            >
              <FilePlus className="w-4 h-4" />
              Generate Report
            </Button>
            <Button
              onClick={handleNewReport}
              className="bg-[#1a3a5c] hover:bg-[#1a3a5c]/90 text-white gap-2"
            >
              <Plus className="w-4 h-4" />
              New Report
            </Button>
          </div>
        </div>

        {/* Summary Chips */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-semibold text-blue-700" style={{ fontWeight: 600 }}>
                    {statusConfig.submitted.count}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">Submitted</p>
                </div>
                <FileText className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#EF9F27]/20 bg-[#FEF3E2]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-semibold text-[#EF9F27]" style={{ fontWeight: 600 }}>
                    {statusConfig['under-review'].count}
                  </p>
                  <p className="text-sm text-[#EF9F27] mt-1">Under Review</p>
                </div>
                <FileText className="w-8 h-8 text-[#EF9F27]/40" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-semibold text-[#639922]" style={{ fontWeight: 600 }}>
                    {statusConfig.resolved.count}
                  </p>
                  <p className="text-sm text-[#639922] mt-1">Resolved</p>
                </div>
                <FileText className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-semibold text-[#E24B4A]" style={{ fontWeight: 600 }}>
                    {statusConfig.flagged.count}
                  </p>
                  <p className="text-sm text-[#E24B4A] mt-1">Flagged</p>
                </div>
                <FileText className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reclamations List */}
        <div className="space-y-4">
          {mockReclamations.map((reclamation) => (
            <Card
              key={reclamation.id}
              className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-[#1a3a5c]" style={{ fontWeight: 600 }}>
                            {reclamation.id}
                          </h3>
                          <Badge
                            className={`${statusConfig[reclamation.status as keyof typeof statusConfig].color} border`}
                          >
                            {reclamation.statusLabel}
                          </Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{reclamation.category}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{reclamation.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(reclamation.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                    </div>
                  </div>

                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}