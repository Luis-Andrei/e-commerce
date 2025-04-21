import { Libraries } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export const GOOGLE_MAPS_CONFIG = {
  apiKey: GOOGLE_MAPS_API_KEY,
  libraries: ['places'] as Libraries,
  options: {
    componentRestrictions: { country: 'br' },
    fields: ['address_components', 'geometry', 'formatted_address'],
    types: ['address']
  }
}; 