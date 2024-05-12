import { Provider } from '../ts/types';

export interface CheckProvidersResult {
  validProviders: Provider[];
  invalidCount: number;
}

export const checkProvidersData = (providers: Provider[]): CheckProvidersResult => {
  let invalidCount = 0;
  const validProviders = providers.filter(provider => {
    if (provider.description && provider.name && typeof provider.id === 'number') {
      return true;
    } else {
      invalidCount++;
      return false;
    }
  });

  return { validProviders, invalidCount };
};
