'use client';

import { paths } from 'src/routes/paths';

import { useShowCompany } from 'src/actions/company';
import { DashboardContent } from 'src/layouts/dashboard';

import { SplashScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CompanyNewEditForm } from '../company-new-edit-form';

// ----------------------------------------------------------------------

// export function CompanyEditView({ user: currentUser }) {
export function CompanyEditView({ id }) {
  const { company } = useShowCompany(id);
  if (!company) {
    return <SplashScreen />;
  }
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="تعديل الشركة"
        links={[
          { name: 'لوحة التحكم', href: paths.dashboard.root },
          { name: 'الشركات', href: paths.dashboard.company.list },
          { name: company?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CompanyNewEditForm currentCompany={company} />
    </DashboardContent>
  );
}
