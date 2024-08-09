'use client';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CompanyImport from '../company-import';

// ----------------------------------------------------------------------

export function CompanyImportView() {
  const { t } = useTranslate();
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={t('import_company')}
        links={[
          { name: t('dashboard'), href: paths.dashboard.root },
          { name: t('companys'), href: paths.dashboard.company.list },
          { name: t('import_company') },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <CompanyImport />
    </DashboardContent>
  );
}
