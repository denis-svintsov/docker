import { Link } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"
import useDebounce from '../hooks/useDebounce';
import axios from 'axios'


function Entries() {
	const [entries, setEntries] = useState();
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	function searchEntries(lastName) {
		return axios.get('http://localhost:8080/entries/search', { params: { lastName: lastName } });
	}

	function deleteEntry(entry) {
		fetch('http://localhost:8080/entries/delete', {
			method: 'POST',
			body: JSON.stringify(entry),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
			.then(() => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err.message);
			});
	}

	useEffect(
		() => {
			if (debouncedSearchTerm) {
				searchEntries(debouncedSearchTerm).then(results => {
					setEntries(results.data);
				});
			} else {
				axios('http://localhost:8080/entries')
					.then((data) => {
						setEntries(data.data);
					})
					.catch((err) => {
						console.log(err.message);
					});
			}
		},
		[debouncedSearchTerm]
	);

	return (
		<>
			<Header />
			<div className="page">
				<main className="page-elements">
					<Link to={"../main"}>
						<div className='btn btn-primary btn-block mb-4'>Назад</div>
					</Link>
					<Link to={"./addEntry"}>
						<div className='btn btn-primary btn-block mb-4 ms-3'>Добавить заказ</div>
					</Link>
					<div className='elements-search'>
						<input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Поиск' />
					</div>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Фамилия</th>
								<th scope="col">Имя</th>
								<th scope="col">Телефон</th>
								<th scope="col">Дата</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{entries && entries.map((entry, index) => (
								<tr key={entry.id + entry.last_name}>
									<th scope="row">{index + 1}</th>
									<td>{entry.last_name}</td>
									<td>{entry.name}</td>
									<td>{entry.phone}</td>
									<td>{entry.date}</td>
									<td>
										<Link to={"update/" + entry.id}>
											<button className='btn btn-primary btn-block'>Изменить</button>
										</Link>
										<button onClick={() => deleteEntry(entry)} className='btn btn-primary btn-block ms-3'>Удалить</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</main>
			</div>
		</>
	)
}

export default Entries
