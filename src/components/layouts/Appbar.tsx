'use client'
import { DRAWER_WIDTH } from '@/configs/constants'
import { AppBar, Box, Container } from '@mui/material'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

/**
 * AppBar component that integrates with Material-UI and the Solana Wallet Adapter.
 * This component provides a top navigation bar for the application, adjusted to fit alongside
 * a sidebar with a specified width defined in `DRAWER_WIDTH`.
 *
 * The `AppBar` is styled to be sticky at the top of the viewport and spans the width of the viewport
 * minus the width of the sidebar. It includes a container that aligns a `WalletMultiButton` to the
 * right, allowing users to connect to their Solana wallet directly from the AppBar.
 *
 * @component
 * @example
 * return (
 *   <Appbar />
 * )
 *
 * @remarks
 * The AppBar makes use of the `DRAWER_WIDTH` from external configuration to adjust its own
 * width and margin, making sure it displays correctly next to a sidebar. The WalletMultiButton
 * is styled directly via its `style` prop to match the application's design.
 *
 * @returns {JSX.Element} The AppBar component with a wallet connection button.
 */
function Appbar(): JSX.Element {
    return (
        <AppBar position="relative" sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px`, padding: '10px 0' }}
        >
            <Container maxWidth="xl">
                <Box display="flex" justifyContent="flex-end">
                    <WalletMultiButton style={{
                        backgroundColor: '#4a90e2',
                    }} />
                </Box>
            </Container>
        </AppBar>
    )
}

export default Appbar
