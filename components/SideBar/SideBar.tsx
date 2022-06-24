import cx from 'classnames'
import { Button } from 'components/Button'
import { sortStylesList } from 'utils/sort-styles-list'
import { generateLink } from 'utils/generate-link'
import { generateCSS } from 'utils/generate-css'
import { generateVariantTitle } from 'utils/generate-variant-title'
import { getFontFamily } from 'utils/get-font-family'

interface SideBarProps {
  sideBar: boolean
  stylesList: string[]
  handleRemoveStyle: (index: number) => void
  openSideBar: () => void
}

export function SideBar(props: SideBarProps) {
  const { sideBar, stylesList, handleRemoveStyle, openSideBar } = props

  return (
    <aside
      className={cx(
        'z-10 fixed right-0 sm:sticky top-0 h-screen bg-white ease-in-out duration-300 shadow-xl',
        {
          'min-w-[320px] w-[320px] block': sideBar,
          'w-0 hidden': !sideBar,
        }
      )}
    >
      <div className="bg-white h-[65px] flex justify-between items-center px-4 border-b border-gray-300">
        <h3>Selected families</h3>
        <Button
          icon="cross"
          onClick={openSideBar}
          className={cx(
            'h-12 w-12 grid items-center justify-center text-xl rounded-full bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-800'
          )}
        />
      </div>
      {stylesList.length !== 0 ? (
        <div className="p-4 max-h-[40%] overflow-auto border-b border-gray-300">
          <h4
            className={cx('text-sm mb-5 font-semibold', {
              'text-center': stylesList.length === 0,
            })}
          >
            Review
          </h4>

          {stylesList.sort(sortStylesList).map((element, index) => {
            const isEndOfStyle = (index: number) =>
              getFontFamily(stylesList.sort(sortStylesList)[index]) !==
              getFontFamily(stylesList.sort(sortStylesList)[index + 1])
            const isStartOfStyle = (index: number) =>
              getFontFamily(stylesList.sort(sortStylesList)[index]) !==
              getFontFamily(stylesList.sort(sortStylesList)[index - 1])
            return (
              <div
                key={element}
                className={cx(
                  'grid grid-cols-[minmax(0,_1fr)_36px] justify-between items-center p-2 px-5 border-x border-gray-300',
                  {
                    'mb-2 border-b':
                      (index < stylesList.sort(sortStylesList).length - 1 &&
                        isEndOfStyle(index)) ||
                      index === stylesList.sort(sortStylesList).length - 1,
                  },
                  {
                    'mt-2 border-t':
                      (index > 0 && isStartOfStyle(index)) || index === 0,
                  }
                )}
              >
                <span className="text-gray-600">
                  {generateVariantTitle(element)}
                </span>
                <button
                  onClick={() => handleRemoveStyle(index)}
                  className={cx(
                    'grid justify-center items-center h-9 w-9 rounded-full text-md text-gray-500 hover:text-blue-700 hover:bg-gray-50'
                  )}
                >
                  <span className="material-symbols-sharp">remove_circle</span>
                </button>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="h-[90%] flex flex-col justify-center text-center">
          <span className="text-4xl mb-4">¯\_(ツ)_/¯</span>
          <span className="text-lg">You don&rsquo;t have any fonts yet.</span>
          <span className="text-lg">Choose a font to get started.</span>
        </div>
      )}
      <div
        className={cx('p-4 max-h-[50%] overflow-auto', {
          hidden: stylesList.sort(sortStylesList).length === 0,
        })}
      >
        <h4 className="text-sm mb-5 font-semibold">Use on the web</h4>
        <p className="text-sm mb-4">
          To embed a font, copy the code into the{' '}
          <code className="text-xs">&lt;head&gt;</code> of your html
        </p>
        <code className="break-all">
          <pre className="whitespace-pre-wrap text-xs bg-gray-100 p-2 mb-8">
            &lt;link rel=&quot;preconnect&quot;
            href=&quot;https://fonts.googleapis.com&quot;&gt;
            <br />
            &lt;link rel=&quot;preconnect&quot;
            href=&quot;https://fonts.gstatic.com&quot; crossorigin&gt;
            <br />
            &lt;link href=&quot;https://fonts.googleapis.com/css2?
            <b>{generateLink(stylesList.sort(sortStylesList))}</b>
            display=swap&quot; rel=&quot;stylesheet&quot;&gt;
          </pre>
        </code>
        <p className="text-sm mb-4">CSS rules to specify families</p>
        <code className="break-all">
          <pre className="whitespace-pre-wrap text-xs bg-gray-100 p-2 mb-8">
            {generateCSS(stylesList.sort(sortStylesList)).map((family) => (
              <pre className="whitespace-pre-wrap break-all" key={family}>
                font-family: {family};
              </pre>
            ))}
          </pre>
        </code>
      </div>
    </aside>
  )
}
