import Button from '@/components/ui/Button'
import React from 'react'

function BurgerIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      aria-label='Открыть меню'
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        padding: 8,
        margin: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
        <rect y='6' width='28' height='3' rx='1.5' fill='#b1913a' />
        <rect y='13' width='28' height='3' rx='1.5' fill='#b1913a' />
        <rect y='20' width='28' height='3' rx='1.5' fill='#b1913a' />
      </svg>
    </button>
  )
}

function PlusIcon({ onClick }: { onClick: () => void }) {
  return (
    <button
      aria-label='Создать список'
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        padding: 8,
        margin: 0,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
        <rect x='12' y='4' width='4' height='20' rx='2' fill='#b1913a' />
        <rect x='4' y='12' width='20' height='4' rx='2' fill='#b1913a' />
      </svg>
    </button>
  )
}

function ThemeToggle() {
  const [dark, setDark] = React.useState(false)
  React.useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') {
      document.documentElement.classList.add('dark')
      setDark(true)
    } else {
      document.documentElement.classList.remove('dark')
      setDark(false)
    }
  }, [])
  const toggle = () => {
    setDark(d => {
      const next = !d
      if (next) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
      return next
    })
  }
  return (
    <button
      onClick={toggle}
      className='ml-2 p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition'
      aria-label='Переключить тему'
    >
      {dark ? (
        <svg width='22' height='22' fill='none' viewBox='0 0 24 24'>
          <path
            d='M17.657 16.243A8 8 0 0 1 7.757 6.343 8.001 8.001 0 1 0 17.657 16.243Z'
            stroke='#eab308'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      ) : (
        <svg width='22' height='22' fill='none' viewBox='0 0 24 24'>
          <circle cx='12' cy='12' r='5' stroke='#eab308' strokeWidth='2' />
          <path
            d='M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'
            stroke='#eab308'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      )}
    </button>
  )
}

interface HeaderProps {
  onToggleSidebar: () => void
  onShowCreateList: () => void
  isLoggedIn: boolean
  onLoginToggle: () => void
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onShowCreateList, isLoggedIn, onLoginToggle }) => {
  return (
    <header className='fixed top-0 left-0 w-full h-14 bg-white dark:bg-neutral-900 shadow z-30 flex items-center justify-between px-2 md:px-8'>
      <BurgerIcon onClick={onToggleSidebar} />
      <div className='flex items-center gap-2'>
        <ThemeToggle />
        <PlusIcon onClick={onShowCreateList} />
        {isLoggedIn ? <Button onClick={onLoginToggle}>Выйти</Button> : <Button onClick={onLoginToggle}>Войти</Button>}
      </div>
    </header>
  )
}

export default Header
