'use client';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { useShowCompany } from 'src/actions/company';
import { DashboardContent } from 'src/layouts/dashboard';

import { SplashScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { CompanyNewEditForm } from '../company-new-edit-form';

// ----------------------------------------------------------------------

// export function CompanyEditView({ user: currentUser }) {
export function CompanyEditView({ id }) {
  const {company } = useShowCompany(id);
  const {t} = useTranslate();
  if (!company) {
    return <SplashScreen />;
  }
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={t('edit_company')}
        links={[
          { name: t('dashboard'), href: paths.dashboard.root },
          { name: t('companys'), href: paths.dashboard.company.list },
          { name: company?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CompanyNewEditForm currentCompany={company} />
    </DashboardContent>
  );
}
