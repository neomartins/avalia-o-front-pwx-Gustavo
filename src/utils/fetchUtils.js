var dataDb = require('../data.json');

export function fetchUtil(method, URL, data) {
  if(method === 'PUT'){
  	var index = dataDb.pessoas.findIndex(k => k.id === data.id);
     dataDb.pessoas.splice(index, 1, data);
  }else{
  	dataDb.pessoas.push(data);
  }
  return dataDb.pessoas;
}

export function fetchDeleteUtil( URL, id) {
    var index = dataDb.pessoas.findIndex(k => k.id === id);
    dataDb.pessoas.splice(index, 1);
    return dataDb.pessoas;
}

export function fetchGetUtil(PATH, data){
	if(data === null || data === undefined){
		 return dataDb.pessoas.sort((a, b) => a.id - b.id);
	}
}

export function getLastId(personList){
	if(personList.person !== undefined && personList.person.length > 0){
		personList.person.sort((a, b) => b.id - a.id);
		return personList.person[0].id
	}else{
		return Math.random();
	}	
}