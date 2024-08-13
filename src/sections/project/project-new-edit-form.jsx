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
import { useGetCompanys } from 'src/actions/company';

// import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field, RHFAutocomplete } from 'src/components/hook-form';

import { TypeList, StatusList, PriorityList } from './project-data';

// ----------------------------------------------------------------------

export const NewUserSchema = z.object({
  name: z.string().min(1, { message: 'اسم المشروع مطلوب' }),
  contract_duration: z.string().min(1, { message: 'مدة العقد يجب أن تكون رقماً موجباً' }),
  status: z.object({
    id: z.string(),
    name: z.string(),
  }),
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
  company_id: z
    .object({
      id: z
        .string()
        .refine((val) => Array.from({ length: 10001 }, (_, i) => i.toString()).includes(val), {
          message: 'يجب اختيار الصلاحية من القيم المتاحة',
        }),
      name: z.string(),
    })
    .nullable(),
});

// ----------------------------------------------------------------------

export function ProjectNewEditForm({ currentProject }) {
  const router = useRouter();
  const { t } = useTranslate();
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
  const defaultValues = useMemo(
    () => ({
      desc: currentProject?.desc || '',
      name: currentProject?.name || '',
      contract_duration: currentProject?.contract_duration.toString() || '',
      company_id: currentProject?.company || null,
      status:
        StatusList.find((status) => status?.id === currentProject?.status?.toString()) || null,
      start_date: currentProject?.start_date || null,
      end_date: currentProject?.end_date || null,
      type: TypeList.find((type) => type?.id === currentProject?.type?.toString()) || null,
      priority:
        PriorityList.find((priority) => priority?.id === currentProject?.priority?.toString()) ||
        null,
    }),
    [currentProject]
  );

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
        company_id: data.company_id.id,
        desc: data.desc,
      };
      console.log('after......sssss....data =>>>>>>', newData);
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
      toast(error?.data);

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

              {/* <Field.Text name="company_id" label={t('company')} /> */}

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
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
              />
              <RHFAutocomplete
                name="status"
                label={t('status')}
                options={StatusList}
                getOptionLabel={(option) => t(option.name)}
                isOptionEqualToValue={(option, value) => option.id === value}
              />
              <RHFAutocomplete
                name="company_id"
                label={t('company')}
                options={companyOptions}
                getOptionLabel={(option) => option.name}
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
