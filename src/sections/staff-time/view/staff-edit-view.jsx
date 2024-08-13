
// 'use client';

// import { paths } from 'src/routes/paths';

// import { useTranslate } from 'src/locales';
// import { useShowStaff } from 'src/actions/staff';
// import { DashboardContent } from 'src/layouts/dashboard';

// import { SplashScreen } from 'src/components/loading-screen';
// import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// import { InvoiceNewEditForm } from '../invoice-new-edit-form';
// // ----------------------------------------------------------------------

// export function InvoiceEditView({ id }) {
//   const { staff } = useShowStaff(id);
//   const { t } = useTranslate();
//   if (!staff) {
//     return <SplashScreen />;
//   }
//   return (
//     <DashboardContent>
//       <CustomBreadcrumbs
//         heading={t('edit_project')}
//         links={[
//           { name: t('dashboard'), href: paths.dashboard.root },
//           { name: t('projects'), href: paths.dashboard.project.list },
//           { name: staff?.name },
//         ]}
//         sx={{ mb: { xs: 3, md: 5 } }}
//       />

//       <InvoiceNewEditForm currentInvoice={staff} />
//     </DashboardContent>
//   );
// }
