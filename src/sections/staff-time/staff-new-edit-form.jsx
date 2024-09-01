import axios from 'axios';
import { z as zod } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
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

import { Box, Button, MenuItem } from '@mui/material';

import { useGetUsers } from 'src/actions/user';
import { useGetTasks } from 'src/actions/task';
import { useGetCompanys } from 'src/actions/company';

import { Form, Field } from 'src/components/hook-form';

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
// eslint-disable-next-line consistent-return
function calculateTimeDifference(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const diffInMilliseconds = end - start;
  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = Math.floor(diffInMinutes % 60);

  if (hours >= 0 && minutes >= 0) {
    return `${hours}س:${minutes}د`;
  }
  if (hours <= 0 || minutes <= 0) {
    return 'غير مقبول';
  }
}
function generateDateArray(startDate, endDate) {
  const dates = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
export function StaffNewEditForm({ currentStaff }) {
  const router = useRouter();
  const { t } = useTranslate();
  const loadingSave = useBoolean();

  const loadingSend = useBoolean();
  const { users } = useGetUsers();
  const { tasks } = useGetTasks();
  const { companys } = useGetCompanys();
  const [usersData, setUsersData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const [companysData, setCompanysData] = useState([]);
  const [employsShowArray, setEmploysShowArray] = useState([]);
  const [employsArray, setEmploysArray] = useState([]);
  const [dateArray, setDateArray] = useState([]);
  const [itemsArray, setItemsArray] = useState([]);

  const defaultValues = useMemo(
    () => ({
      // items: currentStaff?.items || [
      items: currentStaff?.items || [
        {
          user_id: '',
          start_time: formattedStartDate,
          end_time: formattedEndDate,
          task_id: '',
          duration: calculateTimeDifference(formattedStartDate, formattedEndDate),
          date: new Date().toISOString().slice(0, 10),
        },
      ],
      employs: [],
      company: '',
      tasks: '',
      start_time: StartDate,
      end_time: EndDate,
      start_date: new Date(),
      end_date: new Date(),
    }),
    [currentStaff?.items]
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
  useEffect(() => {
    if (tasks) {
      setTasksData(tasks);
    }
  }, [tasks]);
  useEffect(() => {
    if (users) {
      setUsersData(users);
    }
  }, [users]);
  useEffect(() => {
    if (companys) {
      setCompanysData(companys);
    }
  }, [companys]);

  useEffect(() => {
    if (usersData) {
      setEmploysShowArray(users.map((user) => ({ label: user.name, value: user.id })));
    }
  }, [users, usersData]);

  useEffect(() => {
    if (employsShowArray) {
      methods.setValue(
        'employs',
        employsShowArray.map((item) => item.value)
      );
      setEmploysArray(employsShowArray.map((item) => ({ id: item.value, name: item.label })));
    }
  }, [methods, employsShowArray]);
  useEffect(() => {
    const start = methods.getValues().start_date;
    const end = methods.getValues().end_date;
    if (start && end) {
      const dates = generateDateArray(start, end);
      setDateArray(dates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.getValues().start_date, methods.getValues().end_date]);
  // console.log(' employsShowArray', employsShowArray);
  // console.log('dateArray', dateArray);
  // console.log(' employsArray', employsArray);
  function createCombinedArray(dateArrayp) {
    return dateArrayp.flatMap((date) =>
      // employsArrayp.map((employ) => ({
      methods.getValues().employs.map((employ) => ({
        date,
        user_id: employ,
        company: methods.getValues().company,
        task_id: methods.getValues().tasks,
        start_time: methods.getValues().start_time,
        end_time: methods.getValues().end_time,
        // duration: calculateTimeDifference(start_time, end_time),
      }))
    );
  }

  function removeFridaysAndSaturdays(dateArraypp) {
    return dateArraypp.filter((date) => {
      const day = date.getDay();
      return day !== 5 && day !== 6;
    });
  }

  const filteredDateArray = removeFridaysAndSaturdays(dateArray);
  console.log('Filtered dateArray........', filteredDateArray);
  const newCombinedArray = createCombinedArray(filteredDateArray);
  console.log('Combined Array:', newCombinedArray);
  const applyValue = () => {
    methods.setValue('items', newCombinedArray);
  };

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
  console.log('values', methods.getValues());
  return (
    <Form methods={methods}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            <Field.Select
              name="company"
              size="small"
              label={t('company')}
              InputLabelProps={{ shrink: true }}
              sx={{ maxWidth: { md: 180 } }}
            >
              {companysData.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.MultiSelect
              checkbox
              name="employs"
              label="الموظفين"
              options={employsShowArray}
            />{' '}
            <Field.DatePicker
              type="datetime"
              format="DD-MM-YYYY"
              name="start_date"
              label={t('start_Date')}
              sx={{
                maxWidth: { md: 180 },
                '& .MuiInputBase-root': { height: '40px' },
                '& .MuiInputBase-input': { padding: '10px 14px' },
              }}
            />
            <Field.DatePicker
              type="datetime"
              format="DD-MM-YYYY"
              name="end_date"
              label={t('end_Date')}
              sx={{
                maxWidth: { md: 180 },
                '& .MuiInputBase-root': { height: '40px' },
                '& .MuiInputBase-input': { padding: '10px 14px' },
              }}
            />
            <Field.MobileDateTimePicker
              type="datetime"
              format="hh:mm a "
              openTo="hours"
              name="start_time"
              label={t('start_time')}
              sx={{
                maxWidth: { md: 180 },
                '& .MuiInputBase-root': { height: '40px' },
                '& .MuiInputBase-input': { padding: '10px 14px' },
              }}
            />
            <Field.MobileDateTimePicker
              type="datetime"
              format="hh:mm a "
              openTo="hours"
              name="end_time"
              label={t('end_time')}
              InputLabelProps={{ shrink: true }}
              sx={{
                maxWidth: { md: 180 },
                '& .MuiInputBase-root': { height: '40px' },
                '& .MuiInputBase-input': { padding: '10px 14px' },
              }}
            />
            <Field.Select
              name="tasks"
              size="small"
              label={t('task')}
              InputLabelProps={{ shrink: true }}
              sx={{ maxWidth: { md: 180 } }}
            >
              {tasksData.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.title}
                </MenuItem>
              ))}
            </Field.Select>
            <Button size="large" onClick={() => applyValue()} variant="contained">
              {' '}
              generate
            </Button>
          </Box>{' '}
        </Stack>

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
