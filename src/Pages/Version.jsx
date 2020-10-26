import React from 'react'
import LayoutStore from "../Components/LayoutStore"

export default function Version(){
	const versionData = [
		{
			title: "v1.0.3 Rencana (ongoing)",
			todolist: [
				"Tambahkan fitur DILIHAT BERSAMA",
				"Tambahkan fitur BLOG FINANCE awalan",
				"Tambahkan fitur BLOG FASHION awalan",
				"Tambahkan Google Analys"
			]
		},
		{
			title: "v1.0.2 Upgrade Tampilan",
			todolist: [
				"Tambahkan fitur CRUD PRODUCT",
				"Tambahkan & rapihkan deskripsi, stock, price produk",
				"Tambahkan BANNER CATEGORY, FURNITURE",
				"Tambahkan fitur STATUS (sold out, diskon, new )"
			]
		},
		{
			title: "v1.0.1 Perbaiki Tampilan",
			todolist: [
				"Tampilan menggunakan w3css lebih sederhana dan terstruktur"
			]
		},
		{
			title: "v1.0.0 Awalan",
			todolist: [
				"tahap awal fokus sebagai fungsi untuk katalog"
			]
		}
	]

	return (
		<LayoutStore title="App Version">
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
		</LayoutStore>
	)
}