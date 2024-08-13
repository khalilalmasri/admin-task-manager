import { CONFIG } from 'src/config-global';

import { StaffListView } from 'src/sections/staff-time/view';

// ----------------------------------------------------------------------

export const metadata = { title: `staff-Time List | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <StaffListView />;
}
