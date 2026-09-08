export function getTimeAgo(timeStamp) {

    const stampGap = Date.now() - timeStamp;
    const sec = Math.floor(stampGap / 1000)
    const min = Math.floor(sec / 60)
    const hr = Math.floor(min / 60)
    const day = Math.floor(hr / 24)

    if (sec < 60) return 'Updated Few seconds ago'
    if (min < 60) return `Updated ${min} ${min === 1 ? 'min' : 'mins'} ago`
    if (hr < 24) return `Updated ${hr} ${hr === 1 ? 'hr' : 'hrs'} ago`
    return `Updated ${day} ${day === 1 ? 'day' : 'days'} ago`

} //fn returns how much time before thing is updated (1 min ago) as per providen timeStamp
