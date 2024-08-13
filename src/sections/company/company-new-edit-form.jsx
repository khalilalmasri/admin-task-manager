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
import { Divider, CardHeader, IconButton, InputAdornment } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fData } from 'src/utils/format-number';
import axios, { endpoints } from 'src/utils/axios';

import { useTranslate } from 'src/locales';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field, RHFAutocomplete } from 'src/components/hook-form';

import { TypeList, StatusList } from '../project/project-data';

// ----------------------------------------------------------------------

export const createNewCompanySchema = (isEditMode) =>
  zod.object({
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
    // status: zod.enum(['0', '1', '2', '3'], {
    //   errorMap: () => ({ message: 'يجب اختيار نوع العقد من القيم المتاحة' }),
    // }),
    status: zod.object({
      id: zod.string(),
      name: zod.string(),
    }),
    scope: zod.string().min(1, { message: 'scope is required!' }),
    // contract_type: zod.string({ message: 'contract_type is required!' }),
    // contract_type: zod.enum(['1', '2', '3'], {
    //   errorMap: () => ({ message: 'يجب اختيار نوع العقد من القيم المتاحة' }),
    // }),
    contract_type: zod.object({
      id: zod.string(),
      name: zod.string(),
    }),
    admin_name: isEditMode
      ? zod.string().optional()
      : zod.string().min(1, { message: 'Name is required!' }),
    admin_email: isEditMode
      ? zod.string().optional()
      : zod
          .string()
          .min(1, { message: 'Email is required!' })
          .email({ message: 'Email must be a valid email address!' }),
    admin_phone_number: isEditMode
      ? zod.string().optional()
      : zod.string().min(1, { message: 'phone_number number is required!' }),
    admin_national_id: isEditMode
      ? zod.string().optional()
      : zod.string().min(1, { message: 'national_id number is required!' }),
    admin_password: isEditMode
      ? zod.string().optional()
      : zod
          .string()
          .min(1, { message: 'كلمة المرور مطلوبة !' })
          .min(6, { message: 'يجب أن تكون الكلمة أكثر من 6 أحرف' }),
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
  const password = useBoolean();

  const defaultValues = useMemo(
    () => ({
      name: currentCompany?.name || '',
      email: currentCompany?.email || '',
      phone_number: currentCompany?.phone_number || '',
      register_number: currentCompany?.register_number || '',
      address: currentCompany?.address || '',
      contract_duration: currentCompany?.contract_duration?.toString() || '',
      // status: currentCompany?.status.toString() || 0,
      status:
        StatusList.find((status) => status?.id === currentCompany?.status?.toString()) || null,
      scope: currentCompany?.scope || '',
      contract_type:
        TypeList.find((type) => type?.id === currentCompany?.contract_type?.toString()) || null,
      admin_name: currentCompany?.admin_name || '',
      admin_email: currentCompany?.admin_email || '',
      admin_phone_number: currentCompany?.admin_phone_number || '',
      admin_national_id: currentCompany?.admin_national_id || '',
    }),
    [currentCompany]
  );
  // console.log('Token:', localStorage.getItem(STORAGE_KEY));
  // console.log('Endpoint:', endpoints.auth.signIn);
  const NewCompanySchema = createNewCompanySchema(!!currentCompany);
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewCompanySchema),
    // resolver: zodResolver(NewUserSchema),
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
        status: data.status.id,

        scope: data.scope,
        // contract_type: data.contract_type,
        contract_type: data.contract_type.id,
      };
      const editData = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        register_number: data.register_number,
        address: data.address,
        contract_duration: data.contract_duration,
        // status: parseInt(data.status, 10),
        status: data.status.id,
        scope: data.scope,
        // contract_type: data.contract_type,
        contract_type: data.contract_type.id,
        admin_name: data.admin_name,
        admin_email: data.admin_email,
        admin_phone_number: data.admin_phone_number,
        admin_national_id: data.admin_national_id,
      };
      let response;
      if (currentCompany) {
        response = await axios.put(`${endpoints.company.put}/${currentCompany.id}`, editData);
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
            {/* {currentCompany && (
              <Label
                color={
                  // (values.status === 'active' && 'success') ||
                  (values.status === 0 && 'success') ||
                  // (values.status === 'banned' && 'error') ||
                  (values.status === 1 && 'default') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status === 0 ? t('active') : t('rejected')}
              </Label>
            )} */}

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
          <Card sx={{ p: 3, mb: 3 }}>
            <CardHeader title={t('company_details')} sx={{ mb: 5 }} />
            <Divider sx={{ mb: 5 }} />
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
              <RHFAutocomplete
                name="contract_type"
                label={t('contract_type')}
                options={TypeList}
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value}
              />
              {/* <Field.Text name="contract_type" label={t('contract_type')} /> */}
              <RHFAutocomplete
                name="status"
                label={t('status')}
                options={StatusList}
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value}
              />
              {/* <Field.Text name="status" label={t('status')} /> */}
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
          </Card>
          {!currentCompany && (
            <Card sx={{ p: 3 }}>
              <CardHeader title={t('admin_details')} sx={{ mb: 5 }} />
              <Divider sx={{ mb: 5 }} />
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                <Field.Text name="admin_name" label={t('admin_name')} />
                <Field.Text name="admin_email" label={t('email')} />
                <Field.Text name="admin_phone_number" label={t('phone_number')} />
                <Field.Text name="admin_national_id" label={t('national_id')} />
                <Field.Text
                  name="admin_password"
                  label={t('password')}
                  placeholder="6+ characters"
                  type={password.value ? 'text' : 'password'}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={password.onToggle} edge="end">
                          <Iconify
                            icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                          />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </Card>
          )}
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!currentCompany ? t('add_company') : t('save_changes')}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Form>
  );
}
