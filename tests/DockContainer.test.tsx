import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { DockContainer } from '../src'

describe('<DockContainer />', () => {
  it('calls onCloseDock callback', async () => {
    const onCloseDock = jest.fn()

    const res = render(
      <DockContainer onCloseDock={onCloseDock}>Content</DockContainer>,
    )

    const closeBtn = await res.getByRole('button')
    userEvent.click(closeBtn)

    expect(onCloseDock).toHaveBeenCalledTimes(1)
  })

  it('renders custom close icon', () => {
    const CloseIcon = <span>Close</span>

    const res = render(
      <DockContainer CloseIcon={CloseIcon}>Content</DockContainer>,
    )

    res.getByText('Close')
  })

  it('renders children', () => {
    const res = render(
      <DockContainer>
        <p>Children</p>
      </DockContainer>,
    )

    res.getByText('Children')
  })
})
