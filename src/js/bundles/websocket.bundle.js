window.webSocketApp={initWebsocket:function(){var o=$.Deferred();return-1==window.webSocketConfigs.liveboard.Result&&(window.webSocketConfigs.liveboard.Socket=io(window.webSocketConfigs.liveboard.LinkSocket,{forceNew:!0,reconnection:!0,reconnectionDelay:1e3,reconnectionAttempts:5}),window.webSocketConfigs.liveboard.Socket.on("connect",(function(){console.log("CONNECT Websocket"),window.webSocketConfigs.liveboard.Result=1,$("#status-connect").text("Kết nối ổn định").css("color","rgb(14, 203, 129)"),window.webSocketActions.socketCurrentUnRegister(),window.webSocketActions.messageRegister(),window.commonJS.hideDisconnectionMessageToast(),o.resolve()})),window.webSocketConfigs.liveboard.Socket.on("disconnect",(function(){window.webSocketConfigs.liveboard.Result=-1,console.log("disconnect"),$("#status-connect").text("Mất kết nối").css("color","rgb(240, 185, 11)"),window.commonJS.showDisconnectionMessageToast()})),window.webSocketConfigs.liveboard.Socket.on("connect_error",(function(){window.webSocketConfigs.liveboard.Result=-2,console.log("connect_error"),$("#status-connect").text("Lỗi kết nối").css("color","rgb(240, 185, 11)"),window.commonJS.showDisconnectionMessageToast()})),window.webSocketConfigs.liveboard.Socket.on("reconnect_error",(function(){window.webSocketConfigs.liveboard.Result=-3,console.log("reconnect_error"),$("#status-connect").text("Thử kết nối lại thất bại").css("color","rgb(240, 185, 11)"),window.commonJS.showDisconnectionMessageToast()}))),o.promise()}},window.webSocketActions={messageRegister:function(){var o='{"action":"join","list":"'+window.webSocketConfigs.liveboard.listStock+'"}';1==window.webSocketConfigs.liveboard.Result&&(window.webSocketConfigs.liveboard.Socket.emit("regs",o),window.webSocketConfigs.liveboard.Socket.on("stock",(function(o){window.boardsJS.decodeBoardBaseStock("stock",o.data)})),window.webSocketConfigs.liveboard.Socket.on("board",(function(o){window.boardsJS.decodeBoardBaseStock("board",o.data)})))},messageRegisterNewSymbol:function(o){var e='{"action":"join","list":"'+[o]+'"}';1==window.webSocketConfigs.liveboard.Result&&window.webSocketConfigs.liveboard.Socket.emit("regs",e)},socketCurrentUnRegister:function(){var o='{"action":"leave","list":"'+window.webSocketConfigs.liveboard.listStock+'"}';window.webSocketConfigs.liveboard.Socket.emit("regs",o)},socketSymbolUnRegister:function(o){var e='{"action":"leave","list":"'+[o]+'"}';window.webSocketConfigs.liveboard.Socket.emit("regs",e)}};