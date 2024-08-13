import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { IconButton, InputAdornment } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fData } from 'src/utils/format-number';
import axios, { endpoints } from 'src/utils/axios';

import { useTranslate } from 'src/locales';
import { useGetCompanys } from 'src/actions/company';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export const createNewUserSchema = (isEditMode) =>
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
    national_id: zod.string().min(1, { message: 'national_id number is required!' }),
    password: isEditMode
      ? zod.string().optional()
      : zod
          .string()
          .min(1, { message: 'كلمة المرور مطلوبة !' })
          .min(6, { message: 'يجب أن تكون الكلمة أكثر من 6 أحرف' }),
    // role: zod
    //   .object({
    //     id: zod.string().refine((val) => ['0', '1', '2'].includes(val), {
    //       message: 'يجب اختيار الصلاحية من القيم المتاحة',
    //     }),
    //     name: zod.string(),
    //   })
    //   .nullable(),
    company_id: zod
      .object({
        id: zod
          .string()
          .refine((val) => Array.from({ length: 10001 }, (_, i) => i.toString()).includes(val), {
            message: 'يجب اختيار الصلاحية من القيم المتاحة',
          }),
        name: zod.string(),
      })
      .nullable(),
  });
const RoleList = [
  { id: '0', name: 'user' },
  { id: '1', name: 'admin' },
  { id: '2', name: 'company' },
];

// ----------------------------------------------------------------------

export function UserNewEditForm({ currentUser }) {
  const router = useRouter();
  const { t } = useTranslate();
  const password = useBoolean();
  const [companyList, setCompanyList] = useState([]);
  const { companys } = useGetCompanys();
  useEffect(() => {
    if (companys) setCompanyList(companys);
    console.log('companyList', companyList);
    console.log('companys', companys);
  }, [companys, companyList]);
  const companyOptions = companyList.map((company) => ({
    id: company.id.toString(),
    name: company.name,
  }));
  console.log('companyOptions', companyOptions);
  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone_number: currentUser?.phone_number || '',
      national_id: currentUser?.national_id || '',
      password: currentUser?.password || '',
      // role: RoleList.find((role) => role.id === currentUser?.role?.toString()) || null,
      company_id: currentUser?.company || null,
      // ? {
      //     id: currentUser?.company_id.toString(),
      //     name: companyList.find((company) => company.id === currentUser?.company_id)?.name,
      //   }
      // : null,
    }),
    [currentUser]
  );
  // console.log('Token:', localStorage.getItem(STORAGE_KEY));
  // console.log('Endpoint:', endpoints.auth.signIn);
  const NewUserSchema = createNewUserSchema(!!currentUser);
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });
  console.log('defaultValues', defaultValues);
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  // console.log('Values', values);
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log('data =>>>>>>', data);
      const newData = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        national_id: data.national_id,
        password: data.password,
        password_confirmation: data.password,
        // role: data.role.id,
        company_id: data.company_id.id,
        // company_id: parseInt(data.company_id.id, 10),
      };
      const currentData = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        national_id: data.national_id,
        // role: data.role.id,
        // company_id: parseInt(data.company_id, 10),
        company_id: data.company_id.id,
      };
      let response;
      if (currentUser) {
        response = await axios.put(`${endpoints.user.put}/${currentUser.id}`, currentData);
      } else {
        response = await axios.post(endpoints.user.create, newData);

        reset();
      }
      if (response.status) {
        toast(currentUser ? t('update_success') : t('create_success'));
        router.push(paths.dashboard.user.list);
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
            {/* {currentUser && (
              <Label
                color={
                  (currentUser?.role === 0 && 'default') ||
                  (currentUser?.role === 1 && 'success') ||
                  (currentUser?.role === 2 && 'warning') ||
                  'default'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {currentUser?.role === 0
                  ? t('user')
                  : currentUser?.role === 1
                    ? t('admin')
                    : t('company')}
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

            {/* {currentUser && (
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

            {/* {currentUser && (
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
              <Field.Text name="name" label={t('user_name')} />
              <Field.Text name="email" label={t('email')} />
              <Field.Text name="phone_number" label={t('phone_number')} />
              <Field.Text name="national_id" label={t('national_id')} />
              {!currentUser && (
                <Field.Text
                  name="password"
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
              )}
              {/* <Field.Text name="company_id" label={t('company')} /> */}
              {/* <Field.Text name="role" label={t('role')} /> */}
              <RHFAutocomplete
                name="company_id"
                label={t('company')}
                options={companyOptions}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value}
              />
              {/* <RHFAutocomplete
                name="company_id"
                label={t('company')}
                options={companyList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              /> */}
              {/* <RHFAutocomplete
                name="role"
                label={t('role')}
                options={RoleList}
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value}
              /> */}
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? t('add_user') : t('save_changes')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
