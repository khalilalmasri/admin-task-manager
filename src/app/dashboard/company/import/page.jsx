import { CONFIG } from 'src/config-global';

import { CompanyImportView } from 'src/sections/company/view';


// // ----------------------------------------------------------------------

export const metadata = { title: `Companys import | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <CompanyImportView />;
}

