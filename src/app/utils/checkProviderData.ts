import { Provider } from '../ts/types';

export const checkProvidersData = (providers: Provider[]): Provider[] => {
  return providers.filter(
    provider => provider.description && provider.name && typeof provider.id === 'number'
  );
};
