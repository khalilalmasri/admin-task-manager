import * as z from 'zod';
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

import axios, { endpoints } from 'src/utils/axios';

import { useTranslate } from 'src/locales';

// import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field, RHFAutocomplete } from 'src/components/hook-form';

import { TypeList, StatusList, PriorityList } from './project-data';

// ----------------------------------------------------------------------

// export const NewUserSchema = zod.object({

//   name: zod.string().min(1, { message: 'Name is required!' }),
//   email: zod
//     .string()
//     .min(1, { message: 'Email is required!' })
//     .email({ message: 'Email must be a valid email address!' }),
//   phone_number: zod.string().min(1, { message: 'phone_number number is required!' }),
//   register_number: zod.string().min(1, { message: 'register_number number is required!' }),
//   address: zod.string().min(1, { message: 'address is required!' }),
//   // contract_duration: zod.number({ message: 'contract_duration is required!' }),
//   contract_duration: zod.string(),
//   status: zod.enum(['0', '1', '2', '3'], {
//     errorMap: () => ({ message: 'يجب اختيار نوع العقد من القيم المتاحة' }),
//   }),
//   scope: zod.string().min(1, { message: 'scope is required!' }),
//   // contract_type: zod.string({ message: 'contract_type is required!' }),
//   contract_type: zod.enum(['1', '2', '3'], {
//     errorMap: () => ({ message: 'يجب اختيار نوع العقد من القيم المتاحة' }),
//   }),
// });
export const NewUserSchema = z.object({
  name: z.string().min(1, { message: 'اسم المشروع مطلوب' }),
  contract_duration: z.string().min(1, { message: 'مدة العقد يجب أن تكون رقماً موجباً' }),
  status: z.object({
    id: z.string(),
    name: z.string(),
  }),
  // start_date: z.any(),
  // end_date: z.any(),
  start_date: z.union([z.string(), z.date()]),
  end_date: z.union([z.string(), z.date()]),

  type: z.object({
    id: z.string(),
    name: z.string(),
  }),
  priority: z.object({
    id: z.string(),
    name: z.string(),
  }),
  desc: z.string().optional(),
});

// const StatusList = [
//   { id: '0', name: 'active' },
//   { id: '1', name: 'reject' },
//   // { id: '2', name: 'company' },
// ];
// const TypeList = [
//   { id: '0', name: 'type 1' },
//   { id: '1', name: 'type 2' },
//   { id: '2', name: 'type 3' },
//   // { id: '2', name: 'company' },
// ];
// const PriorityList = [
//   { id: '0', name: 'Priority' },
//   { id: '1', name: 'unPriority' },
// ];

// ----------------------------------------------------------------------

export function ProjectNewEditForm({ currentProject }) {
  const router = useRouter();
  const { t } = useTranslate();
  // const [companyList, setCompanyList] = useState([]);
  // const { companys } = useGetCompanys();
  // useEffect(() => {
  //   if (companys) setCompanyList(companys);
  //   console.log('companyList', companyList);
  //   console.log('companys', companys);
  // }, [companys, companyList]);
  // const companyOptions = companyList.map((company) => ({
  //   id: company.id.toString(),
  //   name: company.name,
  // }));
  // console.log('companyOptions', companyOptions);
  const defaultValues = useMemo(
    () => ({
      name: currentProject?.name || '',
      contract_duration: currentProject?.contract_duration || 0,
      status:
        StatusList.find((status) => status?.id === currentProject?.status?.toString()) || null,
      start_date: currentProject?.start_date || null,
      end_date: currentProject?.end_date || null,
      type: TypeList.find((type) => type?.id === currentProject?.type?.toString()) || null,
      priority:
        PriorityList.find((priority) => priority?.id === currentProject?.priority?.toString()) ||
        null,

      // role: RoleList.find((role) => role.id === currentProject?.role?.toString()) || null,
      //   company_id: currentProject?.company_id
      //     ? {
      //         id: currentProject?.company_id.toString(),
      //         name: companyList.find((company) => company.id === currentProject?.company_id)?.name,
      //       }
      //     : null,
    }),
    [currentProject]
  );
  // console.log('Token:', localStorage.getItem(STORAGE_KEY));
  // console.log('Endpoint:', endpoints.auth.signIn);
  // const NewUserSchema = createNewProjectSchema(!!currentProject);
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });
  // console.log('defaultValues', defaultValues);
  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  function formatDate(dateString) {
    return dateString.split('T')[0];
  }
  // console.log('Values', values);
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('data =>>>>>>', data);
      const newData = {
        name: data.name,
        contract_duration: data.contract_duration,
        status: data.status.id,
        start_date: new Date(data.start_date).toISOString().split('T')[0],
        end_date: new Date(data.end_date).toISOString().split('T')[0],
        type: data.type.id,
        priority: data.priority.id,
        desc: data.desc,
      };
      console.log('after......sssss....data =>>>>>>');
      let response;
      if (currentProject) {
        console.log('next............currentProject.............data =>>>>>>');
        response = await axios.put(`${endpoints.project.put}/${currentProject.id}`, newData);
      } else {
        // response = await axios.post(endpoints.project.create, newData);
        response = await axios.post('/api/admin/project', newData);
        console.log('next.........................data =>>>>>>');
        reset();
      }
      if (response.status) {
        toast(currentProject ? t('update_success') : t('create_success'));
        router.push(paths.dashboard.project.list);
      } else {
        toast(response.statusText);
        console.log(response.statusText);
      }
    } catch (error) {
      console.error(error);
      // setErro(typeof error === 'string' ? error : error.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container>
        {/* <Grid xs={12} md={4}>
           <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentProject && (
              <Label
                color={
                  (currentProject?.priority === 0 && 'error') ||
                  (currentProject?.priority === 1 && 'success') ||
                  (currentProject?.priority === 2 && 'warning') ||
                  'default'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {currentProject?.priority === 0 ? t('Priority') : t('unPriority')}
              </Label>
            )}
          </Card>
        </Grid> */}

        <Grid xs={12} md={12}>
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
              <Field.Text name="name" label={t('project_name')} />
              <Field.Text name="desc" label={t('description')} />
              <Field.Text name="contract_duration" label={t('contract_duration')} />
              {/* <Field.Text name="phone_number" label={t('phone_number')} /> */}
              {/* <Field.Text name="national_id" label={t('national_id')} /> */}

              {/* <Field.Text name="company_id" label={t('company')} /> */}
              {/* <Field.Text name="role" label={t('role')} /> */}
              <RHFAutocomplete
                name="type"
                label={t('type')}
                options={TypeList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value}
              />
              <RHFAutocomplete
                name="priority"
                label={t('priority')}
                options={PriorityList}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <RHFAutocomplete
                name="status"
                label={t('status')}
                options={StatusList}
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value}
              />
            </Box>
            <Stack spacing={1.5} sx={{ mt: 3 }}>
              <Typography variant="subtitle2">{t('contract_duration')} </Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Field.DatePicker name="start_date" label="تاريخ البدء" />
                <Field.DatePicker name="end_date" label="تاريخ الانتهاء" />
              </Stack>
            </Stack>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentProject ? t('add_project') : t('save_changes')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
