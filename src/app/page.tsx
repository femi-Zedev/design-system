'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Avatar, Button } from '@mantine/core';
import { useDrawerContext } from '@/providers/DrawerProvider';
import { useModalContext } from '@/providers/ModalProvider';

export default function Home() {
  const router = useRouter();
  const { openDrawer } = useDrawerContext();
  const { openModal } = useModalContext();

  useEffect(() => {
    // Redirect to design system page
    router.push('/design-system');
  }, [router]);

  const handleOpenDrawer = () => {
    openDrawer({
      title: 'Example Drawer',
      body: (
        <div className="space-y-4">
          <p className="text-gray-700">This is an example drawer using the DrawerProvider.</p>
          <Button variant="filled">Action Button</Button>
        </div>
      ),
      key: 'example-drawer',
    });
  };

  const handleOpenModal = () => {
    openModal({
      title: 'Example Modal',
      subtitle: 'This demonstrates the modal functionality',
      body: (
        <div className="p-6 space-y-4">
          <p className="text-gray-700">This is an example modal using the ModalProvider.</p>
          <div className="flex justify-end">
            <Button variant="filled">Confirm</Button>
          </div>
        </div>
      ),
      withCloseButton: true,
    });
  };

  // Return a loading state or empty div since we're redirecting
  return <div className="min-h-screen flex items-center justify-center">Redirecting to design system...</div>;
}
