import { Box, Card, Typography, styled } from '@mui/material';
import { Formik, FormikProps } from 'formik';
import { SchemaOf } from 'yup';

const FormCard = styled(Card)`
  max-width: 420px;
  padding: ${({ theme }) => theme.spacing(2)};
`;

const ButtonsWrapper = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => `${theme.spacing(3)} ${theme.spacing(4)} 0`};
`;

type Props<T> = {
  title: string;
  defaultValues: T;
  validationSchema: SchemaOf<T>;
  onSubmit: (values: T) => Promise<void>;
  content: (props: FormikProps<T>) => JSX.Element;
  buttons: (props: FormikProps<T>) => JSX.Element;
};

export const AuthFormTemplate = <T extends Record<string, unknown>>({
  title,
  defaultValues,
  onSubmit,
  validationSchema,
  content: Content,
  buttons: Buttons,
}: Props<T>) => (
  <FormCard>
    <Box display="flex" justifyContent="center" mb={2}>
      <Typography variant="h1" align="center">
        {title}
      </Typography>
    </Box>

    <Formik<T>
      initialValues={defaultValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {(props) => (
        <>
          <Content {...props} />
          <ButtonsWrapper>
            <Buttons {...props} />
          </ButtonsWrapper>
        </>
      )}
    </Formik>
  </FormCard>
);
