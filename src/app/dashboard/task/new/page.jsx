import { CONFIG } from 'src/config-global';

import { TaskCreateView } from 'src/sections/tasks/view/task-create-view';

// ----------------------------------------------------------------------

export const metadata = { title: `add Task | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <TaskCreateView />;
}
