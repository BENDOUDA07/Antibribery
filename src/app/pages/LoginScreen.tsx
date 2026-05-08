import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard, ShieldCheck, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../components/ui/input-otp';
import { MoroccanPattern } from '../components/MoroccanPattern';
import { useLanguage } from '../../contexts/LanguageContext';
import SimpleLanguageSwitcher from '../components/SimpleLanguageSwitcher';

export function LoginScreen() {
  const { t } = useLanguage();
  const [cinNumber, setCinNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpValue, setOtpValue] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = () => {
    // Mock OTP sending - in real app would send OTP via SMS
    if (cinNumber && phoneNumber) {
      setOtpSent(true);
    }
  };

  const handleAuthenticate = () => {
    // Mock authentication - in real app would validate with backend
    if (cinNumber && phoneNumber && otpValue.length === 6) {
      // For demo purposes, navigate based on CIN
      // If CIN starts with "A", go to authority dashboard, otherwise citizen
      if (cinNumber.toUpperCase().startsWith('A')) {
        navigate('/authority');
      } else {
        navigate('/citizen');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative bg-[#1a3a5c] overflow-hidden">
      <MoroccanPattern />
      
      {/* Language Switcher - positioned in top right corner */}
      <div className="absolute top-6 right-6 z-10">
        <SimpleLanguageSwitcher />
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a3a5c] rounded-full mb-4">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-[#1a3a5c] mb-1" style={{ fontWeight: 600 }}>
              {t("login.platformName")}
            </h1>
            <p className="text-sm text-gray-600">{t("login.platformSubtitle")}</p>
          </div>

          {/* CIN Input */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cin" className="text-[#1a3a5c]">
                {t("login.cinLabel")}
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="cin"
                  type="text"
                  placeholder={t("login.cinPlaceholder")}
                  value={cinNumber}
                  onChange={(e) => setCinNumber(e.target.value)}
                  className="pl-11 h-12 border-gray-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]"
                  disabled={otpSent}
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-[#1a3a5c]">
                {t("login.phoneLabel")}
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t("login.phonePlaceholder")}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-11 h-12 border-gray-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]"
                  disabled={otpSent}
                />
              </div>
            </div>

            {/* Send OTP Button */}
            {!otpSent && (
              <Button
                onClick={handleSendOTP}
                disabled={!cinNumber || !phoneNumber}
                className="w-full h-12 bg-[#1a3a5c] hover:bg-[#2a4a6c] text-white"
                style={{ fontWeight: 500 }}
              >
                {t("login.sendOtpBtn")}
              </Button>
            )}

            {/* OTP Input - Only show after OTP is sent */}
            {otpSent && (
              <>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <p className="text-sm text-blue-900">{t("login.otpSentMessage")}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-[#1a3a5c]">
                    {t("login.otpLabel")}
                  </Label>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otpValue}
                      onChange={(value) => setOtpValue(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="w-12 h-12 border-gray-300" />
                        <InputOTPSlot index={1} className="w-12 h-12 border-gray-300" />
                        <InputOTPSlot index={2} className="w-12 h-12 border-gray-300" />
                        <InputOTPSlot index={3} className="w-12 h-12 border-gray-300" />
                        <InputOTPSlot index={4} className="w-12 h-12 border-gray-300" />
                        <InputOTPSlot index={5} className="w-12 h-12 border-gray-300" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                {/* Authenticate Button */}
                <Button
                  onClick={handleAuthenticate}
                  disabled={otpValue.length !== 6}
                  className="w-full h-12 bg-[#1a3a5c] hover:bg-[#2a4a6c] text-white"
                  style={{ fontWeight: 500 }}
                >
                  {t("login.authenticateBtn")}
                </Button>
              </>
            )}

            {/* Trust Message */}
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
              <ShieldCheck className="w-5 h-5 text-[#639922] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700 leading-relaxed">
                {t("login.trustMessage")}
              </p>
            </div>
          </div>
        </div>

        {/* Demo Instructions */}
        <div className="mt-6 text-center text-white/80 text-xs">
          <p className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3">
            <strong>Demo:</strong> Enter any CIN starting with "A" for Authority access, or any other CIN for Citizen access. Enter any phone number, click "Send OTP", then enter any 6-digit code.
          </p>
        </div>
      </div>
    </div>
  );
}