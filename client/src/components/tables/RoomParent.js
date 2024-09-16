import React from 'react'
import NewRoom from './NewRoom'

export default function RoomParent() {
  return (
    <div className="responsive-box">
            <div className="sRoomExit"><button type="button" class="btn-close" aria-label="Close"></button></div>
            <NewRoom />
    </div>
  )
}
