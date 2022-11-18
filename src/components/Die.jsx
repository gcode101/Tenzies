import { useState } from 'react'

function Die(props) {
	return (
		<div className="die">
			<div 
				className={props.isHeld ? "green--die" : ""}
				onClick={() => props.activeDice(props.id)} 
			>
				{props.value}
			</div>
		</div>
	)
}

export default Die;