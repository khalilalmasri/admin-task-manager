/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
// import PropTypes from 'prop-types';

import {
  Alert,
  Paper,
  Stack,
  Button,
  Dialog,
  Collapse,
  TableRow,
  TableCell,
  IconButton,
  DialogTitle,
  ListItemText,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ImportSuccessTableRowProjects({ row, message, index }) {
  // const { service, student_number, semester, tax, discount } = row;
  const { ...keys } = row;
  const theKeys = Object.keys(row);
  console.log(message);
  console.log('row', row);

  const { t } = useTranslate();
  useEffect(() => {
    if (
      keys === undefined

    ) {
      fileField.onTrue();
    }
  }, [row]);
  const collapse = useBoolean();
  const fileField = useBoolean();
  const renderPrimary = (
    <TableRow hover>
      <TableCell>{index}</TableCell>
      {theKeys.map((key, i) => (
        <TableCell key={i}>{keys[theKeys[i]]}</TableCell>
      ))}

      {/* <TableCell>{curriculum}</TableCell>
      <TableCell>{applied_saudi_vat ? `${t('yes')}` : `${t('no')}`}</TableCell> */}

      <TableCell>
        <IconButton
          color={collapse.value ? 'inherit' : 'default'}
          onClick={collapse.onToggle}
          sx={{
            ...(collapse.value && {
              bgcolor: 'action.hover',
            }),
          }}
        >
          <Iconify icon="eva:arrow-ios-downward-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Stack component={Paper} sx={{ m: 1.5 }}>
            {Object.values(message)?.map((item, i) => (
              <Stack
                key={i}
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.palette.background.neutral}`,
                  },
                }}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    typography: 'body2',
                  }}
                />
              </Stack>
            ))}
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  const feildFile = (
    <Dialog
      fullWidth
      maxWidth={false}
      open={fileField.value}
      onClose={fileField.onFalse}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <DialogTitle>Error</DialogTitle>
      <DialogContent>
        <Alert variant="outlined" severity="error" sx={{ mb: 3 }}>
          This file can not be read
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="error" onClick={() => window.location.reload(false)}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
  return (
    <>
      {renderPrimary}
      {renderSecondary}
      {feildFile}
    </>
  );
}

// ImportSuccessTableRowServices.propTypes = {
// row: PropTypes.any,
// message: PropTypes.any,
// index: PropTypes.number,
// };
