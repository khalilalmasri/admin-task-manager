import { CONFIG } from 'src/config-global';
import { CompanyListView } from 'src/sections/company/view';

// import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Companys list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <CompanyListView />;
}
