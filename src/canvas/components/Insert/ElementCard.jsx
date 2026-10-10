import { useState, useEffect } from 'react';
import * as ICONS from 'lucide-react';
import { ACCENT_COLORS, COMMON_COLORS } from '../../../constants/style';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { addElementToProject } from '../../../store/features/Canvas';

const ElementCard = ({ element, ParentBoxRef, setSelectedTag, setCanCopy, CopyTimeOutRef, PreviewRef, closeOverlay }) => {

    const dispatch = useDispatch()
    const { Sizes } = useSelector(store => store.Preferences.FontSize);
    const { Weights } = useSelector(store => store.Preferences.Font);
    const Theme = useSelector((store) => store.Preferences.Theme);
    const activeProject = useSelector((store) => store.Canvas.WorkingProject)


    const hasVariants = element?.variants?.length > 0;
    const Icon = ICONS[element.icon];

    // State initialized dynamically based on whether element has variants or not
    const [selectedElem, setSelectedElem] = useState({});

    // Reusable handler to accurately construct the canvas element payload
    const handleSelectVariant = (variant) => {
        const isInput = element.type === 'input';
        const date = new Date();
        const defaultContent = element.category === 'text' ? element.name ?? 'Default' : '';
        let uniqueCodeExists;
        let uniqueCode;

        // generating a unique code for the element to be added to the canvas and to handle future tasks like deleting or removing it
        do {
            // 1. Generate the ID
            uniqueCode = Math.random().toString(36).substring(2, 9) + date.getTime().toString(36);

            // 2. Check if it already exists in the array
            uniqueCodeExists = activeProject.elements.some(({ uniqueCode: ID }) => ID === uniqueCode);

        } while (uniqueCodeExists);

        setSelectedElem({
            uniqueCode,
            id: variant.id,
            type: element.type,
            tag: variant.tag,
            variantId: variant.id, // Track unique variant ID to safely fix border states
            content: [defaultContent,],
            attributes: variant.attributes || {},
            x: Math.round(Math.random() * 200),
            y: Math.round(Math.random() * 200),
            elements: [],
            className: uniqueCode,
            // Custom sizing tailored by element category type
            width: isInput || element.type === 'text' ? `250px` : Math.random() * 100 + 100,
            height: isInput || element.type === 'text' ? 'fit' : Math.random() * 100 + 100,
            styles: {
                borderWidth: '2px',
                borderStyle: 'solid',
                borderRadius: '10px',
                zIndex: 1,
                fontSize: Sizes.Regular,
                fontWeightName: 'Bold'
            }
        });
    };

    const handleChooseElement = (elem) => {
        // Dispatch to your canvas Redux store or call a prop function here:
        dispatch(addElementToProject({ projectId: activeProject.id, element: elem }))
        closeOverlay()
    };

    // Sync state if the active element card changes, or fallback to default variants
    useEffect(() => {
        if (hasVariants) {
            // Find the default variant object or fallback to the first variant available
            const defaultVar = element.variants.find(v => v.id === element.defaultVariant) || element.variants[0];
            handleSelectVariant(defaultVar);
        } else {
            const defaultContent = element.category === 'text' ? 'Default' : '';
            const date = new Date();
            let uniqueCodeExists;
            let uniqueCode;

            // generating a unique code for the element to be added to the canvas and to handle future tasks like deleting or removing it
            do {
                // 1. Generate the ID
                uniqueCode = Math.random().toString(36).substring(2, 9) + date.getTime().toString(36);

                // 2. Check if it already exists in the array
                uniqueCodeExists = activeProject.elements.some(({ uniqueCode: ID }) => ID === uniqueCode);

            } while (uniqueCodeExists);
            // Elements without variants (like div, nav, footer, paragraph, span)
            setSelectedElem({
                uniqueCode,
                id: element.id,
                type: element.type,
                tag: element.tag,
                variantId: null,
                attributes: {},
                content: [defaultContent,],
                x: 100,
                y: 100,
                width: element.type === 'text' ? `250px` : Math.random() * 100 + 100,
                height: element.type === 'text' ? 50 : Math.random() * 100 + 100,
                styles: {
                    border: `2px solid ${Theme.third}`,
                    borderRadius: '2px',
                    fontSize: Sizes.Regular,
                    fontWeight: 700,
                    color: Theme.primaryText,
                    zIndex: 1,
                    fontWeightName: 'Bold'
                }
            });
        }
    }, [element, Theme]);


    return (
        <div
            style={{ borderColor: Theme.third }}
            className="p-2 border rounded-2xl flex flex-col gap-4 overflow-hidden h-fit shrink-0"
        >
            {/* Header / Info Section */}
            <div className="flex items-center gap-2">
                <div className="grow h-full flex items-center justify-center">
                    {Icon && <Icon style={{ color: Theme.primaryText }} strokeWidth={2} size={35} />}
                </div>
                <div className="w-8/10 flex flex-col gap-1">
                    <h2 style={{
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1.2}rem`,
                        fontFamily: Weights.SemiBold,
                        color: Theme.primaryText
                    }} className='font-semibold'>{element.name}</h2>
                    <p style={{
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 0.9}rem`,
                        fontFamily: Weights.Regular,
                        color: Theme.secText
                    }}>{element.description}</p>
                </div>
            </div>

            {/* Variants Selector Grid */}
            {hasVariants && (
                <div
                    style={{
                        borderColor: Theme.third,
                        backgroundColor: Theme.bg
                    }}
                    className="p-2 border rounded-2xl overflow-hidden grid grid-cols-3 gap-2"
                >
                    {element.variants.map((variant) => {
                        const VariantIcon = ICONS[variant.icon];

                        // FIX: Check matching unique variant IDs instead of generic HTML tags
                        const isSelected = selectedElem.variantId === variant.id;
                        const blueAccent = ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue')?.CODE || '#0070f3';

                        return (
                            <button
                                key={variant.id}
                                onClick={() => handleSelectVariant(variant)}
                                className="border rounded-2xl flex flex-col items-center justify-center gap-1 py-0.5 active:scale-95 transition-all"
                                style={{
                                    borderColor: isSelected ? blueAccent : Theme.third,
                                    backgroundColor: Theme.header,
                                    color: Theme.primaryText
                                }}
                            >
                                {VariantIcon && <VariantIcon strokeWidth={2} size={22} />}
                                <p style={{
                                    fontSize: `${(Sizes.Small.slice(0, -3)) * 0.9}rem`,
                                    fontFamily: Weights.SemiBold,
                                    color: Theme.primaryText
                                }}>{variant.name}</p>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Choose / Action Button */}
            <div className={`flex items-center justify-center gap-2`}>
                <button
                    onClick={() => {
                        setSelectedTag(selectedElem)
                        clearTimeout(CopyTimeOutRef.current)
                        setCanCopy(true)

                        if (!PreviewRef.current) return;
                        gsap.to(PreviewRef.current, {
                            height: 'auto',
                            paddingBottom: '0.75rem',
                            paddingTop: '0.75rem',
                            duration: 0.25,
                            ease: 'sine.in',
                            // This fires exactly when the animation ends
                            onComplete: () => {
                                PreviewRef.current.scrollIntoView({ behavior: 'smooth' })
                            }
                        })
                    }
                    }
                    style={{
                        borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Slate_Gray')?.Bg_Clr,
                        backgroundColor: Theme.grayish,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                        fontFamily: Weights.SemiBold,
                        color: COMMON_COLORS.White
                    }}
                    className="w-[37%] font-semibold active:scale-95 border rounded-2xl px-2 py-1.5 cursor-pointer"
                >
                    Preview Code
                </button>
                <button
                    onClick={() => {
                        handleChooseElement(selectedElem)
                        clearTimeout(CopyTimeOutRef.current)
                        setCanCopy(true)
                        gsap.to(PreviewRef.current, {
                            height: 0,
                            paddingBottom: 0,
                            paddingTop: 0,
                            border: 'none',
                            duration: 0.25,
                            ease: 'sine.in'
                        })

                    }}
                    style={{
                        borderColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue')?.Bg_Clr,
                        backgroundColor: ACCENT_COLORS.find(({ COLOR }) => COLOR === 'Blue')?.CODE,
                        fontSize: `${(Sizes.Small.slice(0, -3)) * 1}rem`,
                        fontFamily: Weights.SemiBold,
                        color: COMMON_COLORS.White
                    }}
                    className="w-[37%] font-semibold active:scale-95 border rounded-2xl px-2 py-1.5 cursor-pointer"
                >
                    Choose
                </button>
            </div>
        </div >
    );
};

export default ElementCard;
