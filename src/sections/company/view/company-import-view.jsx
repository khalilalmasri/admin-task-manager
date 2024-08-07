'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CompanyImport from '../company-import';

// ----------------------------------------------------------------------

export function CompanyImportView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="استيراد بيانات شركة  "
        links={[
          { name: 'لوحة التحكم', href: paths.dashboard.root },
          { name: 'الشركات', href: paths.dashboard.company.list },
          { name: ' استيراد' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <CompanyImport />
    </DashboardContent>
  );
}
