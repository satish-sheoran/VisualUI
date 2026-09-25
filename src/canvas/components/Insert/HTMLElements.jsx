import React from 'react'
import { useSelector } from 'react-redux';

const HTMLElements = () => {

    const { Sizes } = useSelector(store => store.Preferences.FontSize) //font sizes
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme)


    return (
        <div
            style={{
                borderColor: Theme.third
            }}
            className={`border-t relative w-full grow overflow-x-hidden overflow-y-auto flex flex-col pt-[5%]`}>


            HTMLElements
            Adding soon...
            </div>
    )
}

export default HTMLElements