'use client';
import { DRAWER_WIDTH } from '@/configs/constants';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarMenuItem {
  text: string;
  path: string;
}

const menuItems: SidebarMenuItem[] = [
  { text: 'Stream list', path: '/' },
  { text: 'Create stream', path: '/stream' },
];

/**
 * Sidebar component for navigation in a Next.js application.
 * This component renders a list of navigation links as defined by the `menuItems` array.
 * Each menu item represents a navigation route in the application.
 *
 * The `Sidebar` uses Material-UI's Drawer component to provide a consistent and responsive
 * navigation panel. It leverages Next.js's routing mechanisms, utilizing both `useRouter` and `usePathname`
 * to handle routing and to determine the active route for visual feedback.
 *
 * @component
 * @example
 * return (
 *   <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
 * )
 *
 * @remarks
 * The `Sidebar` assumes that `DRAWER_WIDTH` is defined externally and that the paths provided in `menuItems`
 * are valid route paths for the Next.js router. Styling is applied through MUI's sx prop to align with the primary theme color.
 *
 * The component highlights the currently active menu item based on the current route path.
 * It responds to clicks on each menu item by navigating to the respective route.
 * 
 * On mobile screens, the sidebar is displayed as a temporary drawer, and on larger screens,
 * it is displayed as a permanent drawer. The drawer can be toggled using a button in the Appbar.
 *
 * @param {Object} props - The properties object.
 * @param {boolean} props.mobileOpen - Boolean indicating if the drawer is open on mobile screens.
 * @param {Function} props.handleDrawerToggle - Function to handle the drawer toggle state.
 * 
 * @returns {JSX.Element} The Sidebar component with a list of menu items.
 */
function Sidebar({ mobileOpen, handleDrawerToggle }: { mobileOpen: boolean, handleDrawerToggle: () => void }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const drawer = (
    <>
      <Toolbar />
      <Divider />
      <List
        sx={{
          padding: '0 0.5rem',
          mt: '1rem',
        }}
      >
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={pathname === item.path}
              onClick={() => {
                router.push(item.path);
                if (isMobile) handleDrawerToggle();
              }}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'white',
                  borderRadius: '2px',
                  '&:hover': {
                    backgroundColor: 'white',
                    opacity: 0.9,
                  },
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isMobile ? mobileOpen : true}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: isMobile ? 'auto' : `${DRAWER_WIDTH}px`,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isMobile ? '90%' : `${DRAWER_WIDTH}px`,
          backgroundColor: 'primary.main',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
}

export default Sidebar;
