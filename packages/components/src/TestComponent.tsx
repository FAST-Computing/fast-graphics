'use client';

import { Box, Typography, Button, Paper, Stack, Chip } from '@mui/material';

/** Drop this inside an MUI ThemeProvider to preview active brand tokens. */
export function TestComponent() {
  return (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ color: 'text.primary', mb: 1 }}>
        Test Component
      </Typography>

      {/* Sample card */}
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
