import { CONFIG } from 'src/config-global';

import { CompanyListView } from 'src/sections/company/view';

// import { OverviewEcommerceView } from 'src/sections/overview/e-commerce/view';

// ----------------------------------------------------------------------

export const metadata = { title: `الشركات | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  // return <OverviewEcommerceView />;
  return <CompanyListView />;
}
