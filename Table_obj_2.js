var request = new XMLHttpRequest();
request.open('GET','https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json',true);
request.send();
request.onload = function(){
    table_data = JSON.parse(this.response); 
    var length_of_data = table_data.length;
    var number_per_pages = 10;
    var number_of_pages = Math.ceil(length_of_data/number_per_pages);

    var container = document.createElement('div');
    container.setAttribute('class','container');
    container.innerHTML = "DOM PAGINATION"

    var tables = document.createElement('table');
    tables.classList.add('table','table-bordered');

    var thead = document.createElement('thead');
    thead.setAttribute('class','thead-dark');

    var theadr = document.createElement('tr');

    var theadtd1 =  document.createElement('th');
    theadtd1.innerHTML = "ID";

    var theadtd2 =  document.createElement('th');
    theadtd2.innerHTML = "Name";

    var theadtd3 =  document.createElement('th');
    theadtd3.innerHTML = "Email";

    theadr.append(theadtd1,theadtd2,theadtd3);
    thead.append(theadr);

    var tbody = document.createElement('tbody');
    tbody.setAttribute('class','tbody');
    tbody.setAttribute('id','table_body');
    tables.append(thead,tbody);
   
    var nav = document.createElement('nav');
    var pagination = document.createElement('ul');
    pagination.setAttribute('class','pagination');

    function slice_data(v){     
        document.getElementById('table_body').innerHTML = "";
        var table_req = table_data.slice((v-1)*10,(v)*10);
        table_req.forEach((obj)=>{
            var tr =  document.createElement('tr');                
            var td1 = document.createElement('td');
            td1.textContent = obj.id;
                                
            var td2 = document.createElement('td');
            td2.textContent = obj.name;
                            
            var td3 = document.createElement('td');
            td3.textContent = obj.email;  
                                
            tr.append(td1,td2,td3);
                            
            tbody.append(tr);  
        })          
    }   

    function createnavpages(value="",text="")
        {
            var elem = document.createElement('li');
            elem.setAttribute("class","page-item");
            var btn = document.createElement('button');
            btn.setAttribute('class','btn btn-secondary');	
            btn.addEventListener('click',() => slice_data(value));  
            btn.innerHTML=text;    
            elem.appendChild(btn);
            pagination.append(elem);
        }   

    for(i = 1; i<=number_of_pages;i++){
        createnavpages(i,i);    
    }

    createnavpages(1,"first");
    createnavpages(number_of_pages,"Last");

    nav.append(pagination);    

    container.append(tables,nav);

    document.body.append(container);

    slice_data(1);   
}




