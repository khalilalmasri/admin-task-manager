import { CONFIG } from 'src/config-global';

import { ProjectListView } from 'src/sections/project/view';

// ----------------------------------------------------------------------

export const metadata = { title: `List Projects | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ProjectListView />;
}
