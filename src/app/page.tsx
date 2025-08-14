'use client';
import React, { useState } from 'react';
import formSchema from '@/schemas/udyam.json';
import FormField from '../components/FormField';

export default function HomePage() {
  const steps = formSchema.steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: any, value: string) => {
    if (field.required && !value) return 'Required';
    if (field.pattern && value) {
      const re = new RegExp(field.pattern);
      if (!re.test(value)) return field.error || 'Invalid';
    }
    return '';
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    const fields = steps[currentStep].fields;
    fields.forEach(f => {
      const v = formData[f.name] || '';
      const err = validateField(f, v);
      if (err) newErrors[f.name] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (!validateStep()) return; setCurrentStep(s => s + 1); };
  const handlePrev = () => setCurrentStep(s => Math.max(0, s - 1));
  const handleSubmit = async () => {
    if (!validateStep()) return;
    alert('Form submitted successfully 🎉\n' + JSON.stringify(formData, null, 2));
  };

  const fields = steps[currentStep]?.fields || [];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-700 mb-2">{steps[currentStep]?.title || 'No step title'}</h1>
          <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
          </div>
          <p className="text-sm text-gray-600 mb-4">Step {currentStep + 1} of {steps.length}</p>
        </div>

        {fields.map(f => (
          <FormField key={f.id} field={f} value={formData[f.name] || ''} onChange={v => setFormData({ ...formData, [f.name]: v })} error={errors[f.name]} />
        ))}

        <div className="flex justify-between mt-4">
          <button onClick={handlePrev} disabled={currentStep === 0} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold transition hover:scale-105 disabled:opacity-50">Back</button>
          {currentStep < steps.length - 1 ? (
            <button onClick={handleNext} className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold transition hover:scale-105 hover:bg-blue-600">Next</button>
          ) : (
            <button onClick={handleSubmit} className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold transition hover:scale-105 hover:bg-green-600">Submit</button>
          )}
        </div>
      </div>
    </main>
  );
}
