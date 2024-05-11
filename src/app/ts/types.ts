export type TabItem = {
  id: number;
  title: string;
  content: JSX.Element | string;
};

export type Provider = {
  id: number;
  name: string;
  description: string;
};

export type AlertType = {
  type: 'success' | 'error';
  description: string;
};

export type RequestAutoLimitValues = {
  minimumAmount: number;
  dailyAmount: number;
  weeklyAmount: number;
  monthlyAmount: number;
};
