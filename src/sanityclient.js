import { createClient } from '@sanity/client';
export const client = createClient({
  projectId: 'cj58exiu',
  dataset: 'production',  
  apiVersion: '2021-08-31',  
  useCdn: true,                    
});