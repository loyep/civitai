import { Button, ButtonProps } from '@mantine/core';
import { TablerIconProps, IconBrandDiscord, IconBrandGithub, IconBrandGoogle } from '@tabler/icons';
import { BuiltInProviderType } from 'next-auth/providers';

type SocialProps = Partial<
  Record<
    BuiltInProviderType,
    {
      label?: React.ReactNode;
      Icon?: React.FunctionComponent<TablerIconProps>;
      Button?: React.FunctionComponent<ButtonProps>;
    }
  >
>;

export const socialItems: SocialProps = {
  discord: {
    label: 'Discord',
    Icon: IconBrandDiscord,
    Button: DiscordButton,
  },
  github: {
    label: 'GitHub',
    Icon: IconBrandGithub,
    Button: GitHubButton,
  },
  google: {
    label: 'Google',
    Icon: IconBrandGoogle,
    Button: GoogleButton,
  },
};

const discordColor = '#5865F2';
const googleColor = '#4285F4';

export function DiscordButton(props: ButtonProps) {
  return (
    <Button
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? discordColor : discordColor,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.lighten(discordColor, 0.05)
              : theme.fn.darken(discordColor, 0.05),
        },
      })}
      {...props}
    />
  );
}

export function GitHubButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      sx={(theme) => {
        const backgroundColor = theme.colors.dark?.[theme.colorScheme === 'dark' ? 9 : 6];

        return {
          backgroundColor,
          color: '#fff',
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.fn.lighten(backgroundColor, 0.02)
                : theme.fn.lighten(backgroundColor, 0.05),
          },
        };
      }}
    />
  );
}

export function GoogleButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? googleColor : googleColor,
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.lighten(googleColor, 0.05)
              : theme.fn.darken(googleColor, 0.05),
        },
      })}
    />
  );
}