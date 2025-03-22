'use client'
import { useCallback, useState } from 'react';
import { redirect, RedirectType } from "next/navigation";
import { _guid } from '@/app/_mock';
import { useDialogs } from '@toolpad/core/useDialogs';

// ----------------------------------------------------------------------

export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
} as const;

// ----------------------------------------------------------------------

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

// ----------------------------------------------------------------------

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// ----------------------------------------------------------------------

export function getComparator<Key extends keyof any>(
  order: 'asc' | 'desc',
  orderBy: Key
): (
  a: {
    [key in Key]: number | string;
  },
  b: {
    [key in Key]: number | string;
  }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: Agent[] | Customer[] | Order[]; // Array<UserProps| CustomerProps |OrderProps >;
  filter: Record<string, any>;
  comparator: (a: any, b: any) => number;
};

export function applyFilter({ inputData, comparator, filter }: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]) as TODO;

  if (filter) {
    const prop = Object.keys(filter)[0]
    const value = filter[prop]
    inputData = inputData.filter(
      (user: TODO) => user[prop].toLowerCase().indexOf(value.toLowerCase()) !== -1
    ) as TODO;
  }

  return inputData;
}

//-------------------------------------------------------------


export class UtilService {

  cache: TODO[] = []
  constructor(data: TODO[]) {
    this.cache = data
  }



   generateItemId = (totalCount: number) => {
    return `${_guid}${(totalCount + 1)}`;
  }

   updateItem = (data: TODO) => {
    let items = this.getAllItems() as TODO;
    let index = items.findIndex((a: TODO) => a.id === data.id);
    this.cache[index] = data;
    // setData(cache)
  }

   getAllItems = () => {
    // if (! this.cache)  this.cache = Object.assign([], cache);
    return this.cache
  }


   getItemById = (id: string | number) => {
    return this.cache.find((u: TODO) => u.id === id);
  }

   deleteItemById = (id: string | number) => {
    const index = this.cache.findIndex((u: TODO) => u.id === id);
    this.cache.splice(index, 1);
    // setData(cache)
  }



   getItemsByPageNumber = (
    pageNumber: number, pageSize: number = 10) => {

    // if (!cache || cache.length < 1) cache = Object.assign([], cache);

    console.log(` pageNumber ${pageNumber} `)
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize
    return this.cache.slice(start, end);
  }

  addItem = (data: TODO) => {
    let items = this.getAllItems();
    data["id"] = this.generateItemId(items.length);
    this.cache.push(data);
    // setData(cache)
  }


}


export type useTableProps = {
  redirectRoute: string
  service: TODO,
  toggleNotice: TODO,
}

// const onDialogConfirm = async (message="") => {
//   let deleteConfirmed =false
//   const dialogs = useDialogs();
//   await dialogs.confirm(
//     message? message:
//      "Are you sure to continue this DELETE operation?",
//   ).then( (result :TODO) => {
//     console.log(result)
//     deleteConfirmed = result;
//   }).catch(e => console.log(e));
//   return deleteConfirmed;
// }


export function useTable(props: useTableProps) {
const [page, setPage] = useState(0);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selected, setSelected] = useState<string[]>([]);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const dialogs = useDialogs();
   redirect //= redirect();
  const {  redirectRoute, service, toggleNotice } = props || {};
  // const { handleDialogOpen } = props;

  const onSort = useCallback(
    (id: string) => {
      const isAsc = orderBy === id && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    },
    [order, orderBy]
  );

  const onSelectAllRows = useCallback((checked: boolean, newSelecteds: string[]) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onSelectRow = useCallback(
    (inputValue: string) => {
      const newSelected = selected.includes(inputValue)
        ? selected.filter((value) => value !== inputValue)
        : [...selected, inputValue];

      setSelected(newSelected);
    },
    [selected]
  );

  const onResetPage = useCallback(() => {
    setPage(0);
  }, []);

  const onChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      onResetPage();
    },
    [onResetPage]
  );

  const onDialogConfirm = useCallback(async (message = "") => {
        let deleteConfirmed = false
        await dialogs.confirm(
            message ? message :
                "Are you sure to continue this DELETE operation?",
        ).then((result: TODO) => {
            console.log(result)
            deleteConfirmed = result;
        }).catch(e => console.log(e));
        return deleteConfirmed;
      },[])

     const onDataDelete = useCallback(async (dataId: string, setOpenPopover:(v:TODO) =>void) => {
            console.log(` openPopover id: ${dataId}`)
            const deleteConfirmed = await onDialogConfirm();
            if (deleteConfirmed) {
                service.deleteItemById(dataId)
    
                toggleNotice(true)
                setTimeout(() => {
                    toggleNotice(false)
                    redirect(redirectRoute, RedirectType.push)
                }, 1000);
                setOpenPopover(null);
            }
     
    
        }, []);

    const onMultipleDelete = useCallback(
        async (event: React.MouseEvent<HTMLInputElement>) => {
            const deleteConfirmed = await onDialogConfirm();

            console.log(' deleteConfirmed ' + deleteConfirmed)
            if (deleteConfirmed) {

                if (selected.length > 0) {
                    selected.map(s =>
                        service.deleteItemById(s)
                    )
                    setSelected([])                
                  }
                toggleNotice(true);
                setTimeout(() => {
                    toggleNotice(false);

                    redirect(redirectRoute ? redirectRoute : '/', RedirectType.replace)
                }, 1000)
            }
        },
        [selected, setPage]
    );

  return {
    page,
    order,
    onSort,
    orderBy,
    selected,
    rowsPerPage,
    onSelectRow,
    onResetPage,
    onChangePage,
    onSelectAllRows,
    onChangeRowsPerPage,
    onDialogConfirm,
    onDataDelete,
    onMultipleDelete,
  };
}