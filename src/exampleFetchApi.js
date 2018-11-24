
const getResourse = async(url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Couldnt fetch ${url}` +
            `, recieved ${res.status}`);
    }
    const body = await res.json();
    return body
};

getResourse('https://swapi.co/api/peoplfe/1')
    .then((body) => console.log(body))
    .catch((err)=> console.error(err));

/*
fetch('https://swapi.co/api/people/1')
    .then((res) => {
        return res.json()
        })
    .then((body) => {
        console.log(body)
    })*/
