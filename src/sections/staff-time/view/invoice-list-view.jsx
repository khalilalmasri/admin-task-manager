'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import axios, { endpoints } from 'src/utils/axios';

import { _roles } from 'src/_mock';
import { useTranslate } from 'src/locales';
import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { TaskTableRow } from '../task-table-row';
import { TaskTableToolbar } from '../task-table-toolbar';
import { TaskTableFiltersResult } from '../task-table-filters-result';

// ----------------------------------------------------------------------
const storedArray = JSON.parse(localStorage.getItem('taskData')) || {
  items: [
    {
      user_id: 8,
      start_time: '2024-08-12T08:00:00+03:00',
      end_time: '2024-08-12T17:00:00+03:00',
      task_id: 5,
      duration: '9س:0د',
    },
  ],
};
// ----------------------------------------------------------------------

export function StaffListView() {
  const { t } = useTranslate();
  const table = useTable();

  const router = useRouter();

  const confirm = useBoolean();
  // const USER_STATUS_OPTIONS = [
  //   { value: 'active', label: t('active') },
  //   // { value: 'pending', label: 'Pending' },
  //   // { value: 'banned', label: 'Banned' },
  //   { value: 'rejected', label: t('rejected') },
  // ];
  // const STATUS_OPTIONS = [{ value: 'all', label: t('All') }, ...USER_STATUS_OPTIONS];
  const STATUS_OPTIONS = [{ value: 'all', label: t('All') }];

  const TABLE_HEAD = [
    { id: 'user_id', label: t('user_name') },
    { id: 'start_time', label: t('start_time') },
    { id: 'end_time', label: t('end_time') },
    { id: 'duration', label: t('duration') },
    { id: 'task_id', label: t('task_name') },
    // { id: 'end_date', label: t('end_date'), width: 100 },
    // { id: '', width: 88 },
  ];

  const [tableData, setTableData] = useState(storedArray.items);
  const filters = useSetState({ name: '', role: [], status: 'all' });
  // const { tasks, tasksEmpty, tasksLoading } = useGetTasks();
  // console.log('tasks', tasks);
  // useEffect(() => {
  //   if (!tasksEmpty || !tasksLoading || tasks) {
  //     setTableData(tasks);
  //     console.log('useeffect');
  //   }
  // }, [tasksEmpty, tasks, tasksLoading]);
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name || filters.state.role.length > 0 || filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  // const handleDeleteRow = useCallback(
  //   (id) => {
  //     const deleteRow = tableData.filter((row) => row.id !== id);

  //     toast.success('Delete success!');

  //     setTableData(deleteRow);

  //     table.onUpdatePageDeleteRow(dataInPage.length);
  //   },
  //   [dataInPage.length, table, tableData]
  // );
  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(`${endpoints.task.delete}/${id}`);
        if (response.status) {
          const deleteRow = tableData.filter((row) => row.id !== id);
          setTableData(deleteRow);
          table.onUpdatePageDeleteRow(tableData.length);
          if (!tableData.length) {
            table.onResetPage();
          }
          toast.success(t('delete_success'));
        } else {
          toast(response.message);
        }
        confirm.onFalse();
      } catch (error) {
        console.log(error);
      }
    },
    [confirm, table, tableData, t]
  );
  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success(t('delete_success'));

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData, t]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.task.edit(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  return (
    <>
      <DashboardContent>
         <CustomBreadcrumbs
          heading="جدول الحضور والانصراف"
          links={[
            { name: 'لوحة التحكم', href: paths.dashboard.root },
            { name: ' الحضور والانصراف', href: paths.dashboard.invoice.root },
            { name: 'جدول الحضور والانصراف' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.staff.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              تسجيل جديد
            </Button>
          }
           sx={{ mb: { xs: 3, md: 5 } }}
         />
        <Card>
          <Tabs
            value={filters.state.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                      'soft'
                    }
                    color={
                      (tab.value === 'active' && 'success') ||
                      (tab.value === 'pending' && 'warning') ||
                      (tab.value === 'rejected' && 'error') ||
                      'default'
                    }
                  >
                    {['active', 'pending', 'banned', 'rejected'].includes(tab.value)
                      ? tableData.filter((task) => task.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>
          <TaskTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ roles: _roles }}
          />
          {canReset && (
            <TaskTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={dataFiltered.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => row.id)
                )
              }
              action={
                <Tooltip title={t('delete')}>
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      dataFiltered.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <TaskTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>

          <TablePaginationCustom
            page={table.page}
            dense={table.dense}
            count={dataFiltered.length}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onChangeDense={table.onChangeDense}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('delete')}
        content={
          <>
            {t('Are_you_sure_want_to_delete')} <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name?.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}

// 'use client';

// import { useState, useCallback } from 'react';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
// import TableBody from '@mui/material/TableBody';
// import { useTheme } from '@mui/material/styles';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';

// import { useBoolean } from 'src/hooks/use-boolean';
// import { useSetState } from 'src/hooks/use-set-state';

// import { sumBy } from 'src/utils/helper';
// import { fIsAfter, fIsBetween } from 'src/utils/format-time';

// import { useTranslate } from 'src/locales';
// import { DashboardContent } from 'src/layouts/dashboard';

// import { toast } from 'src/components/snackbar';
// import { Iconify } from 'src/components/iconify';
// import { Scrollbar } from 'src/components/scrollbar';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
// import {
//   useTable,
//   emptyRows,
//   rowInPage,
//   TableNoData,
//   getComparator,
//   TableEmptyRows,
//   TableHeadCustom,
//   TablePaginationCustom,
// } from 'src/components/table';

// import { InvoiceTableRow } from '../invoice-table-row';

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'name', label: 'أسم الموظف ' },
//   { id: 'startDate', label: 'وقت الدخول' },
//   { id: 'endDate', label: 'وقت الخروج' },
//   { id: 'duration', label: 'عدد الساعات' },
//   { id: 'tasks', label: 'المهام المنفذة', align: 'center' },
//   { id: '' },
// ];
// const storedArray = JSON.parse(localStorage.getItem('taskData')) || {
//   items: [
//     {
//       user_id: 8,
//       start_time: '2024-08-12T08:00:00+03:00',
//       end_time: '2024-08-12T17:00:00+03:00',
//       task_id: 5,
//       duration: '9س:0د',
//     },
//   ],
// };
// // ----------------------------------------------------------------------

// export function InvoiceListView() {
//   const theme = useTheme();
//   const { t } = useTranslate();
//   const router = useRouter();

//   const table = useTable({ defaultOrderBy: 'createDate' });

//   const confirm = useBoolean();

//   // const [tableData, setTableData] = useState(_invoices);
//   const [tableData, setTableData] = useState(storedArray.items);

//   const filters = useSetState({
//     name: '',
//     service: [],
//     status: 'all',
//     startDate: null,
//     endDate: null,
//   });
//   console.log('storedArray', storedArray);
//   const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

//   const dataFiltered = applyFilter({
//     inputData: tableData,
//     comparator: getComparator(table.order, table.orderBy),
//     filters: filters.state,
//     dateError,
//   });

//   const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

//   const canReset =
//     !!filters.state.name ||
//     filters.state.service.length > 0 ||
//     filters.state.status !== 'all' ||
//     (!!filters.state.startDate && !!filters.state.endDate);

//   const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

//   const getInvoiceLength = (status) => tableData.filter((item) => item.status === status).length;

//   const getTotalAmount = (status) =>
//     sumBy(
//       tableData.filter((item) => item.status === status),
//       (invoice) => invoice.totalAmount
//     );

//   const getPercentByStatus = (status) => (getInvoiceLength(status) / tableData.length) * 100;

//   const handleDeleteRow = useCallback(
//     (id) => {
//       const deleteRow = tableData.filter((row) => row.id !== id);

//       toast.success('Delete success!');

//       setTableData(deleteRow);

//       table.onUpdatePageDeleteRow(dataInPage.length);
//     },
//     [dataInPage.length, table, tableData]
//   );

//   const handleDeleteRows = useCallback(() => {
//     const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

//     toast.success('Delete success!');

//     setTableData(deleteRows);

//     table.onUpdatePageDeleteRows({
//       totalRowsInPage: dataInPage.length,
//       totalRowsFiltered: dataFiltered.length,
//     });
//   }, [dataFiltered.length, dataInPage.length, table, tableData]);

//   const handleEditRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.invoice.edit(id));
//     },
//     [router]
//   );

//   const handleViewRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.invoice.details(id));
//     },
//     [router]
//   );

//   const handleFilterStatus = useCallback(
//     (event, newValue) => {
//       table.onResetPage();
//       filters.setState({ status: newValue });
//     },
//     [filters, table]
//   );

//   return (
//     <>
//       <DashboardContent>
//         <CustomBreadcrumbs
//           heading="جدول الحضور والانصراف"
//           links={[
//             { name: 'لوحة التحكم', href: paths.dashboard.root },
//             { name: ' الحضور والانصراف', href: paths.dashboard.invoice.root },
//             { name: 'جدول الحضور والانصراف' },
//           ]}
//           action={
//             <Button
//               component={RouterLink}
//               href={paths.dashboard.staff.new}
//               variant="contained"
//               startIcon={<Iconify icon="mingcute:add-line" />}
//             >
//               تسجيل جديد
//             </Button>
//           }
//           sx={{ mb: { xs: 3, md: 5 } }}
//         />

//         <Card>

//           <Box sx={{ position: 'relative' }}>

//             <Scrollbar sx={{ minHeight: 444 }}>
//               <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
//                 <TableHeadCustom
//                   order={table.order}
//                   orderBy={table.orderBy}
//                   headLabel={TABLE_HEAD}
//                   rowCount={dataFiltered.length}
//                   numSelected={table.selected.length}
//                   onSort={table.onSort}
//                   onSelectAllRows={(checked) =>
//                     table.onSelectAllRows(
//                       checked,
//                       dataFiltered.map((row) => row.id)
//                     )
//                   }
//                 />

//                 <TableBody>
//                   {dataFiltered
//                     .slice(
//                       table.page * table.rowsPerPage,
//                       table.page * table.rowsPerPage + table.rowsPerPage
//                     )
//                     .map((row) => (
//                       <InvoiceTableRow
//                         key={row.id}
//                         row={row}
//                         selected={table.selected.includes(row.id)}
//                         onSelectRow={() => table.onSelectRow(row.id)}
//                         onViewRow={() => handleViewRow(row.id)}
//                         onEditRow={() => handleEditRow(row.id)}
//                         onDeleteRow={() => handleDeleteRow(row.id)}
//                       />
//                     ))}

//                   <TableEmptyRows
//                     height={table.dense ? 56 : 56 + 20}
//                     emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
//                   />

//                   <TableNoData notFound={notFound} />
//                 </TableBody>
//               </Table>
//             </Scrollbar>
//           </Box>

//           <TablePaginationCustom
//             page={table.page}
//             dense={table.dense}
//             count={dataFiltered.length}
//             rowsPerPage={table.rowsPerPage}
//             onPageChange={table.onChangePage}
//             onChangeDense={table.onChangeDense}
//             onRowsPerPageChange={table.onChangeRowsPerPage}
//           />
//         </Card>
//       </DashboardContent>

//       <ConfirmDialog
//         open={confirm.value}
//         onClose={confirm.onFalse}
//         title="Delete"
//         content={
//           <>
//             Are you sure want to delete <strong> {table.selected.length} </strong> items?
//           </>
//         }
//         action={
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => {
//               handleDeleteRows();
//               confirm.onFalse();
//             }}
//           >
//             Delete
//           </Button>
//         }
//       />
//     </>
//   );
// }

// function applyFilter({ inputData, comparator, filters, dateError }) {
//   const { name, status, service, startDate, endDate } = filters;

//   const stabilizedThis = inputData.map((el, index) => [el, index]);

//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   inputData = stabilizedThis.map((el) => el[0]);

//   if (name) {
//     inputData = inputData.filter(
//       (invoice) =>
//         invoice.invoiceNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
//         invoice.invoiceTo.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
//     );
//   }

//   if (status !== 'all') {
//     inputData = inputData.filter((invoice) => invoice.status === status);
//   }

//   if (service.length) {
//     inputData = inputData.filter((invoice) =>
//       invoice.items.some((filterItem) => service.includes(filterItem.service))
//     );
//   }

//   if (!dateError) {
//     if (startDate && endDate) {
//       inputData = inputData.filter((invoice) => fIsBetween(invoice.createDate, startDate, endDate));
//     }
//   }

//   return inputData;
// }
