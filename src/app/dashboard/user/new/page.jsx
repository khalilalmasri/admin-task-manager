import { CONFIG } from 'src/config-global';

import { UserCreateView } from 'src/sections/user/view';

// import { UserCreateView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `add User | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <UserCreateView />;
}
