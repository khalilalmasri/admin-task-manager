import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDate, fTime } from 'src/utils/format-time';

import { useTranslate } from 'src/locales';
// import { useGetCompanys } from 'src/actions/company';

import { useState, useEffect } from 'react';

import { Avatar, ListItemText } from '@mui/material';

import { useGetUsers } from 'src/actions/user';
import { useGetTasks } from 'src/actions/task';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// import {  StatusList, PriorityList, DurationTypeList } from '../../sections/tasks/task-data';

// ----------------------------------------------------------------------
function calculateTimeDifference(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const diffInMilliseconds = end - start;
  const diffInMinutes = diffInMilliseconds / (1000 * 60);

  const hours = Math.floor(diffInMinutes / 60);
  const minutes = Math.floor(diffInMinutes % 60);

  // return { hours, minutes };
  return `${hours}س:${minutes}د`;
}
export function StaffTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const { t } = useTranslate();
  const popover = usePopover();
  const { users } = useGetUsers();
  const { tasks } = useGetTasks();
  const [usersData, setUsersData] = useState([]);
  const [tasksData, setTasksData] = useState([]);
  useEffect(() => {
    if (tasks) {
      setTasksData(tasks);
    }
  }, [tasks]);
  useEffect(() => {
    if (users) {
      setUsersData(users);
    }
  }, [users]);
  const getUserNameById = (id) => {
    const foundCompany = usersData.find((company) => company.id === id);
    return foundCompany ? foundCompany.name : '';
  };
  const getNameTaskById = (id) => {
    const foundCompany = tasksData.find((company) => company.id === id);
    return foundCompany ? t(foundCompany.title) : '';
  };
  function shortenText(text) {
    if (text?.length > 15) {
      return `${text.slice(0, 10)}...`;
    }
    return text;
  }
  // console.log('row', row?.user.name === "talal");
  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row?.user.name} src={row?.user.name} />

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Box component="span" sx={{ color: 'text.inherit' }}>
                {getUserNameById(row?.user_id)}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fTime(row?.start_time)}
            secondary={fDate(row?.start_time)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{ mt: 0.5, component: 'span', typography: 'caption' }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fTime(row?.end_time)}
            secondary={fDate(row?.end_time)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{ mt: 0.5, component: 'span', typography: 'caption' }}
          />
        </TableCell>
        {/* <TableCell>{row?.duration}</TableCell> */}
        <TableCell align="center">
          {' '}
          {calculateTimeDifference(row?.start_time, row?.end_time)}
        </TableCell>

        <TableCell align="center"> {getNameTaskById(row?.task_id)}</TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center">
            <Tooltip title="Quick Edit" placement="top" arrow>
              {/* <IconButton
                color={quickEdit.value ? 'inherit' : 'default'}
                onClick={quickEdit.onTrue}
              >
                <Iconify icon="solar:pen-bold" />
              </IconButton> */}
            </Tooltip>

            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      {/* <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            {t('delete')}
          </MenuItem>

          {/* <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            {t('edit')}
          </MenuItem> */}
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('delete')}
        content={t('Are_you_sure_want_to_delete?')}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            {t('delete')}
          </Button>
        }
      />
    </>
  );
}
