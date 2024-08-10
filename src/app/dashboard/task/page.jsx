import { CONFIG } from 'src/config-global';

import { TaskListView } from 'src/sections/tasks/view/task-list-view';

// ----------------------------------------------------------------------

export const metadata = { title: `List Tasks | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <TaskListView />;
}
