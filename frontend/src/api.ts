import { Manifestation } from './types';

const baseUrl: string = (process.env.REACT_APP_NODE_ENV === 'dev' ? process.env.REACT_APP_LOCAL_SERVER_URL : process.env.REACT_APP_PROD_SERVER_URL) as string;

export const getManifestation = async () => {
  console.log(`fetching from ${baseUrl}/manifestation`);
  const resp = await fetch(`${baseUrl}/manifestation`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const manifestation: Manifestation = await resp.json();
  console.log('manifestation:', manifestation);
  return manifestation;
}