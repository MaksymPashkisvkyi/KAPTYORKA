$("select#demo2").treeMultiselect({ searchable: true, searchParams: ['section', 'text'], onChange: treeOnChange });

var totalPrice = 0;

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

function treeOnChange(allSelectedItems, addedItems, removedItems) {

    $(".selected").children().toArray().forEach(addPrice);
    updatePrice()
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

function updatePrice(){
    totalPrice = 0;
    $(".selected").children().toArray().forEach(countTotalPrice);
    $("#priceField")[0].innerText = "Итоговая цена: " + totalPrice + "₴";
}

function countTotalPrice(line) {
    eqId = line.getAttribute("data-value");
    var price = prices[eqId][0];
    totalPrice += Number(price) * Number($("#amount_" + eqId)[0].value);


}