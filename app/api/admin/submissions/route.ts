import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to submissions file
const dataDir = path.join(process.cwd(), 'data');
const submissionsFile = path.join(dataDir, 'submissions.json');

// Simple function to ensure the data directory and file exist
function ensureDataExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(submissionsFile)) {
    fs.writeFileSync(submissionsFile, JSON.stringify([], null, 2));
  }
}

// GET endpoint to retrieve all submissions
export async function GET() {
  try {
    ensureDataExists();
    
    // Read submissions from file
    const data = fs.readFileSync(submissionsFile, 'utf8');
    const submissions = JSON.parse(data);
    
    // Sort submissions by timestamp (newest first)
    submissions.sort((a: any, b: any) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });
    
    return NextResponse.json({ 
      success: true, 
      submissions 
    });
  } catch (error) {
    console.error('Error retrieving submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to retrieve submissions' },
      { status: 500 }
    );
  }
} 