'use client';
import { useEffect, useState } from 'react';

import Button from '@ui/button';
import InputCurrency from '@ui/inputCurrency';
import Title from '@ui/title';
import InputCalendar from '@ui/inputCalendar';
import TextArea from '@ui/textarea';
import { DateRangeType, DateValueType } from 'react-tailwindcss-datepicker';
import Hint from '@ui/hint';
import { SendAutolimitDeposit } from '@/app/api/services/sendAutolimitDeposit';
import { AlertType } from '@/app/ts/types';
import Alert from '@ui/alert';

type AutoLimitValues = {
  minimumAmount: string;
  dailyAmount: string;
  weeklyAmount: string;
  monthlyAmount: string;
};

type AutoLimitErrorValues = {
  minimumAmount: string | null;
  dailyAmount: string | null | null;
  weeklyAmount: string | null;
  monthlyAmount: string | null;
};

const FormDeposit = (): JSX.Element => {
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [values, setValues] = useState<AutoLimitValues>({
    minimumAmount: '',
    dailyAmount: '',
    weeklyAmount: '',
    monthlyAmount: '',
  });
  const [errorValues, setErrorValues] = useState({
    minimumAmount: null,
    dailyAmount: null,
    weeklyAmount: null,
    monthlyAmount: null,
  });
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [inputTextArea, setInputTextArea] = useState<string>('');
  const [errorInputTextArea, setErrorInputTextArea] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertType | null>(null);
  const [errorAutoLimits, setErrorAutoLimits] = useState<string | null>(null);

  const handleChangeCurrency = (e: { name: string; value: string }) => {
    const { name, value } = e;
    setValues(prevState => ({
      ...prevState,
      [name]: value,
    }));

    const validInput = function validateInput(v: string) {
      return /^(?:.?[0-9]+)$/.test(v);
    };

    if (value && !validInput(value)) {
      return setErrorValues(prevState => ({
        ...prevState,
        [name]: 'Campo requerido o formato inválido (sólo números sin decimales)',
      }));
    } else {
      if (name === ('minimumAmount' as string) && Number(value) < 5000) {
        return setErrorValues(prevState => ({
          ...prevState,
          [name]: 'El monto debe ser mayor a 5000',
        }));
      }
      return setErrorValues(prevState => ({
        ...prevState,
        [name]: null,
      }));
    }
  };

  const handleDateChange = (date: DateValueType) => {
    setDateValue(date);
  };

  const handleTextAreaChange = (e: { name: string; value: string }) => {
    const { value } = e;
    setInputTextArea(value);
    if (value.length < 8 || value.length > 255) {
      setErrorInputTextArea(true);
    } else {
      setErrorInputTextArea(false);
    }
  };

  const handleClearForm = () => {
    setValues({
      minimumAmount: '',
      dailyAmount: '',
      weeklyAmount: '',
      monthlyAmount: '',
    });
    setInputTextArea('');
    setDateValue({
      startDate: null,
      endDate: null,
    });
  };

  const handleValidateInput = (v: AutoLimitValues, e: AutoLimitErrorValues) => {
    const { minimumAmount, ...inputValues } = v;
    const { minimumAmount: errorMinimumAmount, ...inputErrorValues } = e;

    if (errorMinimumAmount !== null || minimumAmount === '') return true;
    if (Object.values(inputErrorValues).some(value => value !== null)) return true;
    if (Object.values(inputValues).every(value => value === '')) return true;
    return false;
  };

  const handleSubmit = async () => {
    const dataRequest = {
      minimumAmount: Number(values.minimumAmount),
      dailyAmount: Number(values.dailyAmount) || 0,
      weeklyAmount: Number(values.weeklyAmount) || 0,
      monthlyAmount: Number(values.monthlyAmount) || 0,
    };

    try {
      await SendAutolimitDeposit({ dataRequest });
      handleClearForm();
      setAlertInfo({ type: 'success', description: 'datos enviados con éxito...' });
    } catch {
      setAlertInfo({ type: 'error', description: 'ha ocurrido un error...' });
    } finally {
      setLoadingSubmit(false);
    }
  };

  useEffect(() => {
    const validateAutoLimits = (values: AutoLimitValues): void => {
      const { dailyAmount, weeklyAmount, monthlyAmount } = values;

      if (dailyAmount && weeklyAmount && parseFloat(dailyAmount) > parseFloat(weeklyAmount))
        return setErrorAutoLimits('El monto diario debe ser menor o igual al monto semanal.');
      if (dailyAmount && monthlyAmount && parseFloat(dailyAmount) > parseFloat(monthlyAmount))
        return setErrorAutoLimits('El monto diario debe ser menor o igual al monto mensual.');
      if (weeklyAmount && monthlyAmount && parseFloat(weeklyAmount) > parseFloat(monthlyAmount))
        return setErrorAutoLimits('El monto semanal debe ser menor o igual al monto mensual.');
      return setErrorAutoLimits(null);
    };
    validateAutoLimits(values);
  }, [values]);

  return (
    <>
      <Title text="DEFINA SUS LIMITES DE DEPOSITO" />
      {errorAutoLimits && (
        <div className="mt-4">
          <Alert data={{ type: 'error', description: errorAutoLimits }} onClose={() => {}} />
        </div>
      )}
      <div className="flex w-full justify-center">
        <div className="m-4 w-full max-w-md flex flex-col space-y-3 justify-center">
          <InputCurrency
            name="minimumAmount"
            onChange={handleChangeCurrency}
            currency="USD"
            symbol="$"
            disabled={false}
            value={values.minimumAmount as string}
            placeholder="Monto mínimo de depósito"
            hint={errorValues.minimumAmount !== null ? errorValues.minimumAmount : ''}
          />

          <InputCurrency
            name="dailyAmount"
            onChange={handleChangeCurrency}
            currency="USD"
            symbol="$"
            disabled={false}
            value={values.dailyAmount}
            placeholder="Diario (De 00:00 hasta 24:00 hrs)"
            hint={errorValues.dailyAmount !== null ? errorValues.dailyAmount : ''}
          />
          <InputCurrency
            name="weeklyAmount"
            onChange={handleChangeCurrency}
            currency="USD"
            symbol="$"
            disabled={false}
            value={values.weeklyAmount}
            placeholder="Semanal (De lunes a domingo)"
            hint={errorValues.weeklyAmount !== null ? errorValues.weeklyAmount : ''}
          />
          <InputCurrency
            name="monthlyAmount"
            onChange={handleChangeCurrency}
            currency="USD"
            symbol="$"
            disabled={false}
            value={values.monthlyAmount}
            placeholder="Mensual (Del 1 al 30)"
            hint={errorValues.monthlyAmount !== null ? errorValues.monthlyAmount : ''}
          />
          <div className="flex flex-start mx-0 w-full">
            <InputCalendar
              value={dateValue}
              onChange={handleDateChange}
              minDate={new Date()}
              asSingle={true}
              useRange={false}
              disabled={loadingSubmit}
              displayFormat={'DD/MM/YYYY'}
              placeholder="DD/MM/AAAA*"
            />
          </div>
          <div className="flex flex-start mx-0 w-full mt-4">
            <TextArea
              placeholder="Motivo..."
              rows={8}
              disabled={loadingSubmit}
              onChange={handleTextAreaChange}
              value={inputTextArea}
            />
          </div>
          {errorInputTextArea && (
            <div className="px-3">
              <Hint text="mínimo 8 caracteres, máximo 255 caracteres" />
            </div>
          )}
          {alertInfo && (
            <div className="mt-4">
              <Alert data={alertInfo} onClose={() => setAlertInfo(null)} />
            </div>
          )}
          <div className="mt-10">
            <Button
              type="secondary"
              width={80}
              text="ENVIAR"
              onClick={handleSubmit}
              disabled={
                loadingSubmit ||
                handleValidateInput(values, errorValues) ||
                !Object.values(dateValue as DateRangeType).every(value => value !== null) ||
                errorInputTextArea ||
                inputTextArea.length <= 0 ||
                errorAutoLimits !== null
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FormDeposit;
