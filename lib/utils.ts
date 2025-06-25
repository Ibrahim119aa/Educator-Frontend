import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Delhi",
  "Puducherry",
  "Ladakh",
  "Jammu and Kashmir"
];



export const createSVGDataUrl = (name: string, width = 100, height = 100, fontSize = 48, fontFamily = 'Verdana') => {
  const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" style="stop-color:#000;stop-opacity:1" />
                  <stop offset="50%" style="stop-color:#000;stop-opacity:1" />

              </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grad1)" />
          <text x="50%" y="50%" font-size="${fontSize}" fill="#fff"
              text-anchor="middle" dominant-baseline="middle"
              font-family="${fontFamily}">${name}</text>
      </svg>
      `;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}