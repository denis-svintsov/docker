import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"


function AddEntry() {
	const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [date, setDate] = useState("");
	const navigate = useNavigate();

	function addEntry() {
		if (name && lastName && phone && date) {
			fetch('http://localhost:8080/entries/add', {
				method: 'POST',
				body: JSON.stringify({
					"name": name,
					"last_name": lastName,
					"phone": phone,
					"date": date
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then((data) => {
					if (data.status == 200) {
						window.location.replace("../../success");
					}
					else {
						window.location.replace("../../error");
					}
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}

	return (
		<>
			<Header />
			<div className="page">
				<main className="page-elements">
					<Link to={"../"}>
						<div className='btn btn-primary btn-block mb-4'>Назад</div>
					</Link>
					<form>
						<div className="form-group mt-4">
							<label for="exampleInputEmail1">Фамилия</label>
							<input value={lastName} onChange={(e) => { setLastName(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Фамилия" />
						</div>
						<div className="form-group mt-4">
							<label for="exampleInputPassword1">Имя</label>
							<input value={name} onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" id="exampleInputPassword1" placeholder="Имя" />
						</div>
						<div className="form-group mt-4">
							<label for="exampleInputMemory1">Телефон</label>
							<input value={phone} onChange={(e) => { setPhone(e.target.value) }} type="text" className="form-control" id="exampleInputMemory1" aria-describedby="emailHelp" placeholder="Телефон" />
						</div>
						<div className="form-group mt-4">
							<label for="exampleInputSsd1">Дата</label>
							<input value={date} onChange={(e) => { setDate(e.target.value) }} type="text" className="form-control" id="exampleInputSsd1" placeholder="Дата" />
						</div>
						<Link onClick={() => addEntry()} className="btn btn-primary mt-4">Добавить</Link>
					</form>
				</main>
			</div>
		</>
	)
}

export default AddEntry
