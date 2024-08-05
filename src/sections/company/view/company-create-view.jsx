'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserNewEditForm } from 'src/sections/user/user-new-edit-form';
import { CompanyNewEditForm } from '../company-new-edit-form';

// ----------------------------------------------------------------------

export function CompanyCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="إضافة شركة جديدة"
        links={[
          { name: 'لوحة التحكم', href: paths.dashboard.root },
          { name: 'الشركات', href: paths.dashboard.company.root },
          { name: 'إضافة شركة' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <CompanyNewEditForm />
    </DashboardContent>
  );
}
