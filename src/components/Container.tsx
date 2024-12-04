import { cn } from '@/utils/cn'
import React from 'react'

export default function Container(props: React.HTMLProps<HTMLDivElement>){
  return (
    <div
    {...props}
    className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', props.className)}
    />
  )
}
