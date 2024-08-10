import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
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
import { useGetUsers } from 'src/actions/user';
// import { duration } from 'dayjs';
import { useGetProjects } from 'src/actions/project';

import { toast } from 'src/components/snackbar';
import { Form, Field, RHFAutocomplete } from 'src/components/hook-form';

import { StatusList, PriorityList, DurationTypeList } from './task-data';

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
export const NewTaskSchema = z.object({
  title: z.string().min(1, { message: 'اسم المشروع مطلوب' }),
  desc: z.string().min(1, { message: 'وصف المشروع مطلوب' }),
  duration: z.string().min(1, { message: 'مدة المشروع مطلوب' }),
  // contract_duration: z.string().min(1, { message: 'مدة العقد يجب أن تكون رقماً موجباً' }),
  status: z.object({
    id: z.string(),
    name: z.string(),
  }),
  // start_date: z.any(),
  // end_date: z.any(),
  start_date: z.union([z.string(), z.date()]),
  end_date: z.union([z.string(), z.date()]),

  duration_type: z.object({
    id: z.string(),
    name: z.string(),
  }),
  priority: z.object({
    id: z.string(),
    name: z.string(),
  }),
  project_id: z.z.object({
    id: z.any(),
    name: z.string(),
  }),
  user_id: z.z.object({
    id: z.any(),
    name: z.string(),
  }),
});

// ----------------------------------------------------------------------

export function TaskNewEditForm({ currentTask }) {
  const router = useRouter();
  const { t } = useTranslate();
  const { projects } = useGetProjects();
  const { users } = useGetUsers();
  const [projectList, setProjectList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (projects) setProjectList(projects);
    console.log('projects', projects);
  }, [projects]);
  useEffect(() => {
    if (users) setUserList(users);
    console.log('projects', users);
  }, [users]);
  // const companyOptions = companyList.map((company) => ({
  //   id: company.id.toString(),
  //   name: company.name,
  // }));
  // console.log('companyOptions', companyOptions);
  const defaultValues = useMemo(
    () => ({
      title: currentTask?.title || '',
      desc: currentTask?.desc || '',
      duration: currentTask?.duration || 0,
      status: StatusList.find((status) => status?.id === currentTask?.status?.toString()) || null,
      start_date: currentTask?.start_date || null,
      end_date: currentTask?.end_date || null,
      duration_type:
        DurationTypeList.find((type) => type?.id === currentTask?.duration_type?.toString()) ||
        null,
      priority:
        PriorityList.find((priority) => priority?.id === currentTask?.priority?.toString()) || null,
      project_id: currentTask?.project_id,
      user_id: currentTask?.user_id,
      // role: RoleList.find((role) => role.id === currentTask?.role?.toString()) || null,
      //   company_id: currentTask?.company_id
      //     ? {
      //         id: currentTask?.company_id.toString(),
      //         name: companyList.find((company) => company.id === currentTask?.company_id)?.name,
      //       }
      //     : null,
    }),
    [currentTask]
  );
  // console.log('Token:', localStorage.getItem(STORAGE_KEY));
  // console.log('Endpoint:', endpoints.auth.signIn);
  // const NewTaskSchema = NewTaskSchema(!!currentTask);
  const methods = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(NewTaskSchema),
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

  // console.log('Values', values);
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('data =>>>>>>', data);
      const newData = {
        title: data.title,
        desc: data.desc,
        start_date: new Date(data.start_date).toISOString().split('T')[0],
        end_date: new Date(data.end_date).toISOString().split('T')[0],
        project_id: data.project_id.id,
        user_id: data.user_id.id,
        status: data.status.id,
        duration: data.duration,
        duration_type: data.duration_type.id,
        priority: data.priority.id,
      };
      console.log('after......sssss....data =>>>>>>');
      let response;
      if (currentTask) {
        console.log('next............currentTask.............data =>>>>>>');
        response = await axios.put(`${endpoints.task.put}/${currentTask.id}`, newData);
      } else {
        response = await axios.post(endpoints.task.create, newData);
        console.log('next.........................data =>>>>>>');
        reset();
      }
      if (response.status) {
        toast(currentTask ? t('update_success') : t('create_success'));
        router.push(paths.dashboard.task.list);
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
            {currentTask && (
              <Label
                color={
                  (currentTask?.priority === 0 && 'error') ||
                  (currentTask?.priority === 1 && 'success') ||
                  (currentTask?.priority === 2 && 'warning') ||
                  'default'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {currentTask?.priority === 0 ? t('Priority') : t('unPriority')}
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
              <Field.Text name="title" label={t('task_name')} />
              <Field.Text name="desc" label={t('description')} />
              <Field.Text name="duration" label={t('task_duration')} />
              {/* <Field.Text name="phone_number" label={t('phone_number')} /> */}
              {/* <Field.Text name="national_id" label={t('national_id')} /> */}

              {/* <Field.Text name="company_id" label={t('company')} /> */}
              {/* <Field.Text name="role" label={t('role')} /> */}
              <RHFAutocomplete
                name="duration_type"
                label={t('duration_type')}
                options={DurationTypeList}
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value}
              />
              <RHFAutocomplete
                name="priority"
                label={t('priority')}
                options={PriorityList}
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <RHFAutocomplete
                name="status"
                label={t('task_status')}
                options={StatusList}
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value}
              />
              <RHFAutocomplete
                name="project_id"
                label={t('project_name')}
                options={projectList}
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value}
              />
              <RHFAutocomplete
                name="user_id"
                label={t('user_name')}
                options={userList}
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
                {!currentTask ? t('add_task') : t('save_changes')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
