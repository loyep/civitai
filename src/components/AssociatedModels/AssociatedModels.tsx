import { AssociationType } from '@prisma/client';
import { useCurrentUser } from '~/hooks/useCurrentUser';
import { trpc } from '~/utils/trpc';
import {
  LoadingOverlay,
  Stack,
  Title,
  Container,
  Group,
  Button,
  Center,
  Text,
  Box,
} from '@mantine/core';
import { MasonryProvider } from '~/components/MasonryColumns/MasonryProvider';
import { MasonryContainer } from '~/components/MasonryColumns/MasonryContainer';
import { MasonryCarousel } from '~/components/MasonryColumns/MasonryCarousel';
import { ModelCategoryCard } from '~/components/Model/Categories/ModelCategoryCard';
import { openContext } from '~/providers/CustomModalsProvider';

export function AssociatedModels({
  fromId,
  type,
  label,
  ownerId,
}: {
  fromId: number;
  type: AssociationType;
  label: string;
  ownerId: number;
}) {
  const currentUser = useCurrentUser();
  const isOwnerOrModerator = currentUser?.isModerator || currentUser?.id === ownerId;

  const { data = [], isLoading } = trpc.model.getAssociatedModelsCardData.useQuery({
    fromId,
    type,
  });

  const handleManageClick = () => {
    openContext('associateModels', { fromId, type });
  };

  return (
    <MasonryProvider columnWidth={310} maxColumnCount={4} maxSingleColumnWidth={450}>
      <MasonryContainer
        fluid
        my="xl"
        pt="xl"
        pb="xl"
        sx={(theme) => ({
          background: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
        })}
      >
        {({ columnWidth, columnCount }) => (
          <Stack pb={columnCount > 1 ? 20 : undefined}>
            <Group>
              <Title order={2}>{label}</Title>
              {isOwnerOrModerator && (
                <Button size="xs" variant="outline" onClick={handleManageClick}>
                  Manage {type} Resources
                </Button>
              )}
            </Group>
            {isLoading ? (
              <div style={{ position: 'relative', height: 310 }}>
                <LoadingOverlay visible />
              </div>
            ) : data.length ? (
              <MasonryCarousel
                data={data}
                render={ModelCategoryCard}
                height={columnWidth}
                itemId={(x) => x.id}
              />
            ) : (
              <Box
                sx={(theme) => ({
                  background:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
                  height: 310,
                })}
              >
                <Center style={{ height: '100%' }}>
                  <Text>There are no suggested resources to display</Text>
                </Center>
              </Box>
            )}
          </Stack>
        )}
      </MasonryContainer>
    </MasonryProvider>
  );
}