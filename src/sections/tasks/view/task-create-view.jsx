'use client';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { TaskNewEditForm } from '../task-new-edit-form';

// ----------------------------------------------------------------------

export function TaskCreateView() {
  const { t } = useTranslate();
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={t('add_task')}
        links={[
          { name: t('dashboard'), href: paths.dashboard.root },
          { name: t('tasks'), href: paths.dashboard.task.list },
          { name: t('add_task') },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <TaskNewEditForm />
    </DashboardContent>
  );
}
