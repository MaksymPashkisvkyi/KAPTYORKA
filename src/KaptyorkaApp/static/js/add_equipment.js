let trees = $("select#demo2").treeMultiselect({ searchable: true, searchParams: ['section', 'text'], onChange: treeOnChange, freeze: true });
let tree = trees[0];
var totalPrice = 0;
var newItemsNumber = 0;
var newFoldersNumber = 0;
$(function () {
	addCatButton();
	updatePrices();
	$("[data-description='Folder']").hide();
});


function reloadTree() {
	tree.reload();
	addCatButton();
	updatePrices();
	$("div").find(`[data-description='Folder']`).hide();
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

function createNewFolderMenu(path) {
	// reloadTree();
	
	let selectedOpt = $(".tree-multiselect").children()[1];
	$(selectedOpt).empty()
	$(selectedOpt).append(`<input type="hidden" id="newFolderPath" value=`+path+`></input>`);
	$(selectedOpt).append("<h4>Добавить новую категорию " + path + "</h4>");
	$(selectedOpt).append(`<label for="leadLabel">Название</label>`);
	$(selectedOpt).append(`<input type="text" class="form-control dark" id="newFolderName" placeholder="Карематы">`);
	$(selectedOpt).append(`<small id="leadInputHelp" class="form-text text-muted">Нахрен я делаю тут эти подсказки</small><br>`);


	$(selectedOpt).append(`<button class="btn btn-outline-warning" onclick="reloadTree()">Нне</button>`);
	$(selectedOpt).append(`<button class="btn btn-outline-primary" onclick="addNewFolder()">Ндэ</button>`);

}

class Equipment {
	constructor(name = "", path = "") {
		this.id = 0
		this.name = name;
		this.path = path;
		this.desc = "";
		this.price = 0.0;
		this.amount = 1;

	}
}


function addNewEquipment() {
	id = "new_eq_"+newItemsNumber;
	

	eq_name = document.getElementById("newItemName").value;
	eq_path = document.getElementById("newItemPath").value;
	let newEquipment = new Equipment(eq_name, eq_path);
	newEquipment.id = newItemsNumber
	newEquipment.desc = document.getElementById("newItemDesc").value;
	newEquipment.amount = document.getElementById("newItemNumber").value;
	newEquipment.price = document.getElementById("newItemPrice").value;
	// console.log(newEquipment);
	
	
	send_new_equipment('add', 'equipment', newEquipment);
	newItemsNumber++;
	reloadTree();
}


function addNewFolder() {
	id = "new_fd_"+newFoldersNumber;
	newFoldersNumber++;

	eq_name = document.getElementById("newFolderName").value.replaceAll(' ', ' ­');
	eq_path = document.getElementById("newFolderPath").value;
	let newFolder = new Equipment(eq_name, eq_path);
	newFolder.desc = "Folder";
	newFolder.amount = 0;
	newFolder.price = 0;
	// console.log(newFolder);
	$("select#demo2").append("<option readonly style='display:none' value='"+id+"' data-section='"+newFolder.path+'/'+newFolder.name+"' selected='selected' data-description='"+newFolder.desc+"'>"+newFolder.name+"</option>");
	
	prices[id] = [0, 0];
	reloadTree();
	// send_new_equipment('add', 'equipment', newEquipment)
	
}


function deleteEquipment(id) {
	$("select#demo2 option[value='"+id+"']")[0].remove();
	let newEquipment = new Equipment("", "");
	newEquipment.id = id.replaceAll("eq_", "");
	send_new_equipment('remove', 'equipment', newEquipment);
	reloadTree();
}


function send_new_equipment(requestType, objType, obj="") {
	$.ajax({
		url: "/add_equipment/",
		type: 'POST',
		data: {
			'requestType': requestType,
			'objType': objType,
			'obj': obj
		},
		//DO NOT EDIT!
		beforeSend: function (xhr, settings) {
			function getCookie(name) {
				var cookieValue = null;
				if (document.cookie && document.cookie != '') {
					var cookies = document.cookie.split(';');
					for (var i = 0; i < cookies.length; i++) {
						var cookie = jQuery.trim(cookies[i]);
						// Does this cookie string begin with the name we want?
						if (cookie.substring(0, name.length + 1) == (name + '=')) {
							cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
							break;
						}
					}
				}
				return cookieValue;
			}
			if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
				// Only send the token to relative URLs i.e. locally.
				xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
			}
		},
		//EDITABLE CODE
		success: function a(json) {
			// alert(json);
			// alert(json.exist);
			if (json.result === "success") {
				// byId(id_code).parentNode.removeChild(byId(id_code));
				// count_notifications();
				if (requestType == "add") {
					newId = "eq_"+json.newId
					// $("select#demo2 option[value='"+'new_eq_'+obj.id+"']")[0].value = newId;
					$("select#demo2").append("<option readonly value='"+newId+"' data-section='"+obj.path+"' selected='selected' data-description='"+obj.desc+"'>"+obj.name+"</option>");

					prices[ "eq_"+json.newId] = [obj.price, obj.amount];
				}
				// alert("Ну, чё. Намана");
				reloadTree();
			} else {
				alert("Изменения не сохранены");
				alert("Ошибка сегментации диска. Компьютер будет перезагружен.");
				// byId(id_code).parentNode.removeChild(byId(id_code));
				// count_notifications();
			}
		}
	});
}
