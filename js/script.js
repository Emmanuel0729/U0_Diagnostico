let listAux = [];

function get() {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', 'https://reqres.in/api/users?page=2');

        req.onload = function () {
            if (req.status == 200) {
                resolve(JSON.parse(req.response));
            } else {
                reject();
            }
        };

        req.send();
    })
}

get().then(data => {

    console.log(data.data);
    let res = document.querySelector('#response');
    let list = JSON.stringify(data.data)
    let aux = JSON.parse(list);
    console.log(aux);
    res.innerHTML = '';
    listAux = aux;
    i = 1;
    for (let item of listAux) {
        console.log(item);
        res.innerHTML += `
                <tr>
                    <td>${item.first_name}</td>
                    <td>${item.email}</td>
                    <td> <image src="${item.avatar}"></image> </td>

                </tr>
                `;
    }
});


function create() {
    let res2 = document.querySelector('#response');
    res2.innerHTML += `
                <tr>
                    <td>${document.getElementById('name').value}</td>
                    <td>${document.getElementById('job').value}</td>
                </tr>
                `;
};


var peticion;

function registro() {
    let url = 'https://reqres.in/api/users';
    let obj = {
        name: document.getElementById('name').value,
        job: document.getElementById('job').value
    }
    console.log(obj);
    let aux = JSON.stringify(obj)
    console.log(aux);

    return new Promise(function (resolve, reject) {

        peticion = new XMLHttpRequest();
        peticion.onreadystatechange = alertContents;
        peticion.open('POST', url);
        peticion.setRequestHeader('Content-Type', 'application/json');
        peticion.send(aux);
    });
};

function alertContents() {
    if (peticion.readyState === XMLHttpRequest.DONE) {
        if (peticion.status === 200) {
            alert(peticion.responseText);
        } else {
            create();
            alert("Se registro correctamente!");
        }
    }
}