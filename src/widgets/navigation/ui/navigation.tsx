import { styled } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { routes } from 'shared/config';

const NavItem = styled(NavLink)`
  ${({ theme }) => theme.typography.body1}
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration: none;
  display: inline-block;
  padding: 0 ${({ theme }) => theme.spacing(1.5)};
  min-height: ${({ theme }) => theme.spacing(8)};
  line-height: ${({ theme }) => theme.spacing(8)};

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }

  &.active {
    background-color: ${({ theme }) => theme.palette.action.selected};
  }
`;

export const Navigation = () => (
  <>
    <NavItem to={routes.game}>Игра</NavItem>
    <NavItem to={routes.leaderboard}>Лидеры</NavItem>
    <NavItem to={routes.profile}>Профиль</NavItem>
  </>
);
