import { Card, Grid, styled } from '@mui/material';
import { memo } from 'react';

import { TUserData } from '../../types';
import { UserDataItem } from '../user-data-item';

const TITLE_WIDTH = 156;

const StyledGrid = styled(Grid)`
  display: flex;
  align-items: flex-end;
  padding: ${({ theme }) => theme.spacing(2)};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  }
`;

export const UserData = memo(
  ({ displayName, email, firstName, login, phone, secondName }: TUserData) => (
    <Card>
      <Grid container direction="column">
        <StyledGrid item>
          <UserDataItem title="Имя" value={firstName} titleWidth={TITLE_WIDTH} />
        </StyledGrid>
        <StyledGrid item>
          <UserDataItem title="Фамилия" value={secondName} titleWidth={TITLE_WIDTH} />
        </StyledGrid>
        <StyledGrid item>
          <UserDataItem title="Отображаемое имя" value={displayName} titleWidth={TITLE_WIDTH} />
        </StyledGrid>
        <StyledGrid item>
          <UserDataItem title="Логин" value={login} titleWidth={TITLE_WIDTH} />
        </StyledGrid>
        <StyledGrid item>
          <UserDataItem title="Email" value={email} titleWidth={TITLE_WIDTH} />
        </StyledGrid>
        <StyledGrid item>
          <UserDataItem title="Телефон" value={phone} titleWidth={TITLE_WIDTH} />
        </StyledGrid>
      </Grid>
    </Card>
  ),
);
