# Udyam Registration Form Scraper

## Overview
This project is a full-stack application that mimics the first two steps of the Udyam registration form. It allows users to view and fill the form fields in a responsive UI. The form data schema is extracted from the official Udyam registration page using Puppeteer.

---

## Features
- **Web Scraping**: Extracts all input, select, and textarea fields from the official Udyam registration page.
- **Dynamic Form UI**: Renders Step 1 and Step 2 fields dynamically.
- **Validation**: Basic validation for required fields.
- **Frontend**: Built with Next.js and React, styled using Tailwind CSS.
- **JSON Schema**: Form fields are saved in `src/schemas/udyam.json`.

---

## Installation
1. Clone the repository:
```bash
git clone <your-repo-url>
cd udyam-scraper
```
Install dependencies:```
npm install```
Run the frontend:```
npm run dev```
To regenerate the form schema (optional):```
node scripts/scrapeForm.js```

Folder Structure

udyam-scraper/
├─ src/
│  ├─ app/             # Next.js pages
│  ├─ components/      # React form components
│  ├─ schemas/         # Generated JSON schema (udyam.json)
├─ scripts/             # Puppeteer scraper scripts
├─ .gitignore
├─ package.json
├─ README.md
