import { Link, useNavigate, useParams } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"


function UpdateComputer() {
	const [computer, setComputer] = useState("");
	const [processor, setProcessor] = useState("");
	const [graphics, setGraphics] = useState("");
	const [memory, setMemory] = useState("");
	const [ssd, setSsd] = useState("");
	const navigate = useNavigate();
	const { id } = useParams();

	function addComputer() {
		if (processor && graphics && memory && ssd) {
			fetch('http://localhost:8080/computers/add', {
				method: 'POST',
				body: JSON.stringify({
					"id": id,
					"processor": processor,
					"graphics": graphics,
					"memory": memory,
					"ssd": ssd,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
				.then(() => {
					window.location.replace("../../success");
				})
				.catch((err) => {
					console.log(err.message);
				});
		}
	}

	useEffect(() => {
		fetch('http://localhost:8080/computers/' + id)
			.then((res) => res.json())
			.then((data) => {
				setComputer(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	}, [])
	useEffect(() => {
		setProcessor(computer.processor);
		setGraphics(computer.graphics);
		setMemory(computer.memory);
		setSsd(computer.ssd);
	}, [computer])

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
							<label for="exampleInputEmail1">Processor</label>
							<input value={processor} onChange={(e) => { setProcessor(e.target.value) }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Processor" />
						</div>
						<div className="form-group mt-4">
							<label for="exampleInputPassword1">Graphics</label>
							<input value={graphics} onChange={(e) => { setGraphics(e.target.value) }} type="text" className="form-control" id="exampleInputPassword1" placeholder="Graphics" />
						</div>
						<div className="form-group mt-4">
							<label for="exampleInputMemory1">Memory</label>
							<input value={memory} onChange={(e) => { setMemory(e.target.value) }} type="text" className="form-control" id="exampleInputMemory1" aria-describedby="emailHelp" placeholder="Memory" />
						</div>
						<div className="form-group mt-4">
							<label for="exampleInputSsd1">SSD</label>
							<input value={ssd} onChange={(e) => { setSsd(e.target.value) }} type="text" className="form-control" id="exampleInputSsd1" placeholder="SSD" />
						</div>
						<button onClick={() => addComputer()} className="btn btn-primary mt-4">Добавить</button>
					</form>
				</main>
			</div>
		</>
	)
}

export default UpdateComputer
