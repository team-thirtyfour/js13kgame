const runConsole = (level) => {
	let gravity = parseFloat(document.getElementById('gravityInput').value);
	if(!isNaN(gravity)){
		level.gravity = gravity;
	}

	let pause = document.getElementById('pauseCheckbox').checked;
	level.pause = pause;

	let entityList = document.getElementById("entityList");
	if(entityList.selectedIndex !== 0)
	{
		console.log(entityList.selectedIndex);
		entityList.remove(entityList.selectedIndex);
	}
};

export default {
	init: (level) => {
		let i = 0;
		let entityList = document.getElementById("entityList");
		for (let j=entityList.length; j>=0; j--){
			entityList.remove(j);
		}
		let option = document.createElement("option");
		option.text = '';
		entityList.add(option);
		level.entities.forEach(() => {
			let option = document.createElement("option");
			option.text = i;
			entityList.add(option);
			i++;
		});
		runConsole(level);
	},
	run: (level) => {
			runConsole(level);
	}
};
