'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { StaffNewEditForm } from '../staff-new-edit-form';

// ----------------------------------------------------------------------

export function StaffCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="تسجيل دوام موظف"
        links={[
          { name: 'لوحة التحكم', href: paths.dashboard.root },
          { name: 'الدوام', href: paths.dashboard.staff.root },
          { name: 'تسجيل حضور' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <StaffNewEditForm />
    </DashboardContent>
  );
}
