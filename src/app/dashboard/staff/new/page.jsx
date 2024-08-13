import { CONFIG } from 'src/config-global';

import { StaffCreateView } from 'src/sections/staff-time/view';

// ----------------------------------------------------------------------

export const metadata = { title: `staff-Time | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <StaffCreateView />;
}

// const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';

// export { dynamic };
