import React, { useState } from 'react';
import { Send, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    pattern?: RegExp;
    message?: string;
    minLength?: number;
  };
}

interface ContactFormProps {
  fields?: FormField[];
  onSubmit: (formData: Record<string, string>) => Promise<void>;
  title?: string;
  subtitle?: string;
  submitButtonText?: string;
  successMessage?: string;
  errorMessage?: string;
  className?: string;
  showRequired?: boolean;
  layout?: 'vertical' | 'horizontal';
}

const defaultFields: FormField[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Your name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'your.email@example.com',
    required: true,
    validation: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address',
    },
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'How can we help you?',
    required: true,
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Your message here...',
    required: true,
    validation: {
      minLength: 10,
      message: 'Message must be at least 10 characters',
    },
  },
];

const ContactForm: React.FC<ContactFormProps> = ({
  fields = defaultFields,
  onSubmit,
  title = 'Contact Us',
  subtitle = 'We\'d love to hear from you. Fill out the form below and we\'ll get back to you as soon as possible.',
  submitButtonText = 'Send Message',
  successMessage = 'Your message has been sent successfully! We\'ll get back to you soon.',
  errorMessage = 'There was an error submitting the form. Please try again.',
  className = '',
  showRequired = true,
  layout = 'vertical',
}) => {
  // Form state
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate field on change if it's been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Mark field as touched on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Validate a single field
  const validateField = (name: string, value: string) => {
    const field = fields.find(f => f.name === name);
    if (!field) return;

    let error = '';
    
    // Required validation
    if (field.required && (!value || value.trim() === '')) {
      error = `${field.label} is required`;
    }
    
    // Pattern validation
    else if (field.validation?.pattern && value && !field.validation.pattern.test(value)) {
      error = field.validation.message || `Please enter a valid ${field.label.toLowerCase()}`;
    }
    
    // Min length validation
    else if (field.validation?.minLength && value.length < field.validation.minLength) {
      error = field.validation.message || `${field.label} must be at least ${field.validation.minLength} characters`;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  // Validate all fields
  const validateForm = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};
    
    fields.forEach(field => {
      newTouched[field.name] = true;
      const value = formData[field.name] || '';
      if (!validateField(field.name, value)) {
        isValid = false;
        newErrors[field.name] = errors[field.name];
      }
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setStatus('idle');
    
    try {
      await onSubmit(formData);
      setStatus('success');
      setFormData({});
      setTouched({});
    } catch (error) {
      setStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset the form
  const resetForm = () => {
    setFormData({});
    setErrors({});
    setTouched({});
    setStatus('idle');
  };

  // Render form fields
  const renderField = (field: FormField) => {
    const { name, label, type, placeholder, required, options } = field;
    const value = formData[name] || '';
    const error = touched[name] ? errors[name] : '';
    
    switch (type) {
      case 'textarea':
        return (
          <div className={layout === 'horizontal' ? 'sm:col-span-2' : ''}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label} {required && showRequired && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              rows={4}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              }`}
              disabled={isSubmitting}
              required={required}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
      
      case 'select':
        return (
          <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label} {required && showRequired && <span className="text-red-500">*</span>}
            </label>
            <select
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              }`}
              disabled={isSubmitting}
              required={required}
            >
              <option value="">{placeholder || `Select ${label}`}</option>
              {options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
      
      default: // text, email, tel
        return (
          <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {label} {required && showRequired && <span className="text-red-500">*</span>}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              }`}
              disabled={isSubmitting}
              required={required}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
    }
  };

  return (
    <div className={`${className}`}>
      {/* Form header */}
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>}
        </div>
      )}
      
      {/* Status messages */}
      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md flex items-start">
          <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-green-800 dark:text-green-200">{successMessage}</p>
            <button 
              onClick={resetForm}
              className="mt-2 text-sm text-green-700 dark:text-green-300 underline"
            >
              Send another message
            </button>
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center">
          <AlertCircle className="text-red-500 mr-3 flex-shrink-0" size={20} />
          <p className="text-red-800 dark:text-red-200">{errorMessage}</p>
        </div>
      )}
      
      {/* Form */}
      {status !== 'success' && (
        <form onSubmit={handleSubmit} noValidate>
          <div className={`${layout === 'horizontal' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-4'}`}>
            {fields.map(field => (
              <React.Fragment key={field.name}>
                {renderField(field)}
              </React.Fragment>
            ))}
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin mr-2" size={18} />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2" size={18} />
                  {submitButtonText}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 