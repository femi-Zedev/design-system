import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ActionIcon, Menu } from "@mantine/core";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { IoChevronForwardOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
  currentLocation?: boolean;
  active?: string;
  limit?: number;
  canNavigateBack?: boolean;
  withBorder?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  currentLocation = true,
  active,
  limit = 3,
  withBorder = true,
  canNavigateBack = false,
}) => {
  const router = useRouter();
  const currentPath = usePathname();

  // Determine which item should be highlighted
  const getHighlightedItem = (item: { label: string; href: string }) => {
    if (active) return item.label === active;
    if (currentLocation) return currentPath.includes(item.href);
    return false;
  };

  // Handle item limit and dropdown behavior
  const shouldLimit = items.length > limit;
  const firstItem = items[0];
  const lastItems = items.slice(-1 * (limit - 1));
  const middleItems = items.slice(1, -1 * (limit - 1));
  const displayedItems = shouldLimit ? [firstItem, { label: "More", href: "#more" }, ...lastItems] : items;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center">
      <ol className={cn(
        "flex items-center gap-1 rounded-xs",
        withBorder && "border border-gray-200 px-1 py-1")}>
        {displayedItems.map((item, index) => (
          <React.Fragment key={item.href}>
            {item.label === "More" ? (
              <li className="px-1">
                <Menu>
                  <Menu.Target>
                    <button className="flex items-center p-1 gap-1 rounded-sm hover:bg-gray-100">
                      <BiDotsHorizontalRounded size={16} className="text-gray-500" />
                    </button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    {middleItems.map((dropdownItem) => (
                      <Menu.Item
                        key={dropdownItem.href}
                        component="a"
                        href={dropdownItem.href}
                      >
                        {dropdownItem.label}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
              </li>
            ) : (
              <li className="px-1">
                {canNavigateBack ?
                  <button
                    onClick={() => router.back()}
                    className={cn(
                      "text-sm text-gray-600 font-medium transition-colors hover:text-brand-600",
                      getHighlightedItem(item) && "font-semibold text-brand-500"
                    )}
                  >
                    {item.label}
                  </button>
                  :
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm text-gray-600 font-medium transition-colors hover:text-brand-600",
                      getHighlightedItem(item) && "font-semibold text-brand-500"
                    )}
                  >
                    {item.label}
                  </Link>

                }
              </li>
            )}
            {index < displayedItems.length - 1 && (
              <IoChevronForwardOutline 
                size={14} 
                className="mx-1 text-gray-300"
                data-testid="chevron-separator"
              />
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;