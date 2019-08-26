import React from "react";

import Adview from "../components/Adview";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import GameGroup from "../components/GameGroup";
import Searchbar from "../components/Searchbar";

export default class Home extends React.Component {
	constructor() {
		super();

		let _this = this;
		let _cache = null;
		this._mounted = false;
		this.state = { games: [] };
		(function listen(){
			requestAnimationFrame(listen);
			if(app.games !== _cache && _this._mounted) {
				_cache = app.games;
				_this.setState({ games: app.games });
				setTimeout(() => Photon.reload());
			}
		}());
	}

	componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	render() {
		return (
			<div>
				<Navbar/>

				<div className="container row">
					<div className="col s12 l4">
						<ul className="scrollnav" data-offset="0">
							<h1>Categories</h1>
							{ this.state.games.length !== 0 && this.state.games.groups.map((group, key) => <li key={key}><a data-scrollto={"#" + app.slug(group.name)}>{group.name}</a></li>) }
						</ul>
					</div>
					<div className="col s12">
						<Searchbar/>
						{ this.state.games.length !== 0 && this.state.games.groups.map((group, key) => <GameGroup key={key} group={group}/>) }
					</div>
				</div>

				<Footer static/>
			</div>
		)
	}
}
