'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ThemeSwitch(props: { classes?: string }) {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <button className={'fixed'}></button>

  if (resolvedTheme === 'dark') {
    return (
      <SunIcon
        className={props.classes}
        color={'#fff'}
        onClick={() => setTheme('light')}
      />
    )
  }

  if (resolvedTheme === 'light') {
    return (
      <MoonIcon
        className={props.classes}
        onClick={() => setTheme('dark')}
      />
    )
  }
}
