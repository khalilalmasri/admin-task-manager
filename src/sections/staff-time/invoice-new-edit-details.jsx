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

  // const totalOnRow = values.items.map((item) => item.quantity * item.price);

  // const subtotal = totalOnRow.reduce((acc, num) => acc + num, 0);

  // const totalAmount = subtotal - values.discount - values.shipping + values.taxes;

  // useEffect(() => {
  //   setValue('totalAmount', totalAmount);
  // }, [setValue, totalAmount]);
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

  const { hours, minutes } = calculateTimeDifference(startTime, endTime);
  // console.log(`الفرق: ${hours} ساعات و ${minutes} دقيقة`);
  // console.log(`${hours}:${minutes}`);
  // console.log(formattedDate);
  const handleAdd = () => {
    append({
      name: '',
      // start_time: new Date().setHours(8, 0, 0, 0),
      start_time: formattedStartDate,
      // end_time: new Date().setHours(17, 0, 0, 0),
      end_time: formattedEndDate,
      task: '',
      duration: calculateTimeDifference(formattedStartDate, formattedEndDate),
    });
  };
  console.log('values', values.items[0]?.start_time);
  const handleRemove = (index) => {
    remove(index);
  };
  console.log(
    '.....................>>>>>>>>',
    calculateTimeDifference(formattedStartDate, formattedEndDate)
  );

  // const handleClearService = useCallback(
  //   (index) => {
  //     setValue(`items[${index}].quantity`, 1);
  //     setValue(`items[${index}].price`, 0);
  //     setValue(`items[${index}].total`, 0);
  //   },
  //   [setValue]
  // );

  // const handleSelectService = useCallback(
  //   (index, option) => {
  //     setValue(
  //       `items[${index}].price`,
  //       INVOICE_SERVICE_OPTIONS.find((service) => service.name === option)?.price
  //     );
  //     setValue(
  //       `items[${index}].total`,
  //       values.items.map((item) => item.quantity * item.price)[index]
  //     );
  //   },
  //   [setValue, values.items]
  // );

  // const handleChangeQuantity = useCallback(
  //   (event, index) => {
  //     setValue(`items[${index}].quantity`, Number(event.target.value));
  //     setValue(
  //       `items[${index}].total`,
  //       values.items.map((item) => item.quantity * item.price)[index]
  //     );
  //   },
  //   [setValue, values.items]
  // );

  // const handleChangePrice = useCallback(
  //   (event, index) => {
  //     setValue(`items[${index}].price`, Number(event.target.value));
  //     setValue(
  //       `items[${index}].total`,
  //       values.items.map((item) => item.quantity * item.price)[index]
  //     );
  //   },
  //   [setValue, values.items]
  // );

  // const renderTotal = (
  //   <Stack
  //     spacing={2}
  //     alignItems="flex-end"
  //     sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
  //   >
  //     <Stack direction="row">
  //       <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
  //       <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subtotal) || '-'}</Box>
  //     </Stack>

  //     <Stack direction="row">
  //       <Box sx={{ color: 'text.secondary' }}>Shipping</Box>
  //       <Box sx={{ width: 160, ...(values.shipping && { color: 'error.main' }) }}>
  //         {values.shipping ? `- ${fCurrency(values.shipping)}` : '-'}
  //       </Box>
  //     </Stack>

  //     <Stack direction="row">
  //       <Box sx={{ color: 'text.secondary' }}>Discount</Box>
  //       <Box sx={{ width: 160, ...(values.discount && { color: 'error.main' }) }}>
  //         {values.discount ? `- ${fCurrency(values.discount)}` : '-'}
  //       </Box>
  //     </Stack>

  //     <Stack direction="row">
  //       <Box sx={{ color: 'text.secondary' }}>Taxes</Box>
  //       <Box sx={{ width: 160 }}>{values.taxes ? fCurrency(values.taxes) : '-'}</Box>
  //     </Stack>

  //     <Stack direction="row" sx={{ typography: 'subtitle1' }}>
  //       <div>Total</div>
  //       <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
  //     </Stack>
  //   </Stack>
  // );

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
                name={`items[${index}].name`}
                size="small"
                label=" أسم الموظف"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 180 } }}
              >
                {usersData.map((service) => (
                  <MenuItem
                    key={service.id}
                    value={service.id}
                    // onClick={() => handleSelectService(index, service.name)}
                  >
                    {service.name}
                  </MenuItem>
                ))}
              </Field.Select>
              {/* <RHFAutocomplete
                name={`items[${index}].name`}
                label={t('user_name')}
                options={usersData}
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value}
              /> */}
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
              {/* <RHFAutocomplete
                name={`items[${index}].task`}
                label={t('task_name')}
                options={tasksData}
                getOptionLabel={(option) => t(option.title)}
                isOptionEqualToValue={(option, value) => option.id === value}
              /> */}
              <Field.Text
                name={`items[${index}].duration`}
                size="small"
                disabled
                label={t('duration')}
                Value={calculateTimeDifference(
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
                name={`items[${index}].task`}
                size="small"
                label={t('task_name')}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 180 } }}
              >
                {tasksData.map((service) => (
                  <MenuItem
                    key={service.id}
                    value={service.id}
                    // onClick={() => handleSelectService(index, service.title)}
                  >
                    {service.title}
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

        {/* <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1 }}
        >
          <Field.Text
            size="small"
            label="Shipping($)"
            name="shipping"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
          />

          <Field.Text
            size="small"
            label="Discount($)"
            name="discount"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
          />

          <Field.Text
            size="small"
            label="Taxes(%)"
            name="taxes"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
          />
        </Stack> */}
      </Stack>

      {/* {renderTotal} */}
    </Box>
  );
}
