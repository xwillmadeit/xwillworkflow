var say = (name) => {
	return `this is my ${name}`;
}

console.log(say('tracy'));

var obj = {
	firstname: 'tracy',
	lastname: 'mcgrady',
	shout() {
		return `${this.firstname} ${this.lastname}`;
	}
}

console.log(obj.shout());

