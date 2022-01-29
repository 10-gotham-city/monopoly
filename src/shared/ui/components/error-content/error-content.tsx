import { LoadingButton } from '@mui/lab';
import { Typography, styled } from '@mui/material';

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1.5)};
`;

type Props = {
  onRefetchClick: () => void;
  isLoading: boolean;
};

export const ErrorContent = ({ isLoading, onRefetchClick }: Props) => (
  <Wrapper>
    <Typography variant="h6">Сервер почему-то не ответил</Typography>
    <LoadingButton onClick={onRefetchClick} loading={isLoading}>
      Обновить
    </LoadingButton>
  </Wrapper>
);
