// styles
import './userProfile.scss'

// types
import { MouseEvent, ReactElement } from 'react'

// hooks
import { useState } from 'react'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../API/redux/store/store.ts'
import { updateProfile, getProfile } from '../../API/redux/reducers/userSlice'

export default function UserProfile(): ReactElement {
  const { token, profile } = useSelector((state: RootState) => state.user)

  const [isEditingName, setIsEditingName] = useState(false)
  const [firstName, setFirstName] = useState(profile?.firstName)
  const [lastName, setLastName] = useState(profile?.lastName)

  const dispatch: AppDispatch = useDispatch<AppDispatch>()

  const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    const updatedProfile = {
      token: token!,
      firstName: firstName!,
      lastName: lastName!,
    }

    await dispatch(updateProfile(updatedProfile))
    await dispatch(getProfile({ token: token! }))

    setIsEditingName(false)
  }

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
                    <input
                      type={'text'}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={profile!.firstName}
                    />
                    <input
                      type={'text'}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={profile!.lastName}
                    />
                  </div>
                  <div className={'profileFormBtnWrapper'}>
                    <button onClick={handleSubmit}>Save</button>
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
