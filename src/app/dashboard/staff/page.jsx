import { CONFIG } from 'src/config-global';

import { InvoiceCreateView } from 'src/sections/staff-time/view';


// ----------------------------------------------------------------------

export const metadata = { title: `staff-Time | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <InvoiceCreateView />;
}
