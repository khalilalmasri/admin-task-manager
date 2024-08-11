import { useState, useEffect, useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { useGetUsers } from 'src/actions/user';
import { useGetTasks } from 'src/actions/task';
import { INVOICE_SERVICE_OPTIONS } from 'src/_mock';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function InvoiceNewEditDetails() {
  const { control, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const { users } = useGetUsers();
  const { tasks } = useGetTasks();
  const [usersData, setUsersData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  const values = watch();

  const totalOnRow = values.items.map((item) => item.quantity * item.price);

  const subtotal = totalOnRow.reduce((acc, num) => acc + num, 0);

  const totalAmount = subtotal - values.discount - values.shipping + values.taxes;

  useEffect(() => {
    setValue('totalAmount', totalAmount);
  }, [setValue, totalAmount]);
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

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      // start_date:'08:00',
      start_date: new Date().setHours(8, 0, 0, 0),
      end_date: new Date().setHours(5, 0, 0, 0),
      service: '',
      quantity: 1,
      price: 0,
      total: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index) => {
      setValue(`items[${index}].quantity`, 1);
      setValue(`items[${index}].price`, 0);
      setValue(`items[${index}].total`, 0);
    },
    [setValue]
  );

  const handleSelectService = useCallback(
    (index, option) => {
      setValue(
        `items[${index}].price`,
        INVOICE_SERVICE_OPTIONS.find((service) => service.name === option)?.price
      );
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangeQuantity = useCallback(
    (event, index) => {
      setValue(`items[${index}].quantity`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangePrice = useCallback(
    (event, index) => {
      setValue(`items[${index}].price`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subtotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Shipping</Box>
        <Box sx={{ width: 160, ...(values.shipping && { color: 'error.main' }) }}>
          {values.shipping ? `- ${fCurrency(values.shipping)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Discount</Box>
        <Box sx={{ width: 160, ...(values.discount && { color: 'error.main' }) }}>
          {values.discount ? `- ${fCurrency(values.discount)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Taxes</Box>
        <Box sx={{ width: 160 }}>{values.taxes ? fCurrency(values.taxes) : '-'}</Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Total</div>
        <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        ملء دوام الموظف:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              {/* <Field.Text
                size="small"
                name={`items[${index}].title`}
                label="أسم الموظف"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 180 } }}
              /> */}
              <Field.Select
                name={`items[${index}].title`}
                size="small"
                label=" أسم الموظف"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 180 } }}
              >
                <MenuItem
                  value=""
                  onClick={() => handleClearService(index)}
                  sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                >
                  None
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {usersData.map((service) => (
                  <MenuItem
                    key={service.id}
                    value={service.name}
                    onClick={() => handleSelectService(index, service.name)}
                  >
                    {service.name}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.MobileDateTimePicker
                type="time"
                format="hh:mm"
                name={`items[${index}].start_date`}
                label="وقت الدخول"
                // defaultValue="08:00"
                // InputLabelProps={{ shrink: true }}
                sx={{
                  maxWidth: { md: 180 },
                  '& .MuiInputBase-root': { height: '40px' },
                  '& .MuiInputBase-input': { padding: '10px 14px' },
                }}
              />
              <Field.MobileDateTimePicker
                type="time"
                format="HH:mm"
                name={`items[${index}].end_date`}
                label="وقت الخروج"
                // defaultValue="08:00"
                InputLabelProps={{ shrink: true }}
                sx={{
                  maxWidth: { md: 180 },
                  '& .MuiInputBase-root': { height: '40px' },
                  '& .MuiInputBase-input': { padding: '10px 14px' },
                }}
              />
              {/* <Field.Text
                size="small"
                name={`items[${index}].description`}
                label="وقت الدخول"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 180 } }}
              /> */}
              {/* <Field.Text
                size="small"
                name={`items[${index}].description`}
                label="وقت الخروج"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 180 } }}
              /> */}

              <Field.Select
                name={`items[${index}].service`}
                size="small"
                label=" المهمة"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 180 } }}
              >
                <MenuItem
                  value=""
                  onClick={() => handleClearService(index)}
                  sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                >
                  None
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {tasksData.map((service) => (
                  <MenuItem
                    key={service.id}
                    value={service.title}
                    onClick={() => handleSelectService(index, service.title)}
                  >
                    {service.title}
                  </MenuItem>
                ))}
              </Field.Select>

              {/* <Field.Text
                size="small"
                type="number"
                name={`items[${index}].quantity`}
                label="Quantity"
                placeholder="0"
                onChange={(event) => handleChangeQuantity(event, index)}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 96 } }}
              /> */}

              {/* <Field.Text
                size="small"
                type="number"
                name={`items[${index}].price`}
                label="Price"
                placeholder="0.00"
                onChange={(event) => handleChangePrice(event, index)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                    </InputAdornment>
                  ),
                }}
                sx={{ maxWidth: { md: 96 } }}
              /> */}

              {/* <Field.Text
                disabled
                size="small"
                type="number"
                name={`items[${index}].total`}
                label="Total"
                placeholder="0.00"
                value={values.items[index].total === 0 ? '' : values.items[index].total.toFixed(2)}
                onChange={(event) => handleChangePrice(event, index)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  maxWidth: { md: 104 },
                  [`& .${inputBaseClasses.input}`]: {
                    textAlign: { md: 'right' },
                  },
                }}
              /> */}
              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={() => handleRemove(index)}
              >
                حذف
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
