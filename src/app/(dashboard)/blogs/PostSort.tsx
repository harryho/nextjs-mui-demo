import type { ButtonProps } from '@mui/material/Button';

import { useState, useCallback } from 'react';

import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { varAlpha } from '../components/theme/styles';
import { lightPalette as palette } from '../components/theme/core';
import { ArrowDropUpOutlined } from '@mui/icons-material';


// ----------------------------------------------------------------------

type PostSortProps = ButtonProps & {
  sortBy: string;
  onSort: (newSort: string) => void;
  options: { value: string; label: string }[];
};

export function PostSort({ options, sortBy, onSort, sx, ...other }: PostSortProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const endIcon = openPopover? <ArrowDropUpOutlined />: <ArrowDropUpOutlined />

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpenPopover}
        // endIcon={
        //   <Iconify
        //     icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'}
        //     sx={{
        //       ml: -0.5,
        //     }}
        //   />
        //   <
        // }
        endIcon = {endIcon}
        sx={{
          // bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
          bgcolor: (theme) => varAlpha(palette.grey['500Channel'], 0.08),
          ...sx,
        }}
        {...other}
      >
        {options.find((option) => option.value === sortBy)?.label}
      </Button>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 160,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === sortBy}
              onClick={() => {
                onSort(option.value);
                handleClosePopover();
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </Popover>
    </>
  );
}
