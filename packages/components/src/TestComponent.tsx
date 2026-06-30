'use client';

import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Paper, Stack, Chip } from '@mui/material';

/** Drop this inside an MUI ThemeProvider to preview active brand tokens. */
export function TestComponent() {
  const theme = useTheme();
  const { palette } = theme;

  const swatches = [
    { label: 'Primary', color: palette.primary.main },
    { label: 'Primary dark', color: palette.primary.dark },
    { label: 'Primary light', color: palette.primary.light },
    { label: 'Secondary', color: palette.secondary.main },
    { label: 'Secondary dark', color: palette.secondary.dark },
    { label: 'Secondary light', color: palette.secondary.light },
  ] as const;

  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: 'text.primary', mb: 1 }}>
        Brand Preview
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
        Powered by @fast-computing/fast-graphics
      </Typography>

      {/* Color swatches */}
      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
        Palette
      </Typography>
      <Stack direction="row" spacing={1.5} sx={{ mb: 4, flexWrap: 'wrap' }} useFlexGap>
        {swatches.map((s) => (
          <Stack key={s.label} spacing={0.5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1.5,
                bgcolor: s.color,
                border: '2px solid',
                borderColor: 'text.primary',
              }}
            />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {s.label}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {/* Typography */}
      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
        Typography
      </Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h3" sx={{ fontFamily: theme.typography.fontFamily }}>
          The quick brown fox
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.primary' }}>
          Body primary — The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Body secondary — The quick brown fox jumps over the lazy dog.
        </Typography>
      </Paper>

      {/* Sample card */}
      <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
        Sample UI
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 360 }}>
        <Typography variant="h6" sx={{ color: 'text.primary', mb: 0.5 }}>
          Fast Card
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          A simple card powered by current brand tokens.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label="Token" color="primary" size="small" />
          <Chip label="MUI" color="secondary" size="small" />
        </Stack>
        <Button variant="contained" color="primary" fullWidth>
          Action
        </Button>
      </Paper>
    </Box>
  );
}
