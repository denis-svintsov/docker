import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/Employees.css'
import Header from "./Header"
import { useEffect, useState } from "react"


function AddComputer() {
	const [processor, setProcessor] = useState("");
	const [graphics, setGraphics] = useState("");
	const [memory, setMemory] = useState("");
	const [ssd, setSsd] = useState("");
	const navigate = useNavigate();

	function addComputer() {
		if (processor && graphics && memory && ssd) {
			fetch('http://localhost:8080/computers/add', {
				method: 'POST',
				body: JSON.stringify({
					"processor": processor,
					"graphics": graphics,
					"memory": memory,
					"ssd": ssd,
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
						<Link onClick={() => addComputer()} className="btn btn-primary mt-4">Добавить</Link>
					</form>
				</main>
			</div>
		</>
	)
}

export default AddComputer
