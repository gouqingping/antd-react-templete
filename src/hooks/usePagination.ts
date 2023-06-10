import { useSearchParams } from 'react-router-dom';
import { PaginationProps } from 'antd/lib/pagination/Pagination';

export function usePagination(
  onChange: (page: number, pageSize: number) => void,
  total: number | undefined,
): PaginationProps {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');

  return {
    total,
    current: page ? Number(page) : 1,
    pageSize: pageSize ? Number(pageSize) : 20,
    onChange(page, pageSize) {
      onChange(page, pageSize);
      scrollTo({ top: 0 });
      setSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
    },
  };
}

// usePaginationAction
export function usePaginationAction(
  onChange: (page: number, pageSize: number) => void,
  page: number,
  pageSize: number,
  total: number | undefined,
): PaginationProps {
  return {
    total,
    current: page ? Number(page) : 1,
    pageSize: pageSize ? Number(pageSize) : 20,
    onChange(page, pageSize) {
      onChange(page, pageSize);
      scrollTo({ top: 0 });
    },
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal(total) {
      return `共 ${total} 条记录`;
    },
  };
}
