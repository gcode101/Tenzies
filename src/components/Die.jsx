import { useState } from 'react'

function Die(props) {
	return (
		<div className="die">
			<div>{props.value}</div>
		</div>
	)
}

export default Die;