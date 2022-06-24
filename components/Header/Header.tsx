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
  const logoStyle = {
    fontFamily: 'Futura',
    fontWeight: 400,
  }
  const fontsStyle = {
    fontFamily: 'Avenir',
    fontWeight: 100,
  }

  return (
    <header className="grow p-2 px-4 sm:px-14 border border-t-0 border-x-0 border-b-1 border-b-gray-300 flex justify-between items-center">
      <button
        className="flex items-center"
        onClick={() => {
          push(`/`)
        }}
      >
        <Image
          src="/Google-Fonts-Logo.png"
          alt="Google fonts logo"
          width={45}
          height={25}
        />
        <h1 className="text-gray-600 font-light text-[22px] ml-2">
          <span className="font-medium" style={logoStyle}>
            Google
          </span>{' '}
          <span className="font-medium" style={fontsStyle}>
            Fonts
          </span>
        </h1>
      </button>
      <nav className="relative">
        <Button
          icon="family"
          onClick={openSideBar}
          className={cx(
            'h-12 w-12 grid items-center justify-center text-xl rounded-full bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800',
            {
              'after:content-["●"] after:absolute after:-top-1 after:right-1 after:text-[8px] after:text-red-600':
                hasStyle,
            },
            { 'text-blue-600': sideBar }
          )}
        />
      </nav>
    </header>
  )
}
