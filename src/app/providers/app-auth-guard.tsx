// import { Backdrop, CircularProgress, styled } from '@mui/material';
// import { Navigate, useLocation } from 'react-router-dom';

// import { useAuth } from 'features/auth';

// import { routes } from 'shared/config';

// const StyledBackdrop = styled(Backdrop)`
//   color: ${({ theme }) => theme.palette.common.white};
//   z-index: ${({ theme }) => theme.zIndex.drawer + 1};
// `;

// type Props = {
//   children: JSX.Element;
// };

// export const AppAuthGuard = ({ children }: Props) => {
//   const { pathname } = useLocation();

//   const { isAuthCheckPending, isAuthorized } = useAuth();

//   if (isAuthCheckPending) {
//     return (
//       <StyledBackdrop open>
//         <CircularProgress color="inherit" />
//       </StyledBackdrop>
//     );
//   }

//   if (pathname === '/') {
//     return <Navigate to={routes.login} />;
//   }

//   if (!isAuthorized) {
//     if ([routes.login, routes.registration].includes(pathname)) {
//       return children;
//     }

//     return <Navigate to={routes.login} />;
//   }

//   if (isAuthorized) {
//     if ([routes.login, routes.registration].includes(pathname)) {
//       return <Navigate to={routes.game} />;
//     }

//     return children;
//   }

//   return (
//     <>
//       <StyledBackdrop open>
//         <CircularProgress color="inherit" />
//       </StyledBackdrop>
//       {children}
//     </>
//   );
// };
