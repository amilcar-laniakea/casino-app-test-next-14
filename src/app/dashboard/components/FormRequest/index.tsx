import { useEffect, useMemo, useState } from 'react';
import { DateRangeType, DateValueType } from 'react-tailwindcss-datepicker';
import GetProviders from '@/app/api/services/getProviders';
import { AlertType, Provider } from '@/app/ts/types';
import Card from '@ui/card';
import Checkbox from '@ui/checkbox';
import Title from '@ui/title';
import Button from '@ui/button';
import RadioButton from '@ui/radioButton';
import TextArea from '@ui/textarea';
import Hint from '@ui/hint';
import Alert from '@ui/alert';
import { SendExcludeProvider } from '@/app/api/services/sendExcludeProviders';
import InputCalendar from '@/app/components/ui/inputCalendar';

const FormRequest = (): JSX.Element => {
  const { loading, providers, error } = GetProviders();
  const [checkedAll, setCheckedAll] = useState<boolean>(false);
  const [selectedProviders, setSelectedProviders] = useState<Provider[]>([]);
  const [selectedRadioOption, setSelectedRadioOption] = useState<string | null>(null);
  const [inputTextArea, setInputTextArea] = useState<string>('');
  const [inputTextAreaError, setInputTextAreaError] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<AlertType | null>(null);

  const handleSelectProvider = (e: { name: string; checked: boolean }) => {
    const { name } = e;
    const indexToVerify = selectedProviders.findIndex(item => item.id.toString() === name);

    if (providers) {
      if (indexToVerify === -1) {
        const indexToPush = providers.findIndex(item => item.id.toString() === name) as number;
        setSelectedProviders(prevProvider => [...prevProvider, providers[indexToPush]]);
      } else {
        const newArray = selectedProviders.slice();
        newArray.splice(indexToVerify, 1);
        setSelectedProviders([...newArray]);
      }
    }
  };

  const handleSelectAllProviders = (e: { name: string; checked: boolean }) => {
    const { checked } = e;
    if (checked && providers) {
      setSelectedProviders(providers);
    } else {
      setSelectedProviders([]);
    }
    setCheckedAll(checked);
  };

  const handleOptionChange = (option: string) => {
    setSelectedRadioOption(option);
  };

  const handleTextAreaChange = (e: { name: string; value: string }) => {
    const { value } = e;
    setInputTextArea(value);
    if (value.length < 8 || value.length > 255) {
      setInputTextAreaError(true);
    } else {
      setInputTextAreaError(false);
    }
  };

  const handleClearForm = () => {
    setCheckedAll(false);
    setSelectedProviders([]);
    setSelectedRadioOption(null);
    setInputTextArea('');
    setDateValue({
      startDate: null,
      endDate: null,
    });
  };

  const handleSubmit = async () => {
    setLoadingSubmit(true);
    const submitData = {
      providers: selectedProviders,
      period: selectedRadioOption,
      date: dateValue?.endDate ?? null,
      reason: inputTextArea,
    };
    // eslint-disable-next-line no-console
    console.log('submitData...', submitData);
    try {
      await SendExcludeProvider();
      handleClearForm();
      setAlertInfo({ type: 'success', description: 'datos enviados con éxito...' });
    } catch {
      setAlertInfo({ type: 'error', description: 'ha ocurrido un error...' });
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleDateChange = (date: DateValueType) => {
    setDateValue(date);
  };

  const providersMemo = useMemo(() => selectedProviders, [selectedProviders]);

  useEffect(() => {
    if (providers && providers.length === selectedProviders.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [selectedProviders, providers]);

  if (loading)
    return (
      <Card>
        <Title text="CARGANDO" />
      </Card>
    );

  if (error)
    return (
      <Card>
        <Title text="HUBO UN ERROR AL CARGAR LA LISTA DE PROVEEDORES" />
      </Card>
    );

  return (
    <>
      <div className="mb-4">
        <Card>
          <>
            <div className="mb-2">
              <Title text="AUTOEXCLUSIÓN PROVEEDORES" />
            </div>
            <div className="border-b-2">
              <Checkbox
                id="checkAll"
                label="Todos"
                checked={checkedAll}
                onChange={handleSelectAllProviders}
                disabled={loadingSubmit}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2 md:grid-cols-5">
              {providers?.map(provider => (
                <Checkbox
                  key={provider.id}
                  id={provider.id.toString()}
                  label={provider.name}
                  checked={providersMemo.some(p => p.id === provider.id)}
                  onChange={handleSelectProvider}
                  disabled={loadingSubmit}
                />
              ))}
            </div>
          </>
        </Card>
      </div>
      <Card>
        <>
          <Title text="POR UN PERÍODO DE TIEMPO" />
          <div className="flex flex-wrap mt-4 mb-4">
            <div className="pr-8">
              <RadioButton
                id="temporaly"
                label="Temporal hasta"
                checked={selectedRadioOption === 'temporaly'}
                onChange={() => handleOptionChange('temporaly')}
                disabled={loadingSubmit}
              />
            </div>
            <div>
              <RadioButton
                id="undefined"
                label="Indefinido"
                checked={selectedRadioOption === 'undefined'}
                onChange={() => handleOptionChange('undefined')}
                disabled={loadingSubmit}
              />
            </div>
          </div>
          <div className="px-4 max-w-md">
            <div className="flex flex-start mx-0 w-full">
              <InputCalendar
                value={dateValue}
                onChange={handleDateChange}
                minDate={new Date()}
                asSingle={true}
                useRange={false}
                disabled={selectedRadioOption !== 'temporaly' || loadingSubmit}
                displayFormat={'DD/MM/YYYY'}
                placeholder="DD/MM/AAAA*"
              />
            </div>
            <div className="flex flex-start mx-0 w-full mt-4">
              <TextArea
                placeholder="Motivo..."
                rows={8}
                disabled={!selectedRadioOption || loadingSubmit}
                onChange={handleTextAreaChange}
                value={inputTextArea}
              />
            </div>
          </div>
          {inputTextAreaError && (
            <div className="px-3">
              <Hint text="mínimo 8 caracteres, máximo 255 caracteres" />
            </div>
          )}
        </>
      </Card>
      {alertInfo && (
        <div className="mt-4">
          <Alert data={alertInfo} onClose={() => setAlertInfo(null)} />
        </div>
      )}
      <div className="mt-10">
        <Button
          type="primary"
          width={80}
          text="ENVIAR"
          onClick={handleSubmit}
          disabled={
            providersMemo?.length <= 0 ||
            !selectedRadioOption ||
            (selectedRadioOption === 'temporaly' &&
              !Object.values(dateValue as DateRangeType).every(value => value !== null)) ||
            inputTextAreaError ||
            inputTextArea.length <= 0 ||
            loadingSubmit
          }
        />
      </div>
    </>
  );
};

export default FormRequest;
