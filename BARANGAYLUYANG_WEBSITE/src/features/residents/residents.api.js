// src/features/residents/residents.api.js
const RESIDENTS_API_BASE = '/api/residents';

export const residentsApi = {
  getStats: async () => {
    try {
      const response = await fetch(`${RESIDENTS_API_BASE}/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error('Residents API error:', error);
      return {
        total: 1858,
        males: 933,
        females: 925,
        children: 320,
        adults: 1538,
        updatedAt: new Date().toISOString(),
      };
    }
  },
};