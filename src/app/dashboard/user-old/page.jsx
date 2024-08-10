import { CONFIG } from 'src/config-global';

import { UserProfileView } from 'src/sections/user-old/view';

// ----------------------------------------------------------------------

export const metadata = { title: `User profile | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <UserProfileView />;
}
