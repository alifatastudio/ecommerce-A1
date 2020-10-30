import React from 'react'
import LayoutDashboard from "../../Components/LayoutDashboard"

export default function Version(){
	const versionData = [
		{
			title: "v1.0.0 Create App (complete)",
			todolist: [
				"Creating First App"
			]
		}
	]

	return (
		<LayoutDashboard title="App Version">
			<div className="w3-container">
				<h1>Versi Aplikasi Terbaru</h1>

				{versionData.map(value => (
					<React.Fragment key={value.title}>
						<div>
							<strong>{value.title}</strong>
							<ul>
								{value.todolist.map(x => (
									<li key={x}>{x}</li>
								))}
							</ul>
						</div>
						<hr/>
					</React.Fragment>
				))}
	  </div>
		</LayoutDashboard>
	)
}