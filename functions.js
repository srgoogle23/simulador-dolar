!function(a) {
    a("#dolarInfo").css("display", "none"), a("#calculate-btn").click(function() {
        getData()
    })
}(jQuery);

const getData = async () => {
    $.LoadingOverlay("show");
    let a = [],
        t = 0;
    for (; 0 === a.length;) a = await fetchData(t), t++;
    $.LoadingOverlay("hide"), $("#dolarInfo").css("display", "block");
    let o = $("#dolar").val() * a[0].cotacaoVenda,
        c = o / 100 * 4,
        r = o + c,
        n = (r / 100 * 5.38 + r).toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            style: "currency",
            currency: "REA"
        });
    $("#total").val(n), $("#data").html(moment(a[0].dataHoraCotacao).format("DD/MM/YYYY") + " \xe0s " + moment(a[0].dataHoraCotacao).format("HH:mm:ss")), $("#compra").html(a[0].cotacaoCompra.toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
        style: "currency",
        currency: "BLR"
    })), $("#venda").html(a[0].cotacaoVenda.toLocaleString("pt-BR", {
        minimumFractionDigits: 4,
        style: "currency",
        currency: "BLR"
    }))
}, fetchData = async a => {
    let t = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" + moment().subtract(a, "days").format("MM-DD-YYYY") + "'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao",
        o = await $.getJSON(t);
    return o.value
};