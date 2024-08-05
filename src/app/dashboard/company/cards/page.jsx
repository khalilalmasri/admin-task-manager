import { CONFIG } from 'src/config-global';
import { CompanyCreateView } from 'src/sections/company/view/company-create-view';

// import { UserCardsView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata = { title: `Company cards | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <CompanyCreateView />;
}
