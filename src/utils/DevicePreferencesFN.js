import { useEffect, useState } from "react";
import { setDevice } from "../store/features/DevicePreferences";
import { useDispatch } from "react-redux";

export const useUpdateDevice = () => {
    const dispatch = useDispatch()
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      function handleResize() {
        setWidth(window.innerWidth);
      }

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [])

    useEffect(() => {
      dispatch(setDevice({ width: width }))
    }, [width])

  }