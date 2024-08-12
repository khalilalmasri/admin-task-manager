import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';

import { Form } from 'src/components/hook-form';

import { InvoiceNewEditDetails } from './invoice-new-edit-details';
// import { InvoiceNewEditAddress } from './invoice-new-edit-address';
// import { InvoiceNewEditStatusDate } from './invoice-new-edit-status-date';

export const NewInvoiceSchema = zod.object({
  items: zod.array(zod.object({})).optional(),
});

// ----------------------------------------------------------------------

const StartDate = new Date();
StartDate.setHours(8, 0, 0, 0);
const formattedStartDate = `${StartDate.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Riyadh' }).replace(', ', 'T')}+03:00`;
const EndDate = new Date();
EndDate.setHours(17, 0, 0, 0);
const formattedEndDate = `${EndDate.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Asia/Riyadh' }).replace(', ', 'T')}+03:00`;
function calculateTimeDifference(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const diffInMilliseconds = end - start;
  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = Math.floor(diffInMinutes % 60);

  // return { hours, minutes };
  return `${hours}س:${minutes}د`;
}
export function InvoiceNewEditForm({ currentInvoice }) {
  const router = useRouter();
  const { t } = useTranslate();
  const loadingSave = useBoolean();

  const loadingSend = useBoolean();

  const defaultValues = useMemo(
    () => ({
      items: currentInvoice?.items || [
        {
          name: '',
          // start_time: new Date().setHours(8, 0, 0, 0),
          start_time: formattedStartDate,
          end_time: formattedEndDate,
          task: '',
          duration: calculateTimeDifference(formattedStartDate, formattedEndDate),
        },
      ],
    }),
    [currentInvoice]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewInvoiceSchema),
    defaultValues,
  });
  console.log('dataout....................', methods.getValues());
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // console.log('data =>>>>>>', data);
      const newData = {
        items: methods.getValues().items,
      };
      // console.log('after......sssss....data =>>>>>>');

      const existingDataString = localStorage.getItem('taskData');
      const existingData = existingDataString ? JSON.parse(existingDataString) : { items: [] };

      // Append new items to existing items
      existingData.items = [...existingData.items, ...newData.items];

      // Save updated data back to local storage
      localStorage.setItem('taskData', JSON.stringify(existingData));
      // const response = await axios.post(endpoints.task.create, newData);
      // console.log('next.........................data =>>>>>>');
      reset();

      // if (response.status) {
      toast('update_success');
      router.push(paths.dashboard.staff.list);
      // } else {
      // toast(response.statusText);
      // console.log(response.statusText);
      // }
    } catch (error) {
      console.error(error);
      // toast(error?.data);
      toast('some thing error');
      // setErro(typeof error === 'string' ? error : error.message);
    }
  });
  // const handleSaveAsDraft = handleSubmit(async (data) => {
  //   loadingSave.onTrue();

  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     reset();
  //     loadingSave.onFalse();
  //     router.push(paths.dashboard.invoice.root);
  //     console.info('DATA', JSON.stringify(data, null, 2));
  //   } catch (error) {
  //     console.error(error);
  //     loadingSave.onFalse();
  //   }
  // });

  // const handleCreateAndSend = handleSubmit(async (data) => {
  //   loadingSend.onTrue();

  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     reset();
  //     loadingSend.onFalse();
  //     router.push(paths.dashboard.invoice.root);
  //     console.info('DATA', JSON.stringify(data, null, 2));
  //   } catch (error) {
  //     console.error(error);
  //     loadingSend.onFalse();
  //   }
  // });

  return (
    <Form methods={methods}>
      <Card>
        {/* <InvoiceNewEditAddress /> */}

        {/* <InvoiceNewEditStatusDate /> */}

        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        {/* <LoadingButton
          color="inherit"
          size="large"
          variant="outlined"
          loading={loadingSave.value && isSubmitting}
          onClick={handleSaveAsDraft}
        >
          Save as draft
        </LoadingButton> */}

        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend.value && isSubmitting}
          // onClick={handleCreateAndSend}
          onClick={onSubmit}
        >
          {currentInvoice ? t('Update') : t('Create')}
        </LoadingButton>
      </Stack>
    </Form>
  );
}
