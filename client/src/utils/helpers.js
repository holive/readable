import React from 'react'

export function dateBeauty(timestamp) {
   const date = new Date(timestamp)
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
   const dateBeauty = ` ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
   return dateBeauty
}

export function voteBeauty(voteScore) {
   const voteBeauty = voteScore > 0 ? `+${voteScore}` : <span className="negative">{voteScore}</span>
   return voteBeauty
}