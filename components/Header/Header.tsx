import Image from 'next/image'
import { Button } from 'components/Button'
import cx from 'classnames'
import { useRouter } from 'next/router'

interface HeaderProps {
  sideBar: boolean
  openSideBar?: () => void
  hasStyle: boolean
}

export function Header(props: HeaderProps) {
  const { push } = useRouter()
  const { sideBar, openSideBar, hasStyle } = props

  return (
    <header className="grow p-2 px-4 sm:px-14 border border-t-0 border-x-0 border-b-1 border-b-gray-300 flex justify-between items-center">
      <button
        className="ml-2 flex items-center"
        onClick={() => {
          push(`/`)
        }}
      >
        <Image
          src="/Google_Fonts_Logo.svg.png"
          alt="Google fonts logo"
          width={179}
          height={26}
        />
      </button>
      <nav className="relative">
        <Button
          icon="family"
          onClick={openSideBar}
          className={cx(
            'h-12 w-12 grid items-center justify-center text-xl rounded-full bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800',
            {
              'after:content-["●"] after:absolute after:-top-0.5 after:right-1.5 after:text-[8px] after:text-red-600':
                hasStyle,
            },
            { 'text-blue-600': sideBar }
          )}
        />
      </nav>
    </header>
  )
}
