import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';
import { useGetCompanys } from 'src/actions/company';

// import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const { t } = useTranslate();
  const popover = usePopover();
  const { companys } = useGetCompanys();
  const getNameById = (id) => {
    const foundCompany = companys.find((company) => company.id === parseInt(id, 10));
    return foundCompany ? foundCompany.name : '';
  };

  // const quickEdit = useBoolean();

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell padding="checkbox">
          <Checkbox id={row.id} checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row?.name} src={row?.avatarUrl} />

            <Stack sx={{ typography: 'body2', flex: '1 1 auto', alignItems: 'flex-start' }}>
              <Link color="inherit" onClick={onEditRow} sx={{ cursor: 'pointer' }}>
                {row?.name}
              </Link>
              <Box component="span" sx={{ color: 'text.disabled' }}>
                {row?.email}
              </Box>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{getNameById(row?.company_id)}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.phone_number}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.email}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.national_id}</TableCell>

        {/* <TableCell>
          <Label
            variant="soft"
            color={
              (row.role === 0 && 'default') ||
              (row.role === 1 && 'success') ||
              (row.role === 2 && 'warning') ||
              'default'
            }
          >
            {row.role === 0 ? t('user') : row.role === 1 ? t('admin') : t('company')}
          </Label>
        </TableCell> */}

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

          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            {t('edit')}
          </MenuItem>
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
