import { CONFIG } from 'src/config-global';

import { ProjectListView } from 'src/sections/project/view';


// ----------------------------------------------------------------------

export const metadata = { title: `Projects list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ProjectListView />;
}
