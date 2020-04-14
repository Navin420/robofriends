import React from 'react';
import CardList from '../components/CardList';
// import { robots } from './robots';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			robots: [],
			searchfield: ''
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(users => this.setState({ robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value});
	}

	render(){
		const filteredArray = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		});

		if(this.state.robots.length === 0){
			return <h1 className='tc'> Loding... </h1>;
		}else{
			return (
				<div className='tc'>
					<h1 className='f1'> RoboFriends </h1>
					<SearchBox stateChange={this.onSearchChange}/>
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredArray} />
						</ErrorBoundry>
					</Scroll>
				</div>
			);
		}
	}
}

export default App;