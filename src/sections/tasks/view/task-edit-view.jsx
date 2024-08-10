'use client';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { useShowTask } from 'src/actions/task';
import { DashboardContent } from 'src/layouts/dashboard';

import { SplashScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { TaskNewEditForm } from '../task-new-edit-form';
// ----------------------------------------------------------------------

export function TaskEditView({ id }) {
  const { task } = useShowTask(id);
  const { t } = useTranslate();
  if (!task) {
    return <SplashScreen />;
  }
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={t('edit_task')}
        links={[
          { name: t('dashboard'), href: paths.dashboard.root },
          { name: t('tasks'), href: paths.dashboard.task.list },
          { name: task?.title },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <TaskNewEditForm currentTask={task} />
    </DashboardContent>
  );
}
