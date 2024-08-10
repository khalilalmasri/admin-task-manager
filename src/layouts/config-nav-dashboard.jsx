// import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------
// export function useNavData() {
// const data = useMemo(
// () =>
export const navData = [
  /**
   * Overview
   */
  {
    // subheader: 'Overview',
    items: [
      { title: 'لوحة التحكم', path: paths.dashboard.root, icon: ICONS.dashboard },
      // {
      //   title: 'المشاريع',
      //   path: paths.dashboard.general.analytics,
      //   icon: ICONS.analytics,
      //   disabled: true,
      // },
      // { title: 'الشركات', path: paths.dashboard.company.list, icon: ICONS.job },
      // { title: 'المهام', path: paths.dashboard.kanban, icon: ICONS.course },
      { title: 'التقويم', path: paths.dashboard.calendar, icon: ICONS.calendar },
      // { title: 'Course', path: paths.dashboard.general.course, icon: ICONS.course },
    ],
  },
  {
    // subheader: 'Management',
    items: [
      {
        title: 'المهام',
        path: paths.dashboard.task.root,
        icon: ICONS.course,
        children: [
          { title: 'قائمة المهام', path: paths.dashboard.task.list, icon: ICONS.menuItem },
          { title: 'إضافة مهمة', path: paths.dashboard.task.new, icon: ICONS.file },
        ],
      },
    ],
  },

  {
    // subheader: 'Management',
    items: [
      {
        title: 'الشركات',
        path: paths.dashboard.company.root,
        icon: ICONS.job,
        children: [
          { title: 'قائمة الشركات', path: paths.dashboard.company.list, icon: ICONS.menuItem },
          { title: 'إضافة شركة', path: paths.dashboard.company.new, icon: ICONS.file },
          {
            title: 'استيراد ملفات شركات',
            path: paths.dashboard.company.import,
            icon: ICONS.folder,
          },
        ],
      },
    ],
  },

  /**
   * Management
   */
  {
    // subheader: 'Management',
    items: [
      {
        title: 'الموظفين',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [
          // { title: 'Profile', path: paths.dashboard.user.root },
          // { title: 'Cards', path: paths.dashboard.user.cards },
          { title: 'قائمة الموظفين', path: paths.dashboard.user.list, icon: ICONS.menuItem },
          { title: 'إضافة موظف', path: paths.dashboard.user.new, icon: ICONS.file },
          { title: 'استيراد ملفات موظفين', path: paths.dashboard.user.import, icon: ICONS.folder },
          // { title: 'Edit', path: paths.dashboard.user.demo.edit },
          // { title: 'Account', path: paths.dashboard.user.account },
        ],
      },
    ],
  },
  {
    // subheader: 'Management',
    items: [
      {
        title: 'المشاريع',
        path: paths.dashboard.project.root,
        icon: ICONS.analytics,
        children: [
          { title: 'قائمة المشاريع', path: paths.dashboard.project.list, icon: ICONS.menuItem },
          { title: 'إضافة مشروع', path: paths.dashboard.project.new, icon: ICONS.file },
          // { title: 'استيراد ملفات مشروع',path: paths.dashboard.project.import,icon: ICONS.folder,},
        ],
      },
    ],
  },

  // {
  //   title: 'Product',
  //   path: paths.dashboard.product.root,
  //   icon: ICONS.product,
  //   children: [
  //     { title: 'List', path: paths.dashboard.product.root },
  //     { title: 'Details', path: paths.dashboard.product.demo.details },
  //     { title: 'Create', path: paths.dashboard.product.new },
  //     { title: 'Edit', path: paths.dashboard.product.demo.edit },
  //   ],
  // },
  // {
  //   title: 'Order',
  //   path: paths.dashboard.order.root,
  //   icon: ICONS.order,
  //   children: [
  //     { title: 'List', path: paths.dashboard.order.root },
  //     { title: 'Details', path: paths.dashboard.order.demo.details },
  //   ],
  // },
  // {
  //   title: 'Invoice',
  //   path: paths.dashboard.invoice.root,
  //   icon: ICONS.invoice,
  //   children: [
  //     { title: 'List', path: paths.dashboard.invoice.root },
  //     { title: 'Details', path: paths.dashboard.invoice.demo.details },
  //     { title: 'Create', path: paths.dashboard.invoice.new },
  //     { title: 'Edit', path: paths.dashboard.invoice.demo.edit },
  //   ],
  // },
  // {
  //   title: 'Blog',
  //   path: paths.dashboard.post.root,
  //   icon: ICONS.blog,
  //   children: [
  //     { title: 'List', path: paths.dashboard.post.root },
  //     { title: 'Details', path: paths.dashboard.post.demo.details },
  //     { title: 'Create', path: paths.dashboard.post.new },
  //     { title: 'Edit', path: paths.dashboard.post.demo.edit },
  //   ],
  // },
  // {
  //   title: 'Job',
  //   path: paths.dashboard.job.root,
  //   icon: ICONS.job,
  //   children: [
  //     { title: 'List', path: paths.dashboard.job.root },
  //     { title: 'Details', path: paths.dashboard.job.demo.details },
  //     { title: 'Create', path: paths.dashboard.job.new },
  //     { title: 'Edit', path: paths.dashboard.job.demo.edit },
  //   ],
  // },
  // {
  //   title: 'Tour',
  //   path: paths.dashboard.tour.root,
  //   icon: ICONS.tour,
  //   children: [
  //     { title: 'List', path: paths.dashboard.tour.root },
  //     { title: 'Details', path: paths.dashboard.tour.demo.details },
  //     { title: 'Create', path: paths.dashboard.tour.new },
  //     { title: 'Edit', path: paths.dashboard.tour.demo.edit },
  //   ],
  // },
  // { title: 'File manager', path: paths.dashboard.fileManager, icon: ICONS.folder },
  // {
  //   title: 'Mail',
  //   path: paths.dashboard.mail,
  //   icon: ICONS.mail,
  //   info: (
  //     <Label color="error" variant="inverted">
  //       +32
  //     </Label>
  //   ),
  // },
  // { title: 'Chat', path: paths.dashboard.chat, icon: ICONS.chat },
  // { title: 'Calendar', path: paths.dashboard.calendar, icon: ICONS.calendar },
  // { title: 'Kanban', path: paths.dashboard.kanban, icon: ICONS.kanban },
  //   ],
  // },
  /**
   * Item State
   */
  // {
  //   subheader: 'Misc',
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: 'Permission',
  //       path: paths.dashboard.permission,
  //       icon: ICONS.lock,
  //       roles: ['admin', 'manager'],
  //       caption: 'Only admin can see this item',
  //     },
  //     // {
  //     //   title: 'Level',
  //     //   path: '#/dashboard/menu_level',
  //     //   icon: ICONS.menuItem,
  //     //   children: [
  //     //     {
  //     //       title: 'Level 1a',
  //     //       path: '#/dashboard/menu_level/menu_level_1a',
  //     //       children: [
  //     //         {
  //     //           title: 'Level 2a',
  //     //           path: '#/dashboard/menu_level/menu_level_1a/menu_level_2a',
  //     //         },
  //     //         {
  //     //           title: 'Level 2b',
  //     //           path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b',
  //     //           children: [
  //     //             {
  //     //               title: 'Level 3a',
  //     //               path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3a',
  //     //             },
  //     //             {
  //     //               title: 'Level 3b',
  //     //               path: '#/dashboard/menu_level/menu_level_1a/menu_level_2b/menu_level_3b',
  //     //             },
  //     //           ],
  //     //         },
  //     //       ],
  //     //     },
  //     //     { title: 'Level 1b', path: '#/dashboard/menu_level/menu_level_1b' },
  //     //   ],
  //     // },
  //     // {
  //     //   title: 'Disabled',
  //     //   path: '#disabled',
  //     //   icon: ICONS.disabled,
  //     //   disabled: true,
  //     // },
  //     // {
  //     //   title: 'Label',
  //     //   path: '#label',
  //     //   icon: ICONS.label,
  //     //   info: (
  //     //     <Label
  //     //       color="info"
  //     //       variant="inverted"
  //     //       startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}
  //     //     >
  //     //       NEW
  //     //     </Label>
  //     //   ),
  //     // },
  //     // {
  //     //   title: 'Caption',
  //     //   path: '#caption',
  //     //   icon: ICONS.menuItem,
  //     //   caption:
  //     //     'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
  //     // },
  //     // {
  //     //   title: 'Params',
  //     //   path: '/dashboard/params?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
  //     //   icon: ICONS.parameter,
  //     // },
  //     // {
  //     //   title: 'External link',
  //     //   path: 'https://www.google.com/',
  //     //   icon: ICONS.external,
  //     //   info: <Iconify width={18} icon="prime:external-link" />,
  //     // },
  //     // { title: 'Blank', path: paths.dashboard.blank, icon: ICONS.blank },
  //   ],
  // },
];
//  );

// return data;
// }
