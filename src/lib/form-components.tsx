
import { FiEyeOff } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { Box, CheckIcon, Text } from '@mantine/core'
import { IoMdClose } from 'react-icons/io';



export const VisibilityToggleIcon = ({ reveal }: { reveal: boolean }) =>
  reveal ? (
    <FiEye style={{ color: 'var(--color-gray-700)', width: 'var( --font-size-text-lg)', height: 'var(--font-size-text-lg)' }} />
  ) : (
    <FiEyeOff style={{ color: 'var(--color-gray-700)', width: 'var(--font-size-text-lg)', height: 'var( --font-size-text-lg)' }} />
  );

export function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
      <Text
        c={meets ? 'teal' : 'red'}
        style={{ display: 'flex', alignItems: 'center' }}
        mt={7}
        size="sm"
      >
        {meets ? (
          <CheckIcon size={20} />
        ) : (
          <IoMdClose size={20} />
        )}{' '}
        <Box ml={10}>{label}</Box>
      </Text>
    );
  }