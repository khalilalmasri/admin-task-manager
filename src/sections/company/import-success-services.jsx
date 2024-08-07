/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
// import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useBoolean } from 'src/hooks/use-boolean';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ImportSuccessTableRowServices({ row, message, index }) {
  // const { service, student_number, semester, tax, discount } = row;
  const { ...keys } = row;
  // console.log('row', row);
  const theKeys = Object.keys(row);
  // console.log('theKeys', theKeys);
  // console.log(message);
  // console.log('typeof', typeof row);
  console.log('row', row);
  //   const keysObject = {};
  // for (const key in row) {
  //   keysObject[key] = null; // Assign null values to represent keys only
  // }
  // console.log(keysObject);
  // const keysObject = Object.keys(row).reduce((obj, key) => {
  //   obj[key] = null; // Assign null values to represent keys only
  //   return obj;
  // }, {});
  // const keysObject = {};
  // const keysObject = Object.keys(row).map((key) => ({ key }));
  // const keysObject = Object.keys(row).reduce((obj, key) => {
  //   obj[key] = key;
  //   return obj;
  // }, {});

  // console.log('keysObject', keysObject);
  // console.log(' success success success success success success');
  const { t } = useTranslate();
  useEffect(() => {
    if (
      keys === undefined
      // service === undefined ||
      // student_number === undefined ||
      // semester === undefined ||
      // tax === undefined ||
      // discount === undefined
    ) {
      fileField.onTrue();
    }
  }, [row]);
  // console.log('keys', keys);
  // console.log('theKeys.length', theKeys.length);
  // console.log('keys[0]', keys[theKeys[0]]);
  const collapse = useBoolean();
  const fileField = useBoolean();
  const renderPrimary = (
    <TableRow hover>
      <TableCell>{index}</TableCell>
      {theKeys.map((key, i) => (
        <TableCell key={i}>{keys[theKeys[i]]}</TableCell>
      ))}
      {/* <TableCell>{index}</TableCell>
      <TableCell>{keys[theKeys[0]]}</TableCell>
      <TableCell>{keys[theKeys[1]]}</TableCell>
      <TableCell>{keys[theKeys[2]]}</TableCell>
      <TableCell>{keys[theKeys[3]]}</TableCell>
      <TableCell>{keys[theKeys[4]]}</TableCell> */}
      {/* <TableCell>{keys}</TableCell> */}
      {/* <TableCell>{service}</TableCell>
      <TableCell>{student_number}</TableCell>
      <TableCell>{semester}</TableCell>
      <TableCell>{tax}</TableCell>
      <TableCell>{discount}</TableCell> */}
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

ImportSuccessTableRowServices.propTypes = {
  // row: PropTypes.object,
  // message: PropTypes.array,
  // index: PropTypes.number,
};
