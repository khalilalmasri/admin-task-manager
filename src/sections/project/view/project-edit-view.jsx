'use client';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { useShowProject } from 'src/actions/project';
import { DashboardContent } from 'src/layouts/dashboard';

import { SplashScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProjectNewEditForm } from '../project-new-edit-form';
// ----------------------------------------------------------------------

export function ProjectEditView({ id }) {
  const { project } = useShowProject(id);
  const { t } = useTranslate();
  if (!project) {
    return <SplashScreen />;
  }
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={t('edit_project')}
        links={[
          { name: t('dashboard'), href: paths.dashboard.root },
          { name: t('projects'), href: paths.dashboard.project.list },
          { name: project?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProjectNewEditForm currentProject={project} />
    </DashboardContent>
  );
}
