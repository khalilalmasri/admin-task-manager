'use client';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProjectNewEditForm } from '../project-new-edit-form';

// ----------------------------------------------------------------------

export function ProjectCreateView() {
  const { t } = useTranslate();
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={t('add_project')}
        links={[
          { name: t('dashboard'), href: paths.dashboard.root },
          { name: t('projects'), href: paths.dashboard.project.list },
          { name: t('add_project') },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProjectNewEditForm />
    </DashboardContent>
  );
}
