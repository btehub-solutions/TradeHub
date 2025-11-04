'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { formatNigerianPhone } from '@/lib/auth';
import { Phone, ArrowRight, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const phoneSchema = z.string()
  .regex(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
  .refine((val) => ['7', '8', '9'].includes(val[0]), {
    message: 'Nigerian numbers must start with 7, 8, or 9',
  });

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate phone number
    const validation = phoneSchema.safeParse(phoneNumber);
    if (!validation.success) {
      setError(validation.error.errors[0].message);
      return;
    }

    setLoading(true);

    try {
      const formattedPhone = formatNigerianPhone(phoneNumber);

      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      });

      if (error) throw error;

      // Store phone number in sessionStorage for verify page
      sessionStorage.setItem('phone_number', formattedPhone);
      
      router.push('/verify');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center px-4 py-8">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <Phone className="w-8 h-8 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome to TradeHub</CardTitle>
            <CardDescription className="mt-2">
              Enter your phone number to get started
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  +234
                </span>
                <Input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="8012345678"
                  className="pl-16"
                  required
                  maxLength={10}
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Enter your 10-digit Nigerian phone number
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || phoneNumber.length !== 10}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Sending OTP...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-xs text-center text-muted-foreground">
            By continuing, you agree to TradeHub's Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
