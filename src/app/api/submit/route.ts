import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface SubmissionData {
  aadhaar: string;
  pan: string;
}

function validateSubmission(data: SubmissionData) {
  const errors: Record<string, string> = {};
  if (!data.aadhaar || !/^\d{12}$/.test(data.aadhaar)) errors.aadhaar = 'Invalid Aadhaar';
  if (!data.pan || !/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(data.pan)) errors.pan = 'Invalid PAN';
  return errors;
}

export async function POST(req: NextRequest) {
  try {
    const data: SubmissionData = await req.json();
    const errors = validateSubmission(data);
    if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 400 });
    const submission = await prisma.submission.create({ data });
    return NextResponse.json({ message: 'Submission saved', id: submission.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
