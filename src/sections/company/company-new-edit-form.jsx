import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';
import axios, { endpoints } from 'src/utils/axios';

import { useTranslate } from 'src/locales';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const NewUserSchema = zod.object({
  // avatarUrl: schemaHelper.file({
  //   message: { required_error: 'Avatar is required!' },
  // }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phone_number: zod.string().min(1, { message: 'phone_number number is required!' }),
  register_number: zod.string().min(1, { message: 'register_number number is required!' }),
  address: zod.string().min(1, { message: 'address is required!' }),
  // contract_duration: zod.number({ message: 'contract_duration is required!' }),
  contract_duration: zod.string(),
  status: zod.enum(['0', '1', '2', '3'], {
    errorMap: () => ({ message: 'يجب اختيار نوع العقد من القيم المتاحة' }),
  }),
  scope: zod.string().min(1, { message: 'scope is required!' }),
  // contract_type: zod.string({ message: 'contract_type is required!' }),
  contract_type: zod.enum(['1', '2', '3'], {
    errorMap: () => ({ message: 'يجب اختيار نوع العقد من القيم المتاحة' }),
  }),
});

// ----------------------------------------------------------------------

export function CompanyNewEditForm({ currentCompany }) {
  // const statusList = [
  //   { id: 1, name: 'active' },
  //   { id: 2, name: 'pending' },
  //   { id: 3, name: 'banned' },
  //   { id: 4, name: 'rejected' },
  // ];
  const router = useRouter();
  const { t } = useTranslate();
  const defaultValues = useMemo(
    () => ({
      name: currentCompany?.name || '',
      email: currentCompany?.email || '',
      phone_number: currentCompany?.phone_number || '',
      register_number: currentCompany?.register_number || '',
      address: currentCompany?.address || '',
      contract_duration: currentCompany?.contract_duration?.toString() || '',
      status: currentCompany?.status.toString() || 0,
      // status: statusList[parseInt(currentCompany?.status, 10) - 1] || null,
      // status: statusList[currentCompany?.status] || null,

      scope: currentCompany?.scope || '',
      contract_type: currentCompany?.contract_type?.toString() || '',
    }),
    [currentCompany]
  );
  // console.log('Token:', localStorage.getItem(STORAGE_KEY));
  // console.log('Endpoint:', endpoints.auth.signIn);
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('data =>>>>>>', data);
      const newData = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        register_number: data.register_number,
        address: data.address,
        contract_duration: data.contract_duration,
        // status: parseInt(data.status, 10),
        status: parseInt(data.status, 10),
        // status: data.status.id,
        scope: data.scope,
        contract_type: data.contract_type,
      };
      let response;
      if (currentCompany) {
        response = await axios.put(`${endpoints.company.put}/${currentCompany.id}`, newData);
      } else {
        response = await axios.post(endpoints.company.create, newData);

        reset();
      }
      if (response.status) {
        toast(currentCompany ? t('update_success') : t('create_success'));
        router.push(paths.dashboard.company.list);
      } else {
        toast(response.statusText);
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
      toast(error?.data);

      // setErro(typeof error === 'string' ? error : error.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentCompany && (
              <Label
                color={
                  // (values.status === 'active' && 'success') ||
                  (values.status === '1' && 'success') ||
                  // (values.status === 'banned' && 'error') ||
                  (values.status === '0' && 'default') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status === '1' ? t('active') : t('rejected')}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {/* {currentCompany && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          // field.onChange(event.target.checked ? 'banned' : 'active')
                          field.onChange(event.target.checked ? '0' : '1')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  mb: 3,
                  width: 1,
                  justifyContent: 'space-between',
                }}
              />
            )} */}

            {/* <Field.Switch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            /> */}

            {/* {currentCompany && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error" >
                  حذف شركة
                </Button>
              </Stack>
            )} */}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="name" label={t('company_name')} />
              <Field.Text name="email" label={t('email')} />
              <Field.Text name="phone_number" label={t('phone_number')} />
              <Field.Text name="register_number" label={t('register_number')} />
              <Field.Text name="address" label={t('address')} />
              <Field.Text name="scope" label={t('scope')} />
              <Field.Text name="contract_type" label={t('contract_type')} />
              <Field.Text name="status" label={t('status')} />
              <Field.Text name="contract_duration" label={t('contract_duration')} />
              {/* <Field.Text name="role" label="Role" /> */}
              {/* <RHFAutocomplete
                name="status"
                label="الحالة"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                options={statusList?.map((stat) => stat)}
                getOptionLabel={(option) => String(option.name)}
                renderOption={(props, option) => {
                  if (!option.name) {
                    return null;
                  }

                  return (
                    <li {...props} key={option.id}>
                      {option.name}
                    </li>
                  );
                }}
              /> */}
            </Box>
            {/* <Stack spacing={1.5} sx={{ mt: 3 }}>
              <Typography variant="subtitle2">{t('contract_duration')} </Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Field.DatePicker name="available.startDate" label="تاريخ البدء" />
                <Field.DatePicker name="available.endDate" label="تاريخ الانتهاء" />
              </Stack>
            </Stack> */}

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentCompany ? t('add_company') : t('save_changes')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
