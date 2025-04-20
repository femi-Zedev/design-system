import React, { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonNeutralProps = ButtonHTMLAttributes<any> & {
  leftSection?: ReactNode,
  rightSection?: ReactNode
}

export default function ButtonNeutral({ onClick, leftSection, rightSection, ...props }: ButtonNeutralProps) {

  return (
    <button {...props} className='py-2 px-3 text-sm font-semibold rounded-md border border-gray-300 flex gap-2 items-center text-slate-700' >
      {leftSection}
      <>{props.children}</>
      {rightSection}
    </button>
  )
}
