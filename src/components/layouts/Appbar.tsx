'use client';
import { DRAWER_WIDTH } from '@/configs/constants';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import configs from '@/configs';

/**
 * AppBar component that integrates with Material-UI and the Solana Wallet Adapter.
 * This component provides a top navigation bar for the application, adjusted to fit alongside
 * a sidebar with a specified width defined in `DRAWER_WIDTH`.
 *
 * The `Appbar` is styled to be sticky at the top of the viewport and spans the width of the viewport
 * minus the width of the sidebar on larger screens. It includes a container that aligns a `WalletMultiButton` to the
 * right, allowing users to connect to their Solana wallet directly from the Appbar.
 *
 * On mobile screens, an icon button is provided to toggle the sidebar.
 *
 * @component
 * @example
 * return (
 *   <Appbar onMenuClick={handleDrawerToggle} />
 * )
 *
 * @remarks
 * The `Appbar` assumes that `DRAWER_WIDTH` is defined externally and that the width and margin adjustments
 * are made based on the screen size. It uses the `WalletMultiButton` for Solana wallet integration and
 * adjusts its styles according to the theme's primary color.
 *
 * @param {Object} props - The properties object.
 * @param {Function} props.onMenuClick - Function to handle the sidebar toggle on mobile screens.
 *
 * @returns {JSX.Element} The AppBar component with a wallet connection button.
 */
function Appbar({ onMenuClick }: { onMenuClick: () => void }): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar
      position="relative"
      sx={{
        width: isMobile ? '100%' : `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: isMobile ? 0 : `${DRAWER_WIDTH}px`,
        padding: '10px 10px',
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Streamflow
        </Typography>
        <WalletMultiButton
          style={{
            background: configs.theme.palette.primary.light,
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
