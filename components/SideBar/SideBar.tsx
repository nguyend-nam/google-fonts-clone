import cx from 'classnames'
import { sortStylesList } from 'constants/sortstyleslist'
import { generatelink } from 'constants/generatelink'
import { generatecss } from 'constants/generatecss'

interface SideBarProps {
  sideBar: boolean
  stylesList: string[]
  handleRemoveStyle: (index: number) => void
}

export function SideBar(props: SideBarProps) {
  const { sideBar, stylesList, handleRemoveStyle } = props
  return (
    <aside
      className={cx(
        'sticky top-0 h-screen bg-white ease-in-out duration-300 shadow-xl',
        {
          'min-w-[320px] w-[320px] block': sideBar,
          'w-0 hidden': !sideBar,
        }
      )}
    >
      <h3 className="bg-white h-[65px] sticky top-0 flex items-center px-4 border-b border-gray-300">
        Selected families
      </h3>
      <div className="p-4 max-h-80 overflow-auto">
        <h4 className="text-sm mb-5 font-semibold">
          {stylesList.length !== 0 ? 'Review' : 'No families selected'}
        </h4>
        {stylesList.sort(sortStylesList).map((element, index) => {
          return (
            <button
              key={index}
              onClick={() => handleRemoveStyle(index)}
              className={cx(
                'text-left p-2.5 px-6 text-lg text-blue-600 w-full border-x border-gray-300 disabled:text-gray-200 hover:bg-gray-50',
                {
                  'mb-1 border-b border-gray-300':
                    (index < stylesList.sort(sortStylesList).length - 1 &&
                      stylesList.sort(sortStylesList)[index].split(' ')[0] !==
                        stylesList
                          .sort(sortStylesList)
                          [index + 1].split(' ')[0]) ||
                    index === stylesList.sort(sortStylesList).length - 1,
                  'mb-0': !(
                    (index < stylesList.sort(sortStylesList).length - 1 &&
                      stylesList.sort(sortStylesList)[index].split(' ')[0] !==
                        stylesList
                          .sort(sortStylesList)
                          [index + 1].split(' ')[0]) ||
                    index === stylesList.sort(sortStylesList).length - 1
                  ),
                },
                {
                  'mt-1 border-t border-gray-300':
                    (index > 0 &&
                      stylesList.sort(sortStylesList)[index].split(' ')[0] !==
                        stylesList
                          .sort(sortStylesList)
                          [index - 1].split(' ')[0]) ||
                    index === 0,
                  'mt-0': !(
                    (index > 0 &&
                      stylesList.sort(sortStylesList)[index].split(' ')[0] !==
                        stylesList
                          .sort(sortStylesList)
                          [index - 1].split(' ')[0]) ||
                    index == 0
                  ),
                }
              )}
            >
              {element.split(' ').slice(0, -1).join(' ')}
            </button>
          )
        })}
      </div>
      <div
        className={cx('p-4 max-h-96 overflow-auto', {
          hidden: stylesList.sort(sortStylesList).length === 0,
          '': !(stylesList.sort(sortStylesList).length === 0),
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
            <b>{generatelink(stylesList.sort(sortStylesList))}</b>
            display=swap&quot; rel=&quot;stylesheet&quot;&gt;
          </pre>
        </code>
        <p className="text-sm mb-4">CSS rules to specify families</p>
        <code className="break-all">
          <pre className="whitespace-pre-wrap text-xs bg-gray-100 p-2 mb-8">
            {generatecss(stylesList.sort(sortStylesList)).map((family) => (
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
