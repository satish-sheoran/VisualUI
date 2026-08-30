import { useDispatch, useSelector } from "react-redux"
import { ACCENT_COLORS, COMMON_COLORS } from "../constants/style"
import { useForm } from "react-hook-form"
import { setCurrentPage, setuserDetails } from "../store/features/systemSlice"
import { toast } from "react-toastify"

const SignUpPage = () => {

  const dispatch = useDispatch()

  const Device = useSelector(store => store.Preferences.Device)
  const Theme = useSelector((store) => store.Preferences.Theme)
  const { Speed } = useSelector(store => store.Preferences.AnimationTypeNSpeed) //animation speed
  const { Animation } = useSelector(store => store.Preferences.AnimationName) //animation name
  const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
  const { Weights } = useSelector(store => store.Preferences.Font);

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  //form submit handler
  const SubmitForm = (data) => {
    const { fullName, email, password } = data;
    localStorage.setItem('UserInfo', JSON.stringify({ userName: fullName, email, password }))
    reset();
    toast.success(`Welcome ${fullName}`)
    dispatch(setCurrentPage({ newPage: 'WorkSpacePage' }))
    dispatch(setuserDetails({ userName: fullName, email, password }))
  }

  return (
    <div className={`w-full h-full flex flex-col gap-4 items-center justify-center overflow-hidden`}>

      {/* img,Create account and txt */}
      <div className={`px-[5%] flex flex-col items-center justify-center gap-1`}>
        <img
          src="/visualUI.webp"
          alt="Visual UI"
          className={`mb-2 aspect-square ${Device !== 'Mobile' ? 'w-1/10' : 'w-[25%]'}`}
        />
        <p
          style={{
            color: Theme.primaryText,
            fontFamily: Weights.ExtraBold,
            fontSize: `${(Sizes.Regular.slice(0, -3)) * 1.3}rem`
          }}
        >Create your account</p>
        <span style={{
          color: Theme.secText,
          fontFamily: Weights.SemiBold,
          fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`
        }} className={`text-center`}>Start building beautiful <br /> interfaces today.</span>
      </div>

      {/* Email and Pass input with remember pass and forget pass feat and create account btn*/}
      <form onSubmit={handleSubmit(SubmitForm)} className={`px-[5%] flex flex-col gap-2 w-full`}>

        <div className={`relative flex flex-col gap-1`}>
          <label htmlFor="fullName"
            style={{
              color: Theme.primaryText,
              fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.8}rem`,
              fontFamily: Weights.Bold
            }}
          >Full Name</label>
          <input
            {...register('fullName', {
              required: 'User name is required',
              minLength: { value: 6, message: 'Too short' },
              maxLength: { value: 20, message: 'Too Long' },
            })}
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            style={{
              borderColor: Theme.third,
              backgroundColor: Theme.header,
              color: Theme.primaryText,
              fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
              fontFamily: Weights.Bold
            }}
            className={`px-2 py-2.5 rounded-xl border outline-0`}
          />
          {errors?.fullName?.message && <p style={{
            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red')?.CODE,
            fontFamily: Weights.Bold,
            fontSize: Sizes.Small
          }} >• {errors.fullName.message}</p>}
        </div>

        {/* mail */}
        <div className={`relative flex flex-col`}>
          <label htmlFor="email"
            style={{
              color: Theme.primaryText,
              fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.8}rem`,
              fontFamily: Weights.Bold
            }}
          >Email</label>
          <input
            {...register('email', {
              required: 'Email is required',
              minLength: { value: 4, message: 'Too short' },
            })}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            style={{
              borderColor: Theme.third,
              backgroundColor: Theme.header,
              color: Theme.primaryText,
              fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
              fontFamily: Weights.Bold
            }}
            className={` px-2 py-2.5 rounded-xl border outline-0`}
          />
          {errors?.email?.message && <p style={{
            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red')?.CODE,
            fontFamily: Weights.Bold,
            fontSize: Sizes.Small
          }} >• {errors.email.message}</p>}
        </div>


        {/* pass */}
        <div className={`relative flex flex-col`}>
          <label htmlFor="password"
            style={{
              color: Theme.primaryText,
              fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.8}rem`,
              fontFamily: Weights.Bold
            }}
          >Password</label>
          <input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Too short password' },
              maxLength: { value: 30, message: 'Too Long' },
            })}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Create a password"
            style={{
              borderColor: Theme.third,
              backgroundColor: Theme.header,
              color: Theme.primaryText,
              fontSize: `${(Sizes.Small.slice(0, -3)) * 0.95}rem`,
              fontFamily: Weights.Bold
            }}
            className={`px-2 py-2.5 rounded-xl border outline-0`}
          />
          {errors?.password?.message && <p style={{
            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Red')?.CODE,
            fontFamily: Weights.Bold,
            fontSize: Sizes.Small
          }}>• {errors.password.message}</p>}
        </div>


        <button
          type="submit"
          style={{
            borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').Bg_Clr,
            backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE,
            color: COMMON_COLORS.White,
            fontSize: `${(Sizes.Regular.slice(0, -3)) * 0.8}rem`,
            fontFamily: Weights.Bold
          }}
          className={`mt-4 border py-2 rounded-2xl active:scale-97`}
        >Create an account</button>
      </form>

      {/* Already account Login txt */}
      <div className={`px-[5%] flex items-center gap-2`}>
        <span style={{
          color: Theme.secText,
          fontFamily: Weights.ExtraBold,
          fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`
        }} >Already have an account?</span>
        <a
          onClick={() => dispatch(setCurrentPage({ newPage: 'LoginPage' }))}
          style={{
            color: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Purple').CODE,
            fontFamily: Weights.ExtraBold,
            fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`
          }}
          href="#"
          className={`active:scale-97`}
        >Login</a>
      </div>

    </div>
  )
}

export default SignUpPage