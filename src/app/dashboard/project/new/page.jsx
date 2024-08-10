import { CONFIG } from 'src/config-global';

import { ProjectCreateView } from 'src/sections/project/view';

// ----------------------------------------------------------------------

export const metadata = { title: `add Projects | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ProjectCreateView />;
}
