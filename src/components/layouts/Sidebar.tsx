'use client';
import { DRAWER_WIDTH } from '@/configs/constants';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';

interface SidebarMenuItem {
    text: string;
    path: string;
}

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
 *   <Sidebar />
 * )
 *
 * @remarks
 * The `Sidebar` assumes that `DRAWER_WIDTH` is defined externally and that the paths provided in `menuItems`
 * are valid route paths for the Next.js router. Styling is applied through MUI's sx prop to align with the primary theme color.
 *
 * The component highlights the currently active menu item based on the current route path.
 * It responds to clicks on each menu item by navigating to the respective route.
 *
 * @returns The Sidebar component with a list of menu items.
 */
function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems: SidebarMenuItem[] = [
        { text: 'Stream list', path: '/' },
        { text: 'Create stream', path: '/stream' },
    ];

    return (
        <Drawer
            sx={{
                width: `${DRAWER_WIDTH}px`,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: `${DRAWER_WIDTH}px`,
                    backgroundColor: 'primary.main',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <List sx={{
                padding: '0 0.5rem',
                mt: '1rem',
            }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            selected={pathname === item.path}
                            onClick={() => router.push(item.path)}
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
        </Drawer>
    );
}

export default Sidebar;
