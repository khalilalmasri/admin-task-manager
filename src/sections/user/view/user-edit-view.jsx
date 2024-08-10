'use client';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { useShowUser } from 'src/actions/user';
import { DashboardContent } from 'src/layouts/dashboard';

import { SplashScreen } from 'src/components/loading-screen';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { UserNewEditForm } from '../user-new-edit-form';
// ----------------------------------------------------------------------


export function UserEditView({ id }) {
  const {user } = useShowUser(id);
  const {t} = useTranslate();
  if (!user) {
    return <SplashScreen />;
  }
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={t('edit_user')}
        links={[
          { name: t('dashboard'), href: paths.dashboard.root },
          { name: t('users'), href: paths.dashboard.user.list },
          { name: user?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <UserNewEditForm currentUser={user} />
    </DashboardContent>
  );
}
