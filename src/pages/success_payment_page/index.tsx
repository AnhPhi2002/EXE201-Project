import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Home, BookOpen } from 'lucide-react';

const SuccessPaymentPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Cập nhật localStorage để đánh dấu user đã premium
    localStorage.setItem('isPremium', 'true');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon with Animation */}
            <div className="mb-4 animate-bounce">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>

            {/* Success Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for upgrading to premium. You now have access to all premium features.
            </p>

            {/* Premium Features List */}
            <div className="bg-gray-50 p-4 rounded-lg w-full mb-8">
              <h2 className="font-semibold text-lg text-gray-900 mb-3">
                Your Premium Benefits:
              </h2>
              <ul className="space-y-2 text-left">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Access to all premium courses
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Unlimited practice exercises
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Priority support
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Download resources
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button 
                className="flex-1"
                variant="default"
                onClick={() => navigate('/courses')}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Start Learning
              </Button>
              <Button 
                className="flex-1"
                variant="outline"
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Go to Home
              </Button>
            </div>

            {/* Support Message */}
            <p className="text-sm text-gray-500 mt-6">
              Need help? Contact our support at support@learnup.work
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPaymentPage;