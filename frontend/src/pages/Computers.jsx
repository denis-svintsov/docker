import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"
import useDebounce from '../hooks/useDebounce';
import axios from 'axios'


function Computers() {
	const [computers, setComputers] = useState();
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 500);

	function searchComputers(search) {
		return axios.get('http://localhost:8080/computers/search', { params: { search: search } });
	}

	function deleteComputer(computer) {
		fetch('http://localhost:8080/computers/delete', {
			method: 'POST',
			body: JSON.stringify(computer),
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
				searchComputers(debouncedSearchTerm).then(results => {
					setComputers(results.data);
				});
			} else {
				axios('http://localhost:8080/computers')
					.then((data) => {
						setComputers(data.data);
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
					<Link to={"./addComputer"}>
						<div className='btn btn-primary btn-block mb-4 ms-3'>Добавить компьютер</div>
					</Link>
					<div className='elements-search'>
						<input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Поиск' />
					</div>
					<table className="table">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Процессор</th>
								<th scope="col">Видеокарта</th>
								<th scope="col">Память</th>
								<th scope="col">SSD</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{computers && computers.map((computer, index) => (
								<tr key={computer.id + computer.processor}>
									<th scope="row">{index + 1}</th>
									<td>{computer.processor}</td>
									<td>{computer.graphics}</td>
									<td>{computer.memory}</td>
									<td>{computer.ssd}</td>
									<td>
										<Link to={"update/" + computer.id}>
											<button className='btn btn-primary btn-block'>Изменить</button>
										</Link>
										<button onClick={() => deleteComputer(computer)} className='btn btn-primary btn-block ms-3'>Удалить</button>
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

export default Computers
