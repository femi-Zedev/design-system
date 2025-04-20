'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { addTrailingZero, cn } from '@/lib/utils';

// https://buildui.com/recipes/animated-tabs

type TabItem = string | { label: string; count: number };

interface TabsProps {
  tabs: TabItem[];
  default_active: string;
  onChange?: (tab: string) => void;
  className?: string;
  activeTabClassName?: string;
  activeLabelClassName?: string;
  tabClassName?: string;
  labelClassName?: string;
  id?: string;
}

export const Tabs = ({
  tabs,
  default_active,
  onChange,
  className,
  activeTabClassName,
  tabClassName,
  activeLabelClassName,
  labelClassName,
  id,
}: TabsProps) => {
  const [activeTab, setActiveTab] = useState(default_active);
  const instanceId = id || Math.random().toString(36).substring(2, 9);

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    onChange?.(tab);
  }

  function getTabLabel(tab: TabItem): string {
    return typeof tab === 'string' ? tab : tab.label;
  }

  function getTabCount(tab: TabItem): number | undefined {
    return typeof tab === 'object' ? tab.count : undefined;
  }

  return (
    <div
      className={cn(
        'flex gap-1 rounded-sm border border-gray-100 p-0.5 min-w-fit bg-white',
        className,
      )}
    >
      {tabs.map(tab => {
        const label = getTabLabel(tab);
        const count = getTabCount(tab);

        return (
          <button
            key={label}
            onClick={() => handleTabChange(label)}
            className={`
              relative rounded-sm px-2 py-1.5 text-sm font-semibold focus:border-none transition focus:outline-none focus-visible:outline-none`}
            style={{
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {activeTab === label && (
              <motion.div
                layoutId={`bubble-${instanceId}`}
                className={cn('absolute inset-px z-10 bg-brand-50', activeTabClassName)}
                style={{ borderRadius: 6 }}
                transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
              />
            )}
            <div className='flex items-center gap-2'>
              <p
                className={`relative z-50 hover:text-brand-400 ${
                  activeTab === label
                    ? 'text-brand-500 ' + activeLabelClassName
                    : 'text-slate-500 ' + labelClassName
                }`}
              >
                {label}
              </p>
              {count !== undefined && (
                <span
                  className={cn(
                    'relative z-50 text-sm rounded-full py-0.5 px-2 border',
                    activeTab === label
                      ? 'bg-white border-brand-200 text-gray-500'
                      : 'bg-gray-25 border-gray-200 text-gray-600',
                  )}
                >
                  {addTrailingZero(count)}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export function TabsWithIcons({
  tabs,
  default_active,
  onChange,
  id,
}: {
  tabs: { label: string; icon: React.ReactNode }[];
  default_active?: string;
  onChange?: (tab: string) => void;
  id?: string;
}) {
  const [activeTab, setActiveTab] = useState(default_active);
  const instanceId = id || Math.random().toString(36).substring(2, 9);

  useEffect(() => {
    setActiveTab(default_active);
  }, [default_active]);

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    onChange?.(tab);
  }

  return (
    <div className='flex rounded-md border border-violet-100 radius-md bg-white min-w-fit'>
      {tabs.map(({ label, icon }, index) => (
        <button
          onChange={() => onChange?.(label)}
          key={label}
          onClick={() => handleTabChange(label)}
          style={{
            WebkitTapHighlightColor: 'transparent',
          }}
          className='relative py-2 px-3 border-r border-slate-200 last:border-r-0 focus:outline-none focus-visible:outline-none'
        >
          {
            // @ts-expect-error   Argument of type 'ReactNode' is not assignable to parameter of type 'ReactElement<any, string | JSXElementConstructor<any>>'
            React.cloneElement(icon, {
              className: cn(
                'shrink-0 relative z-50',
                activeTab == label ? 'stroke-brand-500 ' : 'stroke-slate-800',
              ),
            })
          }
          {activeTab === label && (
            <motion.div
              layoutId={`bubble-${instanceId}`}
              className={cn(
                'absolute inset-0 z-10 bg-brand-50',
                index == 0 && 'rounded-l-md',
                index == tabs.length - 1 && 'rounded-r-md',
              )}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.6 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
