import { useNavigate } from 'react-router';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a3a5c] rounded-full mb-6">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-semibold text-[#1a3a5c] mb-2" style={{ fontWeight: 600 }}>
          404
        </h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <Button
          onClick={() => navigate('/')}
          className="bg-[#1a3a5c] hover:bg-[#2a4a6c] text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Login
        </Button>
      </div>
    </div>
  );
}
