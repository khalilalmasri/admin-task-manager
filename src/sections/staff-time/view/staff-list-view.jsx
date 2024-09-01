'use client';

import { useState, useEffect, useCallback } from 'react';

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
import { useGetStaffs } from 'src/actions/staff';
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

import { StaffTableRow } from '../staff-table-row';
import { StaffTableToolbar } from '../staff-table-toolbar';
import { StaffTableFiltersResult } from '../staff-table-filters-result';

// ----------------------------------------------------------------------
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
// ----------------------------------------------------------------------

export function StaffListView() {
  const { t } = useTranslate();
  const table = useTable();

  const router = useRouter();

  const confirm = useBoolean();

  const STATUS_OPTIONS = [{ value: 'all', label: t('All') }];

  const TABLE_HEAD = [
    { id: 'user_id', label: t('user_name') },
    { id: 'start_time', label: t('start_time') },
    { id: 'end_time', label: t('end_time') },
    { id: 'duration', label: t('duration') },
    { id: 'task_id', label: t('task_name') },
  ];

  const [tableData, setTableData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const filters = useSetState({ name: '', role: [], status: 'all' });
  const { staffs, staffsEmpty, staffsLoading } = useGetStaffs();
  const [searchresult, setSearchResult] = useState([]);

  useEffect(() => {
    if (staffs) {
      setOriginalData(staffs);
    }
  }, [staffs]);
  useEffect(() => {
    if (originalData.length > 0) {
      setSearchResult(
        originalData.filter((item) => item.user.name.toLowerCase().includes(filters.state.name))
      );
    }
  }, [originalData, filters.state.name]);

  useEffect(() => {
    if (searchresult) {
      setTableData(searchresult);
    }
  }, [searchresult]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });
  //-------------

  //-------------
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
        const response = await axios.delete(`${endpoints.staff.delete}/${id}`);
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
      router.push(paths.dashboard.staff.edit(id));
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
  // console.log('filters', filters.state.name);
  // console.log('findfindfindfindtableData', tableData.find((item) => item.user.name === "talal"));
  // console.log('>>>>>>>>>>>>>>tableData', tableData.filter((item) => item.user.name.toLowerCase().includes(filters.state.name)));
  // console.log('>>>>>>>>>>>>>>tableData', tableData);
  // console.log('>>>>>>>>>>>>>>searchresult', searchresult);
  // console.log('>>>>>>>>>>>>>>originalData', originalData);
  // console.log('includesincludes', tableData.includes(tableData.find((item) => item.user.name === "ta")));

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="جدول الحضور والانصراف"
          links={[
            { name: 'لوحة التحكم', href: paths.dashboard.root },
            { name: ' الحضور والانصراف', href: paths.dashboard.staff.root },
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
                      ? tableData.filter((staff) => staff.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>
          <StaffTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ roles: _roles }}
          />
          {canReset && (
            <StaffTableFiltersResult
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
                      <StaffTableRow
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
