const xhttp = new XMLHttpRequest()

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const data = JSON.parse(this.responseText)
      // handle the response that is saved in variable data
      // console.log(data)
      var ul = document.createElement('ul')
      ul.setAttribute('class', 'packages-list')
      var ul_desc = document.createElement('ul')
      ul.setAttribute('class', 'packages-desc')


    data.forEach(function(pack) {
	var li = document.createElement('li')
	var li_desc = document.createElement('li')

	ul.appendChild(li)
	ul_desc.appendChild(li_desc)
	var a = document.createElement('a')
	var link = document.createTextNode(pack.name)
	a.appendChild(link)
	a.href = "#" + pack.name
	li.appendChild(a)

	var a_desc = document.createElement('a')
	a_desc.name = pack.name
	li_desc.appendChild(a_desc)
	
	var p_name = document.createElement('p')
	var text = document.createTextNode("Package: " + pack.name)
	p_name.append(text)
	li_desc.appendChild(p_name)
	
	var p_desc = document.createElement('p')
	var desc = document.createTextNode("Description: " + pack.description)
	p_desc.append(desc)
	li_desc.appendChild(p_desc)
	
	var p_depends = document.createElement('p')
	var depends = pack.depends

	for (let i in depends) {
	    var a = document.createElement('a')
	    var link = document.createTextNode(depends[i])
	    a.appendChild(link)
	    a.href = "#" + depends[i]
	    p_depends.appendChild(a)
	    p_depends.appendChild(document.createElement('br'))
	}
	li_desc.appendChild(document.createTextNode("Depends:"))
	li_desc.appendChild(p_depends)
	
	var p_depends_on = document.createElement('p')
	var depends_on = pack.depends_on

	for (let i in depends_on) {
	    var a = document.createElement('a')
	    var link = document.createTextNode(depends_on[i])
	    a.appendChild(link)
	    a.href = "#" + depends_on[i]
	    p_depends_on.appendChild(a)
	    p_depends_on.appendChild(document.createElement('br'))
	}
	li_desc.appendChild(document.createTextNode("Packages depending on:"))
	li_desc.appendChild(p_depends_on)
    })

      document.getElementById('packages-list').appendChild(ul)
      document.getElementById('packages-desc').appendChild(ul_desc)
  }
}

xhttp.open('GET', 'http://localhost:3001/packages', true)
xhttp.send()
