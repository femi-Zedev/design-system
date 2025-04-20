import { notifications } from '@mantine/notifications';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fadeIn = (direction: string, delay: number) => {
  return {
    hidden: {
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const isActiveLink = (pathname: string, href: string, basePath: string) => {
  if (href === basePath) {
    return pathname === href; // Only match exactly `/` for the Home link
  }
  return pathname.startsWith(href); // Highlight subpaths for other links
};

export const addTrailingZero = (value: number) => {
  return value ? value.toString().padStart(2, '0') : '00';
};

export function handleCopy(id: string) {
  const sharelistUrl = `${window.location.protocol}//${window.location.host}/dashboard/shared-lists/${id}`;
  navigator.clipboard.writeText(sharelistUrl).then(
    () => {
      notifications.show({
        title: 'Link copied to clipboard',
        message: 'The link has been copied to your clipboard.',
        color: 'blue',
        autoClose: 2000,
      });
    },
    err => {
      console.error('Could not copy text: ', err);
      notifications.show({
        title: 'Failed to copy',
        message: 'Could not copy the link to clipboard.',
        color: 'red',
        autoClose: 2000,
      });
    },
  );
}

export function formatNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  } else if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (value >= 1_000) {
    return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  } else {
    return value.toString();
  }
}
