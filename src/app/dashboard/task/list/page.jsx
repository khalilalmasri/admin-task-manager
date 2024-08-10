import { CONFIG } from 'src/config-global';

import { TaskListView } from 'src/sections/tasks/view/task-list-view';


// ----------------------------------------------------------------------

export const metadata = { title: `Tasks list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return <TaskListView />;
}
