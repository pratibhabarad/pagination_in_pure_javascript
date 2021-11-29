getById = e => document.getElementById(e)
getData = (page = 1) => {
	let output = '' ;
	fetch('https://jsonplaceholder.typicode.com/todos?page=' + page).then(res => res.json())
	.then(mydata => {
		for (i=page-1; i <= page-1 ; i++)
			output += `<tr><td>${mydata[i].userId}</td><td>${mydata[i].id}</td><td>${mydata[i].title}</td><td>${mydata[i].completed}</td></tr>`
		getById("tdata").innerHTML = output;
	});
	Pagination.Start()
}
Pagination = {
    code: '',
	Add:(start,end) => {
		for (i = start; i < end; i++) Pagination.code += `<button class="mybtn">${i}</button>`
	},
	Last: () => Pagination.page < 28 ? Pagination.code += '<i class="dotstr">...</i><button class="mybtn">' + Pagination.size + '</button>' : Pagination.code += '<button class="mybtn">30</button>'
		,
	First: () => Pagination.page > 3 ? Pagination.code += '<button class="mybtn">1</button><i class="dotstr">...</i>' : Pagination.code += '<button class="mybtn">1</button>'
	,
	Click: function() {
		Pagination.page = +this.innerHTML
		getData(Pagination.page)
	},
	Prev: () => {
		Pagination.page--;
		if (Pagination.page < 1) Pagination.page = 1
		getData(Pagination.page)
	},
	Next: () => {
		Pagination.page++;
		if (Pagination.page > Pagination.size) 	Pagination.page = Pagination.size
		getData(Pagination.page)
	},
	Start: () => {
		Pagination.size < Pagination.step_Page * 2 + 6 ? Pagination.Add(1, Pagination.size + 1)
		:Pagination.page < Pagination.step_Page * 2 + 1 ? ( Pagination.Add(1, Pagination.step_Page * 2 + 2),Pagination.Last())
		:Pagination.page > Pagination.size - Pagination.step_Page * 2 ? (Pagination.First(),Pagination.Add(Pagination.size - Pagination.step_Page * 2, Pagination.size + 1))
		:(Pagination.First(),Pagination.Add(Pagination.page - Pagination.step_Page, Pagination.page + Pagination.step_Page + 1),Pagination.Last())
		Pagination.e.innerHTML = Pagination.code
		Pagination.code = ''
		a = Pagination.e.getElementsByTagName('button')
		for (i = 0; i < a.length; i++) {
			if (+a[i].innerHTML === Pagination.page) a[i].className = 'active'
			a[i].addEventListener('click', Pagination.Click, false)
		}
		getById("page").innerHTML= Pagination.page
	},
	Init: e => {
		Pagination.size = 30
		Pagination.page = 1
		Pagination.step_Page = 1
		e.innerHTML = ['<button class="ctrlBtn">Prev</button>', '<span class="page-container"></span>', '<button class="ctrlBtn">Next</button>'].join('')
		Pagination.e = e.getElementsByTagName('span')[0]
		nav = e.getElementsByTagName('button')
		nav[0].addEventListener('click', Pagination.Prev, false)
		nav[1].addEventListener('click', Pagination.Next, false)
		getData()
	}
}
init = () => Pagination.Init(getById('pagination'))
document.addEventListener('DOMContentLoaded', init, false)
