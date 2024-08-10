import { CONFIG } from 'src/config-global';

import { UserCreateView } from 'src/sections/user-old/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Create a new user | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <UserCreateView />;
}
