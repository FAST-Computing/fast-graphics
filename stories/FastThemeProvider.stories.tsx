import type { Meta, StoryObj } from '@storybook/react';
import { FastThemeProvider } from '../packages/components/src/FastThemeProvider';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

function ThemePreview() {
  const theme = useTheme();
  const p = theme.palette;
  return (
    <Box sx={{ bgcolor: 'background.default', p: 4, minHeight: 300 }}>
      <Typography variant="h4" sx={{ color: 'text.primary', mb: 3, fontWeight: 700 }}>
        Preview
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1, bgcolor: 'background.paper', p: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Paper</Typography>
          <Typography sx={{ color: 'text.primary' }}>background.paper</Typography>
        </Box>
        <Box sx={{ flex: 1, bgcolor: 'background.default', p: 3 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>Default</Typography>
          <Typography sx={{ color: 'text.primary' }}>background.default</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1, bgcolor: p.primary.main, p: 3 }}>
          <Typography variant="body2" sx={{ color: p.primary.contrastText, mb: 1 }}>Primary</Typography>
          <Typography sx={{ color: p.primary.contrastText }}>{p.primary.main}</Typography>
        </Box>
        <Box sx={{ flex: 1, bgcolor: p.secondary.main, p: 3 }}>
          <Typography variant="body2" sx={{ color: p.secondary.contrastText, mb: 1 }}>Secondary</Typography>
          <Typography sx={{ color: p.secondary.contrastText }}>{p.secondary.main}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography sx={{ color: 'text.primary' }}>text.primary</Typography>
        <Typography sx={{ color: 'text.secondary' }}>text.secondary</Typography>
      </Box>
    </Box>
  );
}

const meta: Meta<typeof FastThemeProvider> = {
  title: 'Theme/FastThemeProvider',
  component: FastThemeProvider,
  tags: ['autodocs'],
  argTypes: {
    brand: {
      control: 'select',
      options: ['fast_core', 'fast_argos', 'fast_atlas', 'simplifica_core', 'simplifica_burlo'],
    },
    withCssBaseline: { control: 'boolean' },
    withComponentDefaults: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FastThemeProvider>;

export const Default: Story = {
  args: { brand: 'fast_core' },
  render: (args) => (
    <FastThemeProvider {...args}>
      <ThemePreview />
    </FastThemeProvider>
  ),
};
