export default (level) => {

	let gravity = parseFloat(document.getElementById('gravityInput').value);
	if(!isNaN(gravity)){
		level.gravity = gravity;
	}

};
