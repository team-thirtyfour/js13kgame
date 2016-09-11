let currentSelectedEntity = 0;

const newSelectedEntity = (level, entityList) => {
	if(currentSelectedEntity !== entityList.selectedIndex) {
		if(currentSelectedEntity !== 0) {
			level.selectableEntity[currentSelectedEntity - 1].isSelected = false;
		}
		currentSelectedEntity  = entityList.selectedIndex;
		if(currentSelectedEntity === 0) {
			changeEntityInput(
				0,
				0,
				0,
				0,
				false,
				false
			);
		}
		else {
			let selectedEntity = level.selectableEntity[currentSelectedEntity - 1];
			selectedEntity.isSelected = true;
			changeEntityInput(
				selectedEntity.x,
				selectedEntity.y,
				selectedEntity.width,
				selectedEntity.height,
				selectedEntity.isMovable,
				selectedEntity.collider
			);
		}
	}
};

const changeEntityInput = (x, y, width, height, isMovable, collider) => {
	document.getElementById('xInput').value = x;
	document.getElementById('yInput').value = y;
	document.getElementById('widthInput').value = width;
	document.getElementById('heightInput').value = height;
	document.getElementById('isMovableCheckbox').checked = isMovable;
	document.getElementById('colliderCheckbox').checked = collider;
};

const runConsole = (level) => {
	let gravity = parseFloat(document.getElementById('gravityInput').value);
	if(!isNaN(gravity) && level.gravity !== gravity){
		level.gravity = gravity;
	}

	let pause = document.getElementById('pauseCheckbox').checked;
	if(level.pause !== pause) {
			level.pause = pause;
	}

	let entityList = document.getElementById("entityList");
	newSelectedEntity(level, entityList);
	if(entityList.selectedIndex !== 0)
	{
		let selectedEntity = level.selectableEntity[entityList.selectedIndex - 1];
		if(selectedEntity.isSelected) {
			let x = parseFloat(document.getElementById('xInput').value);
			let y = parseFloat(document.getElementById('yInput').value);
			let width = parseFloat(document.getElementById('widthInput').value);
			let height = parseFloat(document.getElementById('heightInput').value);
			let isMovable = document.getElementById('isMovableCheckbox').checked;
			let collider = document.getElementById('colliderCheckbox').checked;

			if(!isNaN(x) && x !== selectedEntity.x) {
				selectedEntity.x = x;
			}
			if(!isNaN(y) && y !== selectedEntity.y) {
				selectedEntity.y = y;
			}
			if(!isNaN(width) && width !== selectedEntity.width) {
				selectedEntity.width = width;
			}
			if(!isNaN(height) && height !== selectedEntity.height) {
				selectedEntity.height = height;
			}
			if(isMovable !== selectedEntity.isMovable) {
				selectedEntity.isMovable = isMovable;
				if(isMovable) {
					level.movableEntities.push(selectedEntity);
				}
				else {
					for(let i = 0; i < level.movableEntities.length; i++) {
						if(level.movableEntities[i] === selectedEntity) {
							level.movableEntities.splice(i,1);
						}
					}
				}
			}
			if(collider !== selectedEntity.collider) {
				selectedEntity.collider = collider;
			}
		}
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
		level.selectableEntity.forEach(() => {
			let option = document.createElement("option");
			option.text = i;
			entityList.add(option);
			i++;
		});
		currentSelectedEntity = 0;
		changeEntityInput(
			0,
			0,
			0,
			0,
			false,
			false
		);
		document.getElementById('gravityInput').value = level.gravity;
		runConsole(level);
	},
	run: (level) => {
		runConsole(level);
	}
};
