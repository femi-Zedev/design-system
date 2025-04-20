import { cn } from '@/lib/utils';
import { Flex, Indicator, Menu } from '@mantine/core';
import { CheckCheckIcon } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';
import React, { ReactNode, useState } from 'react';
import { BsThreeDots, BsThreeDotsVertical } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { MdVerified } from 'react-icons/md';

export interface Notification {
  avatar: string;
  name: string;
  title?: string;
  isVerified?: boolean;
  time: any;
  message: ReactNode;
  isOnline?: boolean;
  additionalSection?: ReactNode;
  className?: string;
  onClick?: (chatId: string) => void;
}
export default function NotificationItem({
  avatar,
  message,
  name,
  title,
  time,
  isOnline,
  isVerified,
  additionalSection,
  className,
  onClick,
}: Notification) {
  const [menuVisible, setMenuVisible] = useState(false);

  function handleClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.stopPropagation();
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 last:border-b-0 border-b border-slate-100 py-4 px-3 rounded-md hover:bg-slate-50',
        className,
      )}
      onClick={event => {
        event.stopPropagation(); // Prevent click propagation to parent elements
        onClick?.('');
      }}
      onMouseEnter={() => setMenuVisible(true)}
      onMouseLeave={() => setMenuVisible(false)}
    >
      <div className='relative w-[48px] h-[48px] min-w-[48px] min-h-[48px]'>
        <Image
          src={avatar}
          alt={name}
          layout='fill'
          className='rounded-full object-cover'
        />
      </div>

      <div className='flex-1'>
        <div className='flex items-center gap-1'>
          <Flex
            gap={4}
            align='center'
          >
            <h4 className='text-sm font-semibold truncate'>{name}</h4>
            {isVerified && (
              <MdVerified
                size={20}
                className='text-blue-500'
              />
            )}
          </Flex>
          {!menuVisible && (
            <p className='ml-4 text-xs text-gray-500'>{format(time, 'h:mm a MMM dd, yyyy')}</p>
          )}
        </div>
        <hgroup className='space-y-2'>
          <div className='text-sm text-gray-600'>{title}</div>

          <div className='text-sm text-gray-600 line-clamp-4'>{message}</div>
        </hgroup>

        <div className='mt-3'>{additionalSection}</div>
      </div>

      <div
        className='stop-propagation'
        onClick={event => handleClick(event)}
      >
        {menuVisible ? (
          <Menu
            radius='md'
            offset={12}
            position='bottom-end'
            width={160}
          >
            <Menu.Target>
              <button className='flex items-center p-1 gap-1 rounded-sm hover:bg-gray-100'>
                <BsThreeDots
                  size={20}
                  className='text-gray-400'
                />
              </button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <CheckCheckIcon
                    size={16}
                    className='text-gray-500'
                  />
                }
                onClick={() => {}}
              >
                Mark as read
              </Menu.Item>
              <Menu.Item
                color='red'
                leftSection={
                  <FiTrash2
                    size={16}
                    className='text-error-500'
                  />
                }
                onClick={() => {}}
              >
                Remove
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <>
            {isOnline && (
              <Indicator
                className='mt-2 mr-4'
                processing
                color='teal'
                size={10}
              ></Indicator>
            )}{' '}
            {isOnline && (
              <Indicator
                className='mt-2 mr-4'
                processing
                color='teal'
                size={10}
              ></Indicator>
            )}
          </>
        )}
      </div>
    </div>
  );
}
