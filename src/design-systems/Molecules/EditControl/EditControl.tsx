import { useEffect, useRef, useState } from 'react'
import { useEditor } from '@layerhub-io/react'
import { Tooltip } from 'react-tooltip'

import { modalWrpClassName, editControlClassName, editControlWrpClassName } from './utils/class-names'

import { ShadowModal } from 'design-systems/Molecules/Modals/ShadowModal'
import { TransparencyModal } from 'design-systems/Molecules/Modals/TransparencyModal'
import { TransparencyIcon, ShadowIcon, ArrowLineUp, ArrowLineDown, DeleteIcon } from 'design-systems/Atoms/Icons'

export const EditControl: React.FC = () => {
  const editor = useEditor()

  const [showShadowModal, setShowShadowModal] = useState(false)
  const [showTransparencyModal, setShowTransparencyModal] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as HTMLElement)) {
        setShowShadowModal(false)
        setShowTransparencyModal(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [dropdownRef])

  return (
    <div className={editControlWrpClassName}>
      <div
        className={`${editControlClassName} edit_control_wrp mr-2`}
        tabIndex={0}
        onClick={() => setShowShadowModal(!showShadowModal)}
      >
        <ShadowIcon className="shadow_icon" height={20} id="tooltip-shadow" width={20} />
        <Tooltip anchorSelect="#tooltip-shadow" content="Shadow" />
      </div>
      {showShadowModal && (
        <div ref={dropdownRef}>
          <ShadowModal classNames={modalWrpClassName} handleShadowModal={() => setShowShadowModal(false)} />
        </div>
      )}
      <div
        className={editControlClassName}
        tabIndex={0}
        onClick={() => setShowTransparencyModal(!showTransparencyModal)}
      >
        <TransparencyIcon
          className="stroke-neutral-400 dark:stroke-neutral-600"
          height={20}
          id="tooltip-transparency"
          width={20}
        />
        <Tooltip anchorSelect="#tooltip-transparency" content="Transparency" />
      </div>
      {showTransparencyModal && (
        <div ref={dropdownRef}>
          <TransparencyModal
            classNames={modalWrpClassName}
            handleTransparencyModal={() => setShowTransparencyModal(false)}
          />
        </div>
      )}

      <div className={editControlClassName} tabIndex={0} onClick={() => editor.objects.sendToBack()}>
        <ArrowLineDown
          className="stroke-neutral-400 dark:stroke-neutral-600"
          height={20}
          id="tooltip-send-to-back"
          width={20}
        />
        <Tooltip anchorSelect="#tooltip-send-to-back" content="Send To Back" />
      </div>
      <div className={editControlClassName} tabIndex={0} onClick={() => editor.objects.bringToFront()}>
        <ArrowLineUp
          className="stroke-neutral-400 dark:stroke-neutral-600"
          height={20}
          id="tooltip-send-to-front"
          width={20}
        />
        <Tooltip anchorSelect="#tooltip-send-to-front" content="Send To Front" />
      </div>
      <div className={`${editControlClassName} !mr-0`} tabIndex={0} onClick={() => editor.objects.remove()}>
        <DeleteIcon height={20} id="tooltip-delete" stroke="#F35858" width={20} />
        <Tooltip anchorSelect="#tooltip-delete" content="Delete" />
      </div>
    </div>
  )
}
