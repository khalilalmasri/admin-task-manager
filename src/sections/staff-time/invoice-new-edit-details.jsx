import { useState, useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';
import { useGetUsers } from 'src/actions/user';
import { useGetTasks } from 'src/actions/task';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function InvoiceNewEditDetails() {
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const { users } = useGetUsers();
  const { tasks } = useGetTasks();
  const [usersData, setUsersData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const values = watch();

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
  const { t } = useTranslate();
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
  const startTime = formattedStartDate;
  const endTime = formattedEndDate;

  // const { hours, minutes } = calculateTimeDifference(startTime, endTime);
  // console.log(`الفرق: ${hours} ساعات و ${minutes} دقيقة`);
  // console.log(`${hours}:${minutes}`);
  // console.log(formattedDate);
  const handleAdd = () => {
    append({
      user_id: '',
      start_time: formattedStartDate,
      end_time: formattedEndDate,
      task_id: '',
      duration: calculateTimeDifference(formattedStartDate, formattedEndDate),
    });
  };
  console.log('values', values.items[0].duration);
  const handleRemove = (index) => {
    remove(index);
  };
  const handleDurationChange = (event, index) => {
    setValue(`items[${index}].duration`, values.items[index].duration);
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        ملء دوام الموظف:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <Field.Select
                name={`items[${index}].user_id`}
                size="small"
                label=" أسم الموظف"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 180 } }}
              >
                {usersData.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.MobileDateTimePicker
                type="datetime"
                format="hh:mm a "
                openTo="hours"
                name={`items[${index}].start_time`}
                label="وقت الدخول"
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
                name={`items[${index}].end_time`}
                label="وقت الخروج"
                InputLabelProps={{ shrink: true }}
                sx={{
                  maxWidth: { md: 180 },
                  '& .MuiInputBase-root': { height: '40px' },
                  '& .MuiInputBase-input': { padding: '10px 14px' },
                }}
              />
              <Field.Text
                name={`items[${index}].duration`}
                size="small"
                disabled
                label={t('duration')}
                value={calculateTimeDifference(
                  values.items[index]?.start_time,
                  values.items[index]?.end_time
                )}
                sx={{
                  maxWidth: { md: 80 },
                  '& .MuiInputBase-root': { height: '40px' },
                  '& .MuiInputBase-input': { padding: '10px 14px' },
                }}
              />
              <Field.Select
                name={`items[${index}].task_id`}
                size="small"
                label={t('task_name')}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 180 } }}
              >
                {tasksData.map((task) => (
                  <MenuItem key={task.id} value={task.id}>
                    {task.title}
                  </MenuItem>
                ))}
              </Field.Select>
              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={() => handleRemove(index)}
              >
                {t('delete')}
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          اضافة سطر
        </Button>
      </Stack>
    </Box>
  );
}
