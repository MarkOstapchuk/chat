'use client'

import debounce from 'lodash.debounce'
import React, { useState } from 'react'

import AllUsers from '@/components/UI/AddDialog/AllUsers'
import Wrapper from '@/components/Wrapper'

const addDialog = () => {
  const [state, setState] = useState(0)
  const [usernameInput, setUsernameInput] = useState('')

  const debounceOnChange = debounce((value) => setUsernameInput(value), 400)
  return (
    <div>
      <h1
        className={
          'p-2 border-b-2 border-border text-xl font-medium dark:text-text-dark dark:border-none'
        }
      >
        AddDialog
      </h1>
      <div
        className={
          ' border-b-2 border-border dark:border-b-1 dark:border-bg-dark-secondary'
        }
      >
        <div className={'flex p-4 text-gray-600'}>
          <Wrapper>
            <button
              onClick={() => {
                setState(0)
                setUsernameInput('')
              }}
            >
              All users
            </button>
          </Wrapper>

          <Wrapper className={'ml-5'}>
            <button
              className={''}
              onClick={() => setState(1)}
            >
              Search user
            </button>
          </Wrapper>
        </div>
        {state ? (
          <input
            onChange={(e) => {
              debounceOnChange(e.target.value)
            }}
            type='text'
            placeholder={'Username'}
            className={
              'dark:text-text-dark appearance-none m-4 block border rounded py-2 px-3 text-gray-700' +
              ' leading-tight focus:outline-none focus:border-blue-500 text-xs'
            }
          />
        ) : (
          <div></div>
        )}
      </div>
      <AllUsers
        username={usernameInput}
        type={state ? 'search' : 'all'}
      />
    </div>
  )
}

export default addDialog
