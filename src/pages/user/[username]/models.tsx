import { Group, Stack, Tabs } from '@mantine/core';
import { MetricTimeframe } from '@prisma/client';
import { useRouter } from 'next/router';

import { NotFound } from '~/components/AppLayout/NotFound';
import { PeriodFilter, SortFilter } from '~/components/Filters';
import { MasonryContainer } from '~/components/MasonryColumns/MasonryContainer';
import { MasonryProvider } from '~/components/MasonryColumns/MasonryProvider';
import { ModelFiltersDropdown } from '~/components/Model/Infinite/ModelFiltersDropdown';
import { ModelsInfinite } from '~/components/Model/Infinite/ModelsInfinite';
import { useModelQueryParams } from '~/components/Model/model.utils';
import { constants } from '~/server/common/constants';
import { ModelSort } from '~/server/common/enums';

import { UserProfileLayout } from './';

export default function UserModelsPage() {
  const { set, ...queryFilters } = useModelQueryParams();
  const period = queryFilters.period ?? MetricTimeframe.AllTime;
  const sort = queryFilters.sort ?? ModelSort.Newest;

  // currently not showing any content if the username is undefined
  if (!queryFilters.username) return <NotFound />;

  return (
    <Tabs.Panel value="/models">
      <MasonryProvider
        columnWidth={constants.cardSizes.model}
        maxColumnCount={7}
        maxSingleColumnWidth={450}
      >
        <MasonryContainer fluid>
          <Stack spacing="xs">
            <Group position="apart">
              <SortFilter type="models" value={sort} onChange={(x) => set({ sort: x as any })} />
              <Group spacing="xs">
                <PeriodFilter value={period} onChange={(x) => set({ period: x })} />
                <ModelFiltersDropdown />
              </Group>
            </Group>
            <ModelsInfinite
              filters={{
                ...queryFilters,
                sort,
                period,
              }}
            />
          </Stack>
        </MasonryContainer>
      </MasonryProvider>
    </Tabs.Panel>
  );
}

UserModelsPage.getLayout = UserProfileLayout;
