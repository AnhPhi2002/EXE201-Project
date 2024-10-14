import React, { useState, ChangeEvent, FormEvent } from "react";
import { Send, Phone, Mail, MapPin, Building } from "lucide-react"; // Sử dụng icon từ lucide-react

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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        <div className="md:flex-shrink-0 bg-indigo-600 md:w-1/3 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
            <p className="text-indigo-100 mb-8">
              We'd love to hear from you! Please fill out the form and we'll get back to you as soon as possible.
            </p>
          </div>
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
              <span>
                123 Business Avenue,
                <br />
                Suite 456,
                <br />
                Cityville, ST 78901
              </span>
            </div>
          </div>
        </div>
        <div className="p-8 md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
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
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone (optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
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
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.category ? 'border-red-500' : ''}`}
                aria-describedby="category-error"
              >
                <option value="">Select a category</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales</option>
                <option value="feedback">Feedback</option>
              </select>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600" id="category-error">
                  {errors.category}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
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
            <div>
              <button
                type="submit"
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
