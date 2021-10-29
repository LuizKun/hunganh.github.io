window.variablesJS.divStatisticsShowData=document.getElementById("showStatisticsData"),window.variablesJS.divStatisticsTitle=document.getElementById("showStatisticsTitle"),window.statisticsJS={initStatisticsData:function(){window.commonJS.showLoading("showStatisticsLoading"),setTimeout((()=>{var t="selfBusiness"===window.variablesJS.typeDefault?variablesJS.TU_DOANH:variablesJS.KHOI_NGOAI;$.ajax({url:`${window.apiUrlDefined.STATISTICS_DATA_URL}/${t}`,async:!1,dataType:"json"}).done((function(t){if(t){var a=[],e=Object.keys(t);e&&e.length>0&&(e.forEach((e=>{"olderItem"===e?variablesJS.olderItem=t[e]:a.push(t[e])})),window.statisticsJS.processDataInput(a)),window.commonJS.hideLoading("showStatisticsLoading")}}))}),100)},processDataInput:function(t){if(window.variablesJS.divStatisticsShowData.innerHTML="",t&&t.length>0){t.forEach((a=>{window.variablesJS.dataJson?window.variablesJS.dataJson.items.push(a.items[0]):(window.variablesJS.dataJson=a,window.variablesJS.dataJson.totalCount=t.length)})),window.variablesJS.dataJson.items.sort((function(t,a){var e=new Date(t.today.toDate);return new Date(a.today.toDate)-e}));for(let t=0;t<window.variablesJS.dataJson.items.length;t++)window.statisticsJS.createStatisticsReport(variablesJS.currentPeriod,window.variablesJS.dataJson.items[t],t);window.statisticsJS.setStatisticsTitle()}window.commonJS.hideLoading("showStatisticsLoading")},resetStatisticsData:function(){window.commonJS.closePopover(),window.variablesJS.dataJson=null,variablesJS.mappingDataJson=null,window.variablesJS.divStatisticsShowData.innerHTML="",document.getElementById("fileInput").value=null},refreshStatisticsData:function(){window.statisticsJS.resetStatisticsData(),window.statisticsJS.initStatisticsData()},readFileAsText:function(t){return new Promise((function(a,e){let i=new FileReader;i.onload=function(){a(i.result)},i.onerror=function(){e(i)},i.readAsText(t)}))},changeStatisticsType:function(t){window.statisticsJS.resetStatisticsData(),window.variablesJS.typeDefault=t,window.statisticsJS.initStatisticsData()},changeStatisticsAction:function(t){window.commonJS.closePopover(),window.commonJS.showLoading("showStatisticsLoading"),window.variablesJS.actionDefault=t,window.statisticsJS.processStatisticsData(variablesJS.currentPeriod),window.commonJS.hideLoading("showStatisticsLoading")},processStatisticsData:function(t){if(variablesJS.currentPeriod=t,window.variablesJS.dataJson&&window.variablesJS.dataJson.items&&window.variablesJS.dataJson.items.length>0){window.variablesJS.divStatisticsShowData.innerHTML="";for(let a=0;a<window.variablesJS.dataJson.items.length;a++)window.statisticsJS.createStatisticsReport(t,window.variablesJS.dataJson.items[a],a)}window.statisticsJS.setStatisticsTitle()},createStatisticsReport:function(t,a,e){var i="netBuy"===window.variablesJS.actionDefault?a[t].netBuy:a[t].netSell,n=window.commonJS.getNetTradeValueColumn(),o=" ("+new Date(a[t].fromDate).toLocaleDateString(window.variablesJS.defaultLocale)+" - "+new Date(a[t].toDate).toLocaleDateString(window.variablesJS.defaultLocale)+") - Tổng Giá Trị "+("netBuy"===window.variablesJS.actionDefault?"Mua Ròng: ":"Bán Ròng: ")+new Intl.NumberFormat(window.variablesJS.numberLocale).format(a[t][n])+" đ",s=document.createElement("table");s.classList.add("left-position","table","table-bordered","table-striped","table-hover");var d=document.createElement("thead"),l=d.insertRow(-1),r=document.createElement("th");r.setAttribute("colspan",9),r.innerHTML=o,l.appendChild(r),d.appendChild(l),s.appendChild(d),l=d.insertRow(-1);for(var w=0;w<variablesJS.statisticsHeadTitle.length;w++){var c=document.createElement("th");c.innerHTML=variablesJS.statisticsHeadTitle[w],l.appendChild(c)}var S=document.createElement("tbody");for(S.setAttribute("id","table-statistics-popover"),w=0;w<i.length;w++){(l=S.insertRow(-1)).setAttribute("onClick",`window.commonJS.showTickerInfor("${i[w].ticker}")`),l.classList.add("tr-cursor");var m=0===e&&window.variablesJS.dataJson.items.length>1?window.variablesJS.dataJson.items[e+1]:variablesJS.olderItem,J=window.commonJS.getColumnName(),u=window.commonJS.getVolumeColumnName();if(m){var b="netBuy"===window.variablesJS.actionDefault?m[t].netBuy.findIndex((t=>t.ticker===i[w][variablesJS.statisticsCols[1]])):m[t].netSell.findIndex((t=>t.ticker===i[w][variablesJS.statisticsCols[1]]));b>-1?window.commonJS.addCell(l,Number(w+1)+window.commonJS.getPositionIcon(b,w)):window.commonJS.addCell(l,Number(w+1))}else window.commonJS.addCell(l,Number(w+1));var v=i[w].priceChange,f=100*i[w].percentPriceChange,p=f>0||f<0?(v/i[w].percentPriceChange).toFixed(0):i[w].matchPrice,h=i[w].matchPrice;window.commonJS.addCell(l,Number(w+1)<=10?'<b class="top10">'+i[w].ticker+"</b>":i[w].ticker),window.commonJS.addCell(l,'<div class="text-left">'+window.commonJS.getIcbNameBySymbol(i[w].ticker)+"</div>"),window.commonJS.addCell(l,""!==u?new Intl.NumberFormat(window.variablesJS.numberLocale).format(i[w][u]):"&#8722;"),window.commonJS.addCell(l,new Intl.NumberFormat(window.variablesJS.numberLocale).format(i[w][J])),window.commonJS.addCell(l,'<span class="'+(Number(v)>0?"up":Number(v)<0?"down":"reference")+'">'+new Intl.NumberFormat(window.variablesJS.numberLocale).format(h)+"</span>"),window.commonJS.addCell(l,'<span class="'+(Number(v)>0?"up":Number(v)<0?"down":"reference")+'">'+new Intl.NumberFormat(window.variablesJS.numberLocale).format(v)+"</span>"),window.commonJS.addCell(l,'<span class="'+(Number(f)>0?"up":Number(f)<0?"down":"reference")+'">'+Number(f).toFixed(2)+"%</span>"),window.commonJS.addCell(l,new Intl.NumberFormat(window.variablesJS.numberLocale).format(p))}s.appendChild(S),window.variablesJS.divStatisticsShowData.appendChild(s)},setStatisticsTitle:function(){var t=(new Date).toLocaleDateString(window.variablesJS.defaultLocale),a=new Date(window.variablesJS.dataJson.items[0].today.toDate).toLocaleDateString(window.variablesJS.defaultLocale),e=` ${window.variablesJS.dataJson&&window.variablesJS.dataJson.items.length>0?"- Dữ liệu ngày "+a:""} `;a===t?(window.variablesJS.divStatisticsTitle.classList.remove("bg-out-of-date"),window.variablesJS.divStatisticsTitle.classList.add("bg-latest")):(window.variablesJS.divStatisticsTitle.classList.remove("bg-latest"),window.variablesJS.divStatisticsTitle.classList.add("bg-out-of-date")),window.variablesJS.divStatisticsTitle.innerHTML="Thống Kê ".concat("selfBusiness"===window.variablesJS.typeDefault?"Tự Doanh ":"Khối Ngoại ","netBuy"===window.variablesJS.actionDefault?"Mua Ròng":"Bán Ròng")+e,window.commonJS.closePopover(),window.commonJS.initIndustriesSelectionPopover("statistics-popover")}},document.addEventListener("DOMContentLoaded",(function(t){window.statisticsJS.initStatisticsData()})),window.addEventListener("load",(function(){var t=document.getElementById("fileInput");t&&t.addEventListener("change",(function(){if(t.files.length>0){window.variablesJS.dataJson=null,window.variablesJS.divStatisticsShowData.innerHTML="",window.commonJS.showLoading("showStatisticsLoading");let a=[];for(let e=0;e<=t.files.length-1;e++)a.push(processDataInput.readFileAsText(t.files[e]));Promise.all(a).then((t=>{var a=t.map((t=>JSON.parse(t)));variablesJS.olderItem=null,window.statisticsJS.processDataInput(a)}))}}),!1)}));