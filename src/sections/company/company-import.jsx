import { useForm } from 'react-hook-form';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Alert,
  Table,
  Button,
  Dialog,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  DialogTitle,
  DialogActions,
  DialogContent,
  TableContainer,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { useTranslate } from 'src/locales';

import { toast } from 'src/components/snackbar';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, RHFUpload } from 'src/components/hook-form';

import ImportSuccessTableRowServices from './import-success-services';

// ----------------------------------------------------------------------

// export const NewTourSchema = zod
//   .object({
//
//     files: schemaHelper.mixed({
//       message: { required_error: 'files is required!' },
//     }),
//   });

export default function CompanyImport() {
  const router = useRouter();
  const { t } = useTranslate();
  const fileField = useBoolean();

  const [failArrayItem, setFailArrayItem] = useState([]);
  const [failArrayMessage, setFailArrayMessage] = useState([]);
  const [errorMessage, setErrorMessage] = useState({});
  const [successArray, setSuccessArray] = useState([]);
  const [successArrayMessage, setSuccessArrayMessage] = useState([]);
  const [newrow, setNewrow] = useState({ 2: [{ '': '' }] });
  const [theKeys, setTheKeys] = useState([]);
  const [thefKeys, setThefKeys] = useState([]);
  // const defaultValues = useMemo(
  //   () => ({
  //     images:  [],
  //   }),
  //   []
  // );

  const methods = useForm({
    mode: 'all',
    // resolver: zodResolver(NewTourSchema),
    // defaultValues,
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  // useEffect(() => {
  //   if (currentTour) {
  //     reset(defaultValues);
  //   }
  // }, [currentTour, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };
      const response = await axios.post(`${endpoints.company.import}`, data, config);
      if (response.data.status) {
        toast.success(t('create_success'));
      }
      setFailArrayItem(response.data.data.failArray.item);
      setFailArrayMessage(response.data.data.failArray.message);
      setSuccessArrayMessage(response.data.data.successArray.message);
      setSuccessArray(response.data.data.successArray.item);
      setNewrow(response.data.data.successArray.item[2][0]);
      // setTheKeys(Object.keys(newrow));
    } catch (error) {
      console.error(error);
      if (error.errors) {
        setErrorMessage(error.errors);
        fileField.onTrue();
      }
    }
  });
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue('files', file, { shouldValidate: true });
      }
    },
    [setValue]
  );
  // try {
  // await new Promise((resolve) => setTimeout(resolve, 500));
  // fetch('https://todo.int-vision.com/api/admin/import-company', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });

  //     reset();
  //     // toast.success(currentTour ? 'Update success!' : 'Create success!');
  //     toast.success('Update success!');
  //     router.push(paths.dashboard.company.list);
  //     console.info('DATA', data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.files && values.files?.filter((file) => file !== inputFile);
      setValue('files', filtered, { shouldValidate: true });
    },
    [setValue, values.files]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('files', [], { shouldValidate: true });
  }, [setValue]);

  useEffect(() => {
    if (Object.keys(successArray).length > 0) {
      // setTheKeys(Object.keys(successArray));
      setTheKeys(getFirstItemKeys(successArray));
    }
  }, [successArray]);
  useEffect(() => {
    if (Object.keys(failArrayItem).length > 0) {
      // setTheKeys(Object.keys(failArrayItem));
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
  const renderDetails = (
    <Card>
      {/* <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} /> */}

      {/* <Divider /> */}

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">استيراد ملف</Typography>
          {/* <Field.Upload
            // multiple
            // thumbnail
            name="files"
            excel
            helperText="Accepted formats: .xlsx, .xls, .csv"
            accept=".xlsx, .xls, .csv"
            maxSize={3145728}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onUpload={() => console.info('ON UPLOAD')}
          /> */}
          <RHFUpload
            accept=".xlsx, .xls, .csv"
            name="files"
            maxSize={3145728}
            onDrop={handleDrop}
            onDelete={handleRemoveFile}
            excel
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack direction="row" alignItems="center" flexWrap="wrap">
      {/* <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publish"
        sx={{ flexGrow: 1, pl: 3 }}
      /> */}
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        sx={{ ml: 2 }}
      >
        استيراد ملف excel
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}
        {renderActions}
      </Stack>
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
                    {/* <TableCell>{t('service')}</TableCell>
                      <TableCell>{t('student_number')}</TableCell>
                      <TableCell>{t('semester')}</TableCell>
                      <TableCell>{t('tax')}</TableCell>
                      <TableCell>{t('discount')}</TableCell> */}
                    {/* <TableCell>{t('curriculum')}</TableCell>
                      <TableCell>{t('applied_saudi_vat')}</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {Object.values(successArray)?.map((row, index) => (
                      <ImportSuccessTableRowServices
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
                    {/* <TableCell>{t('service')}</TableCell>
                      <TableCell>{t('student_number')}</TableCell>
                      <TableCell>{t('semester')}</TableCell>
                      <TableCell>{t('tax')}</TableCell>
                      <TableCell>{t('discount')}</TableCell> */}
                    {/* <TableCell>{t('curriculum')}</TableCell>
                      <TableCell>{t('applied_saudi_vat')}</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {Object.values(failArrayItem)?.map((row, index) => (
                      <ImportSuccessTableRowServices
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
