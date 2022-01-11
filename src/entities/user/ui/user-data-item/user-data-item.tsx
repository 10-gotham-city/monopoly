import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
  value: string;
  titleWidth: number;
};

export const UserDataItem = ({ title, value, titleWidth }: Props) => (
  <Box width={1} display="flex" alignItems="end" justifyContent="space-between">
    <Box width={titleWidth}>
      <Typography
        variant="caption"
        sx={{
          textTransform: 'uppercase',
        }}
      >
        {title}:
      </Typography>
    </Box>
    <Typography variant="subtitle2">{value}</Typography>
  </Box>
);
