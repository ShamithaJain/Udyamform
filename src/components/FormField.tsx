'use client';
import React from 'react';

interface FormFieldProps {
  field: any;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, error }) => {
  if (!field) return null;

  const commonProps = {
    id: field.id,
    name: field.name,
    placeholder: field.placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      onChange(e.target.value),
    className: `w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
      error ? 'border-red-500' : 'border-gray-300'
    }`,
  };

  switch (field.type) {
    case 'textarea':
      return (
        <div className="mb-4">
          <label htmlFor={field.id} className="block font-semibold mb-1">{field.label}</label>
          <textarea {...commonProps} />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    case 'select':
      return (
        <div className="mb-4">
          <label htmlFor={field.id} className="block font-semibold mb-1">{field.label}</label>
          <select {...commonProps}>
            {(field.options || []).map((opt: any) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
    case 'checkbox':
      return (
        <div className="mb-4 flex items-center gap-2">
          <input type="checkbox" id={field.id} checked={value === 'true'} onChange={e => onChange(e.target.checked ? 'true' : 'false')} />
          <label htmlFor={field.id}>{field.label}</label>
        </div>
      );
    default:
      return (
        <div className="mb-4">
          <label htmlFor={field.id} className="block font-semibold mb-1">{field.label}</label>
          <input type={field.type || 'text'} {...commonProps} />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      );
  }
};

export default FormField;
