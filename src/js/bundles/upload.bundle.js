document.addEventListener("DOMContentLoaded",(function(e){var a=$("input[name='uploadFile']:checked").val();window.uploadJS.loadAllFile(a),$("#uploadJsonFile").click((function(){if(a=$("input[name='uploadFile']:checked").val()){var e=prompt("Please enter the password");if(null!=e){var l=new FormData,t=$("#fileData")[0].files[0];if(void 0===t)return void alert("Vui lòng chọn file.");l.append("file",t);var n=window.commonJS.getLoadingHTML();$("#showFilesData").prepend(n),$.ajax({url:`${window.apiUrlDefined.UPLOAD_DATA_URL}/${e}/${a}/`,type:"post",data:l,contentType:!1,processData:!1,success:function(e){window.uploadJS.loadAllFile(a),alert(e.message)}})}else alert("You do not have permission to access!")}}))})),window.uploadJS={refreshFileData:function(){var e=$("input[name='uploadFile']:checked").val();window.uploadJS.loadAllFile(e)},loadAllFile:function(e){var a=window.commonJS.getLoadingHTML();$("#showFilesData").html(a),setTimeout((()=>{$.ajax({url:`${window.apiUrlDefined.FILES_DATA_URL}/${e}/`,async:!1,dataType:"json"}).done((function(e){var a='<div class="card-body">\n                                <table class="table table-bordered table-responsive">\n                                    <thead class="table-light">\n                                        <th>File Name</th><th>URL</th>\n                                    </thead><tbody>';e&&e.length>0&&e.forEach((e=>{a+=` <tr>\n                                    <td>${e.name}</td>\n                                    <td><a href="${e.url}" target="_blank">${e.url}</a></td>\n                                </tr>`})),a+="</tbody></table></div>",$("#showFilesData").html(a)})).fail((function(e,a,l){$("#showFilesData").html(""),alert("Upload data fail!")}))}),200)},getFileContentType:function(e){window.uploadJS.loadAllFile(e.value)}};