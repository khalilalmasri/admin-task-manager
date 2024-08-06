'use client';

import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';
import { SeoIllustration } from 'src/assets/illustrations';

import { useMockedUser } from 'src/auth/hooks';

import { AppWelcome } from '../app-welcome';
import { AppWidgetSummary } from '../app-widget-summary';
import { AppCurrentDownload } from '../app-current-download';
import { AnalyticsConversionRates } from '../../analytics/analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAppView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <AppWelcome
            // title={`أهلاً بعودتك  👋 \n ${user?.displayName}`}
            title={`أهلاً بعودتك  👋 \n Admin`}
            description="برنامج إدارة المهام المتكامل لمتابعة و ضبط الدوام والمهام"
            img={<SeoIllustration hideBackground />}
            action={
              <Button href={paths.dashboard.kanban} variant="contained" color="primary">
                الذهاب إلى قسم المهام
              </Button>
            }
          />
        </Grid>

        {/* <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid> */}

        <Grid xs={12} md={12} lg={12} margin={1}>
          <h2>نموذج جدول الدوام</h2>
        </Grid>
        <Grid xs={6} md={3} lg={2}>
          <AnalyticsConversionRates
            title="يوم السبت"
            chart={{
              categories: ['', '', '', '', ''],
              series: [{ name: 'السبت', data: [6, 5, 6, 6, 4] }],
            }}
          />
        </Grid>
        <Grid xs={6} md={3} lg={2}>
          <AnalyticsConversionRates
            title="يوم الأحد"
            chart={{
              categories: ['', '', '', '', ''],
              series: [{ name: 'الأحد', data: [5, 6, 2, 4, 6] }],
            }}
          />
        </Grid>
        <Grid xs={6} md={3} lg={2}>
          <AnalyticsConversionRates
            title="يوم الاثنين"
            chart={{
              categories: ['', '', '', '', ''],
              series: [{ name: 'الاثنين', data: [6, 7, 6, 2, 1] }],
            }}
          />
        </Grid>
        <Grid xs={6} md={3} lg={2}>
          <AnalyticsConversionRates
            title="يوم الثلاثاء"
            chart={{
              categories: ['', '', '', '', ''],
              series: [{ name: 'الثلاثاء', data: [6, 8, 2, 6, 1] }],
            }}
          />
        </Grid>
        <Grid xs={6} md={3} lg={2}>
          <AnalyticsConversionRates
            title="يوم الأربعاء"
            chart={{
              categories: ['', '', '', '', ''],
              series: [{ name: 'الأربعاء', data: [6, 1, 6, 8, 6] }],
            }}
          />
        </Grid>
        <Grid xs={6} md={3} lg={2}>
          <AnalyticsConversionRates
            title="يوم الخميس"
            chart={{
              categories: ['طلال', 'أحمد', 'سعيد', 'خالد', 'محمد'],
              series: [{ name: 'الخميس', data: [6, 4, 6, 2, 3] }],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <AppCurrentDownload
            title="المهام"
            subheader="بحسب الانجاز"
            chart={{
              series: [
                { label: 'المهام المنفذة', value: 3 },
                { label: 'مهام قيد التنفيذ', value: 6 },
                { label: 'مهام معلقة', value: 4 },
                { label: 'مهام ملغاة', value: 1 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="عدد الموظفين"
            percent={2.6}
            total={1500}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [15, 18, 12, 51, 68, 11, 39, 37],
            }}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="عدد الشركات"
            percent={0.2}
            total={20}
            chart={{
              colors: [theme.vars.palette.info.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [20, 41, 63, 33, 28, 35, 50, 46],
            }}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <AppWidgetSummary
            title="عدد المهام المنفذة"
            percent={-0.1}
            total={678}
            chart={{
              colors: [theme.vars.palette.error.main],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [18, 19, 31, 8, 16, 37, 12, 33],
            }}
          />
        </Grid>
        {/* <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Area installed"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  name: '2022',
                  data: [
                    { name: 'Asia', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    { name: 'Europe', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                    { name: 'Americas', data: [12, 10, 18, 22, 20, 12, 8, 21, 20, 14, 15, 16] },
                  ],
                },
                {
                  name: '2023',
                  data: [
                    { name: 'Asia', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: 'Europe', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                    { name: 'Americas', data: [6, 18, 14, 9, 20, 6, 22, 19, 8, 22, 8, 17] },
                  ],
                },
                {
                  name: '2024',
                  data: [
                    { name: 'Asia', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: 'Europe', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                    { name: 'Americas', data: [6, 20, 15, 18, 7, 24, 6, 10, 12, 17, 18, 10] },
                  ],
                },
              ],
            }}
          />
        </Grid>

         <Grid xs={12} lg={8}>
          <AppNewInvoice
            title="New invoice"
            tableData={_appInvoices}
            headLabel={[
              { id: 'id', label: 'Invoice ID' },
              { id: 'category', label: 'Category' },
              { id: 'price', label: 'Price' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopRelated title="Related applications" list={_appRelated} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopInstalledCountries title="Top installed countries" list={_appInstalled} />
        </Grid>

         <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top authors" list={_appAuthors} />
        </Grid>

         <Grid xs={12} md={6} lg={4}>
          <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <AppWidget
              title="Conversion"
              total={38566}
              icon="solar:user-rounded-bold"
              chart={{ series: 48 }}
            />

             <AppWidget
              title="Applications"
              total={55566}
              icon="fluent:mail-24-filled"
              chart={{
                series: 75,
                colors: [theme.vars.palette.info.light, theme.vars.palette.info.main],
              }}
              sx={{ bgcolor: 'info.dark', [`& .${svgColorClasses.root}`]: { color: 'info.light' } }}
            />
           </Box>
         </Grid> */}
      </Grid>
    </DashboardContent>
  );
}
