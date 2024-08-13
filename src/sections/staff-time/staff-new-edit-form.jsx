import axios from 'axios';
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

import { endpoints } from 'src/utils/axios';

import { useTranslate } from 'src/locales';
// import { CONFIG } from 'src/config-global';

import { Form } from 'src/components/hook-form';

import { StaffNewEditDetails } from './staff-new-edit-details';

export const NewStaffSchema = zod.object({
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
export function StaffNewEditForm({ currentStaff }) {
  const router = useRouter();
  const { t } = useTranslate();
  const loadingSave = useBoolean();

  const loadingSend = useBoolean();

  const defaultValues = useMemo(
    () => ({
      items: currentStaff?.items || [
        {
          user_id: '',
          start_time: formattedStartDate,
          end_time: formattedEndDate,
          task_id: '',
          duration: calculateTimeDifference(formattedStartDate, formattedEndDate),
        },
      ],
    }),
    [currentStaff]
  );
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewStaffSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const token = sessionStorage.getItem('jwt_access_token');

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      const newData = {
        items: methods.getValues().items,
      };
      const axiosInstance = axios.create({
        baseURL: 'https://todo.int-vision.com',
      });
      const response = await axiosInstance.post(endpoints.staff.create, newData, {
        // followRedirects: true,
        headers,
      });

      reset();

      if (response.status) {
        toast('update_success');
        router.push(paths.dashboard.staff.list);
      } else {
        toast(response.statusText);
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);

      toast('some thing error');
    }
  });

  return (
    <Form methods={methods}>
      <Card>
        <StaffNewEditDetails />
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
          {currentStaff ? t('update') : t('create')}
        </LoadingButton>
      </Stack>
    </Form>
  );
}
