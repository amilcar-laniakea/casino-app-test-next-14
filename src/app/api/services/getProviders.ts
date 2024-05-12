import { Provider } from '@/app/ts/types';
import { checkProvidersData } from '@/app/utils/checkProviderData';
import { useState, useEffect } from 'react';

const GetProviders = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [providers, setProviders] = useState<Provider[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setLoading(true);

    (async () => {
      try {
        const response = await fetch(
          'https://64b68442df0839c97e15b2a0.mockapi.io/api/v1/provider',
          { signal }
        );

        if (!signal.aborted) {
          if (response.ok) {
            const data = await response.json();
            const providers = checkProvidersData(data);
            setProviders(providers.validProviders);
            if (providers.invalidCount > 0)
              // eslint-disable-next-line no-console
              console.warn('proveedores con data corrupta:', providers.invalidCount);
            setLoading(false);
          } else {
            setError(`HTTP error! Status: ${response.status}`);
          }
        }
      } catch {
        if (!signal.aborted) {
          setError('service error');
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return { loading, providers, error };
};

export default GetProviders;
