let trees = $("select#demo2").treeMultiselect({ searchable: true, searchParams: ['section', 'text'], onChange: treeOnChange });
let tree = trees[0];
var totalPrice = 0;
var newItemsNumber = 0;

$(function () {
	addCatButton();
	updatePrices();
});


function reloadTree() {
	tree.reload();
	addCatButton();
	updatePrices();

}


function addCatButton() {
	$(".tree-multiselect div.section").toArray().forEach(addButtonsToEl);

	function addButtonsToEl(element) {
		obj_path = "";
		el_parent = element;
		while (el_parent.nodeName != "BODY") {
			if (el_parent.className == "section") {
				elParentCat = $(el_parent).children('.title')[0].innerText;
				console.log(elParentCat);
				if (obj_path == "") {
					obj_path = elParentCat;
				}
				else {
					obj_path = elParentCat + '/' + obj_path;
				}

			}
			el_parent = el_parent.parentElement;
		}

		$(element).append("<div class='item addCat' ><a type='button' onclick=\"addNewCat('" + obj_path + "')\">+ Добавить категорию</a><p class='p-tab'>/</p><a type='button' onclick=\"addNewBtn('" + obj_path + "')\">+ Добавить снар</a></div>");
		console.log($(element).children('.item').data('value'));
	}
}

function addNewCat(obj) {
	console.log(obj)
}

function addNewBtn(path) {
	console.log(path)
	
	createNewItemMenu(path)
}

function updatePrices() {
	$(".item").toArray().forEach(countPrice);
	function countPrice(line) {
		if (line.className == "item") {
			eqId = line.getAttribute("data-value");
			var price = prices[eqId][0];
			var amount = prices[eqId][1];
			line.id = eqId + "line";
			sName = line.querySelector('.section-name');
			$('#' + line.id).append("<span class='price-col'>" + amount + "шт.</span>");
			$('#' + line.id).append("<span class='price-col'>" + price + "₴\t</span>");
		}
	}

}


function treeOnChange(allSelectedItems, addedItems, removedItems) {

	$(".tree-multiselect .selected").children().toArray().forEach(addPrice);
	updatePrice();
}

function addPrice(line) {
	eqId = line.getAttribute("data-value");
	var price = prices[eqId][0];
	totalPrice += Number(price);

	if (line.childElementCount < 3) {
		line.id = eqId + "selectedLine";
		sName = line.querySelector('.section-name');
		line.lastChild.remove();
		$('#' + line.id).append("<span class='price-col'>" + price + "₴</span>");
		$('#' + line.id).append(`<p class="amount-limit">/` + prices[eqId][1] + `шт.</p>`);
		$('#' + line.id).append(`<input id="amount_` + eqId + `" class="amount-selector dark" type="number" min="1" max="` + prices[eqId][1] + `" step="1" value="1" onchange="updatePrice()">`);

	}
}

function updatePrice() {
	totalPrice = 0;
	$(".tree-multiselect .selected").children().toArray().forEach(countTotalPrice);
	// selectedEquipmentToJSON();
	$("#priceField")[0].innerText = "Итоговая цена: " + totalPrice + "₴";
	$("#priceCDataField")[0].innerText = "Итоговая амортизация: " + totalPrice + "₴";


	$("#priceHiddenField")[0].value = totalPrice;
	function countTotalPrice(line) {
		eqId = line.getAttribute("data-value");
		var price = prices[eqId][0];

		totalPrice += Number(price) * Number($("#amount_" + eqId)[0].value);
	}
}

function createNewItemMenu(path) {
	// reloadTree();
	
	let selectedOpt = $(".tree-multiselect").children()[1];
	$(selectedOpt).empty()
	$(selectedOpt).append(`<input type="hidden" id="newItemPath" value=`+path+`></input>`);
	$(selectedOpt).append("<h4>Добавить снар в категорию " + path + "</h4>");
	$(selectedOpt).append(`<label for="leadLabel">Название</label>`);
	$(selectedOpt).append(`<input type="text" class="form-control dark" id="newItemName" placeholder="Terra Incognita Canyon 3 Alu">`);
	$(selectedOpt).append(`<small id="leadInputHelp" class="form-text text-muted">Название, производитель и модель.</small><br>`);

	$(selectedOpt).append(`<label for="leadLabel">Описание</label>`);
	$(selectedOpt).append(`<textarea class="form-control dark" id="newItemDesc" rows="4" placeholder="Адамантиевые дуги, одну из которых кто-то умудрился сломать, и ещё погнуть пару."></textarea>`);
	$(selectedOpt).append(`<small id="leadInputHelp" class="form-text text-muted">Отличительные свойства этого(-их) объекта(-ов).</small><br>`);

	$(selectedOpt).append(`<label for="leadLabel">Количество</label>`);
	$(selectedOpt).append(`      
	<div class="input-number">
		<input id="newItemNumber" type="number" min="1" max="100" step="1" value="1">
  	</div>`);
	$(".input-number input[type='number']").inputSpinner();
	$(selectedOpt).append(`<small id="leadInputHelp" class="form-text text-muted">1, если объект уникален в своём роде.</small><br>`);

	$(selectedOpt).append(`<label for="leadLabel">Плата</label>`);
	$(selectedOpt).append(`      
	  <div class="input-number">
		  <input class="form-control dark" id="newItemPrice" type="number" min="0" max="31415" step="0.01" value="0.01"> ₴
		</div>`);
	$(selectedOpt).append(`<small id="leadInputHelp" class="form-text text-muted">Нинада</small><br>`);


	$(selectedOpt).append(`<button class="btn btn-outline-warning" onclick="reloadTree()">Нне</button>`);
	$(selectedOpt).append(`<button class="btn btn-outline-primary" onclick="addNewEquipment()">Ндэ</button>`);

}

class Equipment {
	constructor(name = "", path = "") {
		this.name = name;
		this.path = path;
		this.desc = "";
		this.price = 0.0;
		this.amount = 1;

	}
}

function addNewEquipment() {
	id = "new_eq_"+newItemsNumber;
	newItemsNumber++;

	eq_name = document.getElementById("newItemName").value;
	eq_path = document.getElementById("newItemPath").value;
	let newEquipment = new Equipment(eq_name, eq_path);
	newEquipment.desc = document.getElementById("newItemDesc").value;
	newEquipment.amount = document.getElementById("newItemNumber").value;
	newEquipment.price = document.getElementById("newItemPrice").value;
	console.log(newEquipment);
	$("select#demo2").append("<option readonly value='"+id+"' data-section='"+newEquipment.path+"' selected='selected' data-description='"+newEquipment.desc+"'>"+newEquipment.name+"</option>");
	
	prices[id] = [newEquipment.price, newEquipment.amount];
	reloadTree();
}


// function selectedEquipmentToJSON() {
//     var equipmentDict = {};
//     $(".tree-multiselect .selected").children().toArray().forEach(addItemToJSON);
//     function addItemToJSON(line) {
//         eqId = line.getAttribute("data-value");
//         var price = prices[eqId][0];
//         backendEqId = eqId.substr(3, eqId.length-1);
//         equipmentDict[backendEqId] = Number($("#amount_" + eqId)[0].value);
//     }
//     $("#equipmentJSONHiddenField")[0].value = JSON.stringify(equipmentDict);
// }