import React from 'react';
import { IconButton, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSnackbar } from '@/context/SnackbarContext';

interface TextWithCopyToClipboardProps {
    text: string;
}

function TextWithCopyToClipboard({ text }: TextWithCopyToClipboardProps) {
    const { showMessage } = useSnackbar();

    const truncate = (text: string, maxLength: number) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    const handleOnClick = async () => {
        try {
            await navigator.clipboard.writeText(text);
            showMessage('Text copied to clipboard', 'success');
        } catch (error) {
            showMessage('Failed to copy text', 'error');
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleOnClick} color="primary" aria-label="Copy text">
                <ContentCopyIcon />
            </IconButton>
            <Typography style={{ marginLeft: '8px' }} variant='body2'>{truncate(text, 10)}</Typography>
        </div>
    );
}

export default TextWithCopyToClipboard;
