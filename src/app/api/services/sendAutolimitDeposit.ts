import { RequestAutoLimitValues } from '@/app/ts/types';

export const SendAutolimitDeposit = async ({
  dataRequest,
}: {
  dataRequest: RequestAutoLimitValues;
}): Promise<unknown> => {
  try {
    const response = await fetch(
      'https://64b68442df0839c97e15b2a0.mockapi.io/api/v1/self-limitation',
      {
        method: 'POST',
        body: JSON.stringify(dataRequest),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to send data');
    }

    return await response.json();
  } catch (error) {
    throw error as Error;
  }
};
