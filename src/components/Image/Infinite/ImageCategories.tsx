import { TagScroller } from '~/components/Tags/TagScroller';
import { TagSort } from '~/server/common/enums';
import { trpc } from '~/utils/trpc';
import { useRouter } from 'next/router';
import { parseNumericStringArray } from '~/utils/query-string-helpers';
import { unknown } from 'zod';

export function ImageCategories() {
  const router = useRouter();
  const { data: { items } = { items: [] } } = trpc.tag.getAll.useQuery({
    entityType: ['Image'],
    sort: TagSort.MostImages,
    unlisted: false,
    categories: true,
    limit: 100,
  });

  const tagIds = parseNumericStringArray(router.query.tags);
  const handleChange = (ids: number[]) => {
    const { pathname, query } = router;
    router.replace({ pathname, query: { ...query, tags: ids } }, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  return <TagScroller data={items} value={tagIds} onChange={handleChange} />;

  // return null;
  // TODO Restore this when we have categories
  // const tags = useFiltersContext((state) => state.image.tags ?? []);
  // const setFilters = useFiltersContext((state) => state.setFilters);

  // return (
  //   <TagScroller data={items} value={tags} onChange={(tags) => setFilters({ image: { tags } })} />
  // );
}
