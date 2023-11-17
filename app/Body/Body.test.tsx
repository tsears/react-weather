import * as React from 'react'
import { create, act, ReactTestRenderer }  from 'react-test-renderer'
import { Body } from './Body'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ response: 'test' }),
    ok: true,
    status: 200,
  })
) as jest.Mock


beforeEach(() => { (fetch as jest.Mock).mockClear() })

describe('Body Component', () => {
  it('Renders correctly', async () => {
    let tree: ReactTestRenderer

    await act(() => {
      tree = create(<Body></Body>)
    })

    expect((tree).toJSON()).toMatchSnapshot()
  })
})
