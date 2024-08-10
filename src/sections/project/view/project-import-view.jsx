'use client';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import ProjectImport from '../project-import';

// ----------------------------------------------------------------------

export function ProjectImportView() {
  const { t } = useTranslate();
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={t('import_user')}
        links={[
          { name: t('dashboard'), href: paths.dashboard.root },
          { name: t('users'), href: paths.dashboard.user.list },
          { name: t('import_user') },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <ProjectImport />
    </DashboardContent>
  );
}
