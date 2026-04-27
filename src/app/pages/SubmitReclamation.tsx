import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, ArrowRight, Upload, X, FileText, Image as ImageIcon, Mic, Info, MapPin, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { Alert, AlertDescription } from '../components/ui/alert';

const STEPS = ['Incident Type', 'Report Details', 'Evidence', 'Review'];

export function SubmitReclamation() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 0-indexed internally but displayed as 1-4
  const [formData, setFormData] = useState({
    category: '',
    region: '',
    city: '',
    date: '',
    description: '',
    files: [] as { name: string; type: string; size: string }[],
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit form
      navigate('/citizen');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(1) + ' KB',
      }));
      setFormData({ ...formData, files: [...formData.files, ...newFiles] });
    }
  };

  const removeFile = (index: number) => {
    const newFiles = formData.files.filter((_, i) => i !== index);
    setFormData({ ...formData, files: newFiles });
  };

  const progressPercentage = ((currentStep + 1) / 4) * 100;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#1a3a5c] mb-2" style={{ fontWeight: 600 }}>
            New Bribery Report
          </h1>
          <p className="text-gray-600">Complete all steps to submit your report securely</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            {STEPS.map((step, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 ${
                  index <= currentStep ? 'text-[#1a3a5c]' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-[#1a3a5c] text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm font-medium hidden sm:inline">{step}</span>
              </div>
            ))}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Info Banner */}
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <Info className="w-4 h-4 text-blue-600" />
          <AlertDescription className="text-blue-900">
            Your report is anonymous. All evidence is encrypted and securely stored. Your identity is protected by law.
          </AlertDescription>
        </Alert>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          {/* Step 0: Incident Type */}
          {currentStep === 0 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="category">Incident Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select incident category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bribery-public">Bribery - Public Official</SelectItem>
                    <SelectItem value="bribery-private">Bribery - Private Sector</SelectItem>
                    <SelectItem value="extortion">Extortion</SelectItem>
                    <SelectItem value="embezzlement">Embezzlement</SelectItem>
                    <SelectItem value="fraud">Fraud</SelectItem>
                    <SelectItem value="nepotism">Nepotism</SelectItem>
                    <SelectItem value="other">Other Corruption</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Step 1: Report Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="region">Region *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Select
                      value={formData.region}
                      onValueChange={(value) => setFormData({ ...formData, region: value })}
                    >
                      <SelectTrigger className="h-12 pl-11">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casablanca">Casablanca-Settat</SelectItem>
                        <SelectItem value="rabat">Rabat-Salé-Kénitra</SelectItem>
                        <SelectItem value="fes">Fès-Meknès</SelectItem>
                        <SelectItem value="marrakech">Marrakech-Safi</SelectItem>
                        <SelectItem value="tangier">Tanger-Tétouan-Al Hoceïma</SelectItem>
                        <SelectItem value="oriental">L'Oriental</SelectItem>
                        <SelectItem value="souss">Souss-Massa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter city name"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="date">Date of Incident *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="h-12 pl-11"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <span className="text-sm text-gray-500">{formData.description.length} / 2000</span>
                </div>
                <Textarea
                  id="description"
                  placeholder="Provide a detailed description of the incident. Include what happened, who was involved, and any relevant context..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value.slice(0, 2000) })}
                  className="min-h-[200px] resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Evidence */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>Upload Evidence (Optional)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#1a3a5c] transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.mp3,.wav"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, Images, or Audio files (Max 10MB each)
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Uploaded Files */}
              {formData.files.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files ({formData.files.length})</Label>
                  <div className="space-y-2">
                    {formData.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                          {file.type.includes('pdf') ? (
                            <FileText className="w-5 h-5 text-red-500" />
                          ) : file.type.includes('image') ? (
                            <ImageIcon className="w-5 h-5 text-blue-500" />
                          ) : (
                            <Mic className="w-5 h-5 text-purple-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size}</p>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2" style={{ fontWeight: 600 }}>
                  Review Your Report
                </h3>
                <p className="text-sm text-green-800">
                  Please review all information before submitting. Once submitted, your report will be securely transmitted to the authorities.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-600">Incident Category</Label>
                  <p className="text-gray-900 mt-1">{formData.category || 'Not specified'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">Region</Label>
                    <p className="text-gray-900 mt-1">{formData.region || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">City</Label>
                    <p className="text-gray-900 mt-1">{formData.city || 'Not specified'}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600">Date of Incident</Label>
                  <p className="text-gray-900 mt-1">{formData.date || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="text-gray-600">Description</Label>
                  <p className="text-gray-900 mt-1 text-sm leading-relaxed">
                    {formData.description || 'No description provided'}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-600">Evidence Files</Label>
                  <p className="text-gray-900 mt-1">{formData.files.length} file(s) attached</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="text-gray-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-[#1a3a5c] hover:bg-[#2a4a6c] text-white"
          >
            {currentStep === 3 ? 'Submit Report' : 'Continue'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
