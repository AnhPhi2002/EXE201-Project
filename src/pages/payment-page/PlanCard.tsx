import React from 'react';
import { Check } from 'lucide-react';
import { Plan } from '@/lib/api/types/paymentData';

interface PlanCardProps {
  plan: Plan;
  onSelectPlan: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({ plan, onSelectPlan }) => {
  return (
    <section className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-indigo-900 text-center mb-4">Nâng cấp để mở khóa tài liệu cao cấp</h2>
        <p className="text-xl text-indigo-700 text-center mb-12 max-w-3xl mx-auto">
          Hãy nâng cấp lên thành viên Premium để tận hưởng các tài nguyên học tập độc quyền và các tính năng bổ trợ cho việc học.
        </p>
        <div className="flex justify-center">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 w-full max-w-md">
            <div className="px-6 py-8">
              <h3 className="text-2xl font-semibold text-indigo-900 mb-2">{plan.name}</h3>
              <p className="text-4xl font-bold text-indigo-900 mb-4">
                {plan.price}
                <span className="text-lg font-normal text-indigo-600">/tháng</span>
              </p>
              <p className="text-indigo-600 mb-6">{plan.description}</p>
              <ul className="mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center mb-2">
                    <Check className="text-green-500 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-4 rounded-lg font-semibold text-white transition duration-300 bg-indigo-600 hover:bg-indigo-700 shadow-lg" onClick={onSelectPlan}>
                Chọn gói
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanCard;
