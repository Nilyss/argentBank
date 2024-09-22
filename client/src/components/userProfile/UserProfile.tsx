// styles
import './userProfile.scss'

// types
import { ReactElement } from 'react'

// hooks
import { useState } from 'react'

// redux
import { useSelector } from 'react-redux'
import { RootState } from '../../API/redux/store/store.ts'

export default function UserProfile(): ReactElement {
  const { profile } = useSelector((state: RootState) => state.user)

  const [isEditingName, setIsEditingName] = useState(false)

  return (
    <>
      {profile && (
        <section id={'userProfile'}>
          <h2>Welcome back</h2>
          <div className={'profileWrapper'}>
            <>
              {isEditingName ? (
                <form>
                  <div className={'inputWrapper'}>
                    <input type={'text'} placeholder={profile!.firstName} />
                    <input type={'text'} placeholder={profile!.lastName} />
                  </div>
                  <div className={'profileFormBtnWrapper'}>
                    <button>Save</button>
                    <button onClick={() => setIsEditingName(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <p className={'profileUserName'}>
                  {profile!.firstName} {profile!.lastName}!
                </p>
              )}
            </>
          </div>

          {!isEditingName && (
            <>
              <button
                className={'editButton'}
                onClick={() => {
                  setIsEditingName(true)
                }}
              >
                Edit Name
              </button>
            </>
          )}
        </section>
      )}
    </>
  )
}
