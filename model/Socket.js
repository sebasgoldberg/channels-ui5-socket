sap.ui.define([
	"sap/ui/base/Object",
    "sap/ui/core/ws/WebSocket",
], function (Object, WebSocket) {
	"use strict";

    let UI5WebSocket = function(path="/fila/"){

        this._socket = new WebSocket("ws://"+window.location.host+path);

        this.listen = function(onMessage){
            this._socket.attachMessage(this, function (oEvent) {
                onMessage(JSON.parse(oEvent.getParameter('data')));
            }, this);
        };

        this.send = function(data){
            this._socket.send(JSON.stringify(data));
        }

    };

	return Object.extend("iamsoft.socket.model.Socket", {
		
		constructor: function (path) {
            this._socket = new channels.WebSocketBridge();
            this._socket.connect(path);
		},

        listen: function(onMessage){
            this._socket.listen(function (action, stream) {
                onMessage(action);
            });
        },

        send: function(data){
            this._socket.send(data);
        },

	});

});

