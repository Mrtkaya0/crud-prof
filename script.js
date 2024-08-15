function validateForm() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;

    if (name == '') {
        alert('İsim Giriniz');
        return false;
    }
    if (age == '') {
        alert('Yaş Giriniz');
        return false;
    } else if (age < 18) {
        alert('Yaş 18\'den Büyük Olmalı');
        return false;
    }
    if (address == '') {
        alert('Adres Giriniz');
        return false;
    }
    if (email == '') {
        alert('E-mail Zorunlu');
        return false;
    } else if (!email.includes('@')) {
        alert('Email adres şeklinde giriniz');
        return false;
    }

    return true;
}

function showData() {
    let peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    let html = '';

    peopleList.forEach(function(element, index) {
        html += '<tr>';
        html += '<td>' + element.name + '</td>';
        html += '<td>' + element.age + '</td>';
        html += '<td>' + element.address + '</td>';
        html += '<td>' + element.email + '</td>';
        html += `<td>
                    <button onclick='deleteData(${index})' class='btn btn-danger'>Sil</button>
                    <button onclick='updateData(${index})' class='btn btn-warning m-2'>Güncelle</button>
                 </td>`;
        html += '</tr>';
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

window.onload = showData;

function addData() {
    if (validateForm() == true) {
        let name = document.getElementById('name').value;
        let age = document.getElementById('age').value;
        let address = document.getElementById('address').value;
        let email = document.getElementById('email').value;

        let peopleList;
        if (localStorage.getItem('peopleList') == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem('peopleList'));
        }

        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
    return false;
}

function deleteData(index) {
    let peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function updateData(index) {
    let peopleList;
    if (localStorage.getItem('peopleList') == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem('peopleList'));
    }

    document.getElementById('name').value = peopleList[index].name;
    document.getElementById('age').value = peopleList[index].age;
    document.getElementById('address').value = peopleList[index].address;
    document.getElementById('email').value = peopleList[index].email;

    deleteData(index);
}