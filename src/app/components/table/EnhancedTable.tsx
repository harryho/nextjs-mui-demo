'use client'
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { applyFilter, getComparator, useTable, UtilService } from './utils';
import AccessAlarmsSharpIcon from '@mui/icons-material/AccessAlarmsSharp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { redirect, RedirectType } from 'next/navigation';
import { TransitionProps } from '@mui/material/transitions';
import { Chip, Fade, InputAdornment, MenuItem, menuItemClasses, MenuList, OutlinedInput, Popover } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SnapNotice from '../controls/SnapNotice';
import { useCallback, useState } from 'react';
import * as service from "../../services/orderService";
import { useDialogs } from '@toolpad/core';

const OrderStatus: { [k: string]: string } = {
    "packing": "Packing",
    "shipping": "Shipping",
    "customs-clearance": "Customs Clearance",
    "delivered": "Delivered"
}


export interface HeadCell {
    id: keyof any;
    label: string;
    align: string;
}


interface EnhancedTableHeadProps {
    orderBy: string;
    rowCount: number;
    numSelected: number;
    order: 'asc' | 'desc';
    onSort: (id: string) => void;
    headCells: Record<string, any>[];
    onSelectAllRows: (checked: boolean) => void;
}

function EnhancedTableHead({
    order,
    onSort,
    orderBy,
    rowCount,
    headCells,
    numSelected,
    onSelectAllRows,
}: EnhancedTableHeadProps) {

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}

                        onChange={(event: React.ChangeEvent<HTMLInputElement>, checked) =>
                            onSelectAllRows(checked)
                        }
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align || 'left'}
                        // padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            hideSortIcon
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={() => onSort(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
interface EnhancedTableToolbarProps {
    numSelected: number;
    filterName: string;
    onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onMultipleDelete: (event: React.MouseEvent<HTMLInputElement>) => void;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
    const { numSelected, filterName, onFilterName, onMultipleDelete } = props;
    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                // <Typography
                //     sx={{ flex: '1 1 100%' }}
                //     variant="h6"
                //     id="tableTitle"
                //     component="div"
                // >
                //     Nutrition
                // </Typography>
                <OutlinedInput
                    fullWidth
                    value={filterName}
                    onChange={onFilterName}
                    placeholder="Search user..."
                    startAdornment={
                        <InputAdornment position="start">
                            {/* <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} /> */}
                            <SearchIcon fontSize='small' color='info' />
                        </InputAdornment>
                    }
                    sx={{ maxWidth: 320 }}
                />
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete" onClick={onMultipleDelete}>
                    <IconButton >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

interface EnhancedTableProps {
    redirectRoute: string;
    dataSource?: TODO[]
    headCells: Record<string, any>[]
}

export default function EnhancedTable({
    redirectRoute,
    dataSource,
    headCells }: EnhancedTableProps) {
    const [notice, setNotice] = useState<{
        open: boolean;
        transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >;
    }>({
        open: false,
        transition: Fade,
    });
    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
    const [dataId, setDataId] = useState("");
    const dialogs = useDialogs();

    const toggleNotice = (open: boolean) => {
        setNotice({
            ...notice,
            open,
        });
    }

    const table = useTable({
        redirectRoute: '/orders',
        service,
        toggleNotice
    });

    const allData = service.getAllItems();

    const [filterName, setFilterName] = useState('');

    const dataFiltered: TODO = applyFilter({
        inputData: allData,
        comparator: getComparator(table.order, table.orderBy),
        filter: { 'itemSummary': filterName },
    }).slice(
        table.page * table.rowsPerPage,
        table.page * table.rowsPerPage + table.rowsPerPage
    );


    const notFound = !dataFiltered.length && !!filterName;

    const handleClose = () => {
        setNotice({
            ...notice,
            open: false,
        });
    }

    const handleOpenPopover = useCallback(
        (event: React.MouseEvent<HTMLButtonElement> & TODO) => {
            setOpenPopover(event.currentTarget);
            setDataId(event.currentTarget.value)
        }, [setOpenPopover, setDataId]);

    const handleEditing = useCallback(() => {
        console.log(` openPopover id: ${dataId}`)
        setOpenPopover(null);
        redirect(`${redirectRoute}/${dataId}`)//,{replace: true})
    }, [dataId]);


    const handleDelete = useCallback( () => {
        table.onDataDelete(dataId, setOpenPopover)
    }, [dataId]);


    const emptyRows =
        table.page > 0 ? Math.max(0, (1 + table.page) * table.rowsPerPage - allData.length) : 0;


    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar filterName={filterName}
                    onFilterName={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterName(event.target.value);
                        table.onResetPage();
                    }}
                    numSelected={table.selected.length} onMultipleDelete={table.onMultipleDelete} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={table.selected.length}
                            order={table.order}
                            orderBy={table.orderBy}
                            onSelectAllRows={(checked) =>
                                table.onSelectAllRows(
                                    checked,
                                    allData.map((data: TODO) => data.id)
                                )
                            }
                            onSort={table.onSort}
                            rowCount={allData.length}
                            headCells={headCells}
                        />
                        <TableBody >
                            {dataFiltered.map((row: TODO, index: number) => {
                                const isItemSelected = table.selected.includes(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow suppressHydrationWarning
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                    // sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox disableRipple
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId,
                                                }}
                                                onChange={() => table.onSelectRow(row.id)}

                                            />
                                        </TableCell>
                                        <TableCell>{row.orderId}</TableCell>

                                        <TableCell>{row.itemSummary}</TableCell>

                                        <TableCell>$ {row.totalPrice}</TableCell>

                                        <TableCell> {row.promoteCode}</TableCell>
                                        <TableCell> {row.customer}</TableCell>

                                        <TableCell align="center">
                                            {row.isDelayed ? (
                                                <AccessAlarmsSharpIcon fontSize='small' color='error' />
                                            ) : (
                                                '-'
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Chip label={OrderStatus[row.status]} color={(row.status === 'customs-clearance' && 'error')
                                                || (row.status === 'packing' && 'warning')
                                                || (row.status === 'shipping' && 'info') || 'success'} />
                                        </TableCell>

                                        <TableCell align="right">
                                            <IconButton onClick={handleOpenPopover} value={row.id}>

                                                <MoreVertIcon fontSize='small' />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={allData.length}
                    rowsPerPage={table.rowsPerPage}
                    page={table.page}
                    onPageChange={table.onChangePage}
                    onRowsPerPageChange={table.onChangeRowsPerPage}
                />
                <Popover
                    open={!!openPopover}
                    anchorEl={openPopover}
                    onClose={handleEditing}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuList
                        disablePadding
                        sx={{
                            p: 0.5,
                            gap: 0.5,
                            width: 140,
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
                        <MenuItem onClick={handleEditing}>
                            <ModeEditOutlineOutlinedIcon fontSize='small' color='info' />
                            Edit
                        </MenuItem>

                        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                            <DeleteForeverOutlinedIcon fontSize='small' color='error' />
                            Delete
                        </MenuItem>
                    </MenuList>
                </Popover>
            </Paper>
            <SnapNotice open={notice.open} transition={notice.transition}
                handleClose={handleClose} />
        </Box>
    );
}