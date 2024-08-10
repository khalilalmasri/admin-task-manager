import { CONFIG } from 'src/config-global';

import { UserImportView } from 'src/sections/user/view';

// // ----------------------------------------------------------------------

export const metadata = { title: `Users import | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <UserImportView />;
}
