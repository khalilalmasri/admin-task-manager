import { CONFIG } from 'src/config-global';

import { ProjectImportView } from 'src/sections/project/view';


// // ----------------------------------------------------------------------

export const metadata = { title: `Projects import | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <ProjectImportView />;
}

