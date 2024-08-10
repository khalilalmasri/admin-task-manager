import { CONFIG } from 'src/config-global';

import { UserListView } from 'src/sections/user/view';

// import { OverviewEcommerceView } from 'src/sections/overview/e-commerce/view';

// ----------------------------------------------------------------------

export const metadata = { title: `List Users | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <UserListView />;
}
