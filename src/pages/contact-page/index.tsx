import React, { useState, ChangeEvent, FormEvent } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react"; // Sử dụng icon từ lucide-react
import { motion } from "framer-motion"; // Import motion từ framer-motion

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  category: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  category?: string;
  message?: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: ""
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Form submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          category: "",
          message: ""
        });
      }, 2000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Sidebar */}
        <motion.div
          className="md:flex-shrink-0 bg-gradient-to-r from-purple-500 to-pink-500 md:w-1/3 p-8 flex flex-col justify-between"
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Liên Hệ Với Chúng Tôi</h2>
          <p className="text-indigo-100 mb-8">
            Chúng tôi rất mong nhận được phản hồi từ bạn! Hãy điền vào mẫu dưới đây và chúng tôi sẽ phản hồi sớm nhất có thể.
          </p>
          <div className="space-y-4">
            <div className="flex items-center text-indigo-100">
              <Phone className="w-6 h-6 mr-3" />
              <span>+1 (123) 456-7890</span>
            </div>
            <div className="flex items-center text-indigo-100">
              <Mail className="w-6 h-6 mr-3" />
              <span>contact@example.com</span>
            </div>
            <div className="flex items-start text-indigo-100">
              <MapPin className="w-6 h-6 mr-3 mt-1" />
              <span>123 Business Avenue, Suite 456, Cityville, ST 78901</span>
            </div>
          </div>
        </motion.div>

        {/* Form Section */}
        <div className="p-8 md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
                aria-describedby="name-error"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.email ? 'border-red-500' : ''}`}
                aria-describedby="email-error"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Subject Input */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Chủ Đề
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.subject ? 'border-red-500' : ''}`}
                aria-describedby="subject-error"
              />
              {errors.subject && (
                <p className="mt-2 text-sm text-red-600" id="subject-error">
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Category Input */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Danh Mục
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.category ? 'border-red-500' : ''}`}
                aria-describedby="category-error"
              >
                <option value="">Chọn danh mục</option>
                <option value="general">Câu hỏi chung</option>
                <option value="support">Hỗ trợ kỹ thuật</option>
                <option value="sales">Bán hàng</option>
                <option value="feedback">Phản hồi</option>
              </select>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600" id="category-error">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Tin Nhắn
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.message ? 'border-red-500' : ''}`}
                aria-describedby="message-error"
              ></textarea>
              {errors.message && (
                <p className="mt-2 text-sm text-red-600" id="message-error">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="animate-spin">Đang gửi...</span>
                ) : (
                  <>
                    Gửi
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
