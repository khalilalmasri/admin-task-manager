import { useForm } from 'react-hook-form';
import React, { useState, useEffect, useCallback } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Card,
  Alert,
  Stack,
  Table,
  Button,
  Dialog,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableContainer,
  Box,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';

import { useTranslate } from 'src/locales';

import { toast } from 'src/components/snackbar';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, RHFUpload } from 'src/components/hook-form';

import ImportSuccessTableRowUsers from './import-success-users';

export default function UserImport() {
  const { t } = useTranslate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [importResults, setImportResults] = useState(null);
  const [failArrayItem, setFailArrayItem] = useState([]);
  const [failArrayMessage, setFailArrayMessage] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [successArray, setSuccessArray] = useState([]);
  const [successArrayMessage, setSuccessArrayMessage] = useState([]);
  const [newrow, setNewrow] = useState({ 2: [{ '': '' }] });
  const [theKeys, setTheKeys] = useState([]);
  const [thefKeys, setThefKeys] = useState([]);
  const fileField = useBoolean();
  const methods = useForm({
    defaultValues: {
      files: null,
    },
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('users', data.files);

      const response = await axios.post('/api/admin/import-user', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImportResults(response.data);
      toast.success(t('import_success'));
      setFailArrayItem(response.data.data.failArray.item);
      setFailArrayMessage(response.data.data.failArray.message);
      setSuccessArrayMessage(response.data.data.successArray.message);
      setSuccessArray(response.data.data.successArray.item);
      // console.log('failArrayItem', failArrayItem);
      // console.log('successArray', successArray);
      // console.log('importResults', importResults);
    } catch (error) {
      console.error('Import error:', error);
      toast.error(t('import_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setValue('files', file, { shouldValidate: true });
    }
  };
  const handleRemoveFile = useCallback(
    (inputFile) => {
      setValue('files', null);
    },
    [setValue]
  );
  useEffect(() => {
    if (Object.keys(successArray).length > 0) {
      setTheKeys(getFirstItemKeys(successArray));
    }
  }, [successArray]);
  useEffect(() => {
    if (Object.keys(failArrayItem).length > 0) {
      setThefKeys(getFirstItemKeys(failArrayItem));
    }
  }, [failArrayItem]);
  function getFirstItemKeys(obje) {
    const firstKey = Object.keys(obje)[0];
    if (firstKey && obje[firstKey] && obje[firstKey][0]) {
      return Object.keys(obje[firstKey][0]);
    }
    return [];
  }
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
          {Object.keys(errorMessage).map((field) =>
            errorMessage[field].map((errorMessages, errorIndex) => (
              <Stack key={errorIndex} spacing={1}>
                {errorMessages}
              </Stack>
            ))
          )}
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
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Typography variant="h6">{t('import_user')}</Typography>
          <RHFUpload
            name="files"
            accept=".xlsx, .xls, .csv"
            maxSize={3145728}
            onDrop={handleFileDrop}
            onDelete={handleRemoveFile}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
  <Box sx={{ width: '33%' }}>
    <LoadingButton
      type="submit"
      variant="contained"
      loading={isSubmitting}
      fullWidth
    >
      {t('import_file')}
    </LoadingButton>
  </Box>
</Box>
          {/* <LoadingButton   type="submit" variant="contained" loading={isSubmitting}>
            {t('import')}
          </LoadingButton> */}
        </Stack>
      </Card>
      {Object.keys(successArray)?.length > 0 && (
        <Card sx={{ mt: 4 }}>
          <Stack
            sx={{
              p: 2.5,
            }}
          >
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {t('import_success')}
            </Typography>
          </Stack>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 960 }}>
                <TableHead>
                  <TableRow>
                    <TableCell> # </TableCell>

                    {theKeys.map((key, i) => (
                      <TableCell key={i}>{t(`${[theKeys[i]]}`)}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {Object.values(successArray)?.map((row, index) => (
                      <ImportSuccessTableRowUsers
                        key={index}
                        index={Number(Object.keys(successArray)[index])}
                        row={row[0]}
                        message={Object.values(successArrayMessage)[index]}
                      />
                    ))}
                  </>
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
      )}

      {Object.keys(failArrayItem).length > 0 && (
        <Card sx={{ mt: 4 }}>
          <Stack
            sx={{
              p: 2.5,
            }}
          >
            <Typography variant="h6" sx={{ mb: 0.5 }}>
              {t('import_failed')}
            </Typography>
          </Stack>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 960 }}>
                <TableHead>
                  <TableRow>
                    <TableCell> # </TableCell>
                    {theKeys.map((key, i) => (
                      <TableCell key={i}>{t(`${[theKeys[i]]}`)}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {Object.values(failArrayItem)?.map((row, index) => (
                      <ImportSuccessTableRowUsers
                        key={index}
                        index={Number(Object.keys(failArrayItem)[index])}
                        row={row[0]}
                        message={Object.values(failArrayMessage)[index]}
                      />
                    ))}
                  </>
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
      )}
      {feildFile}
    </Form>
  );
}

